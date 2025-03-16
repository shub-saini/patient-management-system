import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className='flex min-h-screen overflow-hidden'>
      <section className='remove-scrollbar flex-1 overflow-y-auto'>
        <div className='flex min-h-full w-full items-center justify-center px-4 py-6 sm:px-6 lg:px-8'>
          <div className='flex w-full max-w-[600px] flex-col items-center'>
            <div className='mb-8 md:mb-12 flex justify-center'>
              <Link href='/'>
                <Image
                  src='/assets/icons/logo-full.svg'
                  height={1000}
                  width={1000}
                  alt='logo'
                  className='h-8 md:h-10 w-fit'
                />
              </Link>
            </div>

            <div className='flex flex-col items-center'>
              <Image
                src='/assets/gifs/success.gif'
                height={300}
                width={280}
                alt='success'
                className='h-[180px] w-auto sm:h-[220px] md:h-[280px]'
              />

              <h2 className='text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-tight text-center my-6'>
                Your <span className='text-green-500'>appointment request</span>{" "}
                has been successfully submitted!
              </h2>

              <p className='text-center text-dark-700 mb-8'>
                We&apos;ll be in touch shortly to confirm.
              </p>
            </div>

            {/* Updated appointment details section */}
            <div className='w-full border-t border-b border-dark-400/30 py-5 mb-8'>
              <p className='font-medium mb-3'>Requested appointment details:</p>

              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex-shrink-0 w-8 h-8 rounded-full bg-dark-400/50 flex items-center justify-center'>
                    <Image
                      src={doctor?.image!}
                      alt='doctor'
                      width={24}
                      height={24}
                      className='rounded-full'
                    />
                  </div>
                  <p className='font-medium'>Dr. {doctor?.name}</p>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='flex-shrink-0 w-8 h-8 rounded-full bg-dark-400/50 flex items-center justify-center'>
                    <Image
                      src='/assets/icons/calendar.svg'
                      height={20}
                      width={20}
                      alt='calendar'
                    />
                  </div>
                  <p>{formatDateTime(appointment.schedule).dateTime}</p>
                </div>
              </div>
            </div>

            <Button
              variant='outline'
              className='shad-primary-btn w-full max-w-[300px]'
              asChild
            >
              <Link href={`/patient/${userId}/new-appointment`}>
                New Appointment
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/appointment-img.png'
        height={1000}
        width={1000}
        alt='appointment'
        className='hidden h-screen w-[390px] object-cover lg:block'
      />
    </div>
  );
};

export default RequestSuccess;
