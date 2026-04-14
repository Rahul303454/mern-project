import API from "./api";

// Get all courses (no auth needed)
export const getCourses = () => {
  return API.get("/courses");
};

// Add course (Admin only, needs token)
export const addCourse = (course) => {
  const auth = JSON.parse(localStorage.getItem("auth")); // get token from localStorage
  return API.post("/courses", course, {
    headers: { Authorization: `Bearer ${auth.token}` },
  });
};

// Update course (Admin only, needs token)
export const updateCourse = (id, course) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return API.put(`/courses/${id}`, course, {
    headers: { Authorization: `Bearer ${auth.token}` },
  });
};

// Delete course (Admin only, needs token)
export const deleteCourse = (id) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return API.delete(`/courses/${id}`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  });
};
