"use client"
import { motion } from "framer-motion"
import React, { useState } from 'react'

type Props = {
  type: string,
  placeHolder: string,
  value: string,
  setValue: (value: string) => void
}
const InputCustomed: React.FC<Props> = ({
   placeHolder,
   value,
   setValue,
   type
  }) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <motion.div
      className="relative h-[50px] w-full"
    >
      <motion.p 
       className="absolute px-2"
       initial={{
        top: 12,
        marginLeft: 20,
        color: "#dfe2e4"
       }}
       animate={{
        top: isFocused || value ? -12 : 12,
        marginLeft: isFocused || value ? 10 : 20,
        background: isFocused || value ? "white" : "transparent",
        zIndex: isFocused || value ? 50 : 0,
        fontSize: isFocused || value ? "14px" : "17px",
        color: isFocused || value ? "#11cdef" : "#dfe2e4"
       }}
      >
        {placeHolder}
      </motion.p>
      <motion.input 
        type={type}
        value={value}
        className="absolute z-20 rounded-lg bg-transparent w-full h-full px-4 text-lg focus-visible:outline-none border"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        animate={{
          borderColor: isFocused || value ? "#11cdef" : "#999999"
        }}
      />
    </motion.div>
  )
}

export default InputCustomed