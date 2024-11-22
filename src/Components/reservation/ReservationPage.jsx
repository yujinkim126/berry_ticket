import { useState } from "react";
import ConCertDate from "@/components/reservation/ConcertDate";
import Seat from "@/components/reservation/Seat";

const ReservationPage = ({ initialTab = 0, initialData = null }) => {
  const [selectTab, setSelectTab] = useState(initialTab); // 탭 (0: 일정 1: 좌석)
  const [concertData, setconcertData] = useState(initialData); // 선택된 스케줄 데이터

  const handleTabChange = (tabIndex, data) => {
    if (tabIndex === 1 && data) {
      setconcertData(data);
    }
    setSelectTab(tabIndex);
  };

  return (
    <div>
      {selectTab === 0 ? (
        <ConCertDate handleTabChange={handleTabChange} />
      ) : (
        <Seat
          totalSeat={concertData?.totalSeat}
          seatIdList={concertData?.seatIdList}
          scheduleId={concertData?.scheduleId}
          contentId={concertData?.contentId}
          handleTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default ReservationPage;
