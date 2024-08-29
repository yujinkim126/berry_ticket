import usePopupStore from "../store/usePopupStore";
import ReservationPage from "./ReservationPage";

const CurrentConcertCard = (props) => {
  const { curData } = props;
  const { openPopup } = usePopupStore();
  const handleCurrentReservation = (prodId) => {
    const initialData = curData.find((data) => data.prodId === prodId);
    openPopup(<ReservationPage initialTab={1} initialData={initialData} />);
  };

  const getSeatLocation = (seatNumber) => {
    // 한 줄에 좌석이 10개인 경우
    const seatsPerRow = 10;

    // 열을 계산 (0번째 인덱스를 고려하기 위해 -1을 해줌)
    const rowNumber = Math.floor((seatNumber - 1) / seatsPerRow);

    // 열에 대응하는 알파벳을 계산
    const rowLetter = String.fromCharCode(65 + rowNumber); // 65는 'A'의 아스키 코드

    // 좌석 번호 계산 (1부터 시작하도록 +1)
    const seatPosition = ((seatNumber - 1) % seatsPerRow) + 1;

    return `${rowLetter}열 ${seatPosition}번`;
  };

  return curData && curData.length > 0
    ? curData.map((data) => (
        <div
          key={data.reservationId} // 각 요소에 고유한 key 추가
          className="border rounded-md overflow-hidden max-md:max-w-[300px] transform transition duration-500 hover:scale-110"
        >
          <img
            src={`${import.meta.env.VITE_REACT_IMAGE_URL}${data.posterImg}`} // 백틱 사용
            className="w-full h-50 object-contain object-top bg-gray-200"
            alt="포스터 이미지"
          />
          <div className="p-4">
            <h4 className="text-gray-800 text-base font-bold min-h-[48px] max-h-[100px]">
              {data.title}
            </h4>
            <div className="mt-4">
              {data.seatIdList.map((seat, index) => (
                <p
                  className="text-gray-900 text-base leading-relaxed"
                  key={index}
                >
                  {getSeatLocation(seat)}
                </p>
              ))}
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700"
                onClick={() => handleCurrentReservation(data.prodId)}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      ))
    : null;
};

export default CurrentConcertCard;
