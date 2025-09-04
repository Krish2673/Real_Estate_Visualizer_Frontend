import { useEffect, useState } from 'react';
import './DatasetExplorer.css';

const ROWS_PER_PAGE = 300;

function DatasetExplorer() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('/explorer_data.json')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch dataset");
        return res.json();
      })
      .then(json => {
        setData(json);
        console.log("Loaded dataset:", json);
      })
      .catch(err => console.error("Error loading dataset:", err));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // Apply search & sort
  const filteredData = [...data].filter((row) =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const changePage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="explorer-page">
      <h2>Dataset Explorer</h2>

      <div className="explorer-controls">
        <input
          type="text"
          placeholder="Search dataset..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <a
          href="/explorer_data.csv"
          download="RealEstate_Dataset.csv"
          className="download-btn"
        >
          ⬇ Download CSV
        </a>
      </div>

      <div className="table-wrapper">
        {columns.length > 0 ? (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  {columns.map(col => (
                    <th key={col} onClick={() => handleSort(col)}>
                      {col}
                      {sortConfig.key === col && (
                        sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, i) => (
                  <tr key={i}>
                    {columns.map(col => (
                      <td key={col}>{String(row[col] ?? "N/A")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
              <button disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
                ◀ Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => Math.abs(currentPage - page) <= 2 || page === 1 || page === totalPages)
                .map((page, index, arr) => (
                  <span key={page}>
                    {index > 0 && page - arr[index - 1] > 1 && <span className="ellipsis">...</span>}
                    <button
                      onClick={() => changePage(page)}
                      className={page === currentPage ? 'active' : ''}
                    >
                      {page}
                    </button>
                  </span>
                ))}

              <button disabled={currentPage === totalPages} onClick={() => changePage(currentPage + 1)}>
                Next ▶
              </button>

              {/* Jump to Page Input */}
              <span className="goto-page">
                &nbsp; | Go to page:&nbsp;
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) changePage(val);
                  }}
                  style={{ width: '60px', padding: '4px' }}
                />
              </span>
            </div>
          </>
        ) : (
          <p>Loading dataset...</p>
        )}

        {data.length > 0 && filteredData.length === 0 && (
          <p>No matching results found.</p>
        )}
      </div>
    </div>
  );
}

export default DatasetExplorer;