// server.js

import express from "express";
const app = express();
import cors from "cors";
const port = 3000;

// mockData.js에서 목데이터 불러오기
import concertData from "./mockData.js";

// CORS 설정
app.use(cors());

// API 엔드포인트 설정
app.get("/api/concerts", (req, res) => {
  res.json(concertData);
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
