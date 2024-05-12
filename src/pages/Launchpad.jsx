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
import TermsModal from '../Components/TermsModal';


const baseSepolia = {
  id: 84532,
  network: "base-sepolia",
  name: "Base sepolia",
  nativeCurrency: {
    name: "Base sepolia",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://base-sepolia.blockpi.network/v1/rpc/public"],
    },
    public: {
      http: ["https://base-sepolia.blockpi.network/v1/rpc/public"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Basescan",
      url: "https://base-sepolia.blockscout.com",
    },
    default: {
      name: "Basescan",
      url: "https://base-sepolia.blockscout.com",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1376988,
    },
  },
  testnet: true,
};

const { chains, publicClient } = configureChains(
  [baseSepolia],
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
  const [refLink, setRefLink] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(true);

  const transactionSuccessful = (amount, walletAddress) => {
    toast(`Successfully contributed ${amount} ETH`);
    const newRefLink = `https://yourapp.com?ref=${walletAddress}&kol=${kolCode}`;
    setRefLink(newRefLink);
    console.log("Referral Link:", newRefLink); // Logging the link to console for testing
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referrer = searchParams.get("ref");
    const kol = searchParams.get("kol");

    if (referrer && kol) {
      console.log(`Referred by wallet: ${referrer} with KOL code: ${kol}`);
      // I will handle the referral logic here
    }

    console.log(refLink);

    if (kol) {
      setKolCode(kol);
    }
  }, [location, refLink]);

  function checkIsConnected() {
    if (!isConnected) {
      alert("Please Connect Your Wallet");
    }
  }

  useEffect(() => {
    (async () => {
      const price = "30000000000000000";

      const minPrice = "2500000000000";

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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast("Failed to copy link.");
    }
  };

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
      console.log(signer);
      console.log(contract);
      console.log(ICOAddress);
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

  const transactionFailed = () => toast("Contribution failed!");

  async function handleContribution() {
    console.log("Trying to contribute...");

    if (!ICOContract || !isConnected)
      return console.log("Please Connect Wallet");
    if (value.amountIn < minPrice) {
      setShowMinPrice(true);
      return console.log(`Minimum Contribution is ${minPrice} ETH`);
    }

    try {
      const tx = await ICOContract.depositPool("2", "0", "1234", {
        value: ethers.utils.parseEther(value.amountIn.toString()),
        gasLimit: 2500000,
      });
      await tx.wait();

      if (tx.hash) {
        const signer = await ICOContract.signer.getAddress();
        transactionSuccessful(value.amountIn.toString(), signer);
      } else {
        transactionFailed();
      }
    } catch (error) {
      transactionFailed();
      console.error("Contribution failed", error);
    }
  }

  async function initializeAndSetPool(
    lpToken,
    offeringToken,
    startTime,
    endTime,
    admin
  ) {
    console.log("Initializing...");

    if (!ICOContract) return console.log("Please Connect Wallet");
    // if (value.amountIn < minPrice) {
    //   setShowMinPrice(true);
    //   return console.log(`Minimum Contribution is ${minPrice} ETH`);
    // }

    // const tx = await ICOContract.initialize(
    //   lpToken,
    //   offeringToken,
    //   startTime,
    //   endTime,
    //   admin
    // );
    // await tx.wait();

    // if (tx.hash) {
    //transactionSuccessful(value.amountIn.toString());
    console.log("setting pool 0");

    const tx = await ICOContract.setPool(
      "2000000000000000000000",
      "2000000000000000000",
      "2000000000000000000000",
      "0",
      "false",
      "0"
    );
    await tx.wait();

    if (tx.hash) {
      transactionSuccessful(value.amountIn.toString());
      console.log("setting pool 0");
    }
    // } else {
    //   transactionFailed();
    //   console.log("Contribution falied");
    // }
  }

  const [IDoBalance, setIDoBalance] = useState(0);

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
    }, [ICOContract])

  if (!termsAccepted && showTermsModal) {
    return (
      <TermsModal
        onAccept={(accepted) => {
          if (accepted) {
            setTermsAccepted(true);
            setShowTermsModal(false);
          }
        }}
      />
    );
  }

  return (
    

    
    (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#ff9800",
            accentColorForeground: "#131010",
          })}
          chains={chains}>
          <div className="bg-slate-900 h-screen pb-10 darker-grotesque">
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
                            <h1
                              className="font-bold md:text-xl mb-8 text-2xl text-white"
                              onClick={() => {
                                initializeAndSetPool(
                                  "0x0000000000000000000000000000000000000000",
                                  "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
                                  "1715522439",
                                  "1715525139",
                                  "0xc4eBB032d6de76c3971F7822928b0db49Bb1fcae"
                                );
                              }}>
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
                                                    duration-300 bg-orange-400 w-64 mt-2  mb-4 hover:cursor-pointer"
                            onClick={
                              isConnected
                                ? handleContribution
                                : checkIsConnected
                            }
                            disabled={!value.amountIn || !value.amountOut}>
                            {isConnected ? "CONTRIBUTE" : "CONNECT WALLET"}
                          </button>
                          <div className="code-display mt-2 text-center text-white font-bold w-fit">
                            {kolCode && (
                              <p className="invitation-code">
                                Invitation Code: {kolCode}
                              </p>
                            )}
                            {refLink && (
                              <div className="ref-link-container px-3 text-wrap mt-4">
                                <p className="ref-link">
                                  Click to copy Your Ref Link:
                                </p>
                                <p
                                  className="border border-orange-300 p-2 rounded-lg mt-1"
                                  onClick={() => copyToClipboard(refLink)}>
                                  {refLink}
                                </p>
                              </div>
                            )}
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
