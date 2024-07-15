import express from "express";
import cors from "cors";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";
import connection, { dbName } from "./connection.js";

const app = express();
const port = 8002;
let db

cloudinary.config({
    cloud_name: 'da2oqj7qe',
    api_key: '687377994928293',
    api_secret: 'GcXxtuXnuQ-LJGycDcmf_DGqw_E'
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }))
app.use(fileUpload({ useTempFiles: true }))
app.use(express.urlencoded({ extended: false }))

app.post("/upload", (req, res) => {
    let file = req.files.file;
    console.log(file);
// res.send("success");
    // cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    //             if (err) {
    //                 console.error("this is error:" + err);
    //                 res.status(500).send(JSON.stringify('Error uploading to Cloudinary'));
    //             } else {
    //                 console.log(result);
    //                 console.log(result.secure_url)
    //                 let url = result.secure_url
    //                 // let detail = db.collection('files').insertOne({url})
    //                 res.status(200).send(JSON.stringify('File uploaded to Cloudinary'));
              
    //             }
    //         });

    // res.json({ status: "File received" });
});




// app.post("/try",(req,res)=>{
//     console.log(req.files.file,req.body.name);
//     res.send("success");
// })

connection.then((client) => {
    db = client.db(dbName)
    app.listen(port, () => console.log(port + " started"))
})