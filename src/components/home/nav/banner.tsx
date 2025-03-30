"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false); // Start as false so it hides initially
  const [isClosed, setIsClosed] = useState(false); // Track if the banner is closed

  // Use useEffect to show the banner after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Set isVisible to true after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const handleClose = () => {
    setIsClosed(true); // Set isClosed to true to trigger slide down animation
    setTimeout(() => {
      setIsVisible(false); // Hide the banner after the slide down animation
    }, 300); // Match the transition duration
  };

  return (
    <div
      className={`fixed bottom-4 w-full sm:w-80 bg-yellow-500/20 backdrop-blur-3xl z-[99999] text-white py-4 px-6 flex flex-col justify-between items-center shadow-lg rounded-lg transform transition-all duration-500 ${
        isVisible ? "translate-y-0" : "translate-y-full opacity-0"
      } ${isClosed ? "translate-y-full opacity-0" : ""} 
        sm:left-auto sm:right-4 sm:translate-x-0 sm:bottom-4 
        md:left-[auto] md:right-4 md:translate-x-0`}
    >
      <p className="text-sm text-center sm:text-left font-medium leading-relaxed">
        🎉 This website was developed for the IT Festival at our{" "}
        <a className="px-[2px] text-yellow-400" href="/#map">
          college.
        </a>{" "}
        Now that the event is over, it has been kept here for showcase purposes
        only.
      </p>
      <div className="flex items-center gap-4 mt-4 sm:mt-2">
        <a target="_blank" href="https://soorajrao.in/?ref=excel">
          <Button variant={"secondary"}>Contact</Button>
        </a>
        <Button variant={"secondary"} onClick={handleClose}>
          Got it
        </Button>
      </div>
    </div>
  );
};

export default Banner;
