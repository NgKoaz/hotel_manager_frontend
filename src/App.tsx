import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Rooms from './pages/Rooms/Rooms';
import Booking from './pages/Booking/Booking';
import Account from './pages/Account/Account';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import AdminPage from './pages/AdminPage';
import RoomsXX from './pages/Roomsxx';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/rooms" element={<Layout><Rooms /></Layout>} />
            <Route path="/booking" element={<Layout><Booking /></Layout>} />
            <Route path="/account" element={<Layout><Account /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/management" element={<Layout><AdminPage /></Layout>} />
            <Route path="/rooms2" element={<Layout><RoomsXX /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;