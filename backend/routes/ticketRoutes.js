const express = require("express");
const { getAllTickets, purchaseTicket } = require("../controllers/ticketController");

const router = express.Router();

router.get("/", getAllTickets); // Corrected route for fetching all tickets
router.post("/purchase", purchaseTicket); // Purchasing tickets

module.exports = router;
