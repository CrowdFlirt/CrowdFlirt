const aws = require('aws-sdk');
require('dotenv').config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
    region: 'us-west-2', // Put your aws region here
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
});

aws.config.getCredentials(function(err) {
    if (err) console.log("Error!", err.stack);
    // credentials not loaded
    else {
        console.log("Access key:", aws.config.credentials.accessKeyId);
        console.log("Secret access key:", aws.config.credentials.secretAccessKey);
    }
});

const BUCKET = process.env.Bucket;
// Now lets export this function so we can call it from somewhere else
module.exports.upload = (req,res) => {

    const s3 = new aws.S3();  // Create a new instance of S3
    const fileName = req.body.fileName;
    // console.log("filename: ", fileName)
    const fileType = req.body.fileType;
    // console.log("filetype: ", fileType)
// Set up the payload of what we are sending to the S3 api
    const s3Params = {
        Bucket: 'crowdflirt',
        Key: fileName,
        Expires: 500,
        ContentType: fileType,
        ACL: 'public-read'
    };
// Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            console.log(err);
            res.json({success: false, error: err})
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
        const returnData = {
            signedRequest: data,
            url: `https://${BUCKET}.s3.amazonaws.com/${fileName}`
        };
        // Send it all back
        res.json({success:true, data:{returnData}});
    });
};
