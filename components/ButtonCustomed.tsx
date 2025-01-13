"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import React from "react";

type Props = {
    buttonText?: string,
    handleClick?: () => void
    loading?: boolean
}
const ButtonCustome: React.FC<Props> = ({ buttonText = "Click", handleClick, loading = false }) => {
  const [isHovered, setIsHovered] = useState(false); // State để theo dõi hover
  
  return (
    <div className="flex items-center justify-center">
      <motion.button
        key={'button'}
        disabled={loading}
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)} // Khi hover vào button
        onHoverEnd={() => setIsHovered(false)} // Khi hover ra khỏi button
        className="max-w-fit relative flex flex-col mx-auto p-3 rounded-full px-8 text-lg font-semibold text-white group"
        style={{ backgroundColor: '#0da8e6' }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={'div'}
            className="flex flex-col"
            animate={{ y: isHovered ? -6 : 0 }} // Text sẽ dịch chuyển lên khi hover
          >
            {buttonText}
          </motion.div>
          {/* Hiệu ứng dấu chấm nhỏ và đường line */}
          <motion.span
            key={'span'}
            animate={{
              left: isHovered ? 0 : "auto", // Khi hover: left 0
              right: isHovered ? "auto" : 20, // Khi không hover: right 3
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="absolute top-[50%] translate-y-[-50%] w-1 h-1 rounded-full bg-white"
          />
          <motion.div
            animate={{
               y: isHovered ? -2 : 100,
               opacity: isHovered ? 1 : 0
             }}
            transition={{ duration: 0.4, ease: "easeInOut" }} // Cập nhật easeInOut để mượt hơn
            className="w-full h-[1px] bg-white"
          />
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ButtonCustome;
