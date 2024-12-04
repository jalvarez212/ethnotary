import { BarChart3, Send, FileText } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function Sidebar() {
  return (
    <Card className="bg-[#5710b2] p-4 flex flex-col items-center gap-8 h-screen fixed">
      <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=48&width=48"
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
  );
}
