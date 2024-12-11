import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";
import { ChatEngine } from "./package/chatbotEngine/chatbot-engine.ts";

env.config();

const app = express();
const port = process.env.SERVER_PORT ?? 3000;
const chatBot = new ChatEngine("ErcasPay Chatbot");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
	console.log(`Method: ${req.method}\n Origin: ${req.hostname}`);
	next();
	return;
});
app.use(cors());
// Middleware for rate limiting
const rateLimiter = (req, res, next) => {
	const rateLimitWindow = 60 * 1000; // 1 minute in milliseconds
	const maxRequests = 100; // Maximum number of requests per window
	const clientIp = req.ip; // Identifying clients by their IP addresses

	if (!global.rateLimiters) {
		global.rateLimiters = new Map(); // Create an in-memory store for rate limits
	}

	const currentTime = Date.now();

	// Initialize rate limiter for the client if not already present
	if (!global.rateLimiters.has(clientIp)) {
		global.rateLimiters.set(clientIp, []);
	}

	const requestTimestamps = global.rateLimiters.get(clientIp);

	// Remove timestamps older than the rate limit window
	while (
		requestTimestamps.length > 0 &&
		requestTimestamps[0] <= currentTime - rateLimitWindow
	) {
		requestTimestamps.shift();
	}

	// Check if the number of requests exceeds the limit
	if (requestTimestamps.length >= maxRequests) {
		return res.status(429).json({
			message: "Too many requests. Please try again later.",
		});
	}
	// Record the current request
	requestTimestamps.push(currentTime);

	next();
};

app.use(rateLimiter);

app.get("/health", async (req, res) => {
	res.json({ success: true, status: 200, message: "Chatbot Server running" });
});

app.post("/chat", async (req, res) => {
	try {
		const message = await chatBot.generateResponse(
			req.body.message,
			req.body.sessionId
		);
		res.json({ success: true, message: message, status: 200 });
	} catch (e) {
		console.log(e);
		res.json({
			success: false,
			message: "An error occurred during request. Please try again soon",
			status: 500,
		});
	}
});

app.listen(port, () => {
	console.log(`Chatbot Server is running at http://localhost:${port}`);
});
