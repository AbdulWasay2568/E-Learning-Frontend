import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Role } from "./interfaces/enums.interface";


import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Notifications from './pages/Notifications';
import Support from './pages/Support';

// Student
import StudentDashboard from './pages/student/StudentDashboard';
import LecturePage from './pages/course/LecturePage';
// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseManagement from './pages/course/CourseManagement';
// Course
import CourseDetail from './pages/course/CourseDetails';
import CreateEditCourse from './pages/course/CreateEditCourse';
import LectureForm from './pages/course/LectureForm';
// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';

const App: React.FC = () => {
  const userRole = "Student"; //Student | Admin | null

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/support" element={<Support />} />
{/* Courses */}
        <Route path="/course/detail/:id" element={<CourseDetail />} />


      </Route>

      {/* Student Routes */}
      {userRole === Role.Student && (
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/course/:courseId/lecture/:lectureId" element={<LecturePage />} />

          {/* Add more student-specific routes here */}
        </Route>
      )}

      {/* Admin Routes */}
      {userRole === Role.Admin && (
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
{/* Courses */}
          <Route path="/admin/courses" element={<CourseManagement />} />
          <Route path="/course/new" element={<CreateEditCourse />} />
          <Route path="/course/edit/:id" element={<CreateEditCourse />} />
          <Route path="/course/:courseId/lectures/new" element={<LectureForm />} />
          <Route path="/course/:courseId/lectures/:id/edit" element={<LectureForm />} />
          {/* Add more admin-specific routes here */}
        </Route>
      )}

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
