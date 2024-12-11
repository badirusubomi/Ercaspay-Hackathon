import { LogicType } from "../types/logic.type.ts";
import { containerBootstrap } from "@nlpjs/core";
import { Nlp } from "@nlpjs/nlp";
import { IntentDetector } from "../types/intent-detector.type.ts";
import { LangEn } from "@nlpjs/lang-en-min";

const x: string = LogicType.FAQ;

export class NlpClassifier extends IntentDetector {
	container: any;
	nlp: any;
	constructor(container = null, nlp = null) {
		super();
		this.container = container;
		this.nlp = nlp;
		this.setUp();
	}

	public async setUp() {
		this.container = await containerBootstrap();
		this.container.use(Nlp);
		this.container.use(LangEn);

		this.nlp = this.container.get("nlp");
		this.nlp.settings.autoSave = false;
		this.nlp.addLanguage("en");
		this.generateClassifications();
	}

	private async generateClassifications() {
		// Adds the utterances and intents for the FAQ chatPath
		this.nlp.addDocument("en", "What is the pricing?", "chatpath.faq");
		this.nlp.addDocument("en", "How does your service work?", "chatpath.faq");
		this.nlp.addDocument("en", "Tell me about your API.", "chatpath.faq");
		this.nlp.addDocument("en", "Do you have documentation?", "chatpath.faq");
		this.nlp.addDocument("en", "Can I get support?", "chatpath.faq");
		this.nlp.addDocument(
			"en",
			"What payment methods do you support?",
			"chatpath.faq"
		);
		this.nlp.addDocument("en", "Is there a setup fee?", "chatpath.faq");
		this.nlp.addDocument("en", "Do you offer discounts?", "chatpath.faq");
		this.nlp.addDocument("en", "How secure is your service?", "chatpath.faq");
		this.nlp.addDocument(
			"en",
			"Can I use your service internationally?",
			"chatpath.faq"
		);
		this.nlp.addDocument(
			"en",
			"What are your transaction limits?",
			"chatpath.faq"
		);
		this.nlp.addDocument("en", "Do you provide refunds?", "chatpath.faq");
		this.nlp.addDocument(
			"en",
			"What is your uptime guarantee?",
			"chatpath.faq"
		);
		this.nlp.addDocument(
			"en",
			"Do you provide customer support 24/7?",
			"chatpath.faq"
		);
		this.nlp.addDocument("en", "How do I get started?", "chatpath.faq");
		this.nlp.addDocument(
			"en",
			"What currencies do you support?",
			"chatpath.faq"
		);
		this.nlp.addDocument(
			"en",
			"Can I test the service before committing?",
			"chatpath.faq"
		);
		this.nlp.addDocument(
			"en",
			"What industries do you cater to?",
			"chatpath.faq"
		);
		this.nlp.addDocument("en", "Do you have any hidden fees?", "chatpath.faq");
		this.nlp.addDocument(
			"en",
			"How does your fraud detection work?",
			"chatpath.faq"
		);

		// Adds the utterances and intents for the DEVREQUEST chatPath
		this.nlp.addDocument(
			"en",
			"How do I integrate your API?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"I need help with integration.",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"Can you provide a sample code?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"What are the endpoints available?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"How do I authenticate API requests?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"Can you explain the webhook setup?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"What SDKs do you provide?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"How do I handle errors in your API?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"How do I fetch transaction details?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"Can you help me debug API calls?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"Do you have rate limits on API requests?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"What is the format for API responses?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"How do I implement token-based authentication?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"Can I access a sandbox environment?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"How do I update payment details via API?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"How do I verify payment status?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"What kind of logs can I get from your system?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"Can I customize the checkout flow using your API?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"Do you support batch processing via API?",
			"chatpath.devrequest"
		);
		this.nlp.addDocument(
			"en",
			"How do I get real-time transaction notifications?",
			"chatpath.devrequest"
		);

		// Adds the utterances and intents for the QRCODEGENERATION chatPath
		this.nlp.addDocument(
			"en",
			"Generate a QR code for payment.",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"I want to create a QR code.",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"Can you make a QR code for me?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"How do I generate a QR code?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"Create a QR code for this transaction.",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"Can you help with QR code creation?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"I need a QR code for this order.",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"Can you make a dynamic QR code?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"How do I encode payment details into a QR code?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"What format does your QR code support?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"Can you generate a QR code that includes a URL?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"Can I include metadata in a QR code?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"How do I make a QR code for recurring payments?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"I need a QR code for mobile payments.",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"Can you generate a QR code for Bitcoin payments?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"How do I create a QR code with transaction references?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"Can you generate a QR code with a custom logo?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"How do I verify a QR code payment?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"What size should the QR code be for payments?",
			"chatpath.qrcodegeneration"
		);
		this.nlp.addDocument(
			"en",
			"Can I generate a QR code for offline transactions?",
			"chatpath.qrcodegeneration"
		);

		// Train also the NLG (Natural Language Generation) to provide answers
		this.nlp.addAnswer(
			"en",
			"chatpath.faq",
			"Here is the information you need for FAQs."
		);
		this.nlp.addAnswer(
			"en",
			"chatpath.faq",
			"You can find answers to FAQs here."
		);
		this.nlp.addAnswer("en", "chatpath.faq", "Let me help you with your FAQs.");
		this.nlp.addAnswer(
			"en",
			"chatpath.faq",
			"Here are some frequently asked questions."
		);
		this.nlp.addAnswer("en", "chatpath.faq", "Check out these FAQ responses.");

		this.nlp.addAnswer(
			"en",
			"chatpath.devrequest",
			"Here are the details for your developer request."
		);
		this.nlp.addAnswer(
			"en",
			"chatpath.devrequest",
			"This should help with your integration question."
		);
		this.nlp.addAnswer(
			"en",
			"chatpath.devrequest",
			"Let me guide you on this development request."
		);
		this.nlp.addAnswer(
			"en",
			"chatpath.devrequest",
			"Here are some developer resources you might need."
		);
		this.nlp.addAnswer(
			"en",
			"chatpath.devrequest",
			"These steps should help with your developer query."
		);

		this.nlp.addAnswer(
			"en",
			"chatpath.qrcodegeneration",
			"I can help you generate a QR code. What are the details?"
		);
		this.nlp.addAnswer(
			"en",
			"chatpath.qrcodegeneration",
			"Let me assist you with QR code generation."
		);
		this.nlp.addAnswer(
			"en",
			"chatpath.qrcodegeneration",
			"Provide the payment details for the QR code."
		);
		this.nlp.addAnswer(
			"en",
			"chatpath.qrcodegeneration",
			"Generating QR codes is my specialty."
		);
		this.nlp.addAnswer(
			"en",
			"chatpath.qrcodegeneration",
			"I can create a QR code for your transaction. Let me know the specifics."
		);

		// Train the model and process a sample query
		await this.nlp.train();
	}

	public async classify(phrase: string): Promise<any> {
		const response = await this.nlp.process("en", phrase);
		return response;
	}
}
