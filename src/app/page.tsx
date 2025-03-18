"use client";
import { Loader } from "@/components/home/loader/loader";
import ExcelFestPage from "@/components/home/v4";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ExcelFestPage />
    </Suspense>
  );
};

export default page;
