import { useEffect, useState } from "react";
import { useContent } from "../../hooks/useContent";
import { useDebounce } from "../../hooks/useDebounce";
import { StatusBadge } from "../../components/ui/StatusBadge";
import {
  Input,
  Select,
  Button,
  Spinner,
  EmptyState,
} from "../../components/ui";
import { STATUS } from "../../utils/constants";
import { formatDate } from "../../utils/dateHelpers";

export const AllContent = () => {
  const [filters, setFilters] = useState({ status: "all", search: "" });
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(filters.search, 300);
  const { data, loading, fetchAllContent } = useContent();

  useEffect(() => {
    fetchAllContent({ status: filters.status, search: debouncedSearch });
  }, [filters.status, debouncedSearch, fetchAllContent]);

  const itemsPerPage = 20;
  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Content</h1>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            id="search"
            placeholder="Search by title..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <Select
          id="status-filter"
          options={["all", STATUS.PENDING, STATUS.APPROVED, STATUS.REJECTED]}
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : paginatedData.length === 0 ? (
        <EmptyState
          title="No content found"
          description="Adjust your filters."
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4">Preview</th>
                  <th className="p-4">Title / Subject</th>
                  <th className="p-4">Teacher</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Scheduled</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <img
                        src={item.fileUrl}
                        alt=""
                        className="w-16 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">
                        {item.subject}
                      </div>
                    </td>
                    <td className="p-4 text-sm">{item.teacherName}</td>
                    <td className="p-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {formatDate(item.startTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            <div className="space-x-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
