import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IdeaSubmission from './pages/IdeaSubmission';
import Rewards from './pages/Rewards';
import CollaborationTools from './pages/CollaborationTools';

const isAuthenticated = () => localStorage.getItem('token'); // Helper function

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={!isAuthenticated() ? <Login /> : <Navigate to="/home" />} />
                <Route path="/signup" element={!isAuthenticated() ? <Signup /> : <Navigate to="/home" />} />
                <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/ideas" element={<IdeaSubmission />} />
                <Route path="/collaborate" element={<CollaborationTools />} />
                <Route path="/rewards" element={<Rewards />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
