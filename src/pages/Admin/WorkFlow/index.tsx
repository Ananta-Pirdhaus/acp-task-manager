import React from "react";

const Workflow: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-semibold text-gray-800">
        Workflow Management
      </h1>
      <p className="mt-4 text-gray-600">
        Manage and monitor your workflows here. Assign tasks, track progress,
        and keep everything organized.
      </p>
      <button className="mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
        Add New Workflow
      </button>
    </div>
  );
};

export default Workflow;
