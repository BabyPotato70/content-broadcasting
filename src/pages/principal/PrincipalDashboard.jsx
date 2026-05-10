import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllContent } from "../../services/content.service";
import {
  approveContent,
  getPendingContent,
} from "../../services/approval.service";
import {
  DashboardCard,
  StatusBadge,
  SkeletonLoader,
  Button,
} from "../../components/ui";
import { formatDate } from "../../utils/dateHelpers";
import { FileText, Clock, CheckCircle, XCircle, Check } from "lucide-react";
import toast from "react-hot-toast";

export const PrincipalDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [pendingList, setPendingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllContent();
        const pendingData = await getPendingContent();

        setStats({
          total: allData.length,
          pending: allData.filter((c) => c.status === "pending").length,
          approved: allData.filter((c) => c.status === "approved").length,
          rejected: allData.filter((c) => c.status === "rejected").length,
        });

        setPendingList(pendingData.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleQuickApprove = async (id) => {
    try {
      await approveContent(id);
      toast.success("Content approved successfully!");
      setPendingList((prev) => prev.filter((item) => item.id !== id));
      setStats((prev) => ({
        ...prev,
        pending: prev.pending - 1,
        approved: prev.approved + 1,
      }));
    } catch (err) {
      toast.error("Failed to approve content.");
    }
  };

  if (loading) return <SkeletonLoader count={4} />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Principal Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          icon={FileText}
          label="Total Content"
          value={stats.total}
          color="primary"
        />
        <DashboardCard
          icon={Clock}
          label="Pending"
          value={stats.pending}
          color="yellow"
        />
        <DashboardCard
          icon={CheckCircle}
          label="Approved"
          value={stats.approved}
          color="green"
        />
        <DashboardCard
          icon={XCircle}
          label="Rejected"
          value={stats.rejected}
          color="red"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Pending Approvals</h2>
        <Link
          to="/principal/pending"
          className="text-primary-600 hover:underline text-sm font-medium"
        >
          View All
        </Link>
      </div>

      {pendingList.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-sm text-center text-gray-500">
          All content has been reviewed!
        </div>
      ) : (
        <div className="space-y-4">
          {pendingList.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-start"
            >
              <img
                src={item.fileUrl}
                alt=""
                className="w-full md:w-32 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  By {item.teacherName} • {item.subject}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Submitted: {formatDate(item.createdAt)}
                </p>
              </div>
              <div className="flex md:flex-col gap-2 w-full md:w-auto">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 md:w-full"
                  onClick={() => handleQuickApprove(item.id)}
                >
                  <Check className="w-4 h-4 mr-2" /> Approve
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="flex-1 md:w-full"
                  onClick={() => navigate("/principal/pending")}
                >
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
