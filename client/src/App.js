import React from 'react';
// files
import FileUpload from './components/FileUpload';

function App() {
  return (
    <main className="container mt-4">
      <h4 className="display-4 text-center mb-4">
        <i className="fab fa-react" /> React File Upload
      </h4>

      <FileUpload />
    </main>
  );
}

export default App;
