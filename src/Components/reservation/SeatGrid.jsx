import React from "react";

// 좌석 그리드 컴포넌트
const SeatGrid = ({ totalSeat, selectedSeats, availableSeats, onSeatClick }) => {
  const rows = generateRows(totalSeat); // 동적으로 행을 생성
  const seatsPerRow = Math.ceil(totalSeat / rows.length);

  const renderSeats = () => {
    const seats = [];

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      const startSeatNumber = rowIndex * seatsPerRow + 1; // 각 행의 시작 좌석 번호

      seats.push(
        <div key={`row-${row}`} className="flex items-center mb-2">
          <div className="w-8 text-center font-bold">{row}</div>{" "}
          {/* 열 이름 표시 */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: seatsPerRow }).map((_, index) => {
              const seatId = startSeatNumber + index; // 좌석 번호 계산
              if (seatId > totalSeat) return null; // 총 좌석 수를 넘지 않도록 제한

              const seatInfo = availableSeats.find(
                (seat) => seat.seatId === seatId
              );

              const isAvailable = seatInfo && seatInfo.seatStatus === "AVAILABLE";
              const isSelected = selectedSeats.some(
                (seat) => seat.seatId === seatId
              );

              return (
                <div
                  key={seatId}
                  className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer transition ${
                    isSelected
                      ? "bg-purple-600 text-white"
                      : isAvailable
                      ? "bg-gray-400 hover:bg-purple-300"
                      : "bg-gray-300 text-gray-400"
                  }`}
                  onClick={() => isAvailable && onSeatClick(seatInfo)}
                >
                  {seatId}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return seats;
  };

  return <div className="flex flex-col">{renderSeats()}</div>;
};

// 행 이름을 생성하는 유틸리티 함수
const generateRows = (totalSeat) => {
  const rows = [];
  const numRows = Math.ceil(Math.sqrt(totalSeat)); // 총 좌석 수에 따라 행의 수를 동적으로 결정

  for (let i = 0; i < numRows; i++) {
    rows.push(String.fromCharCode(65 + i)); // ASCII 코드를 이용해 A, B, C,... 등의 행 이름 생성
  }

  return rows;
};

export default SeatGrid;
