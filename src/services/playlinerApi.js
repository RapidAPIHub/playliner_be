const axios = require('axios');

const BASE_URL = 'https://backend.playliner.com/api/news';

const getHeaders = () => ({
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
  'authorization': `Bearer ${process.env.BEARER_TOKEN}`,
  'content-type': 'application/json',
  'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'Referer': 'https://saas.playliner.com/'
});

/**
 * Fetch version data for a news item
 * @param {number} newsId - The news ID to fetch
 * @returns {Promise<object|null>} The version data or null if failed
 */
const fetchVersionData = async (newsId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/getVersions`,
      { newsId, lang: 'en' },
      { headers: getHeaders() }
    );
    
    if (response.data && response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error(`❌ Error fetching version data for newsId ${newsId}:`, error.message);
    return null;
  }
};

/**
 * Fetch full data for a news item
 * @param {number} newsId - The news ID to fetch
 * @returns {Promise<object|null>} The full data or null if failed
 */
const fetchFullData = async (newsId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/getFull`,
      { newsId, lang: 'en' },
      { headers: getHeaders() }
    );
    
    if (response.data && response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error(`❌ Error fetching full data for newsId ${newsId}:`, error.message);
    return null;
  }
};

/**
 * Helper function to delay execution
 * @param {number} ms - Milliseconds to delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  fetchVersionData,
  fetchFullData,
  delay
};
