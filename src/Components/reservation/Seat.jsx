import { useState, useEffect } from "react";
import SeatGrid from "./SeatGrid";
import { getConcertsSeats, postReservationsSeats } from "../../api";

const Seat = ({ contentId, totalSeat, userId = 2, scheduleId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeatPosition, setSelectedSeatPosition] = useState(null); // 선택된 좌석 위치

  useEffect(() => {
    const fetchSeats = async () => {
      const res = await getConcertsSeats(userId, scheduleId);
      setAvailableSeats(res.response.seats);
    };
    fetchSeats();
  }, [userId, scheduleId]);

  const handleReservation = () => {
    const reqVo = {
      userId,
      contentId,
      scheduleId,
      seatIdList: selectedSeats.map((seat) => seat.seatId),
    };

    postReservationsSeats(reqVo).then((res) => {
      console.log(res);
    });
  };

  const handleSeatClick = (seat) => {
    if (selectedSeats.some((selected) => selected.seatId === seat.seatId)) {
      // 선택된 좌석이면 해제
      const updatedSeats = selectedSeats.filter(
        (selected) => selected.seatId !== seat.seatId
      );
      setSelectedSeats(updatedSeats);
      setTotalPrice(totalPrice - seat.price);
    } else {
      // 선택되지 않은 좌석이면 선택
      if (selectedSeats.length < totalSeat) {
        const updatedSeats = [...selectedSeats, seat];
        setSelectedSeats(updatedSeats);
        setTotalPrice(totalPrice + seat.price);
      } else {
        alert("선택할 수 있는 좌석 수를 초과했습니다.");
      }
    }
    // 좌석 클릭 시 좌석 위치 계산
    const seatPosition = getSeatPosition(seat.seatId);
    setSelectedSeatPosition(seatPosition);
  };

  const getSeatPosition = (seatId) => {
    const rowIndex = Math.floor((seatId - 1) / 10); // 0부터 시작하는 행 인덱스
    const columnIndex = (seatId - 1) % 10; // 0부터 시작하는 열 인덱스
    const row = String.fromCharCode(65 + rowIndex); // ASCII 코드로 행 이름 생성
    const seatInRow = columnIndex + 1; // 좌석 번호 계산

    return { row, seatInRow };
  };

  const renderSelectedSeats = () => {
    return selectedSeats.map((seat) => {
      const seatInfo = availableSeats.find(
        (availableSeat) => availableSeat.seatId === seat.seatId
      );
      const seatNumber = seatInfo?.seatNumber || seat.seatId;
      const seatInRow =
        seatNumber % Math.ceil(totalSeat / availableSeats.length) || 1;
      const row = generateRow(seatNumber);

      return (
        <li
          key={seat.seatId}
          className="cursor-pointer"
          onClick={() => handleSeatClick(seat)}
        >
          {row}열 {seatInRow}번 - {seat.price.toLocaleString()}원
        </li>
      );
    });
  };

  const isButtonDisabled = selectedSeats.length === 0;

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        <SeatGrid
          totalSeat={totalSeat}
          selectedSeats={selectedSeats}
          availableSeats={availableSeats}
          onSeatClick={handleSeatClick} // 클릭 이벤트 핸들러 전달
        />
      </div>

      <div className="w-1/4 p-4 border-l border-gray-300">
        <h2 className="text-xl font-semibold mb-4">선택된 좌석</h2>
        <ul>
          {selectedSeats.length === 0 ? (
            <li>좌석을 선택해주세요.</li>
          ) : (
            renderSelectedSeats()
          )}
        </ul>
        <p className="font-bold mt-4">
          총 가격: {totalPrice.toLocaleString()}원
        </p>

        {selectedSeatPosition && (
          <p className="font-bold mt-4">
            선택된 좌석 위치: {selectedSeatPosition.row}
            {selectedSeatPosition.seatInRow}번
          </p>
        )}

        <div>
          <button
            onClick={handleReservation}
            disabled={isButtonDisabled}
            className={`mt-4 px-6 py-3 font-semibold rounded-lg shadow-md transition duration-300 ${
              isButtonDisabled
                ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
          >
            예매하기
          </button>
        </div>
      </div>
    </div>
  );
};

// 좌석 번호에 따라 행(row)을 생성하는 함수
const generateRow = (seatNumber) => {
  const rowIndex = Math.floor(seatNumber / 10);
  return String.fromCharCode(65 + rowIndex);
};

export default Seat;
