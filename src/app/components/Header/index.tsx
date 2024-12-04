import { Card, CardContent } from "../ui/card";
import { Settings, File, ContrastIcon } from "lucide-react";
import { Web3Status } from "../Dialogs/Wallet/Web3Status";
import SwitchChainDialog from "../Dialogs/SwitchChainDialog";
import ConnectorDialog from "../Dialogs/ConnectorDialog";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const contractTypes = [
    {
      icon: <Web3Status />,
      title: "Wallet",
      link: "",
    },
    {
      icon: <Settings className="w-6 h-6 text-clay-secondary" />,
      title: "Setting",
      link: "/views?tab=settings",
    },
    {
      icon: <File className="w-6 h-6 text-clay-secondary" />,
      title: "Wizard",
      link: "/views?tab=wizard",
    },
  ];
  return (
    <div className="px-5">
      <Card className="mb-6">
        <CardContent className="flex justify-between p-4">
          <Link href="/">
            <Image
              src="/logo/logo_full.png"
              alt="logo"
              width={30}
              height={30}
            />
          </Link>
          <div className="flex justify-center items-center gap-4">
            {contractTypes.map((data, index) =>
              data.link ? (
                <Link href={data.link} key={index}>
                  <div
                    title={data.title}
                    className="p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                    {data.icon}
                  </div>
                </Link>
              ) : (
                <div
                  key={index}
                  title={data.title}
                  className="p-2 cursor-pointer rounded-lg opacity-70"
                >
                  {data.icon}
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
      <SwitchChainDialog />
      <ConnectorDialog />
    </div>
  );
};

export default Header;
