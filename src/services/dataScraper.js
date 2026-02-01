const fs = require('fs');
const path = require('path');
const NewsData = require('../models/NewsData');
const { fetchVersionData, fetchFullData, delay } = require('./playlinerApi');

// Track processing state
let currentIndex = 0;
let isProcessing = false;
let allIds = [];

/**
 * Load IDs from data.json file
 */
const loadDataIds = () => {
  try {
    const dataPath = path.join(__dirname, '../../data.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(rawData);
    
    if (jsonData.success && Array.isArray(jsonData.data)) {
      allIds = jsonData.data.map(item => item.id);
      console.log(`📋 Loaded ${allIds.length} IDs from data.json`);
    }
  } catch (error) {
    console.error('❌ Error loading data.json:', error.message);
    allIds = [];
  }
};

/**
 * Process a batch of IDs
 */
const processBatch = async () => {
  if (isProcessing) {
    console.log('⏳ Previous batch still processing, skipping...');
    return;
  }

  if (allIds.length === 0) {
    loadDataIds();
    if (allIds.length === 0) {
      console.log('⚠️ No IDs to process');
      return;
    }
  }

  isProcessing = true;
  const batchSize = parseInt(process.env.BATCH_SIZE) || 10;
  const apiDelay = parseInt(process.env.API_DELAY) || 1000;
  
  console.log(`\n🚀 Starting batch processing from index ${currentIndex}`);
  
  let processedCount = 0;
  
  while (processedCount < batchSize && currentIndex < allIds.length) {
    const newsId = allIds[currentIndex];
    
    try {
      // Check if already exists in database
      const existing = await NewsData.findOne({ id: newsId });
      
      if (existing && existing.versionData && existing.fullData) {
        console.log(`⏭️ ID ${newsId} already exists, skipping...`);
        currentIndex++;
        continue;
      }

      console.log(`📥 Fetching data for ID: ${newsId} (${currentIndex + 1}/${allIds.length})`);
      
      // Fetch both APIs
      const [versionData, fullData] = await Promise.all([
        fetchVersionData(newsId),
        fetchFullData(newsId)
      ]);

      // Save or update in database
      await NewsData.findOneAndUpdate(
        { id: newsId },
        {
          id: newsId,
          versionData: versionData,
          fullData: fullData,
          fetchedAt: new Date(),
          updatedAt: new Date()
        },
        { upsert: true, new: true }
      );

      console.log(`✅ Saved data for ID: ${newsId}`);
      
      processedCount++;
      currentIndex++;
      
      // Delay between API calls to avoid rate limiting
      if (processedCount < batchSize && currentIndex < allIds.length) {
        await delay(apiDelay);
      }
      
    } catch (error) {
      console.error(`❌ Error processing ID ${newsId}:`, error.message);
      currentIndex++;
    }
  }

  // Reset index if we've processed all IDs
  if (currentIndex >= allIds.length) {
    console.log('🎉 Completed processing all IDs, resetting to start');
    currentIndex = 0;
  }

  isProcessing = false;
  console.log(`✅ Batch completed. Processed ${processedCount} items.\n`);
};

/**
 * Get current processing status
 */
const getStatus = () => ({
  totalIds: allIds.length,
  currentIndex,
  isProcessing,
  progress: allIds.length > 0 ? ((currentIndex / allIds.length) * 100).toFixed(2) + '%' : '0%'
});

/**
 * Reset processing state
 */
const resetProcessing = () => {
  currentIndex = 0;
  isProcessing = false;
  allIds = [];
  loadDataIds();
};

module.exports = {
  loadDataIds,
  processBatch,
  getStatus,
  resetProcessing
};
