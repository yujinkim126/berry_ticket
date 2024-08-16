import axios from "../api/index";

export const getConcerts = () => {
  return axios.get("/concerts");
};
