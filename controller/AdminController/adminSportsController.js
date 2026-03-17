import { Sport } from "../../models/spots.js";

// get sports

export const getAllSports=async(req ,res)=>{
    try{
        const sports=await Sport.find().sort({createdAt:-1})
        res.json({sports})

    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
    }
}

// create sport
export const createSport=async(req,res)=>{
    try{
        const {sport,games=[],teams=[]}=req.body
        if(!sport){
            return res.status(400).json({message:"Sport is required"})
        }
        const existingSport=await Sport.findOne({sport})
        if(existingSport){
            return res.status(400).json({message:"Sport already exists"})
        }
        const newSport=await Sport.create({sport,games,teams})
        res.status(201).json({message:"Sport created successfully",sport:newSport})

    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
    }
}

// delete sport
export const deleteSport=async(req,res)=>{
    try{
        const {id}=req.params
        const sport=await Sport.findByIdAndDelete(id)
        if(!sport){
            return res.status(404).json({message:"Sport not found"})
        }
        res.json({message:"Sport deleted successfully"})
        
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
    }
}
// add games to sport
export const addGames=async (req,res)=>{
    try{
        const {games}=req.body
        const {id}=req.params

        if(!Array.isArray(games) || games.length===0){
            return res.status(400).json({message:"Games are required"})
        }
        const sport=await Sport.findByIdAndUpdate(id,
            {$addToSet:{games:{$each:games.map((g)=>g.trim())}}},
            {new:true}
    )
    if(!sport){
        return res.status(404).json({message:"Sport not found"})
    }
    res.json({message:"Games added successfully",sport})

    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
    }
}

// remove a specific game from a sport
export const removeGame=async(req,res)=>{
    const {game}=req.body;
    if(!game){
            return res.status(400).json({message:"Game is required"})   
    }
    const sport=await Sport.findByIdAndUpdate(req.params.id,{
        $pull:{games:game}
    },
    {new:true}
)
}
