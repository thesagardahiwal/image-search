import Search from '../models/Search.js';
import { sendSuccess, sendError } from '../utils/responseFormat.js';

export const getSearchHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const history = await Search.find({ userId })
      .sort({ timestamp: -1 })
      .limit(20)
      .select('term timestamp')
      .lean();

    sendSuccess(res, {
      data: history,
      message: 'Search history retrieved successfully'
    });
  } catch (error) {
    console.error('History fetch error:', error);
    sendError(res, {
      error: 'Failed to fetch search history',
      message: 'Unable to retrieve your search history'
    });
  }
};

export const clearSearchHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    
    await Search.deleteMany({ userId });
    
    sendSuccess(res, {
      message: 'Search history cleared successfully'
    });
  } catch (error) {
    console.error('Clear history error:', error);
    sendError(res, {
      error: 'Failed to clear search history',
      message: 'Unable to clear your search history'
    });
  }
};