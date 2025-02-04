import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./pages/auth/Login";
import Redirect from "./pages/auth/Redirect";
import InventoryManagement from "./pages/InventoryManagement";
import AuthWrapper from "./Components/Layouts/AuthWrapper";
import WrapperLogged from "./Components/Layouts/WrapperLogged";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthWrapper />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "redirect",
          element: <Redirect />,
        },
      ],
    },
    {
      path: "/",
      element: <WrapperLogged />,
      children: [
        {
          index: true,
          element: <InventoryManagement />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}

export default App;
