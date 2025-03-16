import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

const Register = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patient/${userId}/new-appointment`);

  return (
    <div className='flex min-h-screen overflow-hidden'>
      <section className='remove-scrollbar flex-1 overflow-y-auto'>
        <div className='flex min-h-full w-full items-center justify-center px-4 py-6 sm:px-6 lg:px-8'>
          <div className='w-full max-w-[860px] flex flex-col'>
            <Image
              src='/assets/icons/logo-full.svg'
              height={1000}
              width={1000}
              alt='patient'
              className='mb-8 md:mb-12 h-8 md:h-10 w-fit'
            />

            <RegisterForm user={user} />

            <p className='copyright py-6 md:py-12'>© 2024 CarePluse</p>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/register-img.png'
        height={1000}
        width={1000}
        alt='patient'
        className='hidden h-screen w-[390px] object-cover lg:block'
      />
    </div>
  );
};

export default Register;
