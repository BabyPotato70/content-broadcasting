import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLiveContent } from "../../services/content.service";
import { formatDate } from "../../utils/dateHelpers";
import { Spinner, EmptyState } from "../../components/ui";
import { Radio } from "lucide-react";

export const LivePage = () => {
  const { teacherId } = useParams();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLive = async () => {
    try {
      const data = await getLiveContent(teacherId);
      setContent(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load broadcast");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, 30000);
    return () => clearInterval(interval);
  }, [teacherId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  if (error || content.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState
          title="No Content Broadcasting"
          description="No content is currently active. Check back later!"
        />
      </div>
    );
  }

  const activeItem = content[0];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-4 pt-8">
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <img
            src={activeItem.fileUrl}
            alt={activeItem.title}
            className="w-full max-h-[70vh] object-cover"
          />
          <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-full flex items-center animate-pulse">
            <Radio className="w-4 h-4 mr-2" /> LIVE
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-lg font-bold bg-primary-600 px-2 py-1 rounded">
                {activeItem.subject}
              </span>
              <span className="text-gray-300 text-sm">
                Ends at {formatDate(activeItem.endTime)}
              </span>
            </div>
            <h1 className="text-4xl font-bold mt-2">{activeItem.title}</h1>
            <p className="text-gray-300 mt-2 max-w-2xl">
              {activeItem.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
