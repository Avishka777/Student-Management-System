import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Header from "./components/Header"
import Courses from "./pages/Courses"
import Footer from "./components/Footer"
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreateCourses from './pages/CreateCourses';
import Search from './pages/Search';
import UpdateCourse from "./pages/UpdateCourse"
import CoursePage from "./pages/CoursePage"

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-course' element={<CreateCourses />} />
          <Route path='/update-course/:courseId' element={<UpdateCourse />} />
        </Route>
        
        <Route path="/courses" element={<Courses/>}/>
        <Route path='/course/:courseSlug' element={<CoursePage />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
