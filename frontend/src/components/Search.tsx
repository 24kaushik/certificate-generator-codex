import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";

// Define a type for certificate data
interface CertificateData {
  _id: string;
  name: string;
  qid: number;
  course: string;
  eventName: string;
  position: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const Search = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
    fetch("https://certificates.kaushiksarkar.me/user/getUser", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          window.location.href = "/";
        }
        return response.json();
      })
      .then((data) => {
        if (!data.name) {
          window.location.href = "/";
        }
      })
      .catch(() => {
        window.location.href = "/";
      });
  }, []);

  const [searchType, setSearchType] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<CertificateData[]>([]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!searchType || !searchValue) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://certificates.kaushiksarkar.me/certificate/search?parameter=${searchType}&value=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = () => {
    if (searchResults.length === 0) return;

    // Define which fields to include in the CSV
    const fields = [
      "name",
      "qid",
      "course",
      "eventName",
      "position",
      "date",
      "link",
    ];

    // Create CSV header
    const csvHeader = fields.join(",");

    // Create CSV rows
    const csvRows = searchResults.map((result) => {
      // Format date to be more readable
      const formattedDate = new Date(result.date).toLocaleDateString();

      return [
        result.name,
        result.qid,
        result.course,
        result.eventName,
        result.position,
        formattedDate,
        result._id ? `https://certificates.kaushiksarkar.me/certificate/${result._id}` : "",
      ].join(",");
    });

    // Combine header and rows
    const csvString = [csvHeader, ...csvRows].join("\n");

    // Create a blob and download link
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "certificates.csv");
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Link to="/generate">
        <button className="absolute top-2 left-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Go to Generate
        </button>
      </Link>

      <h1 className="text-4xl font-bold mb-8">Search Certificates</h1>
      <form onSubmit={handleSearch} className="w-full max-w-md space-y-4">
        <div className="mb-4">
          <label
            htmlFor="searchType"
            className="block text-gray-700 font-medium mb-2"
          >
            Search By
          </label>
          <select
            id="searchType"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select search criteria</option>
            <option value="qid">QID</option>
            <option value="name">Name</option>
            <option value="course">Course</option>
            <option value="date">Date</option>
            <option value="eventName">Event Name</option>
          </select>
        </div>

        {searchType && (
          <div className="mb-4">
            <label
              htmlFor="searchValue"
              className="block text-gray-700 font-medium mb-2"
            >
              {searchType.charAt(0).toUpperCase() + searchType.slice(1)}
            </label>
            {searchType === "date" ? (
              <input
                type="date"
                id="searchValue"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <input
                type="text"
                id="searchValue"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${searchType}`}
                required
              />
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !searchType || !searchValue}
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {searchResults.length > 0 && (
        <div className="mt-8 w-full max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Search Results</h2>
            <button
              onClick={downloadCSV}
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Download CSV
            </button>
          </div>
          <div className="bg-white rounded-md shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.qid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.eventName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(result.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
