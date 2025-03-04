const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
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
        ref: 'User', 
        required: true 
    },
    ticketsAvailable: { 
        type: Number, 
        required: true, 
        default: 0 
    },
});

module.exports = mongoose.model('Event', eventSchema);