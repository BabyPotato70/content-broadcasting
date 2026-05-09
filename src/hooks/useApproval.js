import { useState, useCallback } from 'react';
import * as approvalService from '../services/approval.service';
import toast from 'react-hot-toast';

export const useApproval = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPending = useCallback(async () => {
    setLoading(true);
    try {
      const result = await approvalService.getPendingContent();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const approve = async (id) => {
    try {
      await approvalService.approveContent(id);
      setData(prev => prev.filter(item => item.id !== id));
      toast.success('Content approved successfully!');
    } catch (err) {
      toast.error('Failed to approve content.');
    }
  };

  const reject = async (id, reason) => {
    try {
      await approvalService.rejectContent(id, reason);
      setData(prev => prev.filter(item => item.id !== id));
      toast.success('Content rejected.');
    } catch (err) {
      toast.error('Failed to reject content.');
    }
  };

  return { data, loading, error, fetchPending, approve, reject };
};