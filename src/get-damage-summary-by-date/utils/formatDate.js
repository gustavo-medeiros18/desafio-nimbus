module.exports = function formatDate(dateString) {
  const dateObject = new Date(dateString);

  const year = dateObject.getUTCFullYear();
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getUTCDate()).padStart(2, "0");

  const formattedDateString = `${year}-${month}-${day}`;

  return formattedDateString;
};
