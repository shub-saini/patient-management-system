"use client";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      <div className='w-full'>{children}</div>
    </ThemeProvider>
  );
};
