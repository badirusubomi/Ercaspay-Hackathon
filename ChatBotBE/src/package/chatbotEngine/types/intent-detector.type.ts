export abstract class IntentDetector {
	abstract classify(phrase: string): any;
	abstract setUp();
}
