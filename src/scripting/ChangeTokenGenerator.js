import _ from 'lodash';

export default class ChangeTokenGenerator {
	constructor() {
		this.lastToken = 1;
	}
	nextToken() {
		return this.lastToken++;
	}

	static newestToken(tokens) {
		return _.max(tokens);
	}
}
