const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true 
    },
    purchasedAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model('Ticket', ticketSchema);