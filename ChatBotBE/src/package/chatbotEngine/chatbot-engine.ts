import { IntentFactory } from "./helpers/intent-classifier.factory.ts";
import { IntentDetector } from "./types/intent-detector.type.ts";
import { LogicType } from "./types/logic.type.ts";

export class ChatEngine {
	intentDetector: IntentDetector;
	constructor(private readonly name: string) {
		this.name = name;
		this.intentDetector = new IntentFactory().generate();
	}

	respond() {
		return `Hey there, ${this.name} speaking. How can I help you?`;
	}

	async generateResponse(req: string) {
		const logic = await this.intentDetector.classify(req);

		switch (logic.intent) {
			case LogicType.FAQ:
				return this.faqLogic(req);
			case LogicType.DEVREQUEST:
				return this.devRequestLogic(req);
			case LogicType.QRCODEGENERATION:
				return this.qrCodeLogic(req);
			default:
				return this.faqLogic(req);
		}
	}

	faqLogic(req: string) {
		return `I can help you with the following FAQ: ${req}`;
	}

	devRequestLogic(req: string) {
		return `I can help you with the following developer request: ${req}`;
	}

	qrCodeLogic(req: string) {
		return `I can help you with the following QR Code request: ${req}`;
	}
}
