"use client";

import { Button, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const navigationConfig = [
  {
    label: () => <div>Chat</div>,
    route: "/chat/",
  },
  {
    label: () => <div>Whiteboard</div>,
    route: "/whiteboard/",
  },
];

export default function NavigationBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState(pathname);

  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname]);

  // 當前的link 顏色狀態不一樣
  return (
    <div className={cn("relative flex flex-col pt-16 gap-2 ", className)}>
      {navigationConfig.map((item) => (
        <Button
          key={item.route}
          disabled={currentRoute === item.route}
          sx={{
            fontSize: "1rem",
            fontWeight: 400,
            textAlign: "center",
          }}
          href={item.route}
        >
          {item.label()}
        </Button>
      ))}
    </div>
  );
}
