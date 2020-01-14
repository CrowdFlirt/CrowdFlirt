import React from 'react';
import Header from './Header.jsx';
import Upload from './Upload.jsx';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div className="App">
          <div>
              < Header />
          </div>
          <div className="upload-container">
            < Upload />
          </div>
        </div>

    );
  }
}

export default App;
