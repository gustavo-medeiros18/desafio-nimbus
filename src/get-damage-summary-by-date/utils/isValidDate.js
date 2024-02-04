module.exports = function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const [year, month, day] = dateString.split("-").map(Number);
  const dateObject = new Date(year, month - 1, day);

  const yearIsValid = dateObject.getFullYear() === year;
  const monthIsValid = dateObject.getMonth() + 1 === month;
  const dayIsValid = dateObject.getDate() === day;

  return yearIsValid && monthIsValid && dayIsValid;
};
