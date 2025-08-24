import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Notifications from './pages/Notifications';
import Support from './pages/Support';

// Student
import StudentDashboard from './pages/student/StudentDashboard';
import CoursePage from './pages/course/CorusePage';
// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
// Course
import CourseDetail from './pages/course/CourseDetails';
import CreateEditCourse from './pages/course/CreateEditCourse';
import LecturesPage from './pages/course/LecturesPage';
import LectureForm from './pages/course/LectureForm';
// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';


const userRole = 'student'; // 'admin' | 'student' | null

const App: React.FC = () => {
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

      </Route>

      {/* Student Routes */}
      {userRole === 'student' && (
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          <Route path="/course/detail" element={<CourseDetail />} />
          <Route path="/course/video" element={<CoursePage />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* Add more student-specific routes here */}
        </Route>
      )}

      {/* Admin Routes */}
      {userRole === 'admin' && (
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/course/create" element={<CreateEditCourse />} />
          <Route path="/course/edit/:id" element={<CreateEditCourse />} />
          <Route path="/course/lectures" element={<LecturesPage />} />
          <Route path="/course/lectures/new" element={<LectureForm />} />
          <Route path="/course/lectures/:id/edit" element={<LectureForm />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* Add more admin-specific routes here */}
        </Route>
      )}

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
