export const getCollegeData = async () => {
  try {
    const data = await fetch("/data.json");
    const json = await data.json();
    return json;
  } catch (error) {
    console.log("error fetching data", error);
  }
};
