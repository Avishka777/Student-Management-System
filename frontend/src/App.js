import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import Course from './pages/Course';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/about" element={<About />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
