import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

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

			//return result
			setInput("");
		}
	};

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	async function onFormSubmit(event) {
		event.preventDefault();
		const response = await fetch(props.baseUrl);
		const json = await response.json();
		console.log(json);
		const message = json.message;
		// const responseStream = response.body.pipeThrough(new TextDecoderStream());
		// for await (const value of responseStream) {
		// 	console.log(value);
		// }
		setMessages([...messages, `${message}`]);
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
