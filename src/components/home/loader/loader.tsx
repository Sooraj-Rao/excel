import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#0a0d14] flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-amber-700"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <div className="absolute overflow-hidden inset-2 bg-[#0a0d14] rounded-full flex items-center justify-center">
              <Image
                src={"/logo/main.jpg"}
                alt=""
                className="-mt-3 -ml-[6px] scale-[1.2]"
                height={200}
                width={200}
              />
            </div>
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-pirate"
        >
          Excel 4.0
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="h-1 bg-gradient-to-r from-amber-500 to-amber-700 mt-4 rounded-full"
        />
      </div>
    </div>
  );
};
