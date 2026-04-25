import Image from "next/image";
import React from "react";

const socials = [
  {
    name: "LinkedIn",
    icon: "/linkedin.svg",
    url: "https://www.linkedin.com/in/mubashir-uddin/",
  },
  {
    name: "GitHub",
    icon: "/github.svg",
    url: "https://github.com/immubashir",
  },
  {
    name: "Instagram",
    icon: "/instagram.svg",
    url: "https://www.instagram.com/_mubashir.03_/",
  },
];

const Socials = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1800px] flex-col px-5 py-16 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-28 ubuntu-bold">
      <h1 className="text-sm font-black tracking-[0.22em] text-black sm:text-base">MY SOCIALS</h1>

      <div className="mt-4 flex w-full flex-col">
        {socials.map((social) => (
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            key={social.name}
            className="group mt-8 flex items-center justify-between gap-4 border-b border-black/10 pb-6 text-gray-900 transition-colors duration-300 hover:text-gray-700 sm:mt-10 md:mt-12 md:pb-8"
          >
            <h1 className="text-[clamp(2rem,5vw,4rem)] tracking-[-0.04em] transition-all duration-300 md:group-hover:-translate-x-2">
              {social.name}
            </h1>
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden sm:h-14 sm:w-14 md:h-16 md:w-16 md:group-hover:translate-x-2 transition-all duration-300">
              <Image
                src={social.icon}
                alt={social.name}
                width={64}
                height={64}
                className="object-fill"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Socials;
