"use client";
import Link from "next/link";

import { FC } from "react";
import ConnectorDialog from "../Dialogs/connector";
import SwitchChainDialog from "../Dialogs/switchChainDialog";
import Navbar from "./Navbar";

const Header: FC = () => {
  return (
    <header className="w-full text-white bg-transparent z-50 py-4">
      <div className="flex flex-row justify-between items-center mx-9">
        <Link href="/" className="uppercase text-2xl md:text-8xl te">
          Degen Markets
        </Link>
      </div>
    </header>
  );
};

export default Header;
