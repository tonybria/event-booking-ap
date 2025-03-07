const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  event_name: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  available_seats: { type: Number, required: true, default: 0 },
  booked_seats: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model("Ticket", TicketSchema);
