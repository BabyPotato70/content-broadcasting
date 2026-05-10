import { useEffect, useState } from "react";
import { useApproval } from "../../hooks/useApproval";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { EmptyState } from "../../components/ui/EmptyState";
import { Modal, Button, Textarea, SkeletonLoader } from "../../components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rejectSchema } from "../../utils/validators";
import { CheckCircle, XCircle } from "lucide-react";

export const PendingApprovals = () => {
  const { data, loading, fetchPending, approve, reject } = useApproval();
  const [rejectModal, setRejectModal] = useState({ isOpen: false, id: null });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(rejectSchema),
  });

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const handleReject = async (formData) => {
    await reject(rejectModal.id, formData.reason);
    setRejectModal({ isOpen: false, id: null });
    reset();
  };

  if (loading) return <SkeletonLoader count={5} />;

  if (data.length === 0) {
    return (
      <EmptyState
        title="All Caught Up!"
        description="All content has been reviewed."
      />
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pending Approvals</h1>
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-start"
          >
            <img
              src={item.fileUrl}
              alt=""
              className="w-full md:w-40 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                By {item.teacherName} • {item.subject}
              </p>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              <StatusBadge status={item.status} />
            </div>
            <div className="flex md:flex-col gap-2 w-full md:w-auto">
              <Button
                variant="primary"
                size="sm"
                className="flex-1 md:w-full"
                onClick={() => approve(item.id)}
              >
                <CheckCircle className="w-4 h-4 mr-2" /> Approve
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="flex-1 md:w-full"
                onClick={() => setRejectModal({ isOpen: true, id: item.id })}
              >
                <XCircle className="w-4 h-4 mr-2" /> Reject
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={rejectModal.isOpen}
        onClose={() => {
          setRejectModal({ isOpen: false, id: null });
          reset();
        }}
        title="Reject Content"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                setRejectModal({ isOpen: false, id: null });
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              isLoading={isSubmitting}
              onClick={handleSubmit(handleReject)}
            >
              Confirm Rejection
            </Button>
          </>
        }
      >
        <Textarea
          id="reason"
          label="Rejection Reason"
          error={errors.reason?.message}
          registration={register("reason")}
          rows={4}
        />
      </Modal>
    </div>
  );
};
