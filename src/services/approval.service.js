import { mockContent } from '../data/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Gets pending content
 * @returns {Promise<Array>} Pending content
 */
export const getPendingContent = async () => {
  await delay(800);
  return mockContent.filter(c => c.status === 'pending');
};

/**
 * Approves content
 * @param {string} id - Content ID
 * @returns {Promise<Object>} Updated content
 */
export const approveContent = async (id) => {
  await delay(1000);
  const item = mockContent.find(c => c.id === id);
  if (!item) throw new Error('Content not found');
  item.status = 'approved';
  item.updatedAt = new Date().toISOString();
  return item;
};

/**
 * Rejects content
 * @param {string} id - Content ID
 * @param {string} reason - Rejection reason
 * @returns {Promise<Object>} Updated content
 */
export const rejectContent = async (id, reason) => {
  await delay(1000);
  const item = mockContent.find(c => c.id === id);
  if (!item) throw new Error('Content not found');
  item.status = 'rejected';
  item.rejectionReason = reason;
  item.updatedAt = new Date().toISOString();
  return item;
};