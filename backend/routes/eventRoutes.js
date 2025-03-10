const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

router.get("/", eventController.getAllEvents); // ✅ Get all events
router.get("/:eventId", eventController.getEventById);
router.post("/", eventController.createEvent); // ✅ Add this
router.put("/:eventId", eventController.updateEvent);
router.delete("/:eventId", eventController.deleteEvent);
router.post("/:eventId/purchase", eventController.purchaseTicket);

module.exports = router;
