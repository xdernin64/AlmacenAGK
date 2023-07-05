import { BrowserRouter, Navigate, Route, Routes, createBrowserRouter } from "react-router-dom";
import Error404 from "../components/pages/error404";
import App from "../components/templates/app";
import Home from "../components/pages/home";
import Login from "../components/pages/login";
import Profile from "../components/pages/profile";
import Store from "../components/pages/store";
import Orders from "../components/pages/orders";
import Protected from "../components/templates/protected";
import { useState } from "react";
import { Authstate } from "../firebase";
import Btnfloat from "../components/templates/floatbutton";
import PreOrders from "../components/pages/preOrders";
import { useEffect } from "react";
import UserAreas from "../components/pages/UserAreas";

const Routers = ({ state }) => {
    console.log(state);
    console.log(Authstate());

    return (

        <BrowserRouter>
            <App state={state} />
            <Routes>

                <Route path="/home" element={state ? (<Home />) : (<Navigate replace to="/login" />)} />
                <Route path="/asistencia" element={state ? (<Store />) : (<Navigate replace to="/login" />)} />
                <Route path="/profile" element={state ? (<Profile />) : (<Navigate replace to="/login" />)} />
                <Route path="/horas-extras" element={state ? (<Orders />) : (<Navigate replace to="/login" />)} />
                <Route path="/login" element={state ? (<Navigate replace to="/" />) : (<Login />)} />
                <Route path="/usuarios" element={state ? (<UserAreas />) : (<Navigate replace to="/login" />)} />
                <Route path="/" element={state ? (<Home />) : (<Navigate replace to="/login" />)} />
                <Route path="*" element={state ? (<Error404 />) : (<Navigate replace to="/login" />)} />
            </Routes>

        </BrowserRouter>

    )
}

/*
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
)*/
export default Routers;