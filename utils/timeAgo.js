function timeAgo(date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return seconds + " seconds ago";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes + " minutes ago";
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours + " hours ago";
  }

  const days = Math.floor(hours / 24);
  if (days < 2) {
    return days + " day ago";
  }
  if (days < 30) {
    return days + " days ago";
  }

  const months = Math.floor(days / 30);
  if (months < 2) {
    return months + " month ago";
  }
  if (months < 12) {
    return months + " months ago";
  }

  const years = Math.floor(months / 12);
  return years + " years ago";
}

export default timeAgo;
// Example usage
const timestamp = new Date("2023-10-20T12:34:56");
