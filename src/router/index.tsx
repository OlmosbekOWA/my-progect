"use client"

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom"

import App from "../App"

import { SignIn, AdminPanel, NotFound, ProducList, ProducCategory, ProducBrends, OneStudent } from "../modules"

const Index = () =>{
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />} >
                <Route index element={<SignIn />} />
                <Route path="super-admin-panel" element={<AdminPanel />}>
                    <Route path="/super-admin-panel/:id" element={<OneStudent />} />
                    <Route index element={<ProducList/>} />
                    <Route path="produc-category" element={<ProducCategory/>} />
                    <Route path="produc-brends" element={<ProducBrends/>} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route >    
        )
    ) 
    return <RouterProvider router={router} />
}

export default Index