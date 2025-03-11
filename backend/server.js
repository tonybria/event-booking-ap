const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
<<<<<<< HEAD
const Event = require("./models/Event"); // ✅ Import Event model
=======
const Event = require("./models/Event"); 

>>>>>>> Benny

const ticketRoutes = require("./routes/ticketRoutes");
const eventRoutes = require("./routes/eventRoutes"); // Import event routes
const Ticket = require("./models/Ticket");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: "ticket_booking" 
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));
<<<<<<< HEAD

app.use("/api/tickets", ticketRoutes);
app.use("/api/events", eventRoutes); // ✅ Add event routes
app.use("/api/users", userRoutes);
=======

app.use("/api/tickets", ticketRoutes);
app.use("/api/events", eventRoutes); // 
app.use("/api/users", userRoutes);

>>>>>>> Benny

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

<<<<<<< HEAD

=======
app.use("/api/auth", authRoutes);
>>>>>>> Benny

//test fetching data from database

// async function fetchTickets() {
//   const tickets = await Ticket.find();
//   console.log(tickets);
// }

// fetchTickets();

// async function fetchEvents() {
//   const events = await Event.find();
//   console.log(events);
// }

// fetchEvents();

