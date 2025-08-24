import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiMessageSquare, FiFileText, FiSearch, FiDollarSign } from 'react-icons/fi';

const expenseData = [{ name: 'Jan', budget: 4000, expenses: 2400 }, { name: 'Feb', budget: 3000, expenses: 1398 }];
const initialChecklist = [{ id: 1, text: 'Submit Aadhar Card copy', completed: false }, { id: 2, text: 'Fill out PM-KISAN form', completed: false }];

const ProfileCard = ({ user }) => (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">
            {/* Handles guest state */}
            Welcome {user ? `back, ${user.name}` : '!'}
        </h2>
        <p className="text-indigo-200 mt-1">
            {user ? "Let's make progress on your applications today." : "Log in to personalize your experience."}
        </p>
    </div>
);

const QuickActions = () => { /* Same as previous version */ };
const ExpenseTracker = () => { /* Same as previous version */ };
const DocumentChecklist = () => { /* Same as previous version */ };

const DashboardPage = () => {
  const { user } = useAuth(); // Can be null if not logged in

  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-[calc(100vh-80px)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProfileCard user={user} />
        <QuickActions />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2"><ExpenseTracker /></div>
            <div><DocumentChecklist /></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;