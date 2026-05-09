import { mockUsers } from '../data/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Logs in a user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} User data and token
 */
export const login = async ({ email, password }) => {
  await delay(1000);
  const user = mockUsers.find(u => u.email === email);
  
  if (!user || password !== 'password123') {
    throw new Error('Invalid email or password');
  }
  
  const token = btoa(`${email}:mock-jwt-token`);
  localStorage.setItem('cbs_token', token);
  localStorage.setItem('cbs_user', JSON.stringify(user));
  
  return { user, token };
};

/**
 * Logs out the current user
 */
export const logout = async () => {
  await delay(300);
  localStorage.removeItem('cbs_token');
  localStorage.removeItem('cbs_user');
};

/**
 * Gets the current authenticated user from storage
 * @returns {Object|null} User data
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('cbs_user');
  return userStr ? JSON.parse(userStr) : null;
};