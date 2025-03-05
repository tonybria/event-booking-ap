const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Event = require('../models/Event');

// Purchase a ticket
exports.purchaseTicket = async (req, res) => {
    const { userId, eventId } = req.body;

    // Validate input
    if (!userId || !eventId) {
        return res.status(400).json({ error: 'userId and eventId are required' });
    }

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if tickets are available
        if (event.ticketsAvailable <= 0) {
            return res.status(400).json({ error: 'No tickets available for this event' });
        }

        // Create a new ticket
        const ticket = new Ticket({ userId, eventId });
        await ticket.save();

        // Decrease the number of available tickets
        event.ticketsAvailable -= 1;
        await event.save();

        res.status(201).json({ message: 'Ticket purchased successfully', ticket });
    } catch (error) {
        res.status(400).json({ error: 'Error purchasing ticket', details: error.message });
    }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
            .populate('userId', 'username email') // Populate user details
            .populate('eventId', 'name date location'); // Populate event details
        res.status(200).json(tickets);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching all tickets', details: error.message });
    }
};

// Get tickets by user ID
exports.getTicketsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch tickets for the user
        const tickets = await Ticket.find({ userId })
            .populate('eventId', 'name date location'); // Populate event details
        res.status(200).json(tickets);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching tickets by user ID', details: error.message });
    }
};

// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
    const { ticketId } = req.params;

    try {
        // Check if the ticket ID is valid
        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(400).json({ error: 'Invalid ticket ID' });
        }

        // Fetch the ticket
        const ticket = await Ticket.findById(ticketId)
            .populate('userId', 'username email') // Populate user details
            .populate('eventId', 'name date location'); // Populate event details

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching ticket by ID', details: error.message });
    }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
    const { ticketId } = req.params;

    try {
        // Check if the ticket ID is valid
        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(400).json({ error: 'Invalid ticket ID' });
        }

        // Find and delete the ticket
        const ticket = await Ticket.findByIdAndDelete(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        // Increase the number of available tickets for the event
        const event = await Event.findById(ticket.eventId);
        if (event) {
            event.ticketsAvailable += 1;
            await event.save();
        }

        res.status(200).json({ message: 'Ticket deleted successfully', ticket });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting ticket', details: error.message });
    }
};