export const isOlderThan3Months = (date: Date | string): boolean => {
	const inputDate = typeof date === "string" ? new Date(date) : date;
	const now = new Date();
	const threeMonthsAgo = new Date();
	threeMonthsAgo.setMonth(now.getMonth() - 3);

	return inputDate < threeMonthsAgo;
};
