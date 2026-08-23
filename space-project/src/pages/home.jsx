import NavBar from "../components/nav";
import SplitText from "gsap/SplitText.js";

import { Link } from "react-router-dom";

import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import { useRef } from "react";

function HomePage() {
  const button = useRef(null);

  useGSAP(() => {
    const heroHeadSplit = new SplitText(".hero-head", { type: "chars " });
    const heroParagraphSplit = new SplitText(".hero-p", {
      type: "lines ,words",
    });
    const headingSplit = new SplitText(".heading", { type: "chars" });

    gsap.from(heroHeadSplit.chars, {
      yPercent: 50,
      xPercent: -2,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.09,
      opacity: 0,
    });

    gsap.from(headingSplit.chars, {
      delay: 0.5,
      yPercent: 50,
      xPercent: -2,
      duration: 1,
      ease: "expo.out",
      stagger: 0.01,
      opacity: 0,
    });

    gsap.from(heroParagraphSplit.lines, {
      yPercent: 50,
      duration: 1.5,
      stagger: 0.002,
      opacity: 0,
      delay: 1,
    });
    gsap.from(heroParagraphSplit.words, {
      yPercent: 100,
      xPercent: -20,
      stagger: 0.02,
      opacity: 0,
      delay: 1,
    });

    gsap.to(button.current, {
      opacity: 1,
      duration: 0.4,
      delay: 1,
    });
  }, []);

  return (
    <div
      className="      bg-home-sm bg-cover bg-center bg-no-repeat
      md:bg-home-md 
      lg:bg-home-lg 
       min-h-screen
      "
    >
      <NavBar />

      <div className="mt-40   flex-1 flex gap-20 flex-col lg:flex-row items-center lg:justify-between px-6 md:px-16  pb-4 text-center lg:text-left ">
        <div className="text-container max-w-xl flex flex-col gap-8">
          <div className="heading-text text-white">
            <p className="heading font-condensed text-blue-200/60 tracking-[0.3em] text-lg md:text-sm uppercase">
              So, you want to travel to
            </p>
          </div>
          <div className="main-head text-white">
            <h3 className="hero-head font-nav text-5xl sm:text-6xl md:text-8xl">
              SPACE
            </h3>
          </div>
          <div className="paragraph text-white ">
            <p className="pColor hero-p">
              Let's face it; if you want to go to space, you might as well
              genuinely go to outer space and not hover kind of on the edge of
              it. Well sit back, and relax because we'll give you a truly out of
              this world experience!
            </p>
          </div>
        </div>
        <Link to="/destination">
          <div
            ref={button}
            className="circle opacity-0 cursor-pointer shrink-0 mt-1 lg:mt-0 w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full text-black transition-all ease-in duration-250 bg-white flex items-center justify-center font-nav tracking-widest text-2xl font-medium  hover:shadow-[0_0_0_50px_rgba(255,255,255,0.12),0_0_40px_60px_rgba(255,255,255,0.05)]"
          >
            EXPLORE
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
