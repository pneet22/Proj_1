// const http = require('http');

// const app = require('./app'); 



// const PORT = process.env.PORT || 3000;

// const server = http.createServer(app);

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectToDB from './db/db.js';

const PORT = process.env.PORT || 3000;

// Create a function to start the application
const startServer = async () => {
	try {
		// 1. Use 'await' to ensure the DB connects before proceeding
		try {
			await connectToDB();
		} catch (err) {
			console.warn('Continuing without DB connection for now. Set DB_CONNECT to enable DB.');
		}

		// 2. Start the Express server
		app.listen(PORT, () => {
			console.log(`🚀 Server is running and listening on port ${PORT}`);
		});

	} catch (error) {
		console.error("❌ Failed to start the server");
		console.error(error);
		process.exit(1); // Exit the application with an error code
	}
};

// Call the function to run the whole application
startServer();

