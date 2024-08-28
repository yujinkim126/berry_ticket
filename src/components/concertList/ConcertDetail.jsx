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
// import ConcertListSkeleton from "./ConcertListSkeleton";

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
    console.log("희연 패칭중 !!");
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
