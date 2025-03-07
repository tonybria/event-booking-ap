# Event Booking App

## Overview
The Event Booking App is a mobile application built using React Native that allows users to browse events, view event details, purchase tickets, and manage their booked tickets. The app integrates with a backend to handle user authentication, event data, ticket purchases.

## Features
- **Event Listings**: Browse a list of upcoming events.
- **Event Details**: View detailed information about each event.
- **Ticket Booking**: Purchase tickets securely within the app.
- **My Tickets**: View and manage purchased tickets.
-

## Technologies Used
- **Frontend**: React Native
- **Backend**: Node.js with Express
- **Database**: MongoDB (to store event details, user data, and purchased tickets)
- **Authentication**: Firebase Auth / Custom JWT Auth
- **Payment Integration**: Stripe / PayPal (for secure transactions)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- React Native CLI / Expo CLI
- MongoDB (if running the backend locally)
- Android Studio / Xcode (for emulators)

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/tonybria/event-booking-ap
   cd event-booking-ap
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file and configure required API keys, database URIs, and authentication settings.

4. **Start the Backend** (if applicable)
   ```bash
   cd backend
   npm install
   npm start
   ```

5. **Run the App**
   ```bash
   npx react-native run-android  # For Android
   npx react-native run-ios      # For iOS
   ```

## API Endpoints
| Method | Endpoint              | Description               |
|--------|----------------------|---------------------------|
| GET    | /api/events          | Fetch all events         |
| GET    | /api/events/:id      | Get details of an event  |
| POST   | /api/tickets         | Purchase a ticket       |
| GET    | /api/tickets/:userId | Get user tickets        |

## Future Enhancements
- Implement social media login.
- Introduce AI-based event recommendations.
- Add a QR-based ticket scanning system.
- Enable multi-language support.

## Contributing
Pull requests are welcome! Please follow the contribution guidelines and ensure your code follows the project's coding standards.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, reach out at [code brewers@gmail.com]

## Author
CODE BREWERS:TONY KIPTOLE,JOB SAMUEL,BENNY BERUR,JIMMY MAKUMI.

