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

app.get("/health", async (req, res) => {
	res.json({ success: true, status: 200, message: "Chatbot Server running" });
});

app.post("/chat", async (req, res) => {
	try {
		const message = await chatBot.generateResponse(req.body.message);
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
