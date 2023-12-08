let username = document.querySelector("#user_entry")
username.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
      document.querySelector("#UserModal").classList.add("hidden")
  }
});
