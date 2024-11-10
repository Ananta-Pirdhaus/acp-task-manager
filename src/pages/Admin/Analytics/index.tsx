import React from "react";

const Analytics: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-semibold text-gray-800">
        Analytics Dashboard
      </h1>
      <p className="mt-4 text-gray-600">
        View analytics data to gain insights into user behavior, engagement, and
        overall performance.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded-md">
          <h2 className="text-xl font-semibold">User Engagement</h2>
          <p className="text-gray-700 mt-2">75% this month</p>
        </div>
        <div className="p-4 bg-green-100 rounded-md">
          <h2 className="text-xl font-semibold">New Signups</h2>
          <p className="text-gray-700 mt-2">150 this week</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
