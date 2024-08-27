import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useConcertDetailQuery } from "@/hooks/useConcertQuery";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";

const ConcertDetail = () => {
  const concertParam = useParams();
  const concertId = concertParam.concertId;

  const { data: concert } = useConcertDetailQuery(concertId);
  const concertDetail = concert?.[0] || {};

  return (
    <div className="ConcertInfoPage">
      <div className="font-[sans-serif] my-4">
        <div className="max-w-5xl max-lg:max-w-2xl mx-auto mt-10">
          <div className="max-w-2xl mx-auto text-center">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel>
                <img
                  src={
                    import.meta.env.VITE_REACT_IMAGE_URL +
                    concertDetail.posterImg
                  }
                />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel>
                <Button className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium">
                  예약하기
                </Button>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConcertDetail;
