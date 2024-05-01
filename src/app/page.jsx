"use client";
import Image from "next/image";
import ellipsis from "./assets/bg-ellipse.svg";
import dappConnection from "./assets/illustrations/dapp-connection.png";
import gasless from "./assets/illustrations/gasless.png";
import multichain from "./assets/illustrations/multichain.png";
import smartWallet from "./assets/illustrations/smart-wallets.png";
import stateOfArt from "./assets/illustrations/state-of-art.png";
import line from "./assets/line.svg";
import logo from "./assets/walletx.png";
import close from "./assets/close.svg";

import discord from "./assets/socials/discord.svg";
import telegram from "./assets/socials/telegram.svg";
import twitter from "./assets/socials/twitter.svg";
import "./globals.css";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Home() {
  const [hoveredState, setHoveredState] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("all");

  const illustrations = [
    {
      id: "multichain",
      image: multichain,
      name: "MultiChain",
      about:
        "Transcend blockchain boundaries and effortlessly manage your assets across multiple chains. Unlock the full potential of DecentralizedFinance (Defi) by swapping and bridging your assets across chains effortlessly.",
    },
    {
      id: "stateOfArt",
      image: stateOfArt,
      name: "State of Art",
      about:
        "WalletX uses passkeys to authenticate the user and to sign transactions ensuring that your wallet is non-custordial and your assets are completely in your control",
    },
    {
      id: "smartwallet",
      image: smartWallet,
      name: "Smart Wallet",
      about:
        "Your wallets are built on top of ERC4337 (Account Abstraction) enabling you to batch your transactions and pay for transactoins using the ERC20 token of your choice along with many other features.",
    },
    {
      id: "dappConnection",
      image: dappConnection,
      name: "Dapp Connection",
      about:
        "WalletX being a browser extension wallet allows you to seamlessly connect  to your favourite dApps and explore the depths of the web3 ecosystem.",
    },
    {
      id: "gasless",
      image: gasless,
      name: "Gasless",
      about:
        "Enjoy the freedom of transacting onchain gasless using our cutting edge ad driven solution",
    },
  ];

  const iconsRef = useRef([]);

  const animateMenu = (elementIndex, revert = false) => {
    if (isAnimating) return;

    if (revert) {
      console.log("reverting all");
      gsap.to(iconsRef.current, {
        x: 0,
        scale: 1,
        transform: "none",
        opacity: 1,
        duration: elementIndex > 3 ? 1 : 0.5,
        ease: "power4.out",
        onComplete: () => setIsAnimating(false),
      });
      return;
    } else {
      console.log("animating ", elementIndex);

      const element = iconsRef.current[elementIndex];

      const leftPosi = 0;
      const leftOfElement = element.getBoundingClientRect().left;
      const distanceToMove = leftPosi - leftOfElement + 300;

      gsap.to(iconsRef.current, {
        x: 0,
        scale: 0,
        opacity: 0,
      });

      gsap.to(element, {
        x: distanceToMove,
        scale: 1.3,
        opacity: 1,
        duration: elementIndex >= 2 ? 0.7 : 1,
        ease: "power4.out",
        onComplete: () => {
          setIsAnimating(false);
          console.log("Animating Single Element");
        },
      });
    }
  };

  const getFeatureDetails = (id) => {
    const feature = illustrations.find(
      (illustration) => illustration.id === id
    );
    return feature;
  };

  return (
    <div className="h-screen w-screen bg-gradient ">
      <div
        onClick={() => {
          if (selectedFeature != "all") {
            setSelectedFeature("all");
            animateMenu(null, true);
          }
          setIsAnimating(false);
        }}
        className="h-full w-full flex flex-col justify-around items-center overflow-hidden"
      >
        <div className="absolute h-screen w-screen flex justify-center items-center blur-[60px]">
          <Image src={ellipsis} className="h-[50vh] w-fit" alt="state-of-art" />
        </div>

        <div
          className={
            selectedFeature != "all" ? "slide-out-top" : "slide-in-top"
          }
        >
          <Image src={logo} className="h-12 w-fit" alt="WalletX" />
          <a
            href="https://chromewebstore.google.com/detail/walletx-a-gasless-smart-w/mdjjoodeandllhefapdpnffjolechflh"
            target="_blank"
            className="px-6 py-1 text-white w-fit rounded btn-gradient block mx-auto text-sm mt-4"
          >
            Download Now
          </a>
        </div>

        <div className="flex w-fit h-[30%] relative items-center">
          {illustrations.map((illustration, index) => (
            <div
              className="w-fit cursor-pointer"
              ref={(element) => (iconsRef.current[index] = element)}
            >
              <div
                onMouseEnter={() => setHoveredState(illustration.id)}
                onMouseLeave={() => setHoveredState("")}
                onClick={() => {
                  setIsAnimating(true);
                  if (selectedFeature == "all") animateMenu(index);
                  setSelectedFeature(illustration.id);
                }}
                className={`${
                  selectedFeature != illustration.id ? "shake-vertical" : ""
                }`}
              >
                <p
                  className={
                    hoveredState == illustration.id &&
                    selectedFeature != illustration.id
                      ? "font-semibold w-fit text-white whitespace-nowrap border-gradient border-b-2 px-2 py-1 absolute right-[50%] translate-x-[50%] top-[-6em]"
                      : "hidden"
                  }
                > 
                  {illustration.name}
                </p>
                <Image
                  src={illustration.image}
                  className={`${selectedFeature == illustration.id ? "shake-rotate" : "grow"} h-[14rem] w-fit `}
                  alt="multi-chain"
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className={`${
            selectedFeature != "all" ? "slide-out-bottom" : "slide-in-bottom "
          } flex flex-col items-center z-10`}
        >
          <Image src={line} className="  w-[40vw]" alt="state-of-art" />
          <div className="flex gap-12 mt-4">
            <a href="https://twitter.com/getWalletX" target="_blank">
              <Image src={twitter} className="h-8 w-fit" alt="twitter" />
            </a>
            <a href="https://t.me/getWalletX" target="_blank">
              <Image src={telegram} className="h-8 w-fit" alt="telegram" />
            </a>
            <a
              href="https://discord.gg/ucHHTkty"
              target="_blank"
              onClick={() => console.log("clicked")}
            >
              <Image src={discord} className="h-8 w-fit" alt="discord" />
            </a>
          </div>
        </div>
      </div>

      {/* SIDEBAR  */}

      {selectedFeature != "all" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          exit={{ opacity: 0 }}
          className="w-1/2 py-[12rem]  h-full absolute flex top-0 right-0 text-white bg-white bg-opacity-40 z-50"
        >
          <div>
            <Image
              onClick={() => {
                if (selectedFeature != "all") {
                  setSelectedFeature("all");
                  animateMenu(null, true);
                }
                setIsAnimating(false);
              }}
              src={close}
              className="h-10 w-fit mx-12 cursor-pointer"
              alt="close"
            />
          </div>
          <div className="flex flex-col justify-between w-fit mr-[5rem]">
            <div>
              <p className="text-5xl font-bold">
                {getFeatureDetails(selectedFeature)?.name}
              </p>
              <p className="text-2xl mt-[5rem]">
                {getFeatureDetails(selectedFeature)?.about}
              </p>
            </div>
            <a
              href="https://chromewebstore.google.com/detail/walletx-a-gasless-smart-w/mdjjoodeandllhefapdpnffjolechflh"
              target="_blank"
              className="bg-white px-4 py-2 w-fit text-black mx-auto rounded"
            >
              Download
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
