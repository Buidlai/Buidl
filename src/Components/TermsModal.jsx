import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";

const TermsModal = ({ onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="bg-slate-800 h-screen darker-grotesque">
      <nav className="flex items-center justify-between md:px-32 px-8 py-5 bg-slate-900">
        <Link to="/">
          <img src={Logo} alt="" width={60} className="cursor-pointer" />
        </Link>
        <div className="md:flex  text-white space-x-8 font-semibold hidden">
          <h1 className="cursor-pointer hover:underline">Home</h1>
          <h1 className="cursor-pointer hover:underline">About</h1>
          <h1 className="cursor-pointer hover:underline">How it Works</h1>
        </div>
        <div className="flex items-center space-x-6">
          <button className=" bg-orange-500 font-bold text-white py-2 px-8 rounded-2xl text-lg cursor-pointer">
            Connect Wallet
          </button>
        </div>
      </nav>

      <div className="fixed inset-0 bg-slate-800 px-6 bg-opacity-50 flex justify-center items-center z-50">
        <div
          className="bg-orange-400 p-4 rounded-lg max-w-md w-full"
          style={{ maxHeight: "80vh", overflow: "auto" }}>
          <h2 className="text-lg font-bold">Terms and Conditions</h2>
          <div
            className="text-sm mt-2 overflow-y-auto"
            style={{ maxHeight: "50vh" }}>
            <p className="font-bold mb-2">
              Please read and accept our terms and conditions to continue.
            </p>
            <p className="text-black text-justify">
              All participants must understand that cryptocurrencies involve
              substantial risk. we do not guarantee the performance or return on any investments. Users
              must conduct their own due diligence and consult with financial,
              legal, and tax professionals before participating in any funding
              activities.
              <br />
              <br />
              The regulatory status of cryptographic tokens and blockchain
              technology is unclear or unsettled in many jurisdictions. It is
              your responsibility to ensure that you comply with all relevant
              laws and regulations in your jurisdiction before participating in
              any project listed on this Platform.
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="acceptTerms"
              className="mr-2"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="acceptTerms">I understand and accept</label>
          </div>
          <button
            className="mt-4 bg-blue-500 font-bold text-white py-2 px-8 rounded hover:bg-blue-600"
            onClick={() => onAccept(isChecked)}
            disabled={!isChecked}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
