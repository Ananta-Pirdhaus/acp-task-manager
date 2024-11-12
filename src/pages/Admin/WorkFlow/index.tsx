import React from "react";
import {
  PencilOutline,
  TrashBinOutline,
  PersonAddOutline,
} from "react-ionicons";

const UserManagement: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [roleFilter, setRoleFilter] = React.useState("all");

  // Dummy data for users
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Editor",
      status: "Active",
    },
  ];

  // Filter users based on search, status, and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-semibold text-orange-800">
        User Management
      </h1>
      <p className="mt-4 text-gray-600">
        Manage and monitor users here. You can filter, search, and manage user
        roles and status.
      </p>

      <div className="mt-6 flex items-center space-x-4">
        <input
          type="text"
          className="px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          className="px-4 py-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Editor">Editor</option>
        </select>
      </div>

      <table className="mt-6 w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left text-orange-800">
              Name
            </th>
            <th className="px-4 py-2 border-b text-left text-orange-800">
              Email
            </th>
            <th className="px-4 py-2 border-b text-left text-orange-800">
              Role
            </th>
            <th className="px-4 py-2 border-b text-left text-orange-800">
              Status
            </th>
            <th className="px-4 py-2 border-b text-left text-orange-800">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{user.name}</td>
              <td className="px-4 py-2 border-b">{user.email}</td>
              <td className="px-4 py-2 border-b">{user.role}</td>
              <td className="px-4 py-2 border-b">{user.status}</td>
              <td className="px-4 py-2 border-b flex items-center space-x-2">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  <div className="text-lg text-gray-50">
                    <PersonAddOutline color="#fff" />
                  </div>
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                  <div className="text-lg text-gray-50">
                    <PencilOutline color="#fff" />
                  </div>
                </button>
                <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                  <TrashBinOutline color="#fff" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
