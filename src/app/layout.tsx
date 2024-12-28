"use client";
import "./globals.css";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Backdrop, CircularProgress, ThemeProvider } from "@mui/material";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";
import { defaultTheme } from "@/config/theme";
import { cn } from "@/lib/utils";
import useCommonStore from "@/stores/useCommonStore";
import { useLayoutStore } from "@/stores/useLayoutStore";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useCommonStore();
  const { isShowingNavigation, setShowingNavigation } = useLayoutStore();

  return (
    <html lang="en">
      <meta name="version" content={process.env.VERSION} />
      <body className={inter.className}>
        <ThemeProvider theme={defaultTheme}>
          <div
            className={cn(
              "font-notoSansHK w-screen h-screen grid grid-cols-[minmax(100px,15%)_1fr] grid-rows-[64px_1fr] transition-all",
              isShowingNavigation
                ? "grid-cols-[200px_1fr]"
                : "grid-cols-[0px_1fr]"
            )}
          >
            <Header
              className={cn(
                "px-5 col-span-2 row-span-1 bg-white z-10 shadow-md"
              )}
            />
            <>
              <NavigationBar
                className={cn(
                  "bg-[#FCFAF2] col-span-1 row-span-2 overflow-hidden"
                )}
              />
              <div
                className={cn(
                  "relative bg-blue-purple-grey-00 col-span-1 row-span-1 overflow-hidden"
                )}
              >
                {/* <div
                  className="text-black flex justify-center items-center absolute left-0 top-6 bg-purple-03 cursor-pointer w-5 h-11 shrink-0 rounded-r-lg z-[1]"
                  onClick={() => setShowingNavigation(!isShowingNavigation)}
                >
                  <PlayArrowIcon
                    className={cn(
                      "text-white",
                      "opacity-80",
                      isShowingNavigation
                        ? "transform rotate-180"
                        : "transform rotate-0"
                    )}
                  />
                </div> */}
                <div className={cn("relative w-full h-full overflow-y-auto")}>
                  {children}
                </div>
                <Backdrop
                  sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                  })}
                  open={isLoading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
            </>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
