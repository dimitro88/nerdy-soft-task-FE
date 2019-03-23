export const required = value => value ? undefined: "*required";

export const login = value => {
	if (value.length < 3) {
		return 'Login must bo longer than 3';
	}
	return undefined;
};

export const password = value => {
	if(value.length < 4){
		return 'Password must bo longer than 4';
	}
	return undefined;
};

export const url = value => {
	const regexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
	if(!regexp.test(value)){
		return 'Wrong url format';
	}
	return undefined;
};