import ConcertCard from "./ConcertCard";
import Skeleton from "./ConcertListSkeleton";
import { useConcertQuery } from "@/hooks/useConcertQuery";

const ConcertList = () => {
  const { data, isLoading } = useConcertQuery();

  if (isLoading)
    return (
      <div>
        <Skeleton />
      </div>
    );

  return (
    <div className="font-[sans-serif] my-4">
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto mt-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 text-2xl font-bold">
            현재 예매 가능한 공연은{" "}
            <span className="text-blue-800 font-extrabold">
              {data.length}개
            </span>{" "}
            입니다.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-md:justify-center mt-12">
          {/** 콘서트 카드 */}
          {data.map((concert, idx) => (
            <ConcertCard key={idx} concert={concert} />
          ))}
        </div>
        ;
      </div>
    </div>
  );
};
export default ConcertList;
