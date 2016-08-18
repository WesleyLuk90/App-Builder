import _ from 'lodash';

export default class ChangeTokenGenerator {
	constructor() {
		this.lastToken = 1;
	}
	nextToken() {
		return this.lastToken++;
	}

	static tokensEqual(token1, token2) {
		if (token1 === token2) {
			return true;
		}
		if (Array.isArray(token1) && Array.isArray(token2)) {
			return token1.every((t, i) => token2[i] === t);
		}
		return false;
	}
}
