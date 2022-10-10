import { useEffect, useState } from "react";

export default function TokenGate(props) {
  const [tokenMessage, setTokenMessage] = useState("checking for token");
  const CONTRACT = "KT1SbriRraoF4wMffUehazV6bY6FBDZgmkgR";
  const TOKEN = "1598";

  const checkUserWalletForToken = async () => {
    let user = await props.wallet.client.getActiveAccount();
    if (user) {
      let contract = await props.tezos.wallet
        .at(CONTRACT)
        .then((contract) => contract.storage())
        .then((storage) => storage.ledger.get({ 0: user.address, 1: TOKEN }))
        .then((balance) => {
          if (balance) {
            if (balance.toNumber() > 0) {
              setTokenMessage("YOU HAVE THE TOKEN");
            } else {
              setTokenMessage("you don't have the token");
            }
          } else {
            setTokenMessage("you don't have the token");
          }
        });
    } else {
      setTokenMessage("please sync wallet");
    }
  };

  useEffect(() => {
    async function checkWallet() {
      await checkUserWalletForToken();
    }

    checkWallet().catch((error) => console.log(error));
  });

  return (
    <div className="py-80">
      <div className="flex flex-col justify-center items-center align-middle">
        <h1 className="text-2xl">{tokenMessage}</h1>
      </div>
    </div>
  );
}
