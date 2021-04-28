const express = require("express");
const router = express.Router();
const Users = require("../models/users");

// getting all
router.get("/", async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// getting one
router.get("/:id", getUser, (req, res) => {
    res.json(res.user);
});

// creating one
router.post("/", async (req, res) => {
    const user = new Users({
        name: req.body.name,
        score: req.body.score,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// updating one
router.patch("/:id", getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.score != null) {
        res.user.score = req.body.score;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// deleteing one
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "Delete User" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await Users.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "cannot find user" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

module.exports = router;
