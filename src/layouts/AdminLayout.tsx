import SidebarAdmin from '../components/admin/SideBarAdmin';
import { Outlet } from 'react-router-dom';
import NotificationBar from '../components/Notifcationsbar';
import Loader from '../components/Loader';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
        <main className="flex-1 p-4 lg:ml-72 lg:mt-0 mt-16">
          <NotificationBar message="New course update available!" />
          <Loader />
          
          <Outlet />
        </main>
      </div>
  );
};

export default AdminLayout;
