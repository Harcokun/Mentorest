import "./App.css";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/RegisterMentor";
import Login from "./pages/Login";
import Main from "./pages/Main";
import UserProvider from "./hooks/UserContext";
import EditProfileMentee from "./pages/EditProfileMentee";
import EditProfileMentor from "./pages/EditProfileMentor";
import RegisterMentor from "./pages/RegisterMentor";
import RegisterMentee from "./pages/RegisterMentee";
import NavbarProvider from "./hooks/NavbarContext";
import VerifyMentor from "./pages/VerifyMentor";
import MentorInfoReservation from "./pages/MentorInfoReservation";
import BookingDetailMentor from "./pages/BookingDetailMentor";
import BookingDetailMentee from "./pages/BookingDetailMentee";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register/mentor",
      element: <RegisterMentor />,
    },
    {
      path: "/register/mentee",
      element: <RegisterMentee />,
    },
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/user/info/mentee",
      element: <EditProfileMentee />,
    },
    {
      path: "/user/info/mentor",
      element: <EditProfileMentor />,
    },
    {
      path: "/booking/mentor",
      element: <BookingDetailMentor />,
    },
    {
      path: "/booking/mentee",
      element: <BookingDetailMentee />,
    },
  ]);
  return (
    <UserProvider>
      <NavbarProvider>
        <div className="App">
          <Navbar />
          <div className="w-full h-24 pb-1/2 bg-white"></div>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Main />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route
                exact
                path="/register/mentee"
                element={<RegisterMentee />}
              ></Route>
              <Route
                exact
                path="/register/mentor"
                element={<RegisterMentor />}
              ></Route>
              <Route
                exact
                path="/user/info/mentee"
                element={<EditProfileMentee />}
              ></Route>
              <Route
                exact
                path="/user/info/mentor"
                element={<EditProfileMentor />}
              ></Route>
              <Route
                exact
                path="/verify/mentor/:id"
                element={<VerifyMentor />}
              ></Route>
              <Route
                exact
                path="/user/info/reserve/:id"
                element={<MentorInfoReservation />}
              ></Route>
              <Route
                exact
                path="/booking/mentor"
                element={<BookingDetailMentor />}
              ></Route>
              <Route
                exact
                path="/booking/mentee"
                element={<BookingDetailMentee />}
              ></Route>
            </Routes>
          </div>
        </div>
      </NavbarProvider>
    </UserProvider>
  );
}

export default App;
