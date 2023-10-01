import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      <div>dashboard layout</div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
