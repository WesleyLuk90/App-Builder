import ObjectType from './ObjectType';

const anyObjectType = new ObjectType();

export default class AnyObjectType {
	static getInstance() {
		return anyObjectType;
	}
}
