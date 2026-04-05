import multer from "multer";
import path from "path";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      return  cb(null,"uploads/logos")
    },
    filename:(req,file,cb)=>cb(null,`logo${Date.now()}-${Math.round(Math.random() * 1000)}${path.extname(file.originalname)}`)
})

const fileFilter=(req,file,cb)=>{
    const allowedTypes=/jpeg|jpg|png|webp/
    const isValid=allowedTypes.test(path.extname(file.originalname).toLowerCase())
    if(isValid){
        cb(null,true)
    }else{
        cb(new Error("Invalid file type"),false)
    }
}

const upload=multer({
    storage,
    fileFilter,
    limits:{
        fileSize:1024*1024*50//50mb
    }
})


export default upload