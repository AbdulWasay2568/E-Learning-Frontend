import SideBarStudent from '../components/student/SideBarStudent';
import FloatingChatbot from '../components/student/FloatingChatbot'; 
import NotificationBar from '../components/Notifcationsbar'; // <-- import it
import { Outlet } from 'react-router-dom';

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen relative">
      <SideBarStudent />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:ml-72 lg:mt-0 mt-16">
        {/* Notification Bar (appears above main content) */}
        <NotificationBar message="New course update available!" />


        <Outlet />
      </main>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
};

export default StudentLayout;
