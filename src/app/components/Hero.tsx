"use client";
import Logo from "../../../public/logo.png";
import Image from "next/image";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <Image
          className="object-contain"
          src={Logo}
          alt="logo"
          width="100"
          height="100"
        />

        <button
          className="black_btn"
          onClick={() => window.open("https://github.com/")}
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />{" "}
        <span className="orange_gradient">OpenAI GPT-4</span>{" "}
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and consice summaries
      </h2>
    </header> 
  );
};

export default Hero;
