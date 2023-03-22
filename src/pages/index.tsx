import Header from "@components/Header/Header";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return <Header isLogged={false} userName={""} photoUrl="" />;
};
export default Home;
