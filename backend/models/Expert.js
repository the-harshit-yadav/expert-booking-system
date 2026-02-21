const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    date: String,
    times: [String],
});

const expertSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        experience: { type: Number, required: true },
        rating: { type: Number, required: true },
        slots: [slotSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Expert", expertSchema);