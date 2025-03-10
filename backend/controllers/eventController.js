const mongoose = require("mongoose");
const Event = require("../models/Event");

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find(); 
        console.log("Fetched Events:", events);// Fetch all events
            res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// Get Event by ID
exports.getEventById = async (req, res) => {
    const { eventId } = req.params;

    // Check if eventId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID" });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: "Error fetching event", details: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const updateData = req.body; // The fields to update

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID" });
    }

    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: "Error updating event", details: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID" });
    }

    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting event", details: error.message });
    }
};

exports.purchaseTicket = async (req, res) => {
    const { eventId } = req.params;
    const { quantity } = req.body; // Number of tickets to buy

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID" });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (event.available_seats < quantity) {
            return res.status(400).json({ error: "Not enough tickets available" });
        }

        // Update booked seats and available seats
        event.booked_seats += quantity;
        event.available_seats -= quantity;
        await event.save();

        res.status(200).json({ message: "Ticket(s) purchased successfully", event });
    } catch (error) {
        res.status(500).json({ error: "Error processing ticket purchase", details: error.message });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error: error.message });
    }
};
