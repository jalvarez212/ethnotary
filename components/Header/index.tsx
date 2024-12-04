import React from "react";
import { Card, CardContent } from "../ui/card";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="px-5">
      <Card className="mb-6">
        <CardContent className="flex justify-end p-4">
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-10 h-10 bg-black rounded-full" />
            ))}
            <Navbar />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;
