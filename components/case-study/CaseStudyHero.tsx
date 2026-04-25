'use client';
import Image from "next/image";
import { CaseStudy } from "@/content/caseStudies";
import {motion} from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  study: CaseStudy;
};

export default function CaseStudyHero({ study }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-[#f7f7f3]">
      {/* <Link
          href="/case-studies"
          className="group inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition absolute mt-4 ml-10 z-100 top-12 left-12"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Back to all projects
      </Link> */}
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className=" absolute top-0 max-md:hidden lg:pt-20 mx-10 flex gap-2 items-center justify-center">
          <div className="h-2 w-2 rounded-full" style={{backgroundColor: study.tint}}/>
          <h1 className={` tracking-tight`}
          style = {{color: study.tint}}
          >Featured Case Study</h1>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#71717a]">
            {study.category}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#111827] md:text-6xl">
            {study.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#52525b] md:text-xl">
            {study.subtitle}
          </p>

          <div className="grid grid-cols-3 gap-3 text-sm text-[#3f3f46] mt-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <svg 
                className="h-4 w-4"
                style={{color: study.tint}}
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.45001 14.97C3.52001 18.41 6.40002 21.06 9.98002 21.79"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                        
                  <path d="M2.04999 10.98C2.55999 5.93 6.81998 2 12 2C17.18 2 21.44 5.94 21.95 10.98"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                        
                  <path d="M14.01 21.8C17.58 21.07 20.45 18.45 21.54 15.02"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                </svg>
                <h1 style={{ color: study.tint}} >Status</h1>
              </div>
              <div className="rounded-full text-lg flex items-center gap-2 col-span-1 "
              >
                {study.status.toLowerCase().includes("ongoing") ||
                study.status.toLowerCase().includes("research") ? (
                    <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                ) : null}
                {study.status}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 items-center">
                <div className="h-4 w-4 ">
                  <svg
                  style={{color: study.tint}}
                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M998.936064 240.238415L521.756297 4.775434a19.34316 19.34316 0 0 0-25.451526 0L19.125004 240.238415c-12.798482 0-19.125004 12.725763-19.125004 25.451527s6.326522 25.451527 19.125004 25.451526l477.179767 235.390263c6.399241 0 6.399241 6.399241 12.725763 6.399241s6.326522 0 12.725763-6.399241l375.37366-184.487209v267.24103c0 19.052286 12.798482 31.778049 31.850768 31.778049 19.125004 0 31.778049-12.725763 31.778049-31.778049V310.193754l38.17729-19.052286c12.798482 0 19.125004-12.725763 19.125004-25.451526s-6.326522-25.451527-19.125004-25.451527zM509.030534 462.902914L101.806107 265.689942 509.030534 68.40425l407.224427 197.285692L509.030534 462.902914z m279.966794-28.869303c19.052286 0 31.850768 12.725763 31.850767 31.778049v293.274306c0 6.326522-6.399241 19.052286-19.125004 25.451527A706.970693 706.970693 0 0 1 509.030534 848.16631c-108.132629 0-210.011455-19.125004-292.692557-63.628817-12.725763 0-19.125004-12.725763-19.125004-25.451527V465.81166c0-19.052286 12.798482-31.778049 31.850767-31.778049 19.125004 0 31.778049 12.725763 31.778049 31.778049v274.149302c140.056116 63.628817 356.321374 63.628817 496.37749 0v-274.149302c0-19.052286 12.653045-31.778049 31.778049-31.778049z" fill={study.tint}></path></g></svg>
                </div>
                <h1 style={{color: study.tint}}>Role</h1>
              </div>
              <div 
              className="rounded-full text-lg ">
                {study.role}
              </div>
            </div>
            <div className=" flex flex-col">
                <div className="flex items-center gap-1">
                    <svg 
                    className="h-4 w-4"
                    style={{fill: study.tint}}
                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M919.113143 325.485714H104.813714v-67.803428h814.299429v-133.12a36.571429 36.571429 0 0 0-36.571429-36.571429H141.385143a36.571429 36.571429 0 0 0-36.571429 36.571429L103.862857 865.645714a36.425143 36.425143 0 0 0 36.571429 36.571429h673.865143a33.938286 33.938286 0 1 1 0 67.876571h-705.097143-0.146286a73.142857 73.142857 0 0 1-73.069714-73.142857L36.937143 93.184a73.142857 73.142857 0 0 1 73.142857-73.142857h803.693714a73.142857 73.142857 0 0 1 73.142857 73.142857v703.268571a33.938286 33.938286 0 0 1-67.803428 0V325.485714zM206.628571 215.844571a33.938286 33.938286 0 1 1 0-67.803428 33.938286 33.938286 0 0 1 0 67.803428z m203.556572 0a33.938286 33.938286 0 1 1 0-67.803428 33.938286 33.938286 0 0 1 0 67.803428z m-101.814857 0a33.938286 33.938286 0 1 1 0-67.803428 33.938286 33.938286 0 0 1 0 67.803428z m34.889143 250.148572c7.168-7.094857 26.112-7.094857 33.28 0 7.168 7.094857 7.168 29.476571 0 37.156571L265.874286 610.742857 373.76 712.923429c7.168 7.094857 8.118857 27.355429 0 35.328-9.801143 9.728-29.842286 8.192-36.571429 1.609142l-126.025142-125.805714a18.432 18.432 0 0 1 0-25.965714l132.096-132.096z m343.478857 0l132.096 132.096a18.432 18.432 0 0 1 0 26.038857l-126.098286 125.732571c-6.656 6.582857-25.6 10.752-36.571429 0-10.313143-10.24-7.094857-31.305143 0-38.4l108.397715-100.717714-111.908572-108.690286c-7.168-7.68-9.508571-26.624 0-36.059428 9.289143-9.142857 26.916571-7.094857 34.084572 0z m-135.68-26.331429c3.657143-9.508571 21.430857-15.506286 32.768-11.264 10.825143 4.022857 17.188571 19.017143 14.189714 28.525715l-119.808 329.947428c-3.657143 9.508571-20.699429 13.238857-30.281143 9.728-10.166857-3.584-21.211429-17.554286-17.554286-27.062857l120.685715-329.874286z" fill=""></path></g></svg>
                    <h1
                     style={{color: study.tint}}
                    >Timeline</h1>
                </div>
              <div className="flex items-center gap-2 rounded-full text-lg">
              <span>{study.timeline}</span>
              </div>
            </div>
          </div>

          {study.tools && study.tools.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {study.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-sm text-[#52525b]"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl border-2 shadow border-white/40 bg-white]">
            <Image
              src={study.heroImage}
              alt={study.title}
              width={1400}
              height={1000}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
        {study.status.toLowerCase().includes("ongoing") && (
          <div 
          style={{backgroundColor: study.tintLow}}
          className={`w-full rounded-xl py-10 flex gap-2 px-4`}>
            <div className=" h-12 w-12 aspect-square rounded-full col-span-1">
              <svg 
              style={{fill: study.tint}}
              viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.45284 2.71266C7.8276 1.76244 9.1724 1.76245 9.54716 2.71267L10.7085 5.65732C10.8229 5.94743 11.0526 6.17707 11.3427 6.29148L14.2873 7.45284C15.2376 7.8276 15.2376 9.1724 14.2873 9.54716L11.3427 10.7085C11.0526 10.8229 10.8229 11.0526 10.7085 11.3427L9.54716 14.2873C9.1724 15.2376 7.8276 15.2376 7.45284 14.2873L6.29148 11.3427C6.17707 11.0526 5.94743 10.8229 5.65732 10.7085L2.71266 9.54716C1.76244 9.1724 1.76245 7.8276 2.71267 7.45284L5.65732 6.29148C5.94743 6.17707 6.17707 5.94743 6.29148 5.65732L7.45284 2.71266Z" fill=""></path> <path opacity="0.5" d="M16.9245 13.3916C17.1305 12.8695 17.8695 12.8695 18.0755 13.3916L18.9761 15.6753C19.039 15.8348 19.1652 15.961 19.3247 16.0239L21.6084 16.9245C22.1305 17.1305 22.1305 17.8695 21.6084 18.0755L19.3247 18.9761C19.1652 19.039 19.039 19.1652 18.9761 19.3247L18.0755 21.6084C17.8695 22.1305 17.1305 22.1305 16.9245 21.6084L16.0239 19.3247C15.961 19.1652 15.8348 19.039 15.6753 18.9761L13.3916 18.0755C12.8695 17.8695 12.8695 17.1305 13.3916 16.9245L15.6753 16.0239C15.8348 15.961 15.961 15.8348 16.0239 15.6753L16.9245 13.3916Z" fill=""></path> </g></svg>
            </div>
            <div className="px-4">
              <h1 className="text-lg font-bold">In Active Development</h1>
              <p className="text-sm">HourFlow is currently in active development. The visuals shown here represent early explorations of the interface and interaction model.</p>
            </div>
          </div>
        ) || null}
      </div>
    </section>
  );
}