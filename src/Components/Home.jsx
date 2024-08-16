import { getConcerts } from "../common";

const Home = () => {
  const testAxios = () => {
    getConcerts().then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <button onClick={testAxios}>테스트</button>
    </div>
  );
};
export default Home;
