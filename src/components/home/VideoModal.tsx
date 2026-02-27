"use client";

import { useState } from "react";
import Image from "next/image";
import { VideoModalProps } from "lib/types/contentful";

const VideoModal: React.FC<VideoModalProps> = ({ src }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Play Button */}
      <button onClick={openModal} className="cursor-pointer">
        <Image
          src="/images/play-btn.svg"
          alt=" "
          width={154}
          height={154}
          className="md:w-[154px] w-[104px] md:h-[154px] h-[104px]"
        />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 animate-fadeIn">
          <div className="videoArea relative aspect-video w-full mx-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-black text-2xl font-bold z-10 cursor-pointer"
            >
              ✖
            </button>

            <video
              src={`https:${src}`}
              controls
              autoPlay
              className="w-full h-full"
            ></video>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;
