import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;