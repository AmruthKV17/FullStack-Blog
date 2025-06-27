import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import authService from "./Appwrite/auth";
import { login, logout } from "./features/Auth/authSlice";
import { Footer, Header } from "./Components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {

      authService
      .getCurrentUser()
    .then((userData) => {
      
      if (userData) {
        dispatch(login(userData));
      } else {
        
        dispatch(logout());
        console.log(authStatus);
        }
      })
      .finally(() => setLoading(false));
    
  }, [authStatus]);
  return loading ? <div className="min-h-screen flex flex-wrap justify-center ">Loading...</div> : 
  <div className="min-h-screen flex flex-col  justify-between bg-zinc-400/40">
    <Header/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
  </div>;
}

export default App;
