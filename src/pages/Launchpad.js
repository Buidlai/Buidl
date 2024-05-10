import React, { useState, useEffect } from "react";
import Logo from "../images/logo.png";
import ethLogo from "../images/ethlogo.svg";
import { FaArrowDown } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { darkTheme } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";

import { ICOAddress, ICO_ABI } from "../contracts/launchpad";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, base, bscTestnet, baseGoerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const { chains, publicClient } = configureChains(
  [base],
  [
    alchemyProvider({ apiKey: "qVf7pnl78NlUKvDQ4P2mFYmfigvA4D5h" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Buidl",
  projectId: "a6f0f99910338571f7f30020a8364414",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const Launchpad = () => {
  
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [showMinPrice, setShowMinPrice] = useState(false);
  //   const { openConnectModal } = useConnectModal();
  const location = useLocation();
  const [kolCode, setKolCode] = useState("");

  useEffect(() => {

    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    if (code) {
      setKolCode(code);
    }
  }, [location]);


  function checkIsConnected() {
    if (!isConnected) {
      alert("Please Connect Your Wallet");
    }
  }

  useEffect(() => {
    (async () => {
      const price = "30000000000000000";

      const minPrice = "25000000000000000000";

      const priceInETH = ethers.utils.formatEther(price);
      const minPriceInETH = ethers.utils.formatEther(minPrice);
      setPrice(priceInETH);
      setMinPrice(minPriceInETH);
    })();
  }, []);

  const [value, setValue] = useState({
    amountIn: "",
    amountOut: "",
  });
  const current = "launchpad";

  function handleValueChange(e) {
    let { value, name } = e.target;
    const oppositeName = name.includes("amountIn") ? "amountOut" : "amountIn";
    const valueInNumber = Number(value);
    if (valueInNumber <= 0)
      return setValue({ [name]: value, [oppositeName]: "" });
    const conversionRate = 1 / price;

    if (name === "amountIn") {
      const v2 = Number(conversionRate * valueInNumber).toFixed(8);
      setValue({ amountIn: valueInNumber, amountOut: v2 });
    } else if (name === "amountOut") {
      const v2 = valueInNumber * price;
      setValue({ amountIn: v2, amountOut: valueInNumber });
    }
  }

  const [ICOContract, setICOContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleNav() {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
    if (!isNavOpen) {
      setIsNavOpen(true);
    }
  }

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();

          if (accounts.length > 0) {
            setIsConnected(true);
            setupEthereumContract(provider);
          } else {
            setIsConnected(false);
          }
        } catch (error) {
          console.error("Error checking connected accounts:", error);
        }
      } else {
        console.log("Ethereum object not found, install MetaMask.");
        setIsConnected(false);
      }
    };

    const setupEthereumContract = (provider) => {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ICOAddress, ICO_ABI, signer);
      setICOContract(contract);
    };

    checkIfWalletIsConnected();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setIsConnected(true);
          setupEthereumContract(
            new ethers.providers.Web3Provider(window.ethereum)
          );
        } else {
          setIsConnected(false);
          setICOContract(null);
        }
      });
    }
  }, []);



  const transactionSuccessful = (amount) =>
    toast(`Successfully contributed ${amount} ETH`);
  const transactionFailed = () => toast("Contribution failed!");

  async function handleContribution() {
    console.log("Trying to contribute...");

    if (!ICOContract) return console.log("Please Connect Wallet");
    if (value.amountIn < minPrice) {
      setShowMinPrice(true);
      return console.log(`Minimum Contribution is ${minPrice} ETH`);
    }

    const tx = await ICOContract.depositPool("2", "0", {
      value: ethers.utils.parseEther(value.amountIn.toString()),
      gasLimit: 250000,
    });
    await tx.wait();


    if (tx.hash) {
      transactionSuccessful(value.amountIn.toString());
      console.log("contribution succeed");
    } else {
      transactionFailed();
      console.log("Contribution falied");
    }

  }


  const [IDoBalance, setIDoBalance] = useState(0);

  return (
    useEffect(() => {
      const logICOContractBalance = async () => {
        if (ICOContract) {
          console.log("ICOContract Address:", ICOAddress);
          try {
            const pprovider = ICOContract.provider;
            const contractAddress = ICOContract.address;
            const balance = await pprovider.getBalance(contractAddress);
            console.log(
              "ICOContract ETH Balance:",
              ethers.utils.formatEther(balance)
            );

            setIDoBalance(ethers.utils.formatEther(balance));
          } catch (error) {
            console.error("Error getting ICOContract balance:", error);
          }
        }
      };

      logICOContractBalance();

      return () => {};
    }, [ICOContract]),
    (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#ff9800",
            accentColorForeground: "#131010",
          })}
          chains={chains}>
          <div className="bg-slate-900 pb-10 h-screen darker-grotesque">
            <ToastContainer />
            <nav className="flex items-center justify-between md:px-32 px-8 py-5 bg-slate-900">
              <Link to="/">
                <img src={Logo} alt="" width={60} className="cursor-pointer" />
              </Link>
              <div className="md:flex text-white space-x-8 font-semibold hidden">
                <h1 className="cursor-pointer hover:underline">Home</h1>
                <h1 className="cursor-pointer hover:underline">About</h1>
                <h1 className="cursor-pointer hover:underline">How it Works</h1>
              </div>
              <div className="flex items-center space-x-6">
                <ConnectButton />
              </div>
            </nav>

            <div className="text-white border mt-7  rounded-lg  md:w-[35vw] w-[80vw] mx-auto">
              <div className="pt-[5px]">
                <div className="launchpad--container flex flex-col justify-center items-center">
                  <div className="">
                    <div className="presale--proper md:p-10 p-4 rounded-lg flex flex-col  justify-center items-center relative">
                      <div className="flex flex-col md:flex-row w-full">
                        <div className="flex flex-col justify-center items-center green-border p-5 rounded-xl w-[350px] mx-auto">
                          <div>
                            <h1 className="font-bold md:text-xl mb-8 text-2xl text-white">
                              BUIDL PRIVATE SALE
                            </h1>
                          </div>

                          <div className="md:mb-6 mb-3">
                            <div className="mb-10">
                              <div>
                                <h1 className="font-semibold mb-1 text-white md:text-xl">
                                  ETH
                                </h1>
                              </div>
                              <div className="flex space-x-28 items-center relative">
                                <input
                                  className="p-3 w-64 border-gray-950 outline-none border-2 rounded-xl text-black font-semibold"
                                  type="number"
                                  id="amountIn"
                                  placeholder="Input Amount"
                                  name="amountIn"
                                  onChange={handleValueChange}
                                  value={value.amountIn}
                                />
                                <img
                                  src={ethLogo}
                                  className="bg-slate-900 p-2 rounded-md w-6 absolute md:left-28 left-28"
                                  alt="tokenicon "
                                />
                              </div>
                            </div>

                            <FaArrowDown className="md:mb-6 mb-6 text-black bg-[#ff9800] rounded-full mx-auto" />
                            <div>
                              <div>
                                <h1 className="font-semibold mb-1 text-white md:text-xl">
                                  BUIDL-AI
                                </h1>
                              </div>
                              <div className="flex space-x-28 items-center relative mb-3">
                                <input
                                  className="p-3 rounded-xl outline-none w-64 border-gray-950 border-2 text-black font-semibold"
                                  type="number"
                                  id="amountIn"
                                  placeholder="Output Amount"
                                  name="amountOut"
                                  onChange={handleValueChange}
                                  value={value.amountOut}
                                />
                                <img
                                  src={Logo}
                                  className="bg-slate-900 p-2 rounded-md w-14 absolute md:left-20 left-20"
                                  alt="tokenicon "
                                />
                              </div>
                            </div>
                            {showMinPrice && (
                              <p className="text-red-400">
                                {" "}
                                Min Price is {minPrice}
                              </p>
                            )}

                            <br />
                            {IDoBalance > 0 && (
                              <p className="text-green-400">
                                {" "}
                                ETH Raised: {IDoBalance}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            className="text-white md:p-3 p-2  rounded-lg font-semibold text-xl  hover:text-[#131010]
                                                    duration-300 bg-orange-500 w-64 mt-2  mb-4 hover:cursor-pointer"
                            onClick={
                              isConnected
                                ? handleContribution
                                : checkIsConnected
                            }
                            disabled={!value.amountIn || !value.amountOut}>
                            {isConnected ? "CONTRIBUTE" : "CONNECT WALLET"}
                          </button>
                          <div className="code-display mt-2 text-center text-white font-bold">
                            {kolCode && <p>Invitation Code: {kolCode}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    )
  );
};

export default Launchpad;
