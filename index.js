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
app.use(cors({ origin: "*" }))
app.use(fileUpload({ useTempFiles: true }))
app.use(express.urlencoded({ extended: false }))

app.post("/upload", (req, res) => {
    let file = req.files.file;

    let {Name,Number,Email,State,City}   = {...req.body};

    // console.log(Name,Number,Email,State,City,file);

// res.send("success");
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
                if (err) {
                    console.error("this is error:" + err);
                    res.status(500).send(JSON.stringify('Error uploading to Cloudinary'));
                } else {
                    console.log(result);
                    console.log(result.secure_url)
                    let url = result.secure_url
                     let publicId = result.public_id;
                   let detail = db.collection('files').insertOne({Name,Number,Email,State,City,url,publicId})
                    res.status(200).send(JSON.stringify('File uploaded to Cloudinary'));
              
                }
            });



    // res.json({ status: "File received" });
});


app.get("/getdata",async(req,res)=>{
    let data = await db.collection('files').find().toArray();
    res.send(data);
})

app.delete("/delete", async (req, res) => {
    let url = req.body.url
    console.log(req.body.url)

    let db_url = await db.collection('files').find().toArray()
    // console.log(db_url[0].url)
    let length = db_url.length
    // console.log(length)
    // console.log(db_url[1].publicId)
    
    for (let i = 0; i < db_url.length; i++) {
            // console.log("hi")
        if (db_url[i].url == url) {
            console.log('same')

            // console.log(db_url[i].publicId)
            let publicId = db_url[i].publicId
            cloudinary.uploader.destroy(publicId, function (error, result) {
                console.log("hello")
                if (error) {
                    console.error('Error deleting file:', error)
                } else {
                    db.collection('files').deleteOne({ url: url })
                    console.log('File deleted successfully:', result)
                    res.send('File deleted successfully:')
                }
            });
        }
        

        }
  
})
// app.post("/try",(req,res)=>{
//     console.log(req.files.file,req.body.name);
//     res.send("success");
// })

connection.then((client) => {
    db = client.db(dbName)
    app.listen(port, () => console.log(port + " started"))
})

