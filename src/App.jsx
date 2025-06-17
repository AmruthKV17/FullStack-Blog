import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/auth";
import { login, logout } from "./features/Auth/authSlice";
import { Footer, Header } from "./Components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return loading ? <div className="min-h-screen flex flex-wrap justify-center ">Loading...</div> : 
  <div className="min-h-screen flex flex-col  content-between bg-fuchsia-300/30">
    <Header/>
    <main>
      {/* <Outlet/> */}Todo
    </main>
    <Footer/>
  </div>;
}

export default App;
