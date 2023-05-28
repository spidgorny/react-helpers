import {ErrorWithDetails} from './error';

export const fetcher = async (url) => {
	const res = await fetch(url);
	if (!res.ok) {
		let jsonResponse = await res.json();
		let error = new ErrorWithDetails(jsonResponse?.message ?? "An error occurred while fetching the data.", jsonResponse);
		throw error;
	}

	return res.json();
};
