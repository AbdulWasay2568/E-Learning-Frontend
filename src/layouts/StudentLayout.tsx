import Navbar from '../components/Navbar';
import SideBarStudent from '../components/student/SideBarStudent';
import { Outlet } from 'react-router-dom';

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SideBarStudent />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
