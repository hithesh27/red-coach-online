// axios for api request
// antd -buld ui components
// react redux
// redux toolkit
// redux
// bootstrap - cdn link we will use normal css styling.
// icons -remix icons cdn link
// react -router dom without it   cannot  make  a   single   page A


import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/RegisterUser";
import "./resources/global.css";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import AdminBuses from "./pages/Admin/AdminBuses";
import AdminUsers from "./pages/Admin/AdminUsers";
import BookNow from "./pages/BookNow";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";

function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <div>
      {loading && <Loader></Loader>}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAdminPage={false}>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAdminPage={false}>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/admin/buses"
            element={
              <ProtectedRoute isAdminPage={true}>
                <AdminBuses />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/bookings"
            element={
              <ProtectedRoute isAdminPage={false}>
                <Bookings/>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdminPage={true}>
                <AdminUsers />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/booknow/:id"
            element={
              <ProtectedRoute isAdminPage={false}>
                <BookNow />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;