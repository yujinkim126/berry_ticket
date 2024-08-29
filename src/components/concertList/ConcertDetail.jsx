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

const ConcertDetail = () => {
  const concertParam = useParams();
  const concertId = concertParam.concertId;

  const { data: concert, isFetching } = useConcertDetailQuery(concertId);
  const concertDetail = concert?.[0] || {};

  const { openPopup } = usePopupStore();

  const onClickReserveBtn = () => {
    /**
     * 예매하기 버튼 클릭 시, 대기열을 조회한다.
     * 조회 시, 대기열이 있는 경우 대기열 알림 팝업을 표출하고
     * 없는 경우에는 일정을 선택할 수 있는 팝업을 표출한다.
     */
    // 대기열이 없는 경우
    // else{
    openPopup(<QueuePopup />);
    // }
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
    <div className="ConcertInfoPage px-4 md:px-0">
      <div className="flex justify-center mt-10">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full md:max-w-[1000px] rounded-lg border flex-col md:flex-row"
        >
          {/** 공연 포스터 이미지 컨테이너 */}
          <ResizablePanel defaultSize={35} className="w-full md:w-[35%]">
            <img
              src={
                import.meta.env.VITE_REACT_IMAGE_URL + concertDetail.posterImg
              }
              alt="Concert Poster"
              className="w-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </ResizablePanel>
          <ResizableHandle />
          {/** 공연 정보 컨테이너 */}
          <ResizablePanel
            defaultSize={65}
            className="flex flex-col w-full md:w-[65%]"
          >
            <ResizablePanelGroup
              direction="vertical"
              className="px-4 md:px-10 flex-grow"
            >
              {/** 공연 제목 컨테이너 */}
              <ResizablePanel
                defaultSize={20}
                className="flex w-full items-center text-lg md:text-2xl font-semibold mt-4 md:mt-0"
              >
                {concertDetail.title}
              </ResizablePanel>
              <ResizableHandle />
              {/** 공연 상세 정보 컨테이너 */}
              <ResizablePanel
                defaultSize={50}
                className="w-full text-xs md:text-sm h-full flex items-center"
              >
                <div className="box_consert_info mt-5 flex flex-col md:flex-row items-center w-full">
                  <dl className="info_left w-full md:w-1/2">
                    <div className="flex mb-2 items-center">
                      <dt className="tit_info w-1/3 font-medium">공연기간</dt>
                      <dd className="txt_info w-2/3" id="periodInfo">
                        {concertDetail.periodInfo}
                      </dd>
                    </div>
                    <div className="flex mb-2 items-center">
                      <dt className="tit_info w-1/3 font-medium">관람시간</dt>
                      <dd className="txt_info w-2/3">
                        {concertDetail.runningTime}
                      </dd>
                    </div>
                    <div className="flex mb-2 items-center">
                      <dt className="tit_info w-1/3 font-medium">장르</dt>
                      <dd className="txt_info w-2/3">
                        {concertDetail.perfTypeName}
                      </dd>
                    </div>
                  </dl>

                  <dl className="info_right w-full md:w-1/2 mt-4 md:mt-0">
                    <div className="flex mb-2 items-center">
                      <dt className="tit_info w-1/3 font-medium">공연장</dt>
                      <dd className="txt_info w-2/3">
                        <span className="place">{concertDetail.placeName}</span>
                      </dd>
                    </div>
                    <div className="flex mb-2 items-center">
                      <dt className="tit_info w-1/3 font-medium">관람등급</dt>
                      <dd className="txt_info w-2/3">8세 이상</dd>
                    </div>
                    <div className="flex mb-2 items-center">
                      <dt className="tit_info w-1/3 font-medium">할인혜택</dt>
                      <dd className="txt_info w-2/3">
                        <span>무이자</span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </ResizablePanel>

              <ResizableHandle />

              {/** 예약 숙지 정보 컨테이너 */}
              <ResizablePanel
                defaultSize={50}
                className="flex h-full items-center justify-center text-xs md:text-sm"
              >
                <div className="box_consert_info mt-5 flex flex-col md:flex-row w-full">
                  <dl className="info_left w-full">
                    <div className="flex mb-2 items-center">
                      <dt className="tit_info w-1/4 font-medium">배송정보</dt>
                      <dd className="txt_info w-3/4">
                        {concertDetail.recieveInfo}
                      </dd>
                    </div>
                    <div className="flex mb-2 items-center">
                      <dt className="tit_info w-1/4 font-medium">문의정보</dt>
                      <dd className="txt_info w-3/4">{concertDetail.csInfo}</dd>
                    </div>
                  </dl>
                </div>
              </ResizablePanel>

              <ResizableHandle />
              {/** 예매하기 버튼 컨테이너 */}
              <ResizablePanel
                defaultSize={30}
                className="flex h-full items-center justify-center"
              >
                <Button
                  className="w-full md:w-auto px-8 py-6 md:px-24 md:py-8 bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-lg rounded-md focus:ring-4 focus:ring-blue-300"
                  onClick={onClickReserveBtn}
                >
                  예매하기
                </Button>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ConcertDetail;
