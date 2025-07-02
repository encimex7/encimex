"use client";

import React from "react";

const Dashboard = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900 flex justify-center items-center px-4 sm:px-8 py-12">
      <div className="w-full max-w-6xl bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orang to-orang tracking-tight text-center">
          ENCIMEX Admin Dashboard
        </h1>
        <p className="mt-4 text-gray-600 text-center max-w-2xl">
          Welcome to the administrative panel. Manage operations, users, and insights from a single, secure interface.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
