import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useConcertDetailQuery } from "@/hooks/useConcertQuery";
import { useParams } from "react-router-dom";
import { Button } from "@ui/button";
import QueuePopup from "../popup/QueuePopup";
import usePopupStore from "../store/usePopupStore";
import useLoginStateStore from "../store/useLoginStateStore";
import LoginPopup from "../popup/LoginPopup";
import ReservationPage from "../reservation/ReservationPage";
import { useState } from "react";

const ConcertDetail = () => {
  const concertParam = useParams();
  const concertId = concertParam.concertId;

  const { data: concert, isFetching } = useConcertDetailQuery(concertId);
  const concertDetail = concert?.[0] || {};

  const { isLogin } = useLoginStateStore();
  const { openPopup } = usePopupStore();

  // api 나오기 전 대기열 판단
  const [waiting, setWaiting] = useState(false);

  const onClickReserveBtn = () => {
    /**
     * 로그인을 하지 않은 사용자가 예매하기 버튼을 클릭한 경우
     * 로그인 팝업 표출
     */
    if (!isLogin) return openPopup(<LoginPopup />);

    /**
     * 예매하기 버튼 클릭 시, 대기열을 조회한다.
     * 조회 시, 대기열이 있는 경우 대기열 알림 팝업을 표출하고
     * 없는 경우에는 일정을 선택할 수 있는 팝업을 표출한다.
     */
    if (waiting) return openPopup(<QueuePopup />);
    else return openPopup(<ReservationPage />);
  };

  if (isFetching) {
    return (
      <div className="w-full h-full text-center mt-10">
        <div
          role="status"
          className="h-[50vw] flex justify-center items-center"
        >
          <svg
            aria-hidden="true"
            className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ConcertInfoPage px-4 lg:px-0 lg:mt-16">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-[1000px] rounded-lg border flex flex-col lg:flex-row">
          {/* 공연 포스터 이미지 컨테이너 */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <img
              src={
                import.meta.env.VITE_REACT_IMAGE_URL + concertDetail.posterImg
              }
              alt="Concert Poster"
              className="w-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
            />
          </div>

          {/* 공연 정보 컨테이너 */}
          <div className="w-full lg:w-2/3 flex flex-col p-4 lg:p-8 space-y-6 lg:space-y-4">
            {/* 공연 제목 컨테이너 */}
            <div className="text-center lg:text-left text-xl lg:text-3xl font-semibold">
              {concertDetail.title}
            </div>

            {/* 공연 상세 정보 컨테이너 */}
            <div className="flex flex-col lg:flex-row lg:justify-between text-sm lg:text-lg space-y-4 lg:space-y-0">
              <div className="w-full lg:w-1/2 space-y-3">
                <div className="flex items-center">
                  <span className="font-medium w-1/3">공연기간</span>
                  <span className="w-2/3">{concertDetail.periodInfo}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-1/3">관람시간</span>
                  <span className="w-2/3">{concertDetail.runningTime}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-1/3">장르</span>
                  <span className="w-2/3">{concertDetail.perfTypeName}</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-3">
                <div className="flex items-center">
                  <span className="font-medium w-1/3">공연장</span>
                  <span className="w-2/3">{concertDetail.placeName}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-1/3">관람등급</span>
                  <span className="w-2/3">8세 이상</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-1/3">할인혜택</span>
                  <span className="w-2/3">무이자</span>
                </div>
              </div>
            </div>

            {/* 예약 숙지 정보 컨테이너 */}
            <div className="text-sm lg:text-base space-y-3">
              <div className="flex items-center">
                <span className="font-medium w-1/4">배송정보</span>
                <span className="w-3/4">{concertDetail.recieveInfo}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-1/4">문의정보</span>
                <span className="w-3/4">{concertDetail.csInfo}</span>
              </div>
            </div>

            {/* 예매하기 버튼 컨테이너 */}
            <div className="flex justify-center lg:items-center mt-6 lg:mt-4 lg:h-full">
              <button
                className="w-full lg:w-auto px-6 py-3 lg:px-20 lg:py-5 bg-blue-600 hover:bg-blue-700 text-white text-base lg:text-xl lg:font-semibold rounded-md focus:ring-4 focus:ring-blue-300"
                onClick={onClickReserveBtn}
              >
                예매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcertDetail;
