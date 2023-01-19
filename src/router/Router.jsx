import { createBrowserRouter } from "react-router-dom";
import Error404 from "../components/pages/error404";
import App from "../components/templates/app";
import Home from "../components/pages/home";
import Login from "../components/pages/login";

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