const formatTime = (date) => {
  return date.toLocaleTimeString();
};
// The custom helper 'format_date' takes in a timestamp
const formatDate = (date) => {
  // Using JavaScript Date methods, we get and format the month, date, and year
  // We need to add one to the month since it is returned as a zero-based value
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
    // We add five years to the 'year' value to calculate the end date
    new Date(date).getFullYear() + 5
  }`;
};
const getRandom = () => {
  const randomNum = Math.random();

  // Return a random emoji
  if (randomNum > 0.7) {
    return `<span for="img" aria-label="lightbulb">💡</span>`;
  } else if (randomNum > 0.4) {
    return `<span for="img" aria-label="laptop">💻</span>`;
  } else {
    return `<span for="img" aria-label="gear">⚙️</span>`;
  }
};

module.exports = { formatTime, formatDate, getRandom };
