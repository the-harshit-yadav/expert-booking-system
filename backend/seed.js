const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Expert = require("./models/Expert");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const experts = [
    {
        name: "Dr. John Smith",
        category: "Career",
        experience: 10,
        rating: 4.8,
        slots: [
            { date: "2026-02-22", times: ["10:00 AM", "11:00 AM", "2:00 PM"] },
            { date: "2026-02-23", times: ["9:00 AM", "1:00 PM"] },
        ],
    },
    {
        name: "Sarah Johnson",
        category: "Fitness",
        experience: 7,
        rating: 4.5,
        slots: [
            { date: "2026-02-22", times: ["8:00 AM", "3:00 PM"] },
            { date: "2026-02-24", times: ["12:00 PM", "4:00 PM"] },
        ],
    },
    {
        name: "Michael Lee",
        category: "Finance",
        experience: 12,
        rating: 4.9,
        slots: [
            { date: "2026-02-23", times: ["10:00 AM", "5:00 PM"] },
        ],
    },
];

const seedDB = async () => {
    await Expert.deleteMany();
    await Expert.insertMany(experts);
    console.log("Experts Seeded!");
    process.exit();
};

seedDB();