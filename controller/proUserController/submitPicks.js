
import {Pick} from '../../models/picks.model.js'
import {User} from '../../models/user.model.js'

const submitPicks = async (req, res) => {
    try{
        const {sport,game,team,pickType,odds,analysis,time,pickPrice,bank} = req.body;
        const ticket = req.file.filename;
        const userId = req.user._id;

        if(!sport || !game || !team || !pickType || !odds || !analysis || !time || !pickPrice || !bank || !ticket){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        const user=await User.findById(userId);
        if(!user || user.userType!=="proUser"){
            return res.status(404).json({success:false,message:"pro user not found"});
        }

        const newPick = new Pick({
            userId:userId,
            sport,
            game,
            team,
            pickType,
            odds,
            analysis,
            time,
            pickPrice,
            bank,
            ticket
        });

        await newPick.save();

        res.status(201).json({success:true,message:"Pick submitted successfully",pick:newPick});

        
    }catch(error){
        res.status(500).json({success:false,message:"Server error",error:error.message});
    }
}

export default submitPicks;