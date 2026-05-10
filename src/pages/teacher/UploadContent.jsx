import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadSchema } from "../../utils/validators";
import { useContent } from "../../hooks/useContent";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Select,
  Textarea,
  FileUpload,
  Button,
} from "../../components/ui";
import { SUBJECTS } from "../../utils/constants";

export const UploadContent = () => {
  const { upload, loading } = useContent();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(uploadSchema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data.title,
        subject: data.subject,
        description: data.description || "",
        fileUrl: URL.createObjectURL(data.file),
        fileName: data.file.name,
        fileSize: data.file.size,
        startTime: data.startTime,
        endTime: data.endTime,
        rotationDuration: data.rotationDuration
          ? parseInt(data.rotationDuration)
          : null,
      };
      await upload(payload);
      navigate("/teacher/my-content");
    } catch (error) {
      // Form stays populated, toast handled in hook
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upload New Content</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Title"
              id="title"
              error={errors.title?.message}
              registration={register("title")}
            />
            <Select
              label="Subject"
              id="subject"
              options={SUBJECTS}
              error={errors.subject?.message}
              registration={register("subject")}
            />
          </div>

          <Textarea
            label="Description"
            id="description"
            error={errors.description?.message}
            registration={register("description")}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content File
            </label>
            <FileUpload
              onChange={(file) =>
                setValue("file", file, { shouldValidate: true })
              }
              error={errors.file?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              style={{
                textTransform: "uppercase",
              }}
              label="Start Time"
              id="startTime"
              type="datetime-local"
              error={errors.startTime?.message}
              registration={register("startTime")}
            />
            <Input
              style={{
                textTransform: "uppercase",
              }}
              label="End Time"
              id="endTime"
              type="datetime-local"
              error={errors.endTime?.message}
              registration={register("endTime")}
            />
          </div>

          <Input
            label="Rotation Duration (minutes)"
            id="rotationDuration"
            type="number"
            error={errors.rotationDuration?.message}
            registration={register("rotationDuration")}
          />

          <div className="flex justify-end">
            <Button type="submit" isLoading={loading}>
              Upload Content
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
