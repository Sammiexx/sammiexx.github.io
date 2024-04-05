// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'osenisamuel47@gmail.com',
            pass: 'Ayomide6@'
        }
    });

    // Email content
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: 'osenisamuel47@gmail.com',
        subject: subject,
        html: `<p>You have received a new message from the contact form on your website.</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Subject:</strong> ${subject}</p>
               <p><strong>Message:</strong></p>
               <p>${message}</p>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
