import { Application } from "express";
import multer from 'multer'
import path from 'path'
import {v4 as uuid} from 'uuid'

const configureMulter = (app: Application) => {
    const storageConfig = multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, "input");
        },
        filename: (_req, file, cb) => {
            const fileExtension = file.originalname.split('.').pop();
            console.log('FILENAME', file.originalname, fileExtension);

            cb(null, `${uuid()}.${fileExtension}`);
        }
    });

    app.use(multer({storage:storageConfig}).single("videoFile"));

    app.get('/output/:outputVideoName', (req, res) => {
        const { outputVideoName } = req.params; 
        
        
        const filePath = path.resolve(__dirname, `../../../../ciferhack2022-ds/demo_video/${outputVideoName}`);        
        console.log('output',{outputVideoName, filePath});
        res.set({
            'Content-Type': 'application/x-www-form-urlencoded',
          })
        res.sendFile(filePath);
    });
}

export default configureMulter;
