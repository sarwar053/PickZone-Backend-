import mongoose from "mongoose";

const pickSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        sport: { type: String, required: true },

        game: { type: String, required: true },

        team: { type: String, required: true },

        pickType: { type: String, required: true },

        odds: { type: Number, required: true },

        analysis: {
            type: String,
            required: true
        },
        
        time: {
            type: String,
            required: true
        },

        result: { type: String, enum: ["pending", "win", "loss", "push"], default: "pending" },
    },
    { timestamps: true }
);

export const Pick = mongoose.model("Pick", pickSchema);