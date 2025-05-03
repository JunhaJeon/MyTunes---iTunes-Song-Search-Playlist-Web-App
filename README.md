# MyTunes - iTunes Song Search & Playlist Web App
This is a dynamic client-server web application built with Express.js and the iTunes Public API, allowing users to search for songs by title and build a personal playlist. The client UI dynamically renders search results and playlists with persistent storage using LocalStorage.

# Features
Search songs by title using the iTunes API (up to 20 results per query)

Add songs from search results to a custom playlist
 Remove songs from the playlist

Reorder playlist items with up/down arrows

Playlist is saved in client-side LocalStorage, preserved across sessions

Dynamic rendering using JavaScript and DOM manipulation

Clean Express.js server structure with routing and static file serving

# Files
'''
iTunes/
├── public/
│   ├── mytunes.html
│   ├── style.css
│   └── client.js
├── server.js
└──package.json
'''
# Install Command:
npm install

# Launch Command:
node server.js

# TESTING INSTRUCTIONS:
http://localhost:3000/mytunes.html
http://localhost:3000/mytunes
http://localhost:3000/index.html
http://localhost:3000/
http://localhost:3000


# Search & Playlist Behavior
Type a song title and hit Submit or press Enter.

View up to 20 matching songs.

Click ➕ to add a song to your playlist.

Use ➖, 🔼, 🔽 buttons to manage your playlist.

Your playlist is automatically saved in the browser.

# Server Info
Built with Express.js

Uses express.static() to serve client files

Retrieves data from iTunes API

Limits response to 20 songs per query

API calls are server-side (client doesn't talk to iTunes directly)

# School Project
This project was part of my coursework for the "COMP2406 Winter 2025" Web Applications class at Carleton Universiry.

# Contact
For any questions, feel free to reach out via GitHub issues or email.
