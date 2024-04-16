import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
////// COMPONENTS ///////
import Header from "./components/header";
import Home from "./pages/home";
import Team from "./pages/team";
import Raid from "./pages/raid";
import Application from "./pages/application";
import Login from "./pages/login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/dashboard";
////// STYLES ///////
import "./styles/main.scss";

const App = () => {
    return (
        <Router>
            <Header />
            <div style={{ marginTop: "20px" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/raid" element={<Raid />} />
                    <Route path="/application" element={<Application />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
