export const fetcher = async (url) => {
	const res = await fetch(url);
	if (!res.ok) {
		let jsonResponse = await res.json();
		const error = new Error(jsonResponse?.message ?? "An error occurred while fetching the data.");
		error.info = jsonResponse;
		error.status = res.status;
		throw error;
	}

	return res.json();
};
