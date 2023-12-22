const mongoose = require('mongoose')

const playerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter your name"]
        },
        score:{
            type : Number,
            required : true
        }

    },
    {
        timestamps : true
    }
)

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;