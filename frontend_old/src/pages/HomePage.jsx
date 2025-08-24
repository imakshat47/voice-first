import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="relative text-center py-20 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
            {/* Background decorative text */}
        </div>
        <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white"
        >
            Welcome to <span className="text-blue-600 dark:text-blue-500">BolSaathi</span>
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
        >
            Your voice-powered guide to government schemes and local information. Accessible, multilingual, and always ready to help.
        </motion.p>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
        >
            <Link to="/greet" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                Get Started
            </Link>
        </motion.div>
    </div>
  );
};

export default HomePage;