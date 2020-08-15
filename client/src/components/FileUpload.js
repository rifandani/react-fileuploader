import React, { useState } from 'react';
import axios from 'axios';
// files
import { storage } from '../config/firebase';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('sampleFile', file);

    try {
      const res = await axios.post('/upload', formData);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      alert(`${uploadedFile.fileName} is uploaded at ${uploadedFile.filePath}`);
    } catch (err) {
      if (err.response.status === 500) {
        console.log('server error');
      }

      console.log(err.response.data.msg);
    }
  };

  // firebase -------------------------------------------------------------------------

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [progress, setProgress] = useState(0);

  const fireChange = (e) => {
    setImage(e.target.files[0]);
  };

  const fireUpload = (e) => {
    e.preventDefault();

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (nextSnapshot) => {
        // convert ke persentase
        const progress = Math.round(
          (nextSnapshot.bytesTransferred / nextSnapshot.totalBytes) * 100,
        );
        // set ke state
        setProgress(progress);
      },
      (err) => console.error(err),
      (complete) => {
        // get the image URL ref
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((imageURL) => {
            console.log(imageURL);
            // set the imaage URL to state
            setImageURL(imageURL);
          });
      },
    );
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            className="custom-file-input"
            type="file"
            id="sampleFile"
            name="sampleFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="sampleFile">
            {filename}
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mb-5"
        />
      </form>

      <form onSubmit={fireUpload}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="fireImage"
            name="fireImage"
            onChange={fireChange}
          />
          <label className="custom-file-label" htmlFor="fireImage">
            {image?.name || 'Choose Image'}
          </label>
        </div>

        <input
          type="submit"
          value="Fire Upload"
          className="btn btn-danger btn-block mb-4"
        />

        <div className="progress mb-4">
          <progress
            value={progress}
            max="100"
            style={{ width: '100%' }}
            className="progress-bar bg-success progress-bar-striped"
          />
        </div>

        <img src={imageURL || null} height="200" className="img-fluid" alt="" />
      </form>
    </>
  );
};

export default FileUpload;
