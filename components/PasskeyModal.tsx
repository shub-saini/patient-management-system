"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

export const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(true); // Always start open
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  // Remove or modify this useEffect to prevent auto-redirect
  useEffect(() => {
    // Only auto-redirect if we're already on the /admin page
    // This prevents direct access to /admin without passkey
    if (path === "/admin") {
      const accessKey = encryptedKey && decryptKey(encryptedKey);

      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {
        setOpen(false); // Keep admin page accessible
      } else {
        router.push("/"); // Redirect to home if no valid key
      }
    }
  }, [encryptedKey, path, router]);

  const closeModal = () => {
    setOpen(false);
    // Only redirect on close if we're on the admin page
    if (path === "/admin") {
      router.push("/");
    }
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey);
      setOpen(false);
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className=''>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between'>
            Admin Access Verification
            <Image
              src='/assets/icons/close.svg'
              alt='close'
              width={20}
              height={20}
              onClick={() => closeModal()}
              className='cursor-pointer'
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className='w-full flex justify-between'>
              <InputOTPSlot
                className='text-36-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={0}
              />
              <InputOTPSlot
                className='text-36-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={1}
              />
              <InputOTPSlot
                className='text-36-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={2}
              />
              <InputOTPSlot
                className='text-36-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={3}
              />
              <InputOTPSlot
                className='text-36-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={4}
              />
              <InputOTPSlot
                className='text-36-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className='shad-error text-14-regular mt-4 flex justify-center'>
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className='shad-primary-btn w-full'
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
