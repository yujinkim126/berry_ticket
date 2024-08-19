// 요청이 들어왔을 때 임의의 응답을 해주는 핸들러가 정의되어 있는 파일입니다.
import { http, HttpResponse } from "msw";
import mockData from "./mockData.json";

const getConcertsHandler = http.get("/api/concerts", () => {
  return HttpResponse.json({
    code: "OK",
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    concerts: mockData.concerts,
  });
});

// 핸들러를 배열로 내보냅니다
export const handlers = [getConcertsHandler];
