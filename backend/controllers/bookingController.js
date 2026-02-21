const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
    try {
        const { expert, name, email, phone, date, time, notes } = req.body;

        if (!expert || !name || !email || !phone || !date || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const booking = await Booking.create({
            expert,
            name,
            email,
            phone,
            date,
            time,
            notes,
        });

        const io = req.app.get("io");
        io.emit("slotBooked", { expert, date, time });

        res.status(201).json({ message: "Booking successful", booking });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Slot already booked" });
        }
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getBookingsByEmail = async (req, res) => {
    try {
        const { email } = req.query;

        const bookings = await Booking.find({ email }).populate("expert");

        res.json(bookings);
    } catch {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.json(booking);
    } catch {
        res.status(500).json({ message: "Server Error" });
    }
};