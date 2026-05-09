import { useState, useCallback } from 'react';
import * as contentService from '../services/content.service';
import toast from 'react-hot-toast';

export const useContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMyContent = useCallback(async () => {
    setLoading(true);
    try {
      const result = await contentService.getMyContent();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllContent = useCallback(async (filters) => {
    setLoading(true);
    try {
      const result = await contentService.getAllContent(filters);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const upload = async (contentData) => {
    setLoading(true);
    try {
      const result = await contentService.uploadContent(contentData);
      toast.success('Content uploaded successfully!');
      return result;
    } catch (err) {
      toast.error('Upload failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchMyContent, fetchAllContent, upload };
};