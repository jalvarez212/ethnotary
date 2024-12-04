import { BarChart3, Send, FileText } from "lucide-react";
import Image from "next/image";
import { Card } from "@/src/app/components/ui/card";

export default function Sidebar() {
  return (
    <div className="w-[80px] fixed left-1 top-0 min-h-full flex justify-center items-center">
      <Card className="bg-[#5710b2] p-4 flex flex-col items-center gap-8 h-[calc(100vh-10px)] fixed">
        <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
          <Image
            src="/logo/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <nav className="flex flex-col gap-6">
          {[
            { Icon: BarChart3, active: true },
            { Icon: Send, active: false },
            { Icon: FileText, active: false },
          ].map(({ Icon, active }, i) => (
            <button
              key={i}
              className={`p-3 rounded-lg ${
                active
                  ? "bg-white/10 text-white"
                  : "hover:bg-white/10 text-white/60"
              }`}
            >
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </nav>
      </Card>
    </div>
  );
}
