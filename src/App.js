import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import {login,logout} from "./store/authslice";
import { Header, Footer } from "./component";
import { Outlet } from "react-router-dom";


function App() {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();


  useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(login({ userData }));
            } else {
                dispatch(logout());
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            dispatch(logout());
        } finally {
            setLoading(false);
        }
    };

    fetchCurrentUser();
}, [dispatch]);

  return !loading ? (
    <div className=' min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block text-center'>
        <Header />
        <main>
          <Outlet />
        </main>
        <div className="w-full block">
          <Footer />
        </div>
      </div>
    </div>
  ) : null
}


export default App;
