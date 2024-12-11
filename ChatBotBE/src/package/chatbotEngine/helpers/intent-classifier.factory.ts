import env from "dotenv";
import { IntentDetector } from "../types/intent-detector.type.ts";
import { NlpClassifier } from "./nlp.classifier.ts";

env.config();

export class IntentFactory {
	generate() {
		let choice: IntentDetector;
		switch (process.env.INTENT_CLASSIFIER.toString().toLowerCase()) {
			case "nlp":
				choice = new NlpClassifier();
				break;

			case "default":
				choice = new NlpClassifier();
				break;

			default:
				choice = new NlpClassifier();
				break;
		}
		return choice;
	}
}
