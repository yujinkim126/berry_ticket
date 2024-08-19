const Home = () => {
  const testAxios = () => {
    fetch("/api/concerts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="HomePage">
      {/** 이미지 배너 */}
      <div className="relative font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
        <img
          src="https://readymadeui.com/cardImg.webp"
          alt="Banner Image"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="sm:text-4xl text-2xl font-bold mb-6">
            Explore the World
          </h2>
          <p className="sm:text-lg text-base text-center text-gray-200">
            Embark on unforgettable journeys. Book your dream vacation today!
          </p>

          <button
            type="button"
            className="mt-12 bg-transparent text-white text-base py-3 px-6 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
      {/** 콘서트 리스트 컨테이너 */}
      <div className="font-[sans-serif] my-4">
        <div className="max-w-5xl max-lg:max-w-2xl mx-auto mt-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-gray-800 text-4xl font-extrabold">
              Meet our team
            </h2>
            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              Veniam proident aute magna anim excepteur et ex consectetur velit
              ullamco veniam minim aute sit. Ullamco nisi enim ipsum irure
              laboris ad ut. Esse cupidatat deserunt magna aute.
            </p>
          </div>
          {/** 콘서트 리스트 컨테이너 */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 max-md:justify-center mt-12">
            {/** 콘서트 카드 */}
            <div className="border rounded-md overflow-hidden max-md:max-w-[300px]">
              <img
                src="https://readymadeui.com/team-1.webp"
                className="w-full h-50 object-contain object-top bg-gray-200"
              />
              <div className="p-4">
                <h4 className="text-gray-800 text-base font-bold">John Doe</h4>
                <p className="text-gray-600 text-xs mt-1">Software Engineer</p>

                <div className="mt-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Eiusmod commodo aliquip laboris qui anim non voluptate
                    consectetur.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700"
                    onClick={testAxios}
                  >
                    테스트
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
