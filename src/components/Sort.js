import React, { useState, useEffect } from "react";
import { getAllCollegeData } from "../utils/GetCollegeData";

const Sort = ({ sortData, data }) => {
  const [sortBy, setSortBy] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFetchData = async () => {
    const collegeData = await getAllCollegeData();
    setFilteredData(collegeData);
  };
  const handleSearch = () => {
    let filtered;
    if (searchTerm.trim() === "") {
      filtered = filteredData;
    } else {
      filtered = filteredData.filter((item) => {
        const matchName =
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          searchTerm.toLowerCase().includes(item.name.toLowerCase());

        return matchName;
      });
    }
    sortData(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);
  useEffect(() => {
    handleFetchData();
  }, []);
  // console.log(data);

  const handleSortData = (e) => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);
    if (data && Array.isArray(data)) {
      let sortedData;
      switch (selectedOption) {
        case "Low CD Rating":
          sortedData = [...data].sort((a, b) => a.CDRank - b.CDRank);
          break;
        case "High CD Rating":
          sortedData = [...data].sort((a, b) => b.CDRank - a.CDRank);
          break;
        case "Highest Fees":
          sortedData = [...data].sort((a, b) => {
            const feesA = parseInt(a.fees.replace(/,/g, ""));
            const feesB = parseInt(b.fees.replace(/,/g, ""));
            return feesB - feesA;
          });
          break;
        case "Lowest Fees":
          sortedData = [...data].sort((a, b) => {
            const feesA = parseInt(a.fees.replace(/,/g, ""));
            const feesB = parseInt(b.fees.replace(/,/g, ""));
            return feesA - feesB;
          });
          break;
        case "User Reviews":
          sortedData = [...data].sort((a, b) => {
            const aReviews = parseFloat(a.userReviews[0]?.reviews) || 0;
            const bReviews = parseFloat(b.userReviews[0]?.reviews) || 0;
            return bReviews - aReviews;
          });
          break;
        default:
          sortedData = data;
      }
      sortData(sortedData);
    }
  };

  return (
    <div className="sorting">
      <div>Sort By</div>
      <button
        onClick={handleSortData}
        value="High CD Rating"
        className={sortBy === "High CD Rating" ? "active sort_btn" : "sort_btn"}
      >
        Highest CD Rating
      </button>
      <button
        onClick={handleSortData}
        value="Low CD Rating"
        className={sortBy === "Low CD Rating" ? "active sort_btn" : "sort_btn"}
      >
        Lowest CD Rating
      </button>
      <button
        onClick={handleSortData}
        value="Highest Fees"
        className={sortBy === "Highest Fees" ? "active sort_btn" : "sort_btn"}
      >
        Highest Fees
      </button>
      <button
        onClick={handleSortData}
        value="Lowest Fees"
        className={sortBy === "Lowest Fees" ? "active sort_btn" : "sort_btn"}
      >
        Lowest Fees
      </button>
      <button
        onClick={handleSortData}
        value="User Reviews"
        className={sortBy === "User Reviews" ? "active sort_btn" : "sort_btn"}
      >
        User Review
      </button>
      <input
        className="search-input"
        type="text"
        id="floatingInput"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Sort;
