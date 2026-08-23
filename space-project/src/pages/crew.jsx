import { useRef, useState } from "react";
import NavBar from "../components/nav";
import SplitText from "gsap/SplitText.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import markShuttleworthImg from "../assets/crew/image-mark-shuttleworth.webp";
import anoushehAnsariImg from "../assets/crew/image-anousheh-ansari.png";
import douglasHurleyImg from "../assets/crew/image-douglas-hurley.png";
import victorGloverImg from "../assets/crew/image-victor-glover.png";

function CrewPage() {
  const btns = useRef(null);
  const img = useRef(null);
  const textContainer = useRef(null);
  const hasMounted = useRef(false);

  const imgSliderData = [
    {
      id: 1,
      img: markShuttleworthImg,
      head: "Mission Specialist",
      mainHead: "MARK SHUTTLEWORTH",
      paragraph:
        "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
    },
    {
      id: 2,
      img: anoushehAnsariImg,
      head: "FLIGHT ENGINEER",
      mainHead: "ANOUSHEH ANSARI",
      paragraph:
        "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
    },
    {
      id: 3,
      img: douglasHurleyImg,
      head: "COMMANDER",
      mainHead: "DOUGLAS HURLEY",
      paragraph:
        "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
    },
    {
      id: 4,
      img: victorGloverImg,
      head: "PILOT",
      mainHead: "VICTOR GLOVER",
      paragraph:
        "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18. He was a crew member of Expedition 64, and served as a station systems flight engineer.",
    },
  ];

  const [isActive, setIsActive] = useState(1);
  const active = imgSliderData.find((item) => item.id === isActive);

  const handleNext = () => {
    setIsActive((prev) => (prev === imgSliderData.length ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setIsActive((prev) => (prev === 1 ? imgSliderData.length : prev - 1));
  };

  useGSAP(
    () => {
      const headEls = textContainer.current.querySelectorAll(
        ".head:not(.invisible)",
      );
      const mainEls = textContainer.current.querySelectorAll(
        ".main:not(.invisible)",
      );
      const headingEls = textContainer.current.querySelectorAll(
        ".headinghh:not(.invisible)",
      );

      const headSplit = new SplitText(headEls, { type: "chars,words" });
      const mainSplit = new SplitText(mainEls, { type: "chars,lines,words" });
      const headingSplit = new SplitText(headingEls, { type: "chars" });

      const introDelay = hasMounted.current ? 0 : 1;
      const introDelayShort = hasMounted.current ? 0 : 0.5;

      gsap.from(headSplit.chars, {
        duration: 1,
        opacity: 0,
        stagger: 0.02,
        yPercent: 50,
        delay: introDelay,
      });

      gsap.from(mainSplit.lines, {
        duration: 1,
        stagger: 0.1,
        opacity: 0,
        yPercent: 50,
        xPercent: -50,
        delay: introDelayShort,
      });

      gsap.from(mainSplit.chars, {
        duration: 0.5,
        stagger: 0.01,
        opacity: 0,
        yPercent: 50,
        xPercent: -50,
      });

      gsap.from(mainSplit.words, {
        duration: 1,
        stagger: 0.02,
        opacity: 0,
        yPercent: 50,
        xPercent: -50,
      });

      gsap.from(headingSplit.chars, {
        duration: 0.8,
        opacity: 0,
        yPercent: 50,
        stagger: 0.05,
      });

      gsap.fromTo(
        img.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
      );

      hasMounted.current = true;

      return () => {
        headSplit.revert();
        mainSplit.revert();
        headingSplit.revert();
      };
    },
    { scope: textContainer, dependencies: [active] },
  );

  useGSAP(() => {
    gsap.to(btns.current, {
      opacity: 1,
      duration: 3,
    });
    const hSplit = new SplitText(".h",{type:"chars"})
    gsap.from(hSplit.chars,{
         duration: 1,
      delay: 1,
      opacity: 0,
      yPercent: 100,
      stagger:0.02
      
    })
  }, []);

  return (
    <div
      className="
        bg-crew-sm bg-cover bg-center bg-no-repeat
        md:bg-crew-md
        lg:bg-crew-lg
        min-h-screen
      "
    >
      <NavBar />

      <p className=" crew-title px-6 pt-6 text-center lg:text-left lg:px-20 lg:pt-4 text-white/90 font-condensed tracking-[0.2em] flex justify-center lg:justify-start gap-2 md:p-0 md:m-0">
        <span className="h text-white/30 font-bold">02</span ><span className="h">MEET YOUR CREW</span> 
      </p>

      <div
        className="
          container mx-auto
          flex flex-col items-center text-center
          px-6 pt-6 pb-10
          lg:flex-row lg:items-start lg:text-left lg:justify-between
          lg:px-20 lg:pt-16
        "
      >
        <div className="flex flex-col-reverse md:m-0 p-0  ">
          <div
            ref={textContainer}
            className="text-container lg:pl-20 flex flex-col items-center lg:items-start lg:w-170 md:w-140 px-8 order-2 lg:order-1 relative"
          >
            <div
              onClick={handleNext}
              className="arrow right-0 top-30 cursor-pointer p-2 absolute text-white text-3xl select-none"
            >
              →
            </div>

            <div className="grid w-80">
              {imgSliderData.map((item) => (
                <p
                  key={item.id}
                  className={`head col-start-1 row-start-1 text-white/30 m-1 font-nav text-xl md:text-2xl lg:text-3xl py-2 lg:py-4 ${
                    item.id === isActive ? "" : "invisible"
                  }`}
                >
                  {item.head}
                </p>
              ))}
            </div>

            <div className="grid lg:w-130">
              {imgSliderData.map((item) => (
                <h2
                  key={item.id}
                  className={`headinghh col-start-1 lg:w-150 row-start-1 text-white text-3xl md:text-4xl lg:text-5xl font-nav leading-tight ${
                    item.id === isActive ? "" : "invisible"
                  }`}
                >
                  {item.mainHead}
                </h2>
              ))}
            </div>

            <div className="grid max-w-md lg:w-131">
              {imgSliderData.map((item) => (
                <p
                  key={item.id}
                  className={`main col-start-1 row-start-1 pColor px-2 lg:pt-4 text-sm md:text-base ${
                    item.id === isActive ? "" : "invisible"
                  }`}
                >
                  {item.paragraph}
                </p>
              ))}
            </div>

            <div
              onClick={handlePrev}
              className="arrow left-0 top-30 cursor-pointer p-2 absolute text-white text-3xl select-none"
            >
              ←
            </div>
          </div>

          <div
            className="btns flex gap-4 ml-38 md:ml-65 lg:ml-70 mt-8 opacity-0"
            ref={btns}
          >
            {imgSliderData.map((item) => (
              <button
                key={item.id}
                onClick={() => setIsActive(item.id)}
                aria-label={`Show crew member ${item.id}`}
                className={`w-3 h-3 rounded-full transition-colors my-10 ${
                  isActive === item.id ? "bg-white" : "bg-white/25"
                }`}
              ></button>
            ))}
          </div>
        </div>

        <div className="order-1 flex justify-center ">
          <img
            ref={img}
            src={active.img}
            alt={active.mainHead}
            className="
              opacity-0
              w-full max-w-xs h-[280px] object-contain
              lg:w-auto lg:h-[420px] lg:max-w-none lg:rounded-none
            "
          />
        </div>
      </div>
    </div>
  );
}

export default CrewPage;
