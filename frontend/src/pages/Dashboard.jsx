import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashCourses from '../components/DashCourses';
import DashUsers from '../components/DashUsers';
import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-76'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === 'profile' && <DashProfile />}
      {/* courses */}
      {tab === 'courses' && <DashCourses />}
      {/* Users */}
      {tab === 'users' && <DashUsers />}
      {/* Dashboard */}
      {tab === 'dash' && <DashboardComp />}
    </div>
  );
}