import { useState, useRef } from "react";
import SplitText from "gsap/SplitText.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import NavBar from "../components/nav";

import moonImg from "../assets/destination/image-moon.png";
import marsImg from "../assets/destination/image-mars.png";
import europaImg from "../assets/destination/image-europa.png";
import titanImg from "../assets/destination/image-titan.png";

const destinationImages = {
  moon: moonImg,
  mars: marsImg,
  europa: europaImg,
  titan: titanImg,
};

const destinationItems = [
  {
    label: "MOON",
    key: "moon",
    description:
      "See our planet as you've never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you're there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
    avgInfo: "384,400 km",
    estIfo: "3 days",
  },
  {
    label: "MARS",
    key: "mars",
    description:
      "Don't forget to pack your hiking boots. You'll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It's two and a half times the size of Everest!",
    avgInfo: "225 MIL. km",
    estIfo: "9 months",
  },
  {
    label: "EUROPA",
    key: "europa",
    description:
      "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover's dream. With an icy surface, it's perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
    avgInfo: "628 MIL. km",
    estIfo: "3 years",
  },
  {
    label: "TITAN",
    key: "titan",
    description:
      "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
    avgInfo: "1.6 BIL. KM",
    estIfo: "7 years",
  },
];

function DestinationPage() {
  const [check, setcheck] = useState("moon");
  const Img = useRef(null);
  const nav = useRef(null);

  useGSAP(() => {
    const headSplit = new SplitText(".head", { type: "words" });

    gsap.from(headSplit.words, {
      duration: 1,
      delay: .2,
      opacity: 0,
      yPercent: 100,
      stagger: 0.04,
    });
  }, [check]);

  useGSAP(() => {
    const moonheadSplit = new SplitText(".moon-head", { type: "chars" });
    const paragraghSplit = new SplitText(".paragraph", {
      type: "lines,chars,words",
    });
    const infoSplit = new SplitText(".info", { type: "chars" });
    const infoDSplit = new SplitText(".info-d", { type: "chars" });

    gsap.from(moonheadSplit.chars, {
      duration: 1,
      opacity: 0,
      yPercent: 50,
      stagger: 0.09,
    });

    gsap.from(paragraghSplit.lines, {
      duration: 1,
      stagger: 0.1,
      opacity: 0,
      yPercent: 50,
      xPercent: -50,
      delay: 0.5,
    });

    gsap.from(paragraghSplit.chars, {
      duration: 0.5,
      stagger: 0.01,
      opacity: 0,
      yPercent: 50,
      xPercent: -50,
    });
    gsap.from(paragraghSplit.words, {
      duration: 1,
      stagger: 0.02,
      opacity: 0,
      yPercent: 50,
      xPercent: -50,
    });

    gsap.from(infoSplit.chars, {
      duration: 1,
      opacity: 0,
      yPercent: 50,
      stagger: 0.02,
      delay: 1,
    });
    gsap.from(infoDSplit.chars, {
      duration: 1,
      opacity: 0,
      yPercent: 50,
      stagger: 0.02,
      delay: 1.4,
    });
    gsap.from(Img.current, {
      opacity: 0,
      duration: 1,
    });
  }, [check]);

  useGSAP(() => {
    gsap.from(nav.current, {
      duration: 2,
      opacity: 0,
    });
  }, []);

  const theActiveItem = destinationItems.find((item) => {
    return item.key === check;
  });

  function renderHeadings() {
    return destinationItems.map((item) => {
      const theActiveClass = item.key === check;
      return (
        <li
          onClick={() => setcheck(item.key)}
          className={`cursor-pointer p-3 border-b-2 transition-colors duration-500 ${
            theActiveClass
              ? "border-white hover:border-white"
              : "border-transparent hover:border-white/30 text-blue-200/60 "
          }`}
          key={item.key}
        >
          {item.label}
        </li>
      );
    });
  }

  return (
    <>
      <div
        className="
        bg-destination-sm bg-cover bg-center bg-no-repeat
        md:bg-destination-md
        lg:bg-destination-lg 
        h-screen
        "
      >
        <NavBar />
        <p className="head mx-10 my-4 lg:my-0 lg:mx-40 text-white/90 font-condensed tracking-[0.2em] flex gap-2">
          <span className="text-white/30 font-bold">01</span>PICK YOUR
          DESTINATION
        </p>

        <div className="container pl-6 md:mx-auto flex flex-col items-center justify-center text-center gap-4  pr-6 md:pl-14 md:gap-6 lg:flex-row lg:justify-between lg:text-left lg:pl-30 lg:my-10 lg:pr-30">
          <img
            ref={Img}
            className=" h-[200px] w-[200px] md:h-[300px] md:w-[300px]  lg:w-[300px] lg:h-[300px] "
            src={destinationImages[check]}
            alt={check}
          />
          <div className="lg:ml-40 my-10 flex flex-col gap-8 md:gap-0">
            <ul
              ref={nav}
              className="text-white flex gap-4 md:gap-8 justify-center lg:justify-start"
            >
              {renderHeadings()}
            </ul>
            <h3
              key={check}
              className="moon-head font-nav text-3xl md:text-5xl lg:text-8xl text-white py-4 md:py-10"
            >
              {check.toUpperCase()}
            </h3>
            <p className="paragraph font-sans  text-blue-200/60 leading-relaxed text-xs md:text-sm lg:text-base">
              {theActiveItem.description}
            </p>

            <div className="line bg-white/30 h-[.5px] w-auto mt-10"></div>
            <div className="info-container flex gap-30">
              <div className="pt-3 flex flex-col gap-4">
                <p className="info font-condensed tracking-[0.15em] text-blue-200/60 text-xs md:text-sm lg:text-base">
                  AVG. DISTANCE
                </p>
                <p className="info-d font-nav text-white/90 text-2xl">
                  {theActiveItem.avgInfo.toUpperCase()}
                </p>
              </div>
              <div className="pt-3 flex flex-col gap-4   ">
                <p className="info font-condensed tracking-[0.15em] text-blue-200/60 text-xs w-fit md:text-sm lg:text-base">
                  EST. TRAVEL TIME
                </p>
                <p className="info-d font-nav text-white/90 text-2xl  ">
                  {theActiveItem.estIfo.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DestinationPage;
