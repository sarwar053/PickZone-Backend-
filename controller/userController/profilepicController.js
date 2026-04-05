
import { User } from "../../models/user.model.js";
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";
import { dirname } from "path";
import { compressToSize } from "../../helper/imageCompression.js";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// get user profilepick
const getProfilePick = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            ...user._doc,
            profilePicUrl: user.profileImage ? `${req.protocol}://${req.get("host")}/uploads/profiles/${user.profileImage}` : null
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

// upload/update profile pick

const updateProfilePick = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // delete old profile image if exists
        if (user.profileImage) {
            const oldImagePath = path.join(__dirname, "../../uploads/profiles", user.profileImage)
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath)
            }
        }
        const filename = `resized-${Date.now()}.jpeg`
        const outputPath = path.join(__dirname, "../../uploads/profiles", filename)
        const originalPath = req.file.path

        const result = await compressToSize(originalPath, outputPath)
        console.log(`Saved at ${result.sizeMB}mb, quality ${result.quality}`);

        sharp.cache(false)

        // small delay for windows
        await new Promise((resolve) => setTimeout(resolve, 200));

        // then unlink
        try {
            await fs.promises.unlink(originalPath);
        } catch (err) {
            console.log("Could not delete original:", err.message); // non fatal
        }

        user.profileImage = filename
        await user.save()
        res.status(200).json({
            message: "Profile image updated successfully",
            profilePicUrl: `${req.protocol}://${req.get("host")}/uploads/profiles/${user.profileImage}`
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

// remove Profile pic
const removeProfilePic = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        if (user.profileImage) {
            const oldImagePath = path.join(__dirname, "../../uploads/profiles", user.profileImage)
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath)
            }
        }
        user.profileImage = null
        await user.save()
        res.status(200).json({ message: "Profile image removed successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}
export { getProfilePick, updateProfilePick, removeProfilePic }