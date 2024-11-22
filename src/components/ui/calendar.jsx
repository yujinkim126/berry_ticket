import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  availableDates = [], // 예약 가능한 날짜 리스트
  selectedDate,
  onDateSelect, // 날짜 선택 시 호출할 함수
}) {
  const availableDatesObjects = availableDates.map((date) =>
    new Date(date).toDateString()
  );
  const [userSelectDate, setUserSelectDate] = useState(null);

  useEffect(() => {
    if (selectedDate && selectedDate.date) {
      setUserSelectDate(new Date(selectedDate.date));
    }
  }, [selectedDate]);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      selected={userSelectDate}
      onDayClick={(date) => {
        // 클릭된 날짜를 Date 객체로 변환
        const clickedDate = date.toDateString();

        // 클릭된 날짜가 예약 가능한 날짜 리스트에 포함되는지 확인
        if (availableDatesObjects.includes(clickedDate)) {
          onDateSelect(date);
        }
      }} // 사용자가 날짜를 선택하면 호출
      className={cn("p-3", className)}
      modifiers={{
        available: availableDates.map((date) => new Date(date)), // 예약 가능한 날짜를 강조
      }}
      modifiersClassNames={{
        available: "bg-gray-200 text-slate-900", // 예약 가능한 날짜 스타일
      }}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 dark:[&:has([aria-selected])]:bg-slate-800",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-blue-200 text-slate-900 hover:bg-blue-200 hover:text-slate-900 font-bold focus:bg-blue-200 focus:text-slate-900 font-bold dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900 font-bold",
        day_today: "text-blue-600 dark:bg-slate-800 dark:text-slate-50",
        day_outside:
          "day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
        day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
        day_hidden: "invisible",
        ...classNames,
      }}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
