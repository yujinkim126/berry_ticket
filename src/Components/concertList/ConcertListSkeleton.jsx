const ConcertListSkeleton = () => {
  // count에 따라 스켈레톤 카드 개수 설정
  const cardCount = 30;

  return (
    <div className="font-[sans-serif] my-4">
      <div className="max-w-5xl max-lg:max-w-2xl mx-auto mt-10">
        <div className="max-w-2xl mx-auto text-center"></div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 max-md:justify-center mt-12">
          {/* 카드 전체 영역 */}
          {Array.from({ length: cardCount }).map((_, index) => (
            <div
              key={index}
              className="border rounded-md overflow-hidden max-md:max-w-[300px] transform transition duration-500"
            >
              {/* 이미지 */}
              <div className="w-full min-h-[450px] object-contain object-top bg-gray-200" />
              {/* 타이틀 */}
              <div className="p-4">
                <h4 className="bg-gray-200 max-w-[200px]  min-h-[48px] max-h-[80px]"></h4>
                {/* 버튼 */}
                <div className="mt-8">
                  <button
                    type="button"
                    className="min-w-24 min-h-11 px-5 py-2.5 rounded-full tracking-wider outline-none bg-gray-200"
                  ></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConcertListSkeleton;
