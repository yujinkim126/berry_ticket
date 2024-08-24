import { useState } from "react";
import ConCertDate from "./ConCertDate";
import Seat from "./Seat";

const ReservationPage = () => {
  const [selectTab, setSelectTab] = useState(0); // 현재 탭 상태
  const [selectSchedule, setSelectSchedule] = useState(null); // 선택된 스케줄 데이터

  const handleTabChange = (tabIndex, data) => {
    console.log("kyj change!", tabIndex, data);
    if (tabIndex === 1 && data) {
      setSelectSchedule(data);
    }
    setSelectTab(tabIndex);
  };

  return (
    <div>
      {selectTab === 0 ? (
        <ConCertDate handleTabChange={handleTabChange} />
      ) : (
        <Seat
          totalSeat={selectSchedule?.totalSeat}
          scheduleId={selectSchedule?.scheduleId}
          contentId={selectSchedule?.contentId}
          handleTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default ReservationPage;
