import React, { useEffect, useState } from "react";
import { getCollegeData } from "../utils/GetCollegeData";
import compareIcon from "../assets/compare-icon.png";
import Sort from "./Sort";
import featuredFlag from "../assets/featured-flag.svg";
import indiaToday from "../assets/india-today-logo.png";
import aajTak from "../assets/Aaj_tak_logo.png";
import zeeNews from "../assets/Zee_news.png";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const newData = await getCollegeData(page);
      if (page === 1) {
        setData(newData.data);
      }
      if (page > 1) {
        setData((prevData) => [...prevData, ...newData.data]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetchData();
  }, [page]);

  const sortData = (sortedData) => {
    setData(sortedData);
  };

  function getOrdinalNumber(number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = number % 100;
    return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

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
          {data?.map((college) => (
            <tr
              key={college?.CDRank}
              className={college?.featured && "featured-row"}
            >
              <td>#{college?.CDRank}</td>
              <td className={college?.featured ? "p-relative" : ""}>
                {college?.featured && (
                  <>
                    <img
                      className="featured-flag"
                      src={featuredFlag}
                      alt={college?.name}
                    />
                    <span>Featured</span>
                  </>
                )}
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
                        <i className="fa fa-solid fa-chevron-down"></i>
                        <p className="cutoff">
                          JEE-Advanced 2023 Cutoff: {college?.cutoff}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="td_footer">
                  <div className="apply-now">
                    <i className="fa fa-solid fa-arrow-right"></i>
                    <p>Apply Now</p>
                  </div>
                  <div className="download-brochure">
                    <i className="fa fa-solid fa-download"></i>
                    <p>Download Brochure</p>
                  </div>
                  <div className="add-to-compare">
                    <input type="checkbox" />
                    <p>Add To Compare</p>
                  </div>
                </div>
              </td>
              <td className="course_fees">
                <p className="fees">₹ {college?.fees}</p>
                <p>BE/B.Tech</p>
                <p> - {college?.feesType}</p>
                <div className="compare_fees">
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
                <div className="compare_fees">
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
                <p className="f-12">
                  Based on {college?.userReviews[0]?.totalReviews} User <br />
                  Reviews
                </p>
                <span className="placement_chip">
                  <i className="fa fa-light fa-check"></i> Best in Placements{" "}
                  <i className="fa fa-light fa-chevron-down"></i>
                </span>
              </td>
              <td className="rank_box">
                <p>
                  #{getOrdinalNumber(college?.ranking[0]?.rank)} /{" "}
                  <span>{college?.ranking[0]?.total}</span>
                </p>
                <span className="india-today">
                  <img src={indiaToday} alt="india today" />
                  2023
                </span>
                <div className="news-channels">
                  <span>
                    <span>
                      <img src={indiaToday} alt="india today" />
                    </span>
                    <span className="ml-8">
                      <img src={aajTak} alt="aaj tak" />
                    </span>
                    <span className="ml-8">
                      <img src={zeeNews} alt="zee news" />
                    </span>
                  </span>
                  <span>+ 8 More</span>
                  <span>
                    <i className="fa fa-light fa-chevron-down"></i>
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Table;
