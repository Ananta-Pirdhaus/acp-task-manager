/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

// Tipe data untuk proyek
interface ProjectData {
  id: string; // Masih diperlukan untuk identifikasi unik, tetapi tidak ditampilkan
  name: string;
  description: string;
  priority: string;
  startDate: string;
  endDate: string;
  tags: Array<{ title: string; color: string }>; // Sesuaikan ini dengan struktur warna tag Anda
}

// Fungsi untuk mengambil data proyek dari localStorage
const getProjectDataFromLocalStorage = (): ProjectData[] => {
  const storedData = localStorage.getItem("taskBoard");
  if (storedData) {
    const board = JSON.parse(storedData);
    // Gabungkan semua item dari setiap kolom menjadi satu array
    return Object.values(board).flatMap((column: any) =>
      column.items.map((item: any) => ({
        id: item.id, // Simpan ini untuk identifikasi unik
        name: column.name, // Nama dari kolom
        description: item.description,
        priority: item.priority,
        startDate: item.startDate,
        endDate: item.endDate,
        tags: item.tags, // Sesuaikan ini sesuai dengan cara Anda ingin menampilkan tag
      }))
    );
  }
  return []; // Kembalikan array kosong jika tidak ada data
};

const Project: React.FC = () => {
  const projectData: ProjectData[] = getProjectDataFromLocalStorage(); // Ambil data dari localStorage

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white font-bold mb-4">Daftar Proyek</h1>
      <table className="min-w-full rounded-lg overflow-hidden shadow-md border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deskripsi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prioritas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal Mulai
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal Selesai
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tag
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projectData.map((project, index) => (
            <tr
              key={project.id} // Masih menggunakan ID untuk key
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {project.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {project.priority}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {project.startDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{project.endDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag.title}
                    className="mr-2"
                    style={{ color: tag.color }}
                  >
                    {tag.title}
                  </span>
                ))}
              </td>
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
