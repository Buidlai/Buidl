import React, { useState, useEffect } from "react";
import Logo from "../images/logo.png";
import ethLogo from "../images/ethlogo.svg";
import { FaArrowDown } from "react-icons/fa";
import { RiSwapFill } from "react-icons/ri";
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
import TermsModal from "../Components/TermsModal";

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
  const [refLink, setRefLink] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(true);
  const [ref, setRef] = useState("");
  const [accRefPoints, setAccRefPoints] = useState("");
  const [signerAdress, setSignerAddress] = useState("");
  const [hasParticipated, setHasParticipated] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const startTime = 1715770800;
  const endTime = 1716243180;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const timeUntilStart = startTime - now;
      const timeUntilEnd = endTime - now;

      if (timeUntilStart > 0) {
        const hours = Math.floor(timeUntilStart / 3600);
        const minutes = Math.floor((timeUntilStart % 3600) / 60);
        const seconds = timeUntilStart % 60;
        setTimeLeft(`Starts in: ${hours}h ${minutes}m ${seconds}s`);
      } else if (timeUntilEnd > 0) {
        const hours = Math.floor(timeUntilEnd / 3600);
        const minutes = Math.floor((timeUntilEnd % 3600) / 60);
        const seconds = timeUntilEnd % 60;
        setTimeLeft(`Ends in: ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Sale has ended");
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const checkParticipationStatus = async () => {
    if (ICOContract) {
      //console.log.log(ICOContract);
      //console.log.log(signerAdress);
      const tx = await ICOContract.hasParticipated(signerAdress);

      if (tx) {
        //console.log.log("updating participation state");
        setHasParticipated(true);
      }

      //console.log.log({ participated: tx });
    }
  };

  const transactionSuccessful = (amount, walletAddress) => {
    toast(`Successfully contributed ${amount} ETH`);
    const newRefLink = `https://private.buidlai.pro/path?ref=${walletAddress}&kol=${kolCode}`;
    setRefLink(newRefLink);
    //console.log("Referral Link:", newRefLink);
  };
  const invalidInviteCode = () => {
    toast(`Invalid Invite Code`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referrer = searchParams.get("ref");
    const kol = searchParams.get("kol");

    if (referrer && kol) {
      //console.log(`Referred by wallet: ${referrer} with KOL code: ${kol}`);
      setRef(referrer);
      // I will handle the referral logic here
    }

    //console.log(refLink);

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
      const price = "50000";

      const minPrice = "30000000000000000";

      const priceInETH = ethers.utils.formatEther(price);
      const minPriceInETH = ethers.utils.formatEther(minPrice);
      setPrice(priceInETH);
      setMinPrice(minPriceInETH);
      //console.log.log({ minPriceInETH });
      //console.log.log({ minPrice });
    })();
  }, []);

  const [value, setValue] = useState({
    amountIn: "",
    amountOut: "",
  });
  const current = "launchpad";

  // function handleValueChange(e) {
  //   let { value, name } = e.target;
  //   const oppositeName = name.includes("amountIn") ? "amountOut" : "amountIn";
  //   const valueInNumber = Number(value);
  //   if (valueInNumber <= 0)
  //     return setValue({ [name]: value, [oppositeName]: "" });

  //   const conversionRate = 1 / price;

  //   if (name === "amountIn") {
  //     const v2 = Number(conversionRate * valueInNumber).toFixed(8);
  //     setValue({ amountIn: valueInNumber, amountOut: v2 });
  //   } else if (name === "amountOut") {
  //     const v2 = valueInNumber * price;
  //     setValue({ amountIn: v2, amountOut: valueInNumber });
  //   }
  // }

  function handleValueChange(e) {
    const { value, name } = e.target;
    const oppositeName = name === "amountIn" ? "amountOut" : "amountIn";
    const valueInNumber = Number(value);

    if (valueInNumber <= 0) {
      return setValue({ [name]: value, [oppositeName]: "" });
    }

    const price = 50000; // Number of BUIDL tokens per 1 ETH

    if (name === "amountIn") {
      const amountOut = (valueInNumber * price).toFixed(0);
      setValue({ amountIn: value, amountOut: amountOut });
    } else if (name === "amountOut") {
      const amountIn = (valueInNumber / price).toFixed(8);
      setValue({ amountIn: amountIn, amountOut: value });
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
        //console.log("Ethereum object not found, install MetaMask.");
        setIsConnected(false);
      }
    };

    const setupEthereumContract = async (provider) => {
      //console.log("Setting contract");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ICOAddress, ICO_ABI, signer);

      try {
        const signerAddress = await signer.getAddress();
        setSignerAddress(signerAddress);
        //console.log("Signer Address:", signerAddress);

        const referralPoints = await contract.referralPoints(signerAddress);
        //console.log("Referral Points:", referralPoints.toString());
        const formattedRefPoints = ethers.utils.formatEther(
          referralPoints.toString()
        );
        const finalRefPointMul = formattedRefPoints * 1000;
        //console.log("formattedRefPoints", finalRefPointMul);

        setAccRefPoints(finalRefPointMul.toString());

        setICOContract(contract);
      } catch (error) {
        console.error("Error accessing the contract or fetching data:", error);
      }

      //console.log(contract);
      //console.log(ICOAddress);
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

    checkParticipationStatus();
  }, [termsAccepted]);

  const transactionFailed = () => toast("Contribution failed!");

  async function handleContribution() {
    //console.log("Trying to contribute...");
    //console.log({ ref });
    //console.log({ refLink });

    if (!ICOContract || !isConnected) return; //console.log("Please Connect Wallet");
    // if (value.amountIn < minPrice) {
    //   setShowMinPrice(true);
    //   return; //console.log(`Minimum Contribution is ${minPrice} ETH`);
    // }

    let KOL_CODE;

    if (kolCode) {
      KOL_CODE = kolCode.toString();
    } else {
      KOL_CODE = "0";
    }

    let REFERRAL;
    if (ref) {
      REFERRAL = ref.toString();
    } else {
      REFERRAL = "0x0000000000000000000000000000000000000000";
    }

    //console.log(KOL_CODE);

    try {
      // console.log(
      //   "depositing:",
      //   value.amountIn,
      //   "through:",
      //   KOL_CODE,
      //   REFERRAL
      // );
      const tx = await ICOContract.depositPool("2", "0", KOL_CODE, REFERRAL, {
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
    //console.log("Initializing...");

    if (!ICOContract) return console.log("Please Connect Wallet");

    // const tx = await ICOContract.initialize(
    //   lpToken,
    //   offeringToken,
    //   startTime,
    //   endTime,
    //   admin
    // );
    // await tx.wait();

    // if (tx.hash) {
    //   transactionSuccessful(value.amountIn.toString());
    //   console.log("setting pool 0");

    const tx2 = await ICOContract.updateStartAndendTimestamps(
      "1716386109",
      "1905688509"
    );
    await tx2.wait();

    if (tx2.hash) {
      transactionSuccessful(value.amountIn.toString());
      console.log(" time updated 0 set ");
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
        //console.log("ICOContract Address:", ICOAddress);
        try {
          const pprovider = ICOContract.provider;
          const contractAddress = ICOContract.address;
          const balance = await pprovider.getBalance(contractAddress);
          // console.log(
          //   "ICOContract ETH Balance:",
          //   ethers.utils.formatEther(balance)
          // );

          setIDoBalance(ethers.utils.formatEther(balance));
        } catch (error) {
          console.error("Error getting ICOContract balance:", error);
        }
      }
    };

    logICOContractBalance();

    return () => {};
  }, [ICOContract]);

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
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#EEA20E",
          accentColorForeground: "#131010",
          fontStack: "darker-grotesque",
        })}
        chains={chains}>
        <div className="bg-slate-900 h-screen md:h-full pb-10 darker-grotesque">
          <ToastContainer />
          <nav className="flex items-center justify-between md:px-32 px-8 py-5 bg-slate-900">
            <a href="https://buidlai.pro/">
              <img src={Logo} alt="" width={60} className="cursor-pointer" />
            </a>
            <div className="md:flex text-white space-x-8 font-semibold hidden">
              <a
                href="https://buidlai.pro/"
                className="cursor-pointer hover:underline">
                Home
              </a>
              <a
                href="https://buidlai.pro/about.html"
                className="cursor-pointer hover:underline">
                About
              </a>
              <a
                href="https://buidlai.pro/how-it-works-founder.html"
                className="cursor-pointer hover:underline">
                How it Works
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <ConnectButton />
            </div>
          </nav>

          {/* <div className="text-blue-900 underline mb-4 text-center bg-[#EEA20E]  mx-auto">
            <a href="https://www.orbiter.finance/?source=Ethereum&dest=Base&token=ETH">
              Brigde ETH to Base
            </a>
          </div> */}

          <div className="w-fit mx-auto space-x-6 mt-4">
            <a
              href=""
              className="text-black font-semibold w-fit mx-auto md:px-14 px-4 text-center text-xl bg-[#EEA20E] py-2 mb-3">
              Sale is Live!
            </a>
            <a
              href="https://doc.buidlai.pro/"
              className="text-black font-semibold underline hover:brightness-125 duration-300 w-fit mx-auto md:px-14 px-4 text-center text-xl bg-[#EEA20E] py-2 mb-3">
              Read Docs
            </a>
          </div>

          <div className="text-white md:w-[35vw] w-[80vw] mx-auto font-semibold text-xl ">
            {accRefPoints && (
              <p className="invitation-code mx-auto text-center">
                Your Accumulated Ref Points: {Number(accRefPoints)}
              </p>
            )}
          </div>

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
                                "0x2269F2Ceee363F34d7D23322f2ae4DCC0e4e8cac",
                                "1715770800",
                                "1715943600",
                                "0x0fAC34e7349b7DFE20AEa320E578f4F0D95eC6C3"
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

                          <div className=" bg-[#EEA20E] w-fit p-1 rounded-full mx-auto mb-2">
                            <RiSwapFill className=" text-slate-900 text-center rounded-full text-2xl " />
                          </div>

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
                              Minimum Purchase: {minPrice} ETH
                            </p>
                          )}

                          <br />
                          {/* {IDoBalance > 0 && (
                            <p className="text-green-400">
                              {" "}
                              ETH Raised: {IDoBalance}
                            </p>F
                          )} */}
                        </div>

                        <button
                          type="button"
                          className="text-black md:p-3 p-2  rounded-lg font-semibold text-xl  hover:text-white
                                                    duration-300 bg-[#EEA20E] w-64 mt-2  mb-4 hover:cursor-pointer"
                          onClick={
                            isConnected ? handleContribution : checkIsConnected
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
                          {/* {refLink && (
                            <div className="ref-link-container px-3 text-wrap mt-4">
                              <p className="ref-link">
                                Click to copy Your Ref Link:
                              </p>
                              <p
                                className="border border-[#EEA20E] p-2 rounded-lg mt-1"
                                onClick={() => copyToClipboard(refLink)}>
                                {refLink}
                              </p>
                            </div>
                          )} */}
                          {hasParticipated && (
                            <div className="ref-link-container px-3 text-wrap mt-4">
                              <p className="ref-link">
                                Click to copy Your Ref Link:
                              </p>
                              <p
                                className="border text-white border-[#EEA20E] p-2 rounded-lg mt-1"
                                onClick={() => copyToClipboard(refLink)}>
                                {`https://private.buidlai.pro/path?ref=${signerAdress}&kol=${kolCode}`}
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
  );
};

export default Launchpad;
