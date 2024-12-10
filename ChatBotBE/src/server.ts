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
app.use((req, res, next) => {
	console.log(`Method: ${req.method}\n Body: ${req.body}`);
	next();
	return;
});
app.use(cors());

app.get("/chat", async (req, res) => {
	const message = await chatBot.generateResponse(req.body.message);
	res.send({ message: message });
});

app.post("/chat", async (req, res) => {
	const message = await chatBot.generateResponse(req.body.message);
	res.send({ message: message });
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
