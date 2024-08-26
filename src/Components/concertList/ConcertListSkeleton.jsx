import Skeleton from "react-loading-skeleton";

const ConcertListSkeleton = () => {
  return (
    <div className="font-[sans-serif] my-4">
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto mt-10">
        <div className="max-w-2xl mx-auto text-center">
          <Skeleton />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 max-md:justify-center mt-12">
          {/** 콘서트 카드 */}
          {/* {concerts.map((concert, idx) => (
            <ConcertCard key={idx} />
              ))} */}
        </div>
      </div>
    </div>
  );
};
export default ConcertListSkeleton;
