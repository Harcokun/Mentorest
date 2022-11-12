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
import EditProfile from "./pages/EditProfile";
import RegisterMentor from "./pages/RegisterMentor";
import RegisterMentee from "./pages/RegisterMentee";
import NavbarProvider from "./hooks/NavbarContext";

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
      path: "/user/info",
      element: <EditProfile />,
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
                path="/edit-profile"
                element={<EditProfile />}
              ></Route>
            </Routes>
          </div>
        </div>
      </NavbarProvider>
    </UserProvider>
  );
}

export default App;
