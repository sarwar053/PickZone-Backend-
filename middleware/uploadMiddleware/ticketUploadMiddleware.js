import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        
        cb(null, "./uploads/ticket");
    },
    filename:(req,file,cb)=>{
        const uniqueName=`profile-${Date.now()}${path.extname(file.originalname)}`
        cb(null,uniqueName)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes=/jpeg|jpg|png|webp/
    const isvalid=allowedTypes.test(path.extname(file.originalname).toLowerCase())
    if(isvalid){
        cb(null,true)
    }else cb(new Error("Only image files allowed (jpeg, jpg, png, webp)"),false)
}

const upload = multer({
    storage,
    fileFilter,
    limits:{
    fileSize: 1024 * 1024 * 20, // 50MB
    fileCount: 1,
    }
    });


export default upload;