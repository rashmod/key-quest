import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import path from 'path';

class FileHelper {
	static readFile(...location: string[]) {
		return readFileSync(path.join(__dirname, '..', ...location), 'utf8');
	}

	static writeFile(data: string, ...location: string[]) {
		writeFileSync(path.join(__dirname, '..', ...location), data);
	}

	static deleteFile(...location: string[]) {
		try {
			unlinkSync(path.join(__dirname, '..', ...location));
			console.log('Successfully deleted', location[location.length - 1]);
		} catch (error) {
			console.log('--------------------------------');
			console.log('Could not delete', location[location.length - 1]);
			console.log(error);
			console.log('--------------------------------');
		}
	}
}

export default FileHelper;
