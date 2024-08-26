import express from "express";
import axios from "axios";
const app = express();

app.get("/api/prodlist", (req, res) => {
  const {
    commCode = "",
    sortType = "REAL_RANK",
    perfGenreCode = "GENRE_CON_ALL",
    perfThemeCode = "",
    filterCode = "FILTER_ALL",
    v = 1,
  } = req.query;

  const url = `https://ticket.melon.com/performance/ajax/prodList.json`;

  axios
    .get(url, {
      params: {
        commCode,
        sortType,
        perfGenreCode,
        perfThemeCode,
        filterCode,
        v,
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
