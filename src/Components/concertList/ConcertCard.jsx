const ConcertCard = ({ concert }) => {
  return (
    <div className="border rounded-md overflow-hidden max-md:max-w-[300px] transform transition duration-500 hover:scale-110">
      <img
        src={import.meta.env.VITE_REACT_IMAGE_URL + concert.posterImg}
        className="w-full h-50 object-contain object-top bg-gray-200"
      />
      <div className="p-4">
        <h4 className="text-gray-800 text-base font-bold min-h-[48px] max-h-[100px]">
          {concert.title}
        </h4>
        <div className="mt-4">
          <p className="text-gray-900 text-base leading-relaxed">
            {concert.placeNm}
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
  );
};
export default ConcertCard;
