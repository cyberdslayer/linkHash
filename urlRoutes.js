
const express = require('express');
const crypto = require('crypto');
const URL = require('./urlModels.js');

const router = express.Router();

// Hashing function using SHA256 and Base64 encoding
function hashUrl(url) {
    return crypto.createHash('sha256').update(url).digest('base64url').substring(0, 10);
}

// POST route to shorten the URL
router.post('/shorten', async (req, res) => {
    const { originalUrl, maxClicks } = req.body;
    
    console.log('originalUrl:', originalUrl);

    if (!originalUrl) {
        return res.status(400).json({ message: 'Original URL is required' });
    }

    const hashedUrl =  hashUrl(originalUrl);

    console.log('hashedUrl:', hashedUrl);

    try {
        // Checking if the URL already exists
        const urlData = await URL.findOne({ hashedUrl });
        if (!urlData) {
            // Creating and saving a new URL document
          const newurlData = await new URL({
                original_url:originalUrl,
                hashed_url:hashedUrl,
                max_clicks: maxClicks || null
            }).save();
           
            return res.status(200).json({ hashedUrl:`http://localhost:3001/${hashedUrl}`});
        }
         
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// GET route to handle redirect and click tracking
router.get('/:hash', async (req, res) => {
    const { hash } = req.params;
    console.log(req.params);
    try {
        const urlData = await URL.findOne({ hashed_url: hash });

        console.log('urlData:', urlData);

        if (!urlData) {
            return res.status(404).json({ message: 'URL not found' });
        }

        // Checking if URL is expired based on click limit
        if (urlData.max_clicks && urlData.clicks >= urlData.max_clicks) {
            return res.status(403).json({ message: 'This link has expired.' });
        }

        urlData.clicks += 1;
        await urlData.save();

        // Redirecting to the original URL
        res.redirect(urlData.original_url);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
