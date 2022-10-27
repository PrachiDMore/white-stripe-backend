const express = require('express');
const app = express()
const moment = require('moment')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors({
	origin: ['https://whitestripes-tailoring.com', 'https://www.whitestripes-tailoring.com', 'http://localhost:3001', 'http://www.localhost:3001'],
}))

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
		text: `${req.body.name} has shared a query of ${req.body.message}`,
		html: `<!DOCTYPE html>
		<html lang="en">
		
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Test</title>
			<style>
				@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&family=Raleway&display=swap');
		
				* {
					padding: 0;
					margin: 0;
					word-wrap: break-word !important;
				}
		
				.Raleway {
					font-family: 'Raleway', sans-serif;
				}
		
				.Nunito {
					font-family: 'Nunito', sans-serif;
				}
				.flex-center{
					display: flex;
					justify-content: center;
					align-items: center;
				}
				span{
					line-height: 30px;
					word-wrap: break-word;
				}
				.container{
					width: 95%;
				}
			</style>
		</head>
		
		<body>
			
			<div style="background-color: #192637; padding: 7px; color: white;">
				<p class="Raleway" style="text-align: center;">Hello Team</p>
				<h1 class="Nunito" style="text-align: center; margin-bottom: 10px;">New Query for ${req.body.name}</h1>
				<p class="Raleway" style="margin-bottom: 10px; text-align: center;">Contact Details</p>
				<div class="flex-center">
					<div style="background-color: #1D2C43; margin: auto;" class="container flex-center">
						<div style="background-color: #1D2C43; padding: 10px; width: max-content;">
							<div style="display: flex; align-items: center; width: max-content;"><span style="width: 130px; font-weight: bold;" class="Nunito">Name:
								</span> &nbsp; <span class="Raleway">
								${req.body.name}</span>
							</div>
							<div style="display: flex; align-items: center; width: max-content;"><span style="width: 130px; font-weight: bold;" class="Nunito">Email:
								</span> &nbsp; <span class="Raleway">
								${req.body.email}</span>
							</div>
							<div style="display: flex; align-items: center; width: max-content;"><span style="width: 130px; font-weight: bold;" class="Nunito">Message:
								</span> &nbsp;
								<span class="Raleway">${req.body.message}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</body>
		
		</html>`
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
	let dateString = `${moment().format("DD-MMM-YY")}`
	var mailOptions = {
		from: process.env.SMTP_EMAIL,
		to: process.env.SMTP_EMAIL,
		subject: 'Appointment Request',
		text: `${req.body.name} (${req.body.email}) has requested for appointment.`,
		html: `<!DOCTYPE html>
		<html lang="en">
		
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Test</title>
			<style>
				@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&family=Raleway&display=swap');
		
				* {
					padding: 0;
					margin: 0;
					word-wrap: break-word !important;
				}
		
				.Raleway {
					font-family: 'Raleway', sans-serif;
				}
		
				.Nunito {
					font-family: 'Nunito', sans-serif;
				}
				.flex-center{
					display: flex;
					justify-content: center;
					align-items: center;
				}
				span{
					line-height: 30px;
					word-wrap: break-word;
				}
				.container{
					width: 95%;
				}
			</style>
		</head>
		
		<body>
			
			<div style="background-color: #192637; padding: 7px; color: white;">
				<p class="Raleway" style="text-align: center;">Hello Team</p>
				<h1 class="Nunito" style="text-align: center; margin-bottom: 10px;">New Appointment for ${req.body.name}</h1>
				<p class="Raleway" style="margin-bottom: 10px; text-align: center;">Appointment Details</p>
				<div class="flex-center">
					<div style="background-color: #1D2C43; margin: auto;" class="container flex-center">
						<div style="background-color: #1D2C43; padding: 10px; width: max-content;">
							<div style="display: flex; align-items: center; width: max-content;"><span style="width: 130px; font-weight: bold;" class="Nunito">Name:
								</span> &nbsp; <span class="Raleway">
								${req.body.name}</span>
							</div>
							<div style="display: flex; align-items: center; width: max-content;"><span style="width: 130px; font-weight: bold;" class="Nunito">Mobile
									Number: </span>
								&nbsp; <span class="Raleway">${req.body.phonenumber}</span>
							</div>
							<div style="display: flex; align-items: center; width: max-content;"><span style="width: 130px; font-weight: bold;" class="Nunito">Email:
								</span> &nbsp; <span class="Raleway">
								${req.body.email}</span>
							</div>
							<div style="display: flex; align-items: center; width: max-content;"><span style="width: 130px; font-weight: bold;" class="Nunito">Branch:
								</span> &nbsp; <span class="Raleway">
								${req.body.location}</span>
							</div>
							<div style="display: flex; align-items: center; width: max-content;"><span style="width: 130px; font-weight: bold;" class="Nunito">Booked On:
								</span> &nbsp;
								<span class="Raleway">${dateString}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</body>
		
		</html>`
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.send(error);
		} else {
			res.send('Email sent: ' + info.response);
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
		text: `${req.body.name} your appointment request has been recorded. Our team will connect with you as soon as possible`,
		html: `<h1>hi</h1>`
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
