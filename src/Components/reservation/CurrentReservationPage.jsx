import { useEffect, useState } from "react";
import CurrentConcertCard from "./CurrentConcertCard";
import { getCurrentReservation } from "@/api";

const CurrentReservationPage = () => {
  const [curData, setCurData] = useState([]);

  const getData = () => {
    // api 호출해서 예매 중인 공연 값을 가지고 옴
    getCurrentReservation().then((data) => {
      setCurData(data.response);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="font-[sans-serif] my-4">
        <div className="max-w-5xl max-lg:max-w-2xl mx-auto mt-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 text-2xl font-bold">
              현재 예매 중인 공연입니다.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-md:justify-center mt-12">
            {/** 콘서트 카드 */}
            <CurrentConcertCard curData={curData} />
          </div>
        </div>
      </div>
    </>
  );
};
export default CurrentReservationPage;
