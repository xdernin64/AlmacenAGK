import { createBrowserRouter } from "react-router-dom";
import Error404 from "../components/pages/error404";
import App from "../components/templates/app";
import Home from "../components/pages/home";
import Login from "../components/pages/login";
import Profile from "../components/pages/profile";
import Store from "../components/pages/store";
import Orders from "../components/pages/orders";




const router = createBrowserRouter(
    [

        {
            path: "/",
            element: <App />,
            errorElement: <Error404 />,
            children: [

                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "/home",
                    element: <Home />
                },
                {
                    path: "/stocks",
                    element: <Store />
                },
                {
                    path: "/orders",
                    element: <Orders />
                },
                {
                    path: "/profile",
                    element: <Profile />
                }
            ]
        },
        {
            path: "/login",
            element: <Login />
        }


    ]
)
export default router;