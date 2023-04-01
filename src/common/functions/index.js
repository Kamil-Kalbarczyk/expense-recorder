export const convertTimestampToDate = (timestamp) =>
  new Date(timestamp * 1000).toISOString().slice(0, 10).replace("T", " ");
