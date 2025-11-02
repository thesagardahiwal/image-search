import axios from 'axios';
import Search from '../models/Search.js';
import { sendSuccess, sendError } from '../utils/responseFormat.js';

export const searchImages = async (req, res) => {
  try {
    const { term } = req.body;
    const userId = req.user._id;

    // Save search to database
    const searchRecord = new Search({
      userId,
      term
    });
    await searchRecord.save();

    // Fetch images from Unsplash
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: term,
        per_page: 20,
        client_id: process.env.UNSPLASH_ACCESS_KEY
      },
      timeout: 10000
    });

    const searchResponse = {
      term,
      results: response.data.results,
      total: response.data.total
    };

    sendSuccess(res, {
      data: searchResponse,
      message: `Found ${response.data.total} images for "${term}"`
    });
  } catch (error) {
    console.error('Search error:', error);
    
    if (error.response?.status === 401) {
      sendError(res, {
        error: 'Unsplash API authentication failed',
        message: 'Please check your Unsplash API key',
        status: 500
      });
    } else if (error.code === 'ECONNABORTED') {
      sendError(res, {
        error: 'Request timeout',
        message: 'Search request timed out. Please try again.',
        status: 408
      });
    } else {
      sendError(res, {
        error: 'Search failed',
        message: 'Unable to search images. Please try again.',
        status: 500
      });
    }
  }
};

export const getTopSearches = async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 }
        }
      },
      { 
        $match: { 
          count: { $gte: 1 } 
        } 
      },
      { 
        $sort: { 
          count: -1 
        } 
      },
      { 
        $limit: 5 
      },
      {
        $project: {
          _id: 1,
          count: 1
        }
      }
    ]);

    sendSuccess(res, {
      data: topSearches,
      message: 'Top searches retrieved successfully'
    });
  } catch (error) {
    console.error('Top searches error:', error);
    sendError(res, {
      error: 'Failed to fetch top searches',
      message: 'Unable to retrieve top searches'
    });
  }
};