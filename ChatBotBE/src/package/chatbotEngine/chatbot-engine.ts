import { LogicType } from "./types/logic.type";

export class ChatEngine {
	constructor(private readonly name: string) {
		this.name = name;
	}

	respond() {
		return `Hey there, ${this.name} speaking. How can I help you?`;
	}

	generateResponse(req: string) {
		const logic: string = this.decideLogic(req.split(" "));
		switch (logic) {
			case LogicType.FAQ:
				return this.faqLogic();
			case LogicType.FAQ:
				return this.devRequestLogic();
			case LogicType.FAQ:
				return this.qrCodeLogic();
			default:
				break;
		}
		return this.respond();
	}

	decideLogic(tokens: string[]): string {
		return LogicType.FAQ;
	}

	faqLogic() {}

	devRequestLogic() {}

	qrCodeLogic() {}
}
