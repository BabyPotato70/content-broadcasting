import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const uploadSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    subject: z.string().min(1, "Subject is required"),
    description: z.string().optional(),
    file: z
      .any()
      .refine((file) => file instanceof File, "File is required")
      .refine(
        (file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type),
        "Only JPG, PNG, GIF allowed",
      )
      .refine((file) => file?.size <= 10000000, "Max 10MB allowed"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    rotationDuration: z.coerce.number().min(1).optional().or(z.literal("")),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export const rejectSchema = z.object({
  reason: z.string().min(10, "Reason must be at least 10 characters"),
});
