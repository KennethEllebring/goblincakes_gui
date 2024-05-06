import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/authContext";
import { ToastContainer } from "react-toastify";
import Header from "./components/header";
import Home from "./pages/home";
import Team from "./pages/team";
import Raid from "./pages/raid";
import Application from "./pages/application";
import Login from "./pages/login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/dashboard/userpages/UserProfile";
import News from "./pages/dashboard/adminpages/AdminNews/AdminNews";
import Applications from "./pages/dashboard/adminpages/AdminApplications";
import NotFound from "./pages/notfound/NotFound";
import "./styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./pages/dashboard/userpages/UserSettings";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Header />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
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
                        >
                            <Route
                                path="profile"
                                element={
                                    <PrivateRoute>
                                        <Profile />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="settings"
                                element={
                                    <PrivateRoute>
                                        <Settings />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="news"
                                element={
                                    <PrivateRoute>
                                        <News />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="applications"
                                element={
                                    <PrivateRoute>
                                        <Applications />
                                    </PrivateRoute>
                                }
                            />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
