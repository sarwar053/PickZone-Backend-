import mongoose from "mongoose";

const pickSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        sport: { type: String, required: true },

        game: { type: String, required: true },

        team: { type: String, required: true },

        pickPrice: { type: String, required: true },

        pickType: { type: String, required: true },

        odds: { type: Number, required: true },

        analysis: {
            type: String,
            required: true
        },
        bank:
        {
            type: String,
            required: true
        },
        ticket: {
            type: String,
            required: true
        },

        time: {
            type: String,
            required: true
        },

        result: { type: String, enum: ["new", "win", "loss", "push"], default: "new" },
    },
    { timestamps: true }
);

export const Pick = mongoose.model("Pick", pickSchema);