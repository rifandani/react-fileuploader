const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

// middleware
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// upload API
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).json({ msg: 'no files uploaded' });

  const sampleFile = req.files.sampleFile;

  // move the sampleFile => current directory/uploads
  sampleFile.mv(
    `${__dirname}/client/public/uploads/${sampleFile.name}`, // create custom unique name based on user
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }

      res.status(200).json({
        fileName: sampleFile.name,
        filePath: `/uploads/${sampleFile.name}`,
      });
    },
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runs in http://localhost:${PORT}`));
