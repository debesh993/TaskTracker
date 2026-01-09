import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import LandingPage from "./components/Frontlayout";

const router = createBrowserRouter([
  {
    path:"/",
    element:<LandingPage/>
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />, 
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*", 
    element: <Login />,
  },
]);
const App=()=>{
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
export default App;