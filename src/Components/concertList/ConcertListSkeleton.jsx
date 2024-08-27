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
          <div className="border rounded-md overflow-hidden max-md:max-w-[300px] transform transition duration-500 hover:scale-110">
            <Skeleton className=" w-full h-50 object-contain object-top bg-gray-200" />
            <div className="p-4">
              <h4 className="text-gray-800 text-base font-bold min-h-[48px] max-h-[100px]">
                {/* {concert.title} */}
              </h4>
              <div className="mt-4">
                <p className="text-gray-900 text-base leading-relaxed">
                  {/* {concert.placeNm} */}
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700"
                >
                  예매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConcertListSkeleton;
