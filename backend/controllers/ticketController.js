const Ticket = require("../models/Ticket");

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tickets", details: error.message });
  }
};

// Purchase a ticket
exports.purchaseTicket = async (req, res) => {
  try {
    const { event_name, venue, date, price, category, available_seats = 100 } = req.body;

    if (!event_name || !venue || !date || !price || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTicket = new Ticket({ event_name, venue, date, price, category, available_seats, booked_seats: 0 });
    await newTicket.save();

    res.status(201).json({ message: "Ticket purchased successfully", ticket: newTicket });
  } catch (error) {
    res.status(500).json({ error: "Error purchasing ticket", details: error.message });
  }
};
