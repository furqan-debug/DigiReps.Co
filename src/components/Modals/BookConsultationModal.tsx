"use client";

import Image from "next/image";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useModal } from "../../context/ModalContext";
import { X } from "lucide-react";

export default function BookConsultationModal() {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-[#00000010] flex justify-center items-center z-50 px-4"
      onClick={closeModal} // clicking backdrop triggers close
    >
      <div
        className="max-w-[1000px] bg-white w-full border-4 border-[#E0DFE6DB] rounded-[20px] flex md:flex-row flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <X
          className="absolute top-6 right-6 cursor-pointer"
          onClick={closeModal}
        />
        <div className="md:w-[55%] md:p-6 p-4 flex flex-col md:gap-3 gap-2">
          <Image
            src="/images/digireps-logo-new.png"
            alt=" "
            width={150}
            height={700}
          />
          <h4 className="text-[#021442] md:text-2xl text-lg font-semibold">
            How Would You Like to Connect?
          </h4>
          <p className="text-[#1e1e1e] md:!text-lg">
            Choose the option that best fits your needs, and let’s get started!
          </p>
          <div className="flex md:flex-col flex-row gap-4">
            <a
              href={"https://discoverycall.digireps.co"}
              target="_blank"
              className="rounded-[30px] text-left cursor-pointer border border-[#0B409C36] p-5 flex md:flex-row flex-col md:w-full w-1/2 md:gap-4 gap-2 relative"
            >
              <BsArrowRight className="text-[#FEB402] text-2xl absolute top-4 right-8" />
              <Image
                src="/images/bookconsult.svg"
                alt=" "
                width={90}
                height={90}
                className="md:w-[90px] w-[30px] md:h-[90px] h-[30px]"
              />
              <div className="flex flex-col gap-2">
                <h4 className="text-[#02144280] md:text-[20px] font-semibold">
                  Book A Consultation
                </h4>
                <p className="text-[#1e1e1e] !md:text-base !text-sm">
                  Schedule a call with our team to explore how our services can
                  help you!
                </p>
              </div>
            </a>
            <a
              href={"/portal"}
              target="_blank"
              className="rounded-[30px] text-left cursor-pointer border border-[#0B409C36] p-5 flex md:flex-row flex-col md:w-full w-1/2 md:gap-4 gap-2 relative"
            >
              <BsArrowRight className="text-[#FEB402] text-2xl absolute top-4 right-8" />
              <Image
                src="/images/joinTeam.svg"
                alt=" "
                width={90}
                height={90}
                className="md:w-[90px] w-[30px] md:h-[90px] h-[30px]"
              />
              <div className="flex flex-col gap-2">
                <h4 className="text-[#02144280] md:text-[20px] font-semibold">
                  Join Our Team!
                </h4>
                <p className="text-[#1e1e1e] !md:text-base !text-sm">
                  Looking for a flexible and rewarding opportunity as a Rep?
                </p>
              </div>
            </a>
          </div>
          <p className="text-[#606060] !text-sm mt-2">
            <span className="text-[#FF002E] text-lg"> Note:</span> Candidates
            are kindly instructed NOT to book the meeting using the wrong
            calendar or your application will not be entertained.
          </p>
        </div>
        <div className="md:w-[45%]">
          <Image
            src="/images/leftModalImg.png"
            alt=" "
            width={500}
            height={700}
            className="w-[500px] md:h-[580px] h-[200px] md:rounded-tr-2xl rounded-br-2xl md:rounded-bl-none rounded-bl-2xl object-cover md:!object-center"
            style={{ objectPosition: "0 -60px" }}
          />
        </div>
      </div>
    </div>
  );
}
