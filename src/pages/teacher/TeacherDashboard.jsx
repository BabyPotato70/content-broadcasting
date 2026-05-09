import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyContent } from '../../services/content.service';
import { DashboardCard, StatusBadge, SkeletonLoader, Button } from '../../components/ui';
import { formatDate } from '../../utils/dateHelpers';
import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

export const TeacherDashboard = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyContent();
        setContent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <SkeletonLoader count={4} />;

  const stats = {
    total: content.length,
    pending: content.filter(c => c.status === 'pending').length,
    approved: content.filter(c => c.status === 'approved').length,
    rejected: content.filter(c => c.status === 'rejected').length,
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <Button onClick={() => navigate('/teacher/upload')}><Plus className="w-4 h-4 mr-2" /> Upload New Content</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard icon={FileText} label="Total Uploaded" value={stats.total} color="primary" />
        <DashboardCard icon={Clock} label="Pending" value={stats.pending} color="yellow" />
        <DashboardCard icon={CheckCircle} label="Approved" value={stats.approved} color="green" />
        <DashboardCard icon={XCircle} label="Rejected" value={stats.rejected} color="red" />
      </div>

      <h2 className="text-xl font-bold mb-4">Recent Content</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-sm font-medium text-gray-600">Title</th>
                <th className="p-4 text-sm font-medium text-gray-600">Subject</th>
                <th className="p-4 text-sm font-medium text-gray-600">Status</th>
                <th className="p-4 text-sm font-medium text-gray-600">Uploaded At</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {content.slice(0, 10).map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{item.title}</td>
                  <td className="p-4 text-sm text-gray-600">{item.subject}</td>
                  <td className="p-4"><StatusBadge status={item.status} /></td>
                  <td className="p-4 text-sm text-gray-600">{formatDate(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};