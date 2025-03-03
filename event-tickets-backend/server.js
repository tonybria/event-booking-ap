const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/eventTickets', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//  Schema and Model
const ticketSchema = new mongoose.Schema({
  userId: String,
  eventId: String,
  purchasedAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// Routes
app.post('/purchaseTicket', async (req, res) => {
  const { userId, eventId } = req.body;
  const ticket = new Ticket({ userId, eventId });

  try {
    await ticket.save();
    res.status(201).send('Ticket purchased successfully');
  } catch (error) {
    res.status(400).send('Error purchasing ticket');
  }
});

app.get('/tickets/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const tickets = await Ticket.find({ userId });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).send('Error fetching tickets');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
