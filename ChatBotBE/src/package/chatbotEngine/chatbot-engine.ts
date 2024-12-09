export class ChatEngine {
	constructor(private readonly name: string) {
		this.name = name;
	}

	respond() {
		return `Hey there, ${this.name} speaking. How can I help you?`;
	}

	generateResponse(req: string) {
		return this.respond();
	}
}
