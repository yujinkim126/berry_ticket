import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getConcertsSchedules } from "../../api";
import { Calendar } from "@ui/calendar";
import { Button } from "@ui/button";

const ConcertDate = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const contentId = params.get("contentId") || "testId";
  const { handleTabChange } = props;

  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: null,
    time: null,
    scheduleId: null,
  });
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const handleDateSelect = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    setSelectedDateTime({ date: formattedDate, time: null, scheduleId: null });

    const timesForDate = availableSchedules
      .filter((schedule) => schedule.scheduleDate.startsWith(formattedDate))
      .map((schedule) => schedule.scheduleDate.split("T")[1]);

    setAvailableTimes(timesForDate);
  };

  const handleTimeSelect = (time) => {
    const selectedSchedule = availableSchedules.find(
      (schedule) =>
        schedule.scheduleDate.startsWith(selectedDateTime.date) &&
        schedule.scheduleDate.endsWith(time)
    );

    setSelectedDateTime((prev) => ({
      ...prev,
      time,
      scheduleId: selectedSchedule ? selectedSchedule.scheduleId : null,
    }));
  };

  const getAvailableSchedules = () => {
    getConcertsSchedules(contentId).then((data) => {
      const { response } = data || [];
      if (response && response.length > 0) {
        setAvailableSchedules(response);

        const dates = [
          ...new Set(
            response.map((schedule) => schedule.scheduleDate.split("T")[0])
          ),
        ];
        setAvailableDates(dates);
      }
    });
  };

  const handleNextBtn = () => {
    if (!selectedDateTime.date || !selectedDateTime.time) {
      alert("날짜와 시간, 그리고 스케줄을 선택해주세요.");
      return;
    }

    const selectedSchedule = availableSchedules.find(
      (schedule) => schedule.scheduleId === selectedDateTime.scheduleId
    );

    if (selectedSchedule) {
      handleTabChange(1, {
        scheduleId: selectedSchedule.scheduleId,
        contentId: selectedSchedule.contentId,
        scheduleDate: selectedSchedule.scheduleDate,
        totalSeat: selectedSchedule.totalSeat,
      });
    } else {
      alert("선택한 날짜와 시간에 해당하는 스케줄을 찾을 수 없습니다.");
    }
  };

  // 화면 크기에 따라 상태 업데이트 및 기본 날짜 설정
  useEffect(() => {
    if (contentId) {
      getAvailableSchedules();
    }

    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [contentId]);

  // availableDates가 업데이트될 때 기본 날짜 자동 선택 (작은 화면일 경우만)
  useEffect(() => {
    if (isSmallScreen && availableDates.length > 0 && !selectedDateTime.date) {
      const firstDate = new Date(availableDates[0]);
      handleDateSelect(firstDate);
    }
  }, [isSmallScreen, availableDates]);

  return (
    <div className="reservationFirst">
      <div
        className={`schedules md:p-10 flex ${isSmallScreen ? "flex-col" : ""}`}
      >
        {!isSmallScreen && (
          <div className="concertDate">
            <Calendar
              availableDates={availableDates}
              selectedDate={selectedDateTime}
              onDateSelect={handleDateSelect}
            />
          </div>
        )}

        <div
          className={`concertTime ${
            isSmallScreen ? "w-full mt-4" : "ml-20 w-1/2"
          } border border-gray-300 p-4 rounded-md`}
        >
          <p className="text-lg font-bold mb-2">공연 시간을 선택하세요.</p>
          {selectedDateTime.date && (
            <div>
              <h2 className="mb-2">공연 날짜: {selectedDateTime.date}</h2>
              <ul className="list-disc pl-1">
                {availableTimes.map((time, index) => {
                  const formattedTime = time.split(".")[0];
                  return (
                    <li
                      key={index}
                      className={`py-2 list-none border-b border-gray-200 last:border-b-0 cursor-pointer ${
                        selectedDateTime.time === time
                          ? "text-gray-800 font-bold"
                          : "text-gray-600"
                      }`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {formattedTime}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="nextBtn fixed right-1 bottom-1 md:right-24 md:bottom-10">
        <Button disabled={!selectedDateTime.time} onClick={handleNextBtn}>
          좌석 선택하기
        </Button>
      </div>
    </div>
  );
};

export default ConcertDate;
