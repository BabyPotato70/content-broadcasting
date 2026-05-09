import { useEffect } from 'react';
import { useContent } from '../../hooks/useContent';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { formatDate, getScheduleStatus } from '../../utils/dateHelpers';
import { useNavigate } from 'react-router-dom';
import { Button, SkeletonLoader } from '../../components/ui';
import { AlertCircle, Plus } from 'lucide-react';

export const MyContent = () => {
  const { data, loading, fetchMyContent } = useContent();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyContent();
  }, [fetchMyContent]);

  if (loading) return <SkeletonLoader count={4} />;

  if (data.length === 0) {
    return <EmptyState title="No Content" description="You haven't uploaded any content yet." actionLabel="Upload Now" onAction={() => navigate('/teacher/upload')} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Content</h1>
        <Button onClick={() => navigate('/teacher/upload')} size="sm"><Plus className="w-4 h-4 mr-2" /> Upload</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden border hover:shadow-md transition-shadow">
            <img src={item.fileUrl} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <StatusBadge status={item.status} />
              </div>
              <p className="text-sm text-gray-500 mb-3">Subject: {item.subject}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Starts: {formatDate(item.startTime)}</span>
                <StatusBadge status={getScheduleStatus(item.startTime, item.endTime)} />
              </div>
              
              {item.status === 'rejected' && item.rejectionReason && (
                <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-md flex items-start">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-red-700">Rejection Reason:</p>
                    <p className="text-xs text-red-600 mt-1">{item.rejectionReason}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};