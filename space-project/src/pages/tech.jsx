import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText.js";
import NavBar from "../components/nav";
import { BarLoader } from "react-spinners";

import launchVehiclePortrait from "../assets/technology/image-launch-vehicle-portrait.jpg";
import launchVehicleLandscape from "../assets/technology/image-launch-vehicle-landscape.jpg";
import spaceportPortrait from "../assets/technology/image-spaceport-portrait.jpg";
import spaceportLandscape from "../assets/technology/image-spaceport-landscape.jpg";
import spaceCapsulePortrait from "../assets/technology/image-space-capsule-portrait.jpg";
import spaceCapsuleLandscape from "../assets/technology/image-space-capsule-landscape.jpg";

function TechPage() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const data = [
    {
      id: 1,
      heading: "THE TERMINOLOGY…",
      mainHead: "LAUNCH VEHICLE",
      pText:
        "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
      pcImg: launchVehiclePortrait,
      mdImg: launchVehicleLandscape,
    },
    {
      id: 2,
      heading: "THE TERMINOLOGY…",
      mainHead: "SPACEPORT",
      pText:
        "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.",
      pcImg: spaceportPortrait,
      mdImg: spaceportLandscape,
    },
    {
      id: 3,
      heading: "THE TERMINOLOGY…",
      mainHead: "SPACE CAPSULE",
      pText:
        "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.",
      pcImg: spaceCapsulePortrait,
      mdImg: spaceCapsuleLandscape,
    },
  ];

  const [isActive, setIsActive] = useState(1);
  const active = data.find((item) => item.id === isActive);

 
  useGSAP(
    () => {
      const titleSplit = new SplitText(".title-anim", { type: "chars" });
      gsap.from(titleSplit.chars, {
        duration: 1,
        delay: 0.2,
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
        ease: "power2.out",
      });
    },
    { scope: containerRef, dependencies: [] }
  );


  useGSAP(
    () => {
    
      const headSplit = new SplitText(`.heading-${isActive}`, { type: "chars" });

      gsap.from(headSplit.chars, {
        duration: 1,
        opacity: 0,
        yPercent: 50,
        stagger: 0.02,
        ease: "power2.out",
      });

      gsap.fromTo(
        [`.head-${isActive}`, `.mainp-${isActive}`],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1,delay:.09, stagger: 0.1, ease: "power2.out" }
      );


      gsap.fromTo(
        ".tech-img",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    },
    { scope: containerRef, dependencies: [isActive] }
  );

  return (
    <div
      ref={containerRef}
      className="
        bg-tech-sm md:bg-tech-md lg:bg-tech-lg 
        bg-cover bg-center bg-no-repeat 
        min-h-screen text-white 
        flex flex-col justify-between 
        overflow-x-hidden
      "
    >
      <div>
        <NavBar />

        <div className="px-6 md:px-10 lg:px-40 py-4 md:py-6 font-condensed tracking-[0.2em] text-base md:text-xl lg:text-2xl flex justify-center md:justify-start gap-3 uppercase">
          <span className="title-anim text-white/30 font-bold">03</span>
          <span className="title-anim">SPACE LAUNCH 101</span>
        </div>

        <main className="flex lg:mr-15 flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:pl-40 pt-2 pb-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-6 lg:px-0 text-center lg:text-left w-full lg:w-2/3">
            
         
            <div className="flex lg:flex-col gap-4 md:gap-6">
              {data.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setIsActive(item.id)}
                  aria-label={`Select technology step ${item.id}`}
                  className={`
                    rounded-full 
                    w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 
                    font-nav text-base md:text-2xl lg:text-3xl 
                    flex items-center justify-center 
                    transition-all duration-300 border
                    ${
                      isActive === item.id
                        ? "text-black bg-white border-white"
                        : "text-white bg-transparent border-white/25 hover:border-white"
                    }
                  `}
                >
                  {item.id}
                </button>
              ))}
            </div>

           
            <div key={isActive} className="max-w-xl">
              <p className={`head-${isActive} text-white/50 font-condensed tracking-[0.15em] text-sm md:text-base uppercase mb-2`}>
                {active.heading}
              </p>
              <h1 className={`heading-${isActive} text-2xl md:text-4xl lg:text-5xl font-nav uppercase mb-4 leading-tight tracking-wide`}>
                {active.mainHead}
              </h1>
              <p className={`mainp-${isActive} text-white/70 text-sm md:text-base lg:text-lg leading-relaxed min-h-[120px]`}>
                {active.pText}
              </p>
            </div>
          </div>

          <div className="w-full lg:w-auto flex justify-end">
            <picture className="w-full">
              <source media="(max-width: 1023px)" srcSet={active.mdImg} />
              <img
                src={active.pcImg}
                alt={active.mainHead}
                className="tech-img w-full h-[220px] md:h-[310px] lg:h-[520px] object-cover lg:rounded-l-lg"
              />
            </picture>
          </div>
        </main>
      </div>

      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0D17]">
          <BarLoader color="#005eff" />
        </div>
      )}
    </div>
  );
}

export default TechPage;
