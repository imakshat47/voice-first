import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import ThemeSwitcher from './ThemeSwitcher'; // Assuming ThemeSwitcher exists
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Define a consistent style for NavLinks to highlight the active page
    const navLinkStyles = ({ isActive }) => 
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
            isActive 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
        }`;

    const renderNavLinks = () => (
        <>
            {isAuthenticated ? (
                <>
                    <NavLink to="/dashboard" className={navLinkStyles}>Dashboard</NavLink>
                    <NavLink to="/chat" className={navLinkStyles}>Chat</NavLink>
                </>
            ) : (
                <NavLink to="/greet" className={navLinkStyles}>Get Started</NavLink>
            )}
        </>
    );

    const UserMenu = () => (
        <div className="relative">
            <button className="flex items-center space-x-2">
                <FiUser className="text-gray-700 dark:text-gray-300"/>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
            </button>
            {/* You can expand this into a dropdown for Profile, Settings etc. */}
        </div>
    );

    return (
        <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo with correct conditional home link */}
                    <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex-shrink-0">
                        <img className="h-14 w-auto" src="/logo.png" alt="BolSaathi Logo" />
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {renderNavLinks()}
                    </div>

                    {/* Right side controls (Desktop) */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <ThemeSwitcher />
                        {isAuthenticated ? (
                            <>
                                <UserMenu />
                                <button onClick={logout} className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50">
                                    <FiLogOut />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeSwitcher />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                            aria-label="Open main menu"
                        >
                            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>
            
            {/* Mobile Menu Dropdown with Animation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-white dark:bg-slate-800 shadow-lg"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3" onClick={() => setIsMobileMenuOpen(false)}>
                            {renderNavLinks()}
                             {isAuthenticated ? (
                                <>
                                    <div className="border-t border-gray-200 dark:border-slate-700 my-2"></div>
                                    <button onClick={logout} className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50">
                                        <FiLogOut />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                 <Link to="/login" className="block bg-blue-600 text-white px-3 py-2 mt-2 rounded-md text-center font-medium hover:bg-blue-700">
                                     Login
                                 </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;