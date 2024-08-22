import { useState, useEffect } from "react";
import SeatGrid from "./SeatGrid";
import { getConcertsSeats, postReservationsSeats } from "../../api";

const Seat = ({ totalSeat = 50, userId = 'test', scheduleId = 1 }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
      contentId: 1,
      scheduleId,
      seatIdList: selectedSeats.map(seat => seat.seatId),
    }

    postReservationsSeats(reqVo).then((res)=>{
      // todo : reservationExpiry과 totalPrice 이용해서 결제 요청 API 호출 필요
    })
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
      const updatedSeats = [...selectedSeats, seat];
      setSelectedSeats(updatedSeats);
      setTotalPrice(totalPrice + seat.price);
    }
  };

  const renderSelectedSeats = () => {
    return selectedSeats.map((seat) => {
      const seatInfo = availableSeats.find(
        (availableSeat) => availableSeat.seatId === seat.seatId
      );
      const seatNumber = seatInfo?.seatNumber || seat.seatId;
      const seatInRow = seatNumber % Math.ceil(totalSeat / availableSeats.length) || 1;
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

  // 선택된 좌석이 없을 경우 (예매하기 비활성화)
  const isButtonDisabled = selectedSeats.length === 0;

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        <SeatGrid
          totalSeat={totalSeat}
          selectedSeats={selectedSeats}
          availableSeats={availableSeats}
          onSeatClick={handleSeatClick}
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
        <p className="font-bold mt-4">총 가격: {totalPrice.toLocaleString()}원</p>

        <div>
          <button    
            onClick={handleReservation}
            disabled={isButtonDisabled}
            className={`mt-4 px-6 py-3 font-semibold rounded-lg shadow-md transition duration-300 ${
              isButtonDisabled
              ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }`}
          >예매하기</button>
        </div>
      </div>
    </div>
  );
};

const generateRow = (seatNumber) => {
  const rowIndex = Math.floor(seatNumber / 10);
  return String.fromCharCode(65 + rowIndex);
};

export default Seat;
