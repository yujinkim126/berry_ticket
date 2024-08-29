import { useState, useEffect } from "react";
import SeatGrid from "./SeatGrid";
import { getConcertsSeats, postReservationsSeats } from "../../api";
import useModalStore from "../store/useModalStore";

const Seat = ({
  contentId,
  totalSeat,
  seatIdList = [],
  userId = 2,
  scheduleId,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { openModal } = useModalStore();

  useEffect(() => {
    const fetchSeats = async () => {
      const res = await getConcertsSeats(userId, scheduleId);
      setAvailableSeats(res.response);

      // seatIdList를 이용해 초기 선택된 좌석 설정
      const initialSelectedSeats = res.response.filter((seat) =>
        seatIdList.includes(seat.seatId)
      );

      setSelectedSeats(initialSelectedSeats);

      // 선점된 좌석이 있다면(재진입) 총 금액 계산
      const initialTotalPrice = initialSelectedSeats.reduce(
        (sum, seat) => sum + seat.price,
        0
      );
      setTotalPrice(initialTotalPrice);
    };
    fetchSeats();
  }, []);

  const handleReservation = () => {
    const reqVo = {
      userId,
      contentId,
      scheduleId,
      seatIdList: selectedSeats.map((seat) => seat.seatId),
    };

    postReservationsSeats(reqVo).then((res) => {
      const testAmount = 150000;

      if (testAmount < res.response[0]?.totalPrice) {
        openModal({
          title: "예매 실패",
          subTitle: "잔액이 부족합니다. 충전하시겠습니까?",
        });
      } else {
        openModal({
          title: "예매 성공",
          subTitle: "예매가 완료되었습니다.",
        });
      }
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
  };

  const renderSelectedSeats = () => {
    return selectedSeats.map((seat) => {
      // 한 줄에 10 좌석으로 설정
      const seatsPerRow = 10;

      // 열을 계산 (0번째 인덱스를 고려하기 위해 -1을 해줌)
      const rowNumber = Math.floor((seat.seatNumber - 1) / seatsPerRow);

      // 열에 대응하는 알파벳을 계산
      const rowLetter = String.fromCharCode(65 + rowNumber); // 65는 'A'의 아스키 코드

      // 좌석 번호 계산 (1부터 시작하도록 +1)
      const seatPosition = ((seat.seatNumber - 1) % seatsPerRow) + 1;

      return (
        <li
          key={seat.seatId}
          className="cursor-pointer"
          onClick={() => handleSeatClick(seat)}
        >
          {rowLetter}열 {seatPosition}번
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
        <p className="font-bold mt-4">금액: {totalPrice.toLocaleString()}원</p>

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
// const generateRow = (seatNumber) => {
//   const rowIndex = Math.floor((seatNumber - 1) / 10); // 수정된 로직: 1을 빼서 정확한 행 계산
//   return String.fromCharCode(65 + rowIndex);
// };

export default Seat;
