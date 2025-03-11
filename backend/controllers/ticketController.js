const mongoose = require("mongoose");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Event = require("../models/Event");

// Purchase a ticket
exports.purchaseTicket = async (req, res) => {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
        return res.status(400).json({ error: "userId and eventId are required" });
    }

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Check if tickets are available
        if (event.booked_seats >= event.available_seats) {
            return res.status(400).json({ error: "No tickets available for this event" });
        }

        // Create a new ticket
        const ticket = new Ticket({ userId, eventId });
        await ticket.save();

        // Update booked seats count
        event.booked_seats += 1;
        await event.save();

        res.status(201).json({ message: "Ticket purchased successfully", ticket });
    } catch (error) {
        res.status(500).json({ error: "Error purchasing ticket", details: error.message });
    }
};exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        console.log("Fetched tickets:", tickets); // Debugging
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: "Error fetching tickets", details: error.message });
    }
};


// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
    const { ticketId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
        return res.status(400).json({ error: "Invalid ticket ID" });
    }

    try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: "Error fetching ticket", details: error.message });
    }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
    const { ticketId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
        return res.status(400).json({ error: "Invalid ticket ID" });
    }

    try {
        const ticket = await Ticket.findByIdAndDelete(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket deleted successfully", ticket });
    } catch (error) {
        res.status(500).json({ error: "Error deleting ticket", details: error.message });
    }
};


