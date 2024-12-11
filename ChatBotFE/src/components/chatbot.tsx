import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import axios, { AxiosResponse } from "axios";

export default function Chatbot(props: { baseUrl: string; color?: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<string[]>([]);
	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const toggleChat = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleSend = () => {
		if (input.trim()) {
			setMessages([...messages, input]);
			// make api call here
		}
	};

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	async function onFormSubmit(event) {
		event.preventDefault();
		let responseMessage: string;
		const reqMessage = event.target.chatRequestField.value;
		setInput("");
		// console.log(req.body);

		const response2 = await axios
			.post(
				props.baseUrl,
				{
					message: reqMessage, // Correctly placed payload
					sessionId: "12347",
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			)
			.catch((error) => {
				console.log(error);
				responseMessage = "Client is down. try again";
			});

		if (response2?.data?.success) {
			responseMessage = response2?.data.message;
		} else {
			responseMessage = "An error occured, please try again later";
		}
		setMessages([...messages, `${responseMessage}`]);
	}

	return (
		<div className="chatbot-container">
			{!isOpen && (
				<div
					className={`chatbot-button ${isOpen ? "open" : ""}`}
					onClick={toggleChat}
				>
					💬
				</div>
			)}
			{isOpen && (
				<div className="chatbot-box">
					<div className="chatbot-header">
						<span>ErcasPay Support</span>
						<button
							className="close-btn"
							onClick={toggleChat}
						>
							✖
						</button>
					</div>
					<div className="chatbot-messages">
						{messages.map((msg, index) => (
							<div
								key={index}
								className="chatbot-message"
							>
								{msg}
							</div>
						))}
						<div ref={messagesEndRef}></div>
					</div>
					<form onSubmit={onFormSubmit}>
						<div className="chatbot-input-container">
							<input
								type="text"
								value={input}
								id="chatRequestField"
								onChange={handleInputChange}
								placeholder="Type a message..."
								className="chatbot-input"
							/>
							<button
								onClick={handleSend}
								className="send-btn"
								type="submit"
							>
								Send
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
