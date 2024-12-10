import { LogicType } from "./types/logic.type.ts";

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
				return this.faqLogic(req);
			case LogicType.DEVREQUEST:
				return this.devRequestLogic(req);
			case LogicType.QRCODEGENERATION:
				return this.qrCodeLogic(req);
			default:
				break;
		}
		return this.respond();
	}

	decideLogic(tokens: string[]): string {
		return LogicType.FAQ;
	}

	faqLogic(req: string) {
		return `I can help you with the following FAQ:  ${req}`;
	}

	devRequestLogic(req: string) {
		return `I can help you with the following dev request:  ${req}`;
	}

	qrCodeLogic(req: string) {
		return `I can help you with the following qrCode:  ${req}`;
	}
}
