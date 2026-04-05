import mongoose from "mongoose";

const pickPriceSetingSchema = new mongoose.Schema({
    prices: {
        type: [],
        required: true,
        default: []
    },

}, {
    timestamps: true
})

export default mongoose.model("PickPriceSeting", pickPriceSetingSchema)