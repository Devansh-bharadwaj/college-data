export const getAllCollegeData = async () => {
  try {
    const data = await fetch("/data.json");
    const json = await data.json();
    return json.colleges;
  } catch (error) {
    console.log("error fetching data", error);
  }
};

export const getCollegeData = async (page) => {
  try {
    const response = await fetch("/data.json");
    const json = await response.json();
    const pageSize = 4;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const totalCount = json.colleges.length;
    console.log(json.colleges.slice(startIndex, endIndex));
    return {
      data: json.colleges.slice(startIndex, endIndex),
      count: totalCount,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
