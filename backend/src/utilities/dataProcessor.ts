import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

function processData(data: string): string {
	return data
		.split('\n')
		.map((x) => x.split('\t')[0])
		.join('\n');
}

function readAndWriteData() {
	const data = readFileSync(
		path.join(__dirname, 'inputs', 'word_frequency.txt'),
		'utf8'
	);
	const cleanedData = processData(data);
	writeFileSync(path.join(__dirname, 'inputs', 'words.txt'), cleanedData);
}

export default readAndWriteData;
