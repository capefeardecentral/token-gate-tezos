import { useEffect } from "react";

export default function Nav(props) {
  const connectWallet = async () => {
    try {
      console.log("connecting wallet");
      await props.wallet.requestPermissions();
      props.tezos.setWalletProvider(props.wallet);
      props.accountFunc();
    } catch (err) {
      console.log("got error", err);
    }
  };

  const disconnectWallet = async () => {
    await props.wallet.clearActiveAccount();
    props.accountFunc();
  };

  useEffect(() => {
    async function checkWallet() {
      if (props.wallet) {
        props.accountFunc();
      }
    }

    checkWallet().catch((error) => console.log(error));
  });

  return (
    <header className="flex justify-between align-middle text-red-600 border-b-gray-700 border-b-2 shadow-2xl">
      <h1 className="py-5 px-6 text-2xl font-extrabold">
        CFD - token gate demo
      </h1>
      <div className="flex my-3 items-center">
        {(!props.activeAccount && (
          <button
            className="mx-6 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-4 px-6 border border-red-900 hover:border-transparent rounded-xl"
            onClick={connectWallet}
          >
            sync wallet
          </button>
        )) || (
          <button
            className="mx-6 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-4 px-6 border border-red-900 hover:border-transparent rounded-xl"
            onClick={disconnectWallet}
            title="disconnect wallet"
          >
            {props.activeAccount.slice(0, 5) +
              "..." +
              props.activeAccount.slice(-5)}
          </button>
        )}
      </div>
    </header>
  );
}
