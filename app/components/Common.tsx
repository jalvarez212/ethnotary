import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
const Common = () => {
  const { toast } = useToast();
  return (
    <div>
      <Button
        onClick={() => {
          toast({
            variant: "default",
            action: <>some</>,
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
};

export default Common;
