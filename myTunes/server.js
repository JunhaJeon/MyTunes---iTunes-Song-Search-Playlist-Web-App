const express = require('express'); // Express framework
const https = require('https'); // Use HTTPS for iTunes API
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware: Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle multiple routes for the same page
const serveMyTunes = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
};

app.get(['/mytunes.html', '/mytunes', '/index.html', '/', ''], serveMyTunes);

// API route to fetch music from iTunes
app.get('/music', (req, res) => {
    let title = req.query.title;
    if (!title) {
        return res.status(400).json({ message: 'Please enter a song title' });
    }

    let formattedTitle = encodeURIComponent(title);
    let options = {
        hostname: 'itunes.apple.com',
        path: `/search?term=${formattedTitle}&entity=musicTrack&limit=20`,
        method: 'GET',
    };

    const apiRequest = https.request(options, (apiResponse) => {
        let songData = '';

        apiResponse.on('data', (chunk) => {
            songData += chunk;
        });

        apiResponse.on('end', () => {
            try {
                let jsonData = JSON.parse(songData);
                if (jsonData.results.length === 0) {
                    res.status(404).json({ message: 'No songs found' });
                } else {
                    res.json(jsonData);
                }
            } catch (error) {
                res.status(500).json({ message: 'Error processing data' });
            }
        });
    });

    apiRequest.on('error', (error) => {
        res.status(500).json({ message: 'Error fetching data' });
    });

    apiRequest.end();
});

// Start server
app.listen(PORT, (err) => {
    if (err) console.log(err);
    else {
        console.log(`Server listening on port: ${PORT}`);
        console.log('To Test:');
        console.log(`http://localhost:${PORT}/mytunes.html`);
        console.log(`http://localhost:${PORT}/mytunes`);
        console.log(`http://localhost:${PORT}/index.html`);
        console.log(`http://localhost:${PORT}/`);
        console.log(`http://localhost:${PORT}`);
    }
});
