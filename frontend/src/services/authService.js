import API from "./api";

export const getCourses = () => {
  return API.get("/courses");
};

export const addCourse = (course) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return API.post("/courses", course, {
    headers: { Authorization: `Bearer ${auth.token}` }
  });
};

export const updateCourse = (id, course) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return API.put(`/courses/${id}`, course, {
    headers: { Authorization: `Bearer ${auth.token}` }
  });
};

export const deleteCourse = (id) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return API.delete(`/courses/${id}`, {
    headers: { Authorization: `Bearer ${auth.token}` }
  });
};
