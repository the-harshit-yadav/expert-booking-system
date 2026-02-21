const Expert = require("../models/Expert");

exports.getExperts = async (req, res) => {
    try {
        const { page = 1, limit = 5, category, search } = req.query;

        const query = {};

        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: "i" };

        const experts = await Expert.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Expert.countDocuments(query);

        res.json({
            experts,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getExpertById = async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.id);
        if (!expert) return res.status(404).json({ message: "Expert not found" });
        res.json(expert);
    } catch {
        res.status(500).json({ message: "Server Error" });
    }
};