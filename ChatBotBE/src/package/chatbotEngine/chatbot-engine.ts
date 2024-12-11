import { IntentFactory } from "./helpers/intent-classifier.factory.ts";
import { IntentDetector } from "./types/intent-detector.type.ts";
import { LogicType } from "./types/logic.type.ts";

interface Context {
	intent: string;
	keypoints?: object;
}

class Session {
	id: string;
	context: Context;
	messages: string[] = [];
	creationTime: Date = new Date();
	endSessionTime: Date;

	constructor(id: string, context: Context = { intent: "" }) {
		this.id = id;
		this.context = context;
	}

	addMessage(message: string) {
		this.messages.push(message);
	}

	endSession() {
		this.endSessionTime = new Date();
		return { success: true, message: "session ended succesfully" };
	}
}
export class ChatEngine {
	intentDetector: IntentDetector;
	private sessions: Map<string, Session>;

	constructor(private readonly name: string) {
		this.name = name;
		this.intentDetector = new IntentFactory().generate();
		this.sessions = new Map();

		setInterval(() => {
			const now = new Date();
			this.sessions.forEach((session, id) => {
				if (now.getTime() - session.endSessionTime.getTime() > 1800000) {
					this.sessions.delete(id);
				}
			});
		}, 60000); // Check every minute
	}

	private initializeSession(sessionId: string) {
		if (!this.sessions.has(sessionId)) {
			this.sessions.set(sessionId, new Session(sessionId));
		}
	}

	respond(sessionId: string = "12345") {
		this.initializeSession(sessionId);
		return `Hey there, ${this.name} speaking. How can I help you?`;
	}

	async generateResponse(req: string, sessionId: string = "12345") {
		this.initializeSession(sessionId);
		const session: Session = this.sessions.get(sessionId);

		if (session) {
			session.addMessage(`User: ${req}`);
			// messages?.push(`User: ${sessionId}`);
			const logic = await this.intentDetector.classify(req);
			if (session.context.intent === "") {
				session.context.intent = logic.intent;
			}
			const response = await this.processLogic(
				session.context.intent,
				req,
				sessionId
			);

			// session.messages?.push(`Bot: ${response}`);
			session.addMessage(`Bot: ${response}`);
			return response;
		}
	}

	private async processLogic(
		intent: string,
		req: string,
		sessionId: string
	): Promise<string> {
		switch (intent) {
			case LogicType.FAQ:
				return this.faqLogic(req, sessionId);
			case LogicType.DEVREQUEST:
				return this.devRequestLogic(req, sessionId);
			case LogicType.QRCODEGENERATION:
				return this.qrCodeLogic(req, sessionId);
			default:
				return this.faqLogic(req, sessionId);
		}
	}

	faqLogic(req: string, sessionId: string) {
		return `I can help you with the following FAQ: ${req}`;
	}

	devRequestLogic(req: string, sessionId: string) {
		return `I can help you with the following developer request: ${req}`;
	}

	qrCodeLogic(req: string, sessionId: string) {
		return `I can help you with the following QR Code request: ${req}`;
	}

	// Retrieve conversation history
	getConversationHistory(sessionId: string): Session | undefined {
		return this.sessions.get(sessionId);
	}
}
