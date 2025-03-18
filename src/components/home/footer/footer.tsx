"use client";
import fetchData from "@/components/analytics/fetch-data";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";

const Footer = () => {
  const [views, setViews] = useState<number | null>(null);
  const [displayedViews, setDisplayedViews] = useState(0);
  const [ref, isInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const mode = process.env.NEXT_PUBLIC_MODE === "production";

  const fetchViews = async () => {
    try {
      const res = await fetch(
        `https://viewcount.soorajrao.in/api/${
          mode ? "excel-4.0" : "test"
        }?svg=false`
      );
      const data = await res.json();
      if (data.success) setViews(data?.views);
    } catch {}
  };

  useEffect(() => {
    fetchViews();
  }, []);

  useEffect(() => {
    if (views !== null && isInView) {
      const interval = setInterval(() => {
        setDisplayedViews((prev) => {
          const diff = views - prev;
          const increment = Math.ceil(diff / 10);
          return prev + (diff > 0 ? Math.min(increment, diff) : 0);
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [views, isInView]);

  return (
    <footer className="py-8 relative border-t  border-amber-900/30">
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/5 to-[#0a0d14]"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Pirate-inspired footer decoration */}
        <div ref={ref} className=" ">
          <div className="text-center">
            <div className="flex sm:flex-row flex-col-reverse   w-full sm:justify-between justify-center  items-center space-x-4">
              <div className=" w-10 h-4 sm:block hidden "></div>
              <div className=" mt-2  sm:absolute min-w-36  bottom-0 sm:-bottom-2 left-1/2 right-1/2 sm:-translate-x-[50%]  cursor-default border border-amber-400/10 rounded-md px-4 py-2 flex items-center space-x-2 scale-90 md:scale-100 bg-transparent">
                <span className="h-2 w-2 animate-pulse bg-amber-400 rounded-full"></span>
                <div className="flex items-center gap-x-3 text-amber-400">
                  <span className="text-xs">Site Views</span>
                  <span className="text-xs font-semibold">
                    {" "}
                    {displayedViews.toLocaleString()}
                  </span>
                </div>
              </div>
              <Credit />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView] as const;
}

const Credit = () => {
  return (
    <p className="text-xs sm:text-sm mb-5 sm:mb-0">
      Designed & Developed by
      <a
        onClick={() => {
          fetchData(
            "open-linkedin",
            Cookies.get("ref") || "search",
            `Excel-footer`,
            ""
          );
        }}
        target="_blank"
        className=" mx-1 underline underline-offset-2 text-yellow-500"
        href={"https://www.linkedin.com/in/sooraj-rao"}
      >
        Sooraj Rao
      </a>
      and
      <a
        className=" mx-2 underline underline-offset-2 text-yellow-500"
        href={"/team"}
      >
        Co.
      </a>
    </p>
  );
};
