import { Application } from "express";
import multer from 'multer'
import path from 'path'
import {v4 as uuid} from 'uuid'

const configureMulter = (app: Application) => {
    const storageConfig = multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, "uploads");
        },
        filename: (_req, file, cb) => {
            const fileExtension = file.originalname.split('.').pop();
            console.log('FILENAME', file.originalname, fileExtension);

            cb(null, `${uuid()}.${fileExtension}`);
        }
    });

    app.use(multer({storage:storageConfig}).single("itemImage"));

    app.get('/uploads/:file', (req, res) => {
        const { file } = req.params;        
        const filePath = path.resolve(__dirname, `../../../uploads/${file}`);        
        res.sendFile(filePath);
    })
}

export default configureMulter;
