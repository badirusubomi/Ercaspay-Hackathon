import "./App.css";
import Chatbot from "./components/chatbot";

function App() {
	return (
		<>
			<Chatbot baseUrl="http://localhost:3000/chat" />
		</>
	);
}

export default App;
