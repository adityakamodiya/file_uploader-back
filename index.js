import express from "express";
import cors from "cors";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";

const app = express();
const port = 8002;

cloudinary.config({
    cloud_name: 'da2oqj7qe',
    api_key: '687377994928293',
    api_secret: 'GcXxtuXnuQ-LJGycDcmf_DGqw_E'
});

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }))
app.use(fileUpload({ useTempFiles: true }))
app.use(express.urlencoded({ extended: false }))

app.post("/upload", (req, res) => {
    let file = req.files.file;
    console.log(file);

    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
                if (err) {
                    console.error("this is error:" + err);
                    res.status(500).send(JSON.stringify('Error uploading to Cloudinary'));
                } else {
                    console.log(result);
                    res.status(200).send(JSON.stringify('File uploaded to Cloudinary'));
                }
            });
// vv
    // res.json({ status: "File received" });
});



// cloudinary.openUploadWidget(
//     {
//         cloudName: "da2oqj7qe",
//         uploadPreset: "kgqqol8b",
//         // sources: ["local", "url", "camera"],
//         // multiple: false,
//         // cropping: true,
//         // croppingAspectRatio: 1,
//         // showSkipCropButton: false,
//     },
//     (error, result) => {
//         if (!error && result && result.event === "success") {
//             console.log("File uploaded successfully:", result.info);
//             // Do something with the result.info object
//         }
//     }
// );

app.listen(port, () => console.log(port + " started"))