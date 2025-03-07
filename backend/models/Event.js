const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    organizer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    ticketsAvailable: { 
        type: Number, 
        required: true, 
        default: 0,
        min: 0  // Ensure tickets can't be negative
    },
    price: { 
        type: Number, 
        required: true,
        min: 0  // Ensure price can't be negative
    },
    category: { 
        type: String, 
        required: true,
        enum: ["VIP", "General"] // Restricts category to valid options
    },
});

module.exports = mongoose.model("Event", eventSchema);
