"use client";
import AccountSetting from "@/src/app/components/View/Settings";
import React from "react";

const page = () => {
  return (
    <>
      <React.Suspense fallback={<></>}>
        <AccountSetting />;
      </React.Suspense>
    </>
  );
};

export default page;
