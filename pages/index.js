import Head from "next/head";
import TokenGate from "../components/tokengate";

const Home = (props) => {
  return (
    <div className="">
      <Head>
        <title>CFD - Token Gate Demo</title>
      </Head>
      <TokenGate wallet={props.wallet} tezos={props.tezos} />
    </div>
  );
};

export default Home;
