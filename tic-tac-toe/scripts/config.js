

function savePlayerConfig(event) {
    // Prevent page reload
    event.preventDefault();

    // Get the entered player name from the form
    const formData = new FormData(event.target);
    const enteredPlayer = formData.get('playername').trim();

    // Check if a valid name is entered
    if (!enteredPlayer) {
        document.getElementById('config-error').textContent = "Please enter a valid name";
        return;
    }

    // Update player data in the players array
    players[editedPlayer - 1].name = enteredPlayer;

    // Update UI with the new player name
    const updatedPlayerData = document.getElementById('player-' + editedPlayer + '-data');
    updatedPlayerData.querySelector('h6').textContent = enteredPlayer;
    event.target.reset();
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    if (modal) {
        modal.hide();
    }
}

// / Event listener for modal show event to capture which player is being edited
const myModalEl = document.getElementById('exampleModal');
myModalEl.addEventListener('show.bs.modal', event => {
    editedPlayer = +event.relatedTarget.dataset.playerid;

    // Get the current player name
    const currentPlayerName = players[editedPlayer - 1].name;

    // Populate the input field with the current name
    const playerNameInput = document.getElementById('floatingInput');
    playerNameInput.value = currentPlayerName;
});
// Event listener for form submission
const playerForm = document.getElementById('playerForm');
if (playerForm) {
    playerForm.addEventListener('submit', savePlayerConfig);
}
