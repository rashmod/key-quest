import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

class FileHelper {
	static readFile(...location: string[]) {
		return readFileSync(path.join(__dirname, ...location), 'utf8');
	}

	static writeFile(data: string, ...location: string[]) {
		writeFileSync(path.join(__dirname, ...location), data);
	}
}

export default FileHelper;
