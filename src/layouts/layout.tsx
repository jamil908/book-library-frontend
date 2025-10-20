import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet /> {/* This renders the child routes */}
      </main>
      {/* Optional Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;