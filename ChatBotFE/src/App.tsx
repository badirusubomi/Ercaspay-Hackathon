import "./App.css";
import Chatbot from "./components/chatbot";

function App() {
	return (
		<>
			<Chatbot baseUrl="https://catfact.ninja/fact" />
		</>
	);
}

export default App;
