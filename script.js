function updateDateTime() {
  const now = new Date();

  const options = {
    year: 'numeric',
    month: 'long',   // October
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  const formatted = now.toLocaleString('en-US', options);

  document.getElementById('datetime').textContent = formatted;
}

setInterval(updateDateTime, 1000);

updateDateTime();
