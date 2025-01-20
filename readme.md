# Natours Web Application

A stunning and feature-rich web application built with **Node.js**, **Express**, and **HTML & CSS** to provide users with an engaging and interactive experience for browsing and booking nature tours.

---

## Features

- **Dynamic Tour Pages**: Detailed and visually appealing pages for each tour with descriptions, images, and booking options.
- **User Authentication**: Secure user signup, login, and logout functionality.
- **Payment Integration**: Seamless payment processing for booking tours.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Interactive Maps**: Integrated map functionality to display tour locations.
- **Review System**: Allows users to leave reviews and ratings for tours.
<!-- - **Admin Dashboard**: Manage users, tours, and bookings. -->

---

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS
- **Database**: MongoDB (Mongoose for ORM)
- **Payment Gateway**: Stripe
- **API**: RESTful API design for scalable architecture
- **Bundler**: Vite
- **Version Control**: Git

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/natours.git
   cd natours
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE=your_database_url
   DATABASE_PASSWORD=your_database_password
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   EMAIL_USERNAME=your_email_username
   EMAIL_PASSWORD=your_email_password
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the application:
   ```bash
   npm start
   ```

5. Access the application in your browser at `http://localhost:3000`.

---

## Project Structure

```
Natours
├── public
│   ├── css
│   ├── img
│   └── bundle.js

│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   └── views
├── .env
├── app.js
├── src
  |── js 
├── package.json
└── server.js
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

Special thanks to Jonas Schmedtmann for inspiration and guidance from his Udemy course on Node.js.

