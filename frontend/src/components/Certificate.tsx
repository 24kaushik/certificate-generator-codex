import { useState } from "react";
import { Link } from "react-router";

const Certificate = () => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    qid: "",
    eventName: "",
    position: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [file, setFile] = useState<File | null>(null);
  const [bulkFormData, setBulkFormData] = useState({
    course: "",
    eventName: "",
    position: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBulkInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBulkFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Generating certificates with:", bulkFormData);
    console.log("Using file:", file);
    // Implement bulk certificate generation logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Certificate Generator
        </h1>

        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "single"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("single")}
            >
              Single Certificate
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "bulk"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("bulk")}
            >
              Bulk Generation
            </button>
          </div>
        </div>

        {activeTab === "single" ? (
          <form onSubmit={handleSingleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  QID
                </label>
                <input
                  type="text"
                  name="qid"
                  value={formData.qid}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Select position</option>
                  <option value="Participant">Participant</option>
                  <option value="Winner">Winner</option>
                  <option value="First Runner Up">First Runner Up</option>
                  <option value="Second Runner Up">Second Runner Up</option>
                </select>
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between flex-wrap gap-2">
            <Link to="/search">
                <button className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2">
                  Search certificates
                </button>
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate Certificate
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleBulkSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Excel File (with name & qid columns)
              </label>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  value={bulkFormData.course}
                  onChange={handleBulkInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={bulkFormData.eventName}
                  onChange={handleBulkInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Select position</option>
                  <option value="Participant">Participant</option>
                  <option value="Winner">Winner</option>
                  <option value="First Runner Up">First Runner Up</option>
                  <option value="Second Runner Up">Second Runner Up</option>
                </select>
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={bulkFormData.date}
                  onChange={handleBulkInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between flex-wrap gap-2">
              <Link to="/search">
                <button className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2">
                  Search certificates
                </button>
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate Bulk Certificates
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Certificate;
