import { User } from "../../models/user.model.js";
import { Pick } from "../../models/picks.model.js";
import { Sport } from "../../models/spots.js";

// ── API 1: Get all pro users with win rate and games ──
export const GetProUsersProfileData = async (req, res) => {
  try {
    // Step 1: Find all pro users
    const proUsers = await User.find({ userType: "proUser" }).select("name profileImage");

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

        const profileImageUrl=`${req.protocol}://${req.get("host")}/uploads/profiles/${user.profileImage}`

        return {
          _id: user._id,
          name: user.name,
          totalPicks,
          wins,
          losses,
          pending,
          winRate,
          games,
          profileImageUrl
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
export const getproUserPicksBySport =async(req,res)=>{
  try{
    const {id,sport}=req.params;
    const {pickPrice}=req.query;

    const query={userId:id,sport}

    if(pickPrice){
      query.pickPrice=pickPrice;
    }
    const picks=await Pick.find(query)
    if (picks.length === 0) {
      return res.status(404).json({ success: false, message: "No picks found" });
    }
     console.log("pick data from this api",picks)
     res.status(200).json({ success: true, picks })
  }catch(error){
    res.status(500).json({success:false,message:"Server error",error:error.message})  
  }
}

// get single pick 
export const getSinglePick=async(req,res)=>{

  try{
    const {pickId}=req.params;
     const pick=await Pick.findById(pickId)
     if(!pick){
      return res.status(404).json({success:false,message:"Pick not found"})
     }
     const pickWithUrl={
      ...pick._doc,
      ticketurl:pick.ticket?`${req.protocol}://${req.get("host")}/uploads/ticket/${pick.ticket}`:null
     }

     res.status(200).json({success:true,pick:pickWithUrl})
     
  }catch(error){
    res.status(500).json({success:false,message:"Server error",error:error.message})}
}



// getting logo
export const getGameLogos=async(req,res)=>{
  try{

    const {sport,game}=req.query
    const parts=game.split(/\s+vs\s+/i)
    const teamAName=parts[0]?.trim();
    const teamBName = parts[1]?.trim();
    const sportDoc = await Sport.findOne({ sport: sport });

    if (!sportDoc) return res.status(404).json({ message: "Sport not found" });

     // Build full URL from relative path
    const buildLogoUrl = (logoPath) => {
      if (!logoPath) return null;
      return `${req.protocol}://${req.get("host")}/uploads/logos/${logoPath}`;
    };

    const findTeam = (name) => {
      return sportDoc.teams.find(t =>
        t.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(t.name.toLowerCase())
      );
    }
    
    const teamA = findTeam(teamAName);
    const teamB = findTeam(teamBName);

     return res.json({
      teamA: { name: teamAName, logo: buildLogoUrl(teamA?.logo) },
      teamB: { name: teamBName, logo: buildLogoUrl(teamB?.logo) },
    });

  }catch(err){
 console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}