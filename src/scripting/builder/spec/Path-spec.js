import Path from '../Path';

describe('Path', () => {
	it('should create child paths', () => {
		const rootPath = Path.rootPath();
		const child = rootPath.createChild('first-child');

		expect(child.equals(Path.newPath(['first-child']))).toBe(true);

		expect(child.isDescendantOf(rootPath)).toBe(true);

		expect(rootPath.isAncestorOf(child)).toBe(true);
	});

	it('should output a json object', () => {
		const path = Path.newPath(['hello', 'world']);

		expect(path.toJSONObject()).toEqual(['hello', 'world']);
	});

	it('should convert to a name', () => {
		const path = Path.newPath(['hello', 'world']);

		expect(path.toName()).toEqual(['hello', 'world']);
	});

	it('should get the parent path', () => {
		const path = Path.newPath(['hello', 'world']);

		expect(path.getParentPath().equals(Path.newPath(['hello']))).toBe(true);
	});

	it('should count the ancestors', () => {
		const myPath = Path.newPath(['someChild', 'path']);
		const ancestor = Path.newPath(['someChild']);

		expect(myPath.getAncestorDistance(ancestor)).toEqual(1);
	});
});
