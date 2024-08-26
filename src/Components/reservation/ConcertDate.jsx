import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getConcertsSchedules } from "../../api";
import { Calendar } from "@ui/calendar";
import { Button } from "@ui/button";

const ConCertDate = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const contentId = params.get("contentId") || "testId";
  const { handleTabChange } = props;

  // 전체 공연 정보 상태
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: null,
    time: null,
    scheduleId: null, // 선택된 스케줄 ID 저장
  });

  // 예약 가능한 날짜와 시간 상태
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleDateSelect = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // 선택된 날짜와 시간을 초기화
    setSelectedDateTime({ date: formattedDate, time: null, scheduleId: null });
    console.log("Formatted Date:", formattedDate);
    // 선택된 날짜의 시간 정보를 필터링
    const timesForDate = availableSchedules
      .filter((schedule) => schedule.scheduleDate.startsWith(formattedDate))
      .map((schedule) => schedule.scheduleDate.split("T")[1]);

    setAvailableTimes(timesForDate);
  };

  const handleTimeSelect = (time) => {
    // 선택된 날짜와 시간에 해당하는 스케줄을 찾기
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
      const { schedules } = data?.response || [];
      if (schedules && schedules.length > 0) {
        // 전체 공연 정보를 저장
        setAvailableSchedules(schedules);

        // 예약 가능한 날짜를 캘린더에 이용
        const dates = [
          ...new Set(
            schedules.map((schedule) => schedule.scheduleDate.split("T")[0])
          ),
        ];
        setAvailableDates(dates);

        // 초기 시간 설정 (선택된 날짜의 시간을 필터링)
        if (selectedDateTime.date) {
          const timesForDate = schedules
            .filter((schedule) =>
              schedule.scheduleDate.startsWith(selectedDateTime.date)
            )
            .map((schedule) => schedule.scheduleDate.split("T")[1]);

          setAvailableTimes(timesForDate);
        }
      }
    });
  };

  const handleNextBtn = () => {
    if (!selectedDateTime.date || !selectedDateTime.time) {
      alert("날짜와 시간, 그리고 스케줄을 선택해주세요.");
      return;
    }

    // 선택된 스케줄 정보를 찾기
    const selectedSchedule = availableSchedules.find(
      (schedule) => schedule.scheduleId === selectedDateTime.scheduleId
    );

    if (selectedSchedule) {
      // 선택된 스케줄 정보를 탭 변경 함수로 전달
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

  useEffect(() => {
    if (contentId) {
      getAvailableSchedules();
    }
  }, [contentId]);

  return (
    <div className="reservationFirst">
      <div className="schedules p-10 flex">
        <div className="concertDate">
          <Calendar
            availableDates={availableDates}
            selectedDate={
              selectedDateTime.date ? new Date(selectedDateTime.date) : null
            }
            onDateSelect={handleDateSelect}
          />
        </div>

        <div className="concertTime ml-20 w-1/2 border border-gray-300 p-4 rounded-md">
          <p className="text-lg font-bold mb-2">공연 시간을 선택하세요.</p>
          {selectedDateTime.date && (
            <div>
              <h2 className="mb-2">공연 날짜: {selectedDateTime.date}</h2>
              <ul className="list-disc pl-1">
                {availableTimes.map((time, index) => (
                  <li
                    key={index}
                    className={`py-2 list-none border-b border-gray-200 last:border-b-0 cursor-pointer ${
                      selectedDateTime.time === time
                        ? "text-gray-800 font-bold"
                        : "text-gray-600"
                    }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="nextBtn fixed right-24 bottom-10">
        <Button disabled={!selectedDateTime.time} onClick={handleNextBtn}>
          좌석 선택하기
        </Button>
      </div>
    </div>
  );
};

export default ConCertDate;
