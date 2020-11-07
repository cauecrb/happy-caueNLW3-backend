//import { request } from 'express';
import multer from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

export default{
/*     storage: multer.diskStorage({
        destination: path.join(__dirname,'..','..','uploads'),
        filename:(request, file, cb) =>{
            const filename = `${Date.now()}-${file.originalname}`;
            

            cb(null, filename);
        },
    }) */

         storage: multerS3({
             s3: new aws.S3(),
             bucket: 'happycaue',
             contentType: multerS3.AUTO_CONTENT_TYPE,
             acl: "public-read",
            key: (request, file, cb) =>{
                const filename = `${Date.now()}-${file.originalname}`;
                
    
                cb(null, filename);
             },
         }),
}