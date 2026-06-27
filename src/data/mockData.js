const teachers = [
  {
    id: "t1",
    name: "Ms. Teacher",
    email: "teacher@school.com",
    role: "teacher",
  },
  { id: "t2", name: "Mr. Smith", email: "t2@school.com", role: "teacher" },
];

const principal = {
  id: "p1",
  name: "Mr. Principal",
  email: "principal@school.com",
  role: "principal",
};

const subjects = [
  "Math",
  "Science",
  "English",
  "History",
  "Geography",
  "Art",
  "PE",
  "Other",
];

const generateContent = () => {
  const items = [];
  const statuses = ["pending", "approved", "rejected"];

  for (let i = 1; i <= 50; i++) {
    const status = statuses[Math.floor(Math.random() * 3)];
    const daysOffset = Math.floor(Math.random() * 20) - 10;
    const startTime = new Date();
    startTime.setDate(startTime.getDate() + daysOffset);
    startTime.setHours(8, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(16, 0, 0);

    items.push({
      id: `c${i}`,
      title: `${subjects[i % 8]} Lesson ${i}`,
      subject: subjects[i % 8],
      description: `Detailed description for lesson ${i} about various topics.`,
      fileUrl: `https://picsum.photos/seed/${i}/400/300`,
      fileName: `lesson_${i}.jpg`,
      fileSize: 1500000 + i * 10000,
      status,
      rejectionReason:
        status === "rejected"
          ? "Does not meet curriculum standards. Please revise."
          : null,
      teacherId: i % 3 === 0 ? "t2" : "t1",
      teacherName: i % 3 === 0 ? "Mr. Smith" : "Ms. Carter",
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      rotationDuration: Math.floor(Math.random() * 10) + 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return items;
};

export const mockUsers = [...teachers, principal];
export let mockContent = generateContent();
