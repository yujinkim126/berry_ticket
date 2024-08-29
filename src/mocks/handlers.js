// 요청이 들어왔을 때 임의의 응답을 해주는 핸들러가 정의되어 있는 파일입니다.
import { http, HttpResponse, delay } from "msw";
import mockData from "./mockData.json";

// 로그인 API
// param {userId}
const postUserIdHandler = http.post("/api/login", () => {
  return HttpResponse.json({
    code: "OK",
    statue: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});

// 유저 대기열 토큰 조회 API
// param {userId}
const getTokenHandler = http.get("/api/token", () => {
  return HttpResponse.json({
    code: "OK",
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    response: mockData.getToken,
  });
});

// 유저 대기열 토큰 발급 API
// requestBody {userId}
const postTokenHandler = http.post("/api/token", () => {
  return HttpResponse.json({
    code: "OK",
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    response: mockData.postToken,
  });
});

// 유저 잔액 조회 API
// param {userId}
const getBalanceHandler = http.get("/api/balance", () => {
  return HttpResponse.json({
    code: "OK",
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    response: mockData.getBalance,
  });
});

// 잔액 충전 요청 API
const putBalanceChargeHandler = http.put("/api/balance/charge", () => {
  return HttpResponse.json({
    code: "OK",
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    response: mockData.postBalanceCharge,
  });
});

// 콘서트 조회 API 핸들러
const getConcertsHandler = http.get("/api/concerts", async () => {
  // 스켈레톤 응답값 지연 테스트
  await delay(3000);

  return HttpResponse.json({
    code: "OK",
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    response: mockData.getConcerts,
  });
});

// 콘서트 상세 조회 API 핸들러
const getConcertDetailHandler = http.get("/api/concert", ({ request }) => {
  const parsedUrl = new URL(request.url);
  const prodId = Number(parsedUrl.searchParams.get("prodId"));

  const filteredConcert = mockData.getConcerts.filter((item) => {
    return item.prodId === prodId;
  });

  return HttpResponse.json({
    code: "OK",
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    response: filteredConcert,
  });
});

// 해당 날짜 예약 가능 좌석 조회 API
// param {userId, scheduleId}
const getConcertsSeatsHandler = http.get("/api/concerts/seats", () => {
  return HttpResponse.json({
    code: "OK",
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },

    response: mockData.getConcertsSeats,
  });
});

// 예약 가능 날짜 조회 API
// param {userId, contentId}
const getConcertsSchedulesHandler = http.get("/api/concerts/schedules", () => {
  return HttpResponse.json({
    code: "OK",
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    response: mockData.getConcertsSchedules,
  });
});

// 좌석 예약 요청 API
// param {userId, reqVo={userId, contentId, scheduleId, seatIdList}}
const postReservationsSeatsHandler = http.post(
  "/api/reservations/seats",
  () => {
    return HttpResponse.json({
      code: "OK",
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      response: mockData.postReservationSeats,
    });
  }
);

// 결제 API
// param: {userId, reqVo={userId, reservationId, amount}}
const postReservationsPaymentsHandler = http.post(
  "/api/reservations/payments",
  () => {
    return HttpResponse.json({
      code: "OK",
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      response: mockData.postReservationsPayments,
    });
  }
);

// 현재 예약중인 콘서트 조회 API
const getCurrentReservationHandler = http.get(
  "/api/current/reservation",
  () => {
    return HttpResponse.json({
      code: "OK",
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      response: mockData.getCurrentReservation,
    });
  }
);

// 핸들러를 배열로 내보냅니다
export const handlers = [
  postUserIdHandler,
  getConcertsHandler,
  getConcertDetailHandler,
  getConcertsSeatsHandler,
  getConcertsSchedulesHandler,
  postReservationsSeatsHandler,
  postReservationsPaymentsHandler,
  getTokenHandler,
  postTokenHandler,
  getBalanceHandler,
  putBalanceChargeHandler,
  getCurrentReservationHandler,
];
