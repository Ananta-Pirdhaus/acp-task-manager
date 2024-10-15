import React from "react";

// Tipe data untuk proyek
interface ProjectData {
  id: number;
  name: string;
  description: string;
  date: string;
}

// Contoh data proyek
const projectData: ProjectData[] = [
  {
    id: 1,
    name: "Proyek A",
    description: "Deskripsi Proyek A",
    date: "2024-01-01",
  },
  {
    id: 2,
    name: "Proyek B",
    description: "Deskripsi Proyek B",
    date: "2024-02-01",
  },
  {
    id: 3,
    name: "Proyek C",
    description: "Deskripsi Proyek C",
    date: "2024-03-01",
  },
];

const Project: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white font-bold mb-4">Daftar Proyek</h1>
      <table className="min-w-full rounded-lg overflow-hidden shadow-md border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deskripsi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projectData.map((project, index) => (
            <tr
              key={project.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-nowrap">{project.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {project.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{project.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                  Edit
                </button>
                <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Project;
