export default function generateWordKey(word: string, wordIndex: number) {
	return word + '.' + wordIndex;
}
