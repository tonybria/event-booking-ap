const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  event_name: String,
  venue: String,
  date: Date,
  price: Number,
  category: String,
  available_seats: Number,
  booked_seats: Number,
});

const Ticket = mongoose.model("tickets", ticketSchema); // Use exact collection name
module.exports = Ticket;
