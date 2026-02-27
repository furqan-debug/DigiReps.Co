import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
type HireModalProps = {
  openState: boolean;
  closeModal: () => void;
};

export default function HireModal({ openState, closeModal }: HireModalProps) {

  if (!openState) return null;
  return (
    <div
      className="fixed inset-0 bg-[#00000010] flex justify-center items-center z-50 px-4"
      onClick={closeModal} // clicking backdrop triggers close
    >
      <div
        className="max-w-[515px] bg-white w-full border-4 border-[#E0DFE6DB] rounded-[20px] flex flex-col items-center p-10 gap-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <IoClose
          className="absolute top-6 right-6 text-2xl cursor-pointer"
          onClick={closeModal}
        />

        <Image src="/images/hireCand.svg" alt=" " width={160} height={160} />
        <h4 className="text-[#021442] text-2xl font-semibold">
          Want to hire a candidate?
        </h4>
        <Link
          href={"https://discoverycall.digireps.co"}
          className="bgColorBlue text-white rounded-full px-20 py-4 animated-button overflow-x-hidden cursor-pointer"
        >
          <span>Book Consultation</span>
        </Link>
      </div>
    </div>
  );
}
