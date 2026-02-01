require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { connectDatabase } = require('./config/database');
const newsDataRoutes = require('./routes/newsData');
const { loadDataIds, processBatch, getStatus } = require('./services/dataScraper');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/news-data', newsDataRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    scraper: getStatus()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Playliner Data Scraper API',
    version: '1.0.0',
    endpoints: {
      'GET /health': 'Health check',
      'GET /api/news-data': 'Get all news data (paginated)',
      'GET /api/news-data/:id': 'Get single news data by ID',
      'GET /api/news-data/stats/count': 'Get database statistics',
      'GET /api/news-data/scraper/status': 'Get scraper status',
      'POST /api/news-data/scraper/trigger': 'Manually trigger batch processing',
      'POST /api/news-data/scraper/reset': 'Reset scraper to beginning',
      'DELETE /api/news-data/:id': 'Delete news data by ID'
    }
  });
});

// Start server and cron job
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();
    
    // Load IDs from data.json
    loadDataIds();
    
    // Setup cron job
    const cronSchedule = process.env.CRON_SCHEDULE || '*/10 * * * *';
    
    cron.schedule(cronSchedule, () => {
      console.log(`\n⏰ Cron job triggered at ${new Date().toISOString()}`);
      processBatch();
    });
    
    console.log(`📅 Cron job scheduled: ${cronSchedule}`);
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
