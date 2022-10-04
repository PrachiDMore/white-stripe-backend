const express = require('express');
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors');
 
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: process.env.SMTP_EMAIL,
		pass: process.env.SMTP_PASSWORD
	}
}));

app.get('/', (req, res) => {
	res.send('hello world')
})

app.post('/self-contact', (req, res) => {
	var mailOptions = {
		from: process.env.SMTP_EMAIL,
		to: process.env.SMTP_EMAIL,
		subject: 'Message Recieved',
		text: `${req.body.name} has shared a query of ${req.body.message}`
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.json(error)
		} else {
			res.send('Email sent: ' + info.response);
		}
	});
})

app.post('/self-appointment', (req, res) => {
	var mailOptions = {
		from: process.env.SMTP_EMAIL,
		to: process.env.SMTP_EMAIL,
		subject: 'Appointment Request',
		text: `${req.body.name} (${req.body.email}) has requested for appointment.`
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
})

app.post('/user-contact', (req, res) => {
	var mailOptions = {
		from: process.env.SMTP_EMAIL,
		to: req.body.email,
		subject: 'Response Recorded',
		text: `${req.body.name} your response has been recorded. Our team will connect you as soon as possible.`
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
})

app.post('/user-appointment', (req, res) => {
	var mailOptions = {
		from: process.env.SMTP_EMAIL,
		to: req.body.email,
		subject: 'Appointment request recorded',
		text: `${req.body.name} your appointment request has been recorded. Our team will connect with you as soon as possible`
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
})


app.listen('3001', () => {
	console.log('White-Stripe Backend started on port 3001')
})