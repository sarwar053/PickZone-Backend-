import sharp from "sharp"
import fs from "fs"

export const compressToSize=async(inputPath,outPutPath,maxBytes=5*1024*1024)=>{
    let quality=90
    let dimensions=800
    let outputBuffer;

    while(quality>=10){
        outputBuffer=await sharp(inputPath).resize(dimensions,dimensions,{
            fit:"cover",
            position:"center"
        }).jpeg({quality}).toBuffer()

        if(outputBuffer.length<=maxBytes){
            break;
        }
        quality-=10
        if(quality<=50){
            dimensions=Math.max(400,dimensions-100)
        }
        console.log(`Still too large (${(outputBuffer.length / 1024 / 1024).toFixed(2)}mb), retrying quality ${quality}...`);
    }
    await fs.promises.writeFile(outPutPath,outputBuffer)
    return{
        sizeMB:(outputBuffer.length/1024/1024).toFixed(2),
        quality
    }
}