import { User } from "../../models/user.model.js";
import { Pick } from "../../models/picks.model.js";

// ── API 1: Get all pro users with win rate and games ──
export const GetProUsersProfileData = async (req, res) => {
  try {
    // Step 1: Find all pro users
    const proUsers = await User.find({ userType: "proUser" }).select("name");

    // Step 2: Loop through each pro user and get their picks
    const result = await Promise.all(
      proUsers.map(async (user) => {
        const picks = await Pick.find({ userId: user._id });

        const totalPicks = picks.length;
        const wins       = picks.filter((p) => p.result === "win").length;
        const losses     = picks.filter((p) => p.result === "loss").length;
        const pending    = picks.filter((p) => p.result === "pending").length;
        const winRate    = wins + losses > 0
          ? ((wins / (wins + losses)) * 100).toFixed(1) + "%"
          : "0%";

        // Get unique games with sport name
        const gamesMap = {};
        picks.forEach((p) => {
          if (!gamesMap[p.game]) {
            gamesMap[p.game] = p.sport;
          }
        });

        const games = Object.entries(gamesMap).map(([game, sport]) => ({
          game,
          sport,
        }));

        return {
          _id: user._id,
          name: user.name,
          totalPicks,
          wins,
          losses,
          pending,
          winRate,
          games,
        };
      })
    );

    res.status(200).json({ success: true, proUsers: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// get single pro user games 

export const getSingleProUserGames=async(req,res)=>{
  try {
    const {id}=req.params;
    const user=await User.findOne({_id:id,userType:"proUser"}).select("name");
    if(!user){
      return res.status(404).json({success:false,message:"User not found"})
    }
    const picks=await Pick.find({userId:id});

    // get unique games with sport name
    const gamesMap = {};
    picks.forEach((p) => {
      if (!gamesMap[p.game]) {
        gamesMap[p.game] = p.sport;
      }
    })
    const games=Object.entries(gamesMap).map(([game,sport])=>({game,sport}))

    res.status(200).json({
      success:true,
      data:{
        name:user.name,
        games
      }
    })

  } catch (error) {
    res.status(500).json({success:false,message:"Server error",error:error.message})
  }
}

// Get single pro user picks for a game
export const getproUserPicksByGame=async(req,res)=>{
  try{
    const {id,game}=req.params;

    const picks=await Pick.find({userId:id,game})

    if(picks.length===0){
      return res.status(404).json({success:false,message:"No picks found for this game"})  }
      
    res.status(200).json({success:true,picks})

  }catch(error){
    res.status(500).json({success:false,message:"Server error",error:error.message})  
  }
}