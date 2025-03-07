const express = require("express");
const { getAllTickets, purchaseTicket } = require("../controllers/ticketController");

const router = express.Router();

router.get("/", getAllTickets);
router.post("/purchase", purchaseTicket);

module.exports = router;
