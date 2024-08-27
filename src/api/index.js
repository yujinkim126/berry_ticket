// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
});

// 유저 대기열 토큰 조회 API
export const getToken = async (userId) => {
  const response = await api.get("/token", {
    params: { userId },
  });
  return response.data;
};

// 유저 대기열 토큰 발급 API
export const postToken = async (userId) => {
  const response = await api.post("/token", { userId });
  return response.data;
};

// 유저 잔액 조회 API
export const getBalance = async (userId) => {
  const response = await api.get("/balance", {
    params: { userId },
  });
  return response.data;
};

// 잔액 충전 요청 API
export const putBalanceCharge = async (userId, amount) => {
  const response = await api.put("/balance/charge", { userId, amount });
  return response.data;
};

// 콘서트 조회 API
export const getConcerts = async () => {
  const response = await api.get("/concerts");
  return response.data;
};

// 콘서트 상세 조회 API
export const getConcertDetail = async (prodId) => {
  const response = await api.get("/concerts", {
    params: { prodId },
  });
  return response.data;
};

// 해당 날짜 예약 가능 좌석 조회 API
export const getConcertsSeats = async (userId, scheduleId) => {
  const response = await api.get("/concerts/seats", {
    params: { userId, scheduleId },
  });
  return response.data;
};

// 예약 가능 날짜 조회 API
export const getConcertsSchedules = async (userId, contentId) => {
  const response = await api.get("/concerts/schedules", {
    params: { userId, contentId },
  });
  return response.data;
};

// 좌석 예약 요청 API
export const postReservationsSeats = async (
  userId,
  contentId,
  scheduleId,
  seatIdList
) => {
  const response = await api.post("/reservations/seats", {
    userId,
    contentId,
    scheduleId,
    seatIdList,
  });
  return response.data;
};

// 결제 API
export const postReservationsPayments = async (
  userId,
  reservationId,
  amount
) => {
  const response = await api.post("/reservations/payments", {
    userId,
    reservationId,
    amount,
  });
  return response.data;
};

export default api;
