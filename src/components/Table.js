import React, { useEffect, useState } from "react";
import { getCollegeData } from "../utils/GetCollegeData";
import compareIcon from "../assets/compare-icon.png";
import Sort from "./Sort";

const Table = () => {
  const [data, setData] = useState(null);
  const handleFetchData = async () => {
    const collegeData = await getCollegeData();
    setData(collegeData);
  };
  useEffect(() => {
    handleFetchData();
  }, []);

  const sortData = (sortedData) => {
    setData(sortedData);
  };
  console.log(data?.colleges);
  return (
    <div className="main">
      <Sort sortData={sortData} data={data} />
      <table>
        <thead>
          <tr>
            <th>CD Rank</th>
            <th>Colleges</th>
            <th>Course Fees</th>
            <th>Placement</th>
            <th>User Reviews</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {data?.colleges?.map((college) => (
            <tr key={college?.CDRank}>
              <td>#{college?.CDRank}</td>
              <td>
                <div className="top_head">
                  <div className="logo">
                    <img src={college?.Logo} alt={college?.name} />
                  </div>
                  <div className="college_name">
                    <p className="name">{college?.name}</p>
                    <p className="address">{college?.location}</p>
                    {college?.course && college?.cutoff ? (
                      <div className="course_box">
                        <p>{college?.course}</p>
                        <i class="fa fa-solid fa-chevron-down"></i>
                        <p className="cutoff">
                          JEE-Advanced 2023 Cutoff: {college?.cutoff}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div class="td_footer">
                  <div class="apply-now">
                    <i class="fa fa-solid fa-arrow-right"></i>
                    <p>Apply Now</p>
                  </div>
                  <div class="download-brochure">
                    <i class="fa fa-solid fa-download"></i>
                    <p>Download Brochure</p>
                  </div>
                  <div class="add-to-compare">
                    <input type="checkbox" />
                    <p>Add To Compare</p>
                  </div>
                </div>
              </td>
              <td className="course_fees">
                <p className="fees">₹ {college?.fees}</p>
                <p>BE/B.Tech</p>
                <p> - {college?.feesType}</p>
                <div class="compare_fees">
                  <img src={compareIcon} alt="compare icon" />
                  <p>Compare Fees</p>
                </div>
              </td>
              <td className="course_fees">
                <p className="fees">₹ {college?.averagePackage}</p>
                <p className="placement">Average Package</p>
                <p className="fees">₹ {college?.highestPackage}</p>
                <p className="placement">Highest Package</p>
                <span className="placement_chip">
                  {college?.placement} Placement
                </span>
                <div class="compare_fees">
                  <img src={compareIcon} alt="compare icon" />
                  <p>Compare Placement</p>
                </div>
              </td>
              <td>
                <div className="review_box">
                  <span className="review_circle"></span>
                  <span className="review">
                    {college?.userReviews[0]?.reviews} / 10
                  </span>
                </div>
                <p>
                  Based on {college?.userReviews[0]?.totalReviews} User <br />
                  Reviews
                </p>
                <span className="placement_chip">
                  <i class="fa fa-light fa-check"></i> Best in Placements{" "}
                  <i class="fa fa-light fa-chevron-down"></i>
                </span>
              </td>
              <td>3rd/131 in India</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
