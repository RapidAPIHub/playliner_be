const express = require('express');
const router = express.Router();
const NewsData = require('../models/NewsData');
const { getStatus, processBatch, resetProcessing } = require('../services/dataScraper');

/**
 * GET /api/news-data
 * Get all news data with pagination
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      NewsData.find({})
        .sort({ id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      NewsData.countDocuments({})
    ]);

    res.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/news-data/:id
 * Get a single news data by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const newsId = parseInt(req.params.id);
    const data = await NewsData.findOne({ id: newsId }).lean();

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'News data not found'
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/news-data/stats/count
 * Get count of stored news data
 */
router.get('/stats/count', async (req, res) => {
  try {
    const total = await NewsData.countDocuments({});
    const withVersionData = await NewsData.countDocuments({ versionData: { $ne: null } });
    const withFullData = await NewsData.countDocuments({ fullData: { $ne: null } });

    res.json({
      success: true,
      stats: {
        total,
        withVersionData,
        withFullData
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/news-data/scraper/status
 * Get current scraper status
 */
router.get('/scraper/status', async (req, res) => {
  try {
    const status = getStatus();
    const dbCount = await NewsData.countDocuments({});
    
    res.json({
      success: true,
      status: {
        ...status,
        storedInDatabase: dbCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/news-data/scraper/trigger
 * Manually trigger a batch processing
 */
router.post('/scraper/trigger', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Batch processing triggered'
    });
    
    // Run in background
    processBatch();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/news-data/scraper/reset
 * Reset the scraper to start from beginning
 */
router.post('/scraper/reset', async (req, res) => {
  try {
    resetProcessing();
    res.json({
      success: true,
      message: 'Scraper reset to beginning'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/news-data/:id
 * Delete a single news data by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const newsId = parseInt(req.params.id);
    const result = await NewsData.findOneAndDelete({ id: newsId });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'News data not found'
      });
    }

    res.json({
      success: true,
      message: `Deleted news data with ID: ${newsId}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
