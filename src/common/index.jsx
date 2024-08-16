import axios from "../api/index";
//test
export const getConcerts = () => {
  return axios.get("/concerts");
};
