import { useState } from "react";

const Seat = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleReservation = () => {
    console.log("kyj 현재 선택된 좌석::", selectedSeats);
  };

  const handleSeatClick = (num) => {
    if (selectedSeats.includes(num)) {
      // 선택된 좌석이면 해제
      const updatedSeats = selectedSeats.filter((seat) => seat !== num);
      setSelectedSeats(updatedSeats);
    } else {
      // 선택되지 않은 좌석이면 선택
      const updatedSeats = [...selectedSeats, num];
      setSelectedSeats(updatedSeats);
    }
  };

  // 좌석의 열과 번호를 설정합니다
  const rows = ["A", "B", "C", "D", "E"];
  const seatsPerRow = 10;

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
              return (
                <div
                  key={seatId}
                  className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer transition ${
                    selectedSeats.includes(seatId)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-300"
                  } hover:bg-purple-300`}
                  onClick={() => handleSeatClick(seatId)}
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

  const renderSelectedSeats = () => {
    return selectedSeats.map((num) => {
      const rowIndex = Math.floor((num - 1) / seatsPerRow);
      const row = rows[rowIndex];
      const seatInRow = ((num - 1) % seatsPerRow) + 1;
      return (
        <li
          key={num}
          className="cursor-pointer"
          onClick={() => handleSeatClick(num)}
        >
          {row}열 {seatInRow}번
        </li>
      );
    });
  };

  return (
    <div className="flex">
      {/* 좌석 그리드 */}
      <div className="w-3/4 p-4">
        <div className="flex flex-col">{renderSeats()}</div>
      </div>

      <div className="w-1/4 p-4 border-l border-gray-300">
        {/* 선택된 좌석 목록 */}
        <h2 className="text-xl font-semibold mb-4">선택된 좌석</h2>
        <ul>
          {selectedSeats.length === 0 ? (
            <li>좌석을 선택해주세요.</li>
          ) : (
            renderSelectedSeats()
          )}
        </ul>

        {/* 예매하기 버튼 */}
        <div>
          <button onClick={handleReservation}>예매하기</button>
          {/* <Button variant="outline">예매하기</Button> */}
        </div>
      </div>
    </div>
  );
};

export default Seat;
