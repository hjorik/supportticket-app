const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Bitte geben sie einen Namen an"]
    },
    email: {
        type: String,
        required: [true, "Bitte geben sie eine E-Mail Adresse an"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Bitte geben Sie ein Passwort an"],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("User", userSchema);