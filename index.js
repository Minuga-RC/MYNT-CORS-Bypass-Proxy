import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';  // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Use cors middleware to allow all origins
app.use(cors());

app.use('/proxy', async (req, res) => {
    const url = req.query.url; // Get the URL from the query parameter
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Set CORS headers manually if needed
        res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow methods
        res.header('Access-Control-Allow-Headers', 'Content-Type'); // Allow headers

        res.json(data); // Send back the data
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
