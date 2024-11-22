import Banner from "@public/img/banner.jpeg";
import ConcertList from "./concertList/ConcertList";

const Home = () => {
  return (
    <div className="HomePage">
      {/** 이미지 배너 */}
      <div className="relative font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
        <img
          src={Banner}
          alt="Banner Image"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="sm:text-4xl text-2xl font-bold mb-6">
            Concert Reservation
          </h2>
          <p>Hello.</p>
          <p className="sm:text-lg text-base text-center text-gray-200">
            This is a concert reservation project using React and Vite!
          </p>
        </div>
      </div>
      <ConcertList />
    </div>
  );
};
export default Home;
