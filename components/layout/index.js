import { useState, useEffect, isValidElement, cloneElement } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-sdk";

import Nav from "../nav";

const NETWORK = {
  type: NetworkType.MAINNET,
  rpcUrl: "https://mainnet.smartpy.io",
};

export default function Layout({ children }) {
  const [wallet, setWallet] = useState();
  const [account, setAccount] = useState();

  const tezos = new TezosToolkit(NETWORK.rpcUrl);

  function addPropsToReactElement(element, props) {
    if (isValidElement(element)) {
      return cloneElement(element, props);
    }
    return element;
  }

  function addPropsToChildren(children, props) {
    if (!Array.isArray(children)) {
      return addPropsToReactElement(children, props);
    }
    return children.map((childElement) =>
      addPropsToReactElement(childElement, props)
    );
  }

  const checkAccount = async () => {
    const user = await wallet.client.getActiveAccount();
    if (user) {
      setAccount(user.address);
    } else {
      setAccount(undefined);
    }
  };

  useEffect(() => {
    const createWallet = async () => {
      const wallet = await new BeaconWallet({
        name: "CFD - token gate demo",
        preferredNetwork: NETWORK.type,
      });
      setWallet(wallet);
    };
    if (!wallet) {
      createWallet().catch((err) => console.log(err));
    } else {
      checkAccount().catch((err) => console.log(err));
    }
    tezos.setWalletProvider(wallet);
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Nav
        wallet={wallet}
        tezos={tezos}
        accountFunc={checkAccount}
        activeAccount={account}
      />
      <main className="flex-grow">
        {addPropsToChildren(children, { NETWORK, wallet, tezos })}
      </main>
    </div>
  );
}
