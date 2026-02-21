const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        expert: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expert",
            required: true,
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        notes: String,
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Completed"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

// PREVENT DOUBLE BOOKING
bookingSchema.index({ expert: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);