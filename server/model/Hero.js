const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: String,
    title: String,
    avatar: String,
    banner: String,
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    scores: {
        difficulty: Number,
        skill: Number,
        attack: Number,
        survive: Number
    },
    skills: [{
        name: String,
        imgUrl: String,
        coolingTime: Number,
        consume: Number,
        desc: String
    }]
    ,
    upgradeSkillsRecommend: {
        main: Number,
        secondary: Number,
        summoner: [Number]
    },
    advantageEquipment: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Equipment" }],
    disadvantageEquipment: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Equipment" }],
    useTips: String,
    fightTips: String,
    teamfightTips: String,
    partners: [{
        hero: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Hero" }],
        desc: String
    }]
})

module.exports = mongoose.model("Hero", schema, "heroes")