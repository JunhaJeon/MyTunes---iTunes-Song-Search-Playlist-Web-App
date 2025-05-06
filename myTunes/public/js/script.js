// Fetch songs from API
function getMusic() {
  let songTitle = document.getElementById('songTitle').value;
  if (!songTitle.trim()) {
      alert('Please enter a song title');
      return;
  }

  fetch(`/music?title=${encodeURIComponent(songTitle)}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('No songs found');
          }
          return response.json();
      })
      .then(data => displayResults(data.results))
      .catch(error => console.error('Error fetching songs:', error));
}

// Display search results in a table
function displayResults(songs) {
  let resultTable = document.getElementById('songResultsBody');
  resultTable.innerHTML = '';

  document.getElementById('resultsHeader').textContent = `Songs matching: ${document.getElementById('songTitle').value}`;

  songs.forEach(song => {
      let row = document.createElement('tr');

      row.innerHTML = `
          <td><button class="add-btn" onclick="addToPlaylist('${song.trackName}', '${song.artistName}', '${song.artworkUrl100}')">➕</button></td>
          <td>${song.trackName}</td>
          <td>${song.artistName}</td>
          <td><img src="${song.artworkUrl100}" width="50"></td>
      `;

      resultTable.appendChild(row);
  });
}

// Add song to the playlist
function addToPlaylist(title, artist, artwork) {
  let playlistTable = document.getElementById('playlistBody');
  let row = document.createElement('tr');

  row.innerHTML = `
      <td>
          <button class="remove-btn" onclick="removeFromPlaylist(this)">➖</button>
          <button class="move-btn" onclick="moveUp(this)">🔼</button>
          <button class="move-btn" onclick="moveDown(this)">🔽</button>
      </td>
      <td>${title}</td>
      <td>${artist}</td>
      <td><img src="${artwork}" width="50"></td>
  `;

  playlistTable.appendChild(row);
  savePlaylist();
}

// Remove song from playlist
function removeFromPlaylist(button) {
  button.closest('tr').remove();
  savePlaylist();
}

// Move song up in playlist
function moveUp(button) {
  let row = button.closest('tr');
  if (row.previousElementSibling) {
      row.parentNode.insertBefore(row, row.previousElementSibling);
      savePlaylist();
  }
}

// Move song down in playlist
function moveDown(button) {
  let row = button.closest('tr');
  if (row.nextElementSibling) {
      row.parentNode.insertBefore(row.nextElementSibling, row);
      savePlaylist();
  }
}

// Save playlist to local storage
function savePlaylist() {
  let playlist = [];
  document.querySelectorAll('#playlistBody tr').forEach(row => {
      let columns = row.children;
      playlist.push({
          title: columns[1].textContent,
          artist: columns[2].textContent,
          artwork: columns[3].querySelector('img').src
      });
  });
  localStorage.setItem('playlist', JSON.stringify(playlist));
}

// Load playlist from local storage
function loadPlaylist() {
  let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
  playlist.forEach(song => addToPlaylist(song.title, song.artist, song.artwork));
}

// Event Listeners
document.getElementById('submit_button').addEventListener('click', getMusic);
document.getElementById('songTitle').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') getMusic();
});

// Load playlist on page load
window.onload = loadPlaylist;
