"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = () => {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";
  const [showModal, setShowModal] = useState(false);

  // Effect to handle the admin parameter
  useEffect(() => {
    if (isAdmin) {
      // Clear the access key and show modal when admin param is detected
      localStorage.removeItem("accessKey");
      setShowModal(true);
    }
  }, [isAdmin]);

  return (
    <div className='flex min-h-screen flex-col md:flex-row overflow-hidden'>
      {showModal && <PasskeyModal />}

      <section className='remove-scrollbar container flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10'>
        <div className='w-full max-w-[496px] flex flex-col'>
          <Image
            src='/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            alt='patient'
            className='mb-8 md:mb-12 h-8 md:h-10 w-fit'
          />

          <PatientForm />

          <div className='text-14-regular mt-10 md:mt-20 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © 2024 CarePluse
            </p>
            <Link
              href='/?admin=true'
              className='text-green-500'
              onClick={() => {
                // This ensures the modal shows even if we're already on the page
                localStorage.removeItem("accessKey");
                setShowModal(true);
              }}
            >
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/onboarding-img.png'
        height={1000}
        width={1000}
        alt='patient'
        className='hidden md:block w-full md:w-[45%] lg:w-[50%] h-screen object-cover'
      />
    </div>
  );
};

export default Home;
