const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Purchase a ticket
router.post('/purchaseTicket', ticketController.purchaseTicket);

// Get tickets by user ID
router.get('/tickets/:userId', ticketController.getTicketsByUserId);

// Get all tickets
router.get('/tickets', ticketController.getAllTickets);

// Get a single ticket by ID
router.get('/ticket/:ticketId', ticketController.getTicketById);

module.exports = router;