import { mockContent } from "../data/mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Uploads new content
 * @param {FormData} contentData
 * @returns {Promise<Object>} Created content
 */
export const uploadContent = async (contentData) => {
  await delay(1200);

  const user = JSON.parse(localStorage.getItem("cbs_user"));
  const newContent = {
    id: `c${Date.now()}`,
    ...contentData,
    status: "pending",
    rejectionReason: null,
    teacherId: user.id,
    teacherName: user.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockContent.unshift(newContent);
  return newContent;
};

/**
 * Gets content for the logged-in teacher
 * @returns {Promise<Array>} Teacher's content
 */
export const getMyContent = async () => {
  await delay(800);
  const user = JSON.parse(localStorage.getItem("cbs_user"));
  return mockContent.filter((c) => c.teacherId === user.id);
};

/**
 * Gets all content (Principal)
 * @param {Object} filters - { status, search }
 * @returns {Promise<Array>} All content
 */
export const getAllContent = async ({ status, search } = {}) => {
  await delay(800);
  let result = [...mockContent];

  if (status && status !== "all") {
    result = result.filter((c) => c.status === status);
  }
  if (search) {
    result = result.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()),
    );
  }
  return result;
};

/**
 * Gets live active content for a teacher
 * @param {string} teacherId
 * @returns {Promise<Array>} Active content
 */
export const getLiveContent = async (teacherId) => {
  await delay(800);
  const now = new Date();
  return mockContent.filter(
    (c) =>
      c.teacherId === teacherId &&
      c.status === "approved" &&
      new Date(c.startTime) <= now &&
      new Date(c.endTime) >= now,
  );
};
