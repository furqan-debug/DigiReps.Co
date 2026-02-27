import React from 'react'
import ScrollCounter  from "@/components/home/Counter";

export const DRCounters = () => {
  return (
    <section className='pl-25 pr-25 pb-25 bg-white'>    
        <div className="bg-white py-12 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-gray-200 py-8">

                <div className="flex flex-col items-center justify-center text-center border-gray-200 px-4">
                    <h2 className="font-medium txtBlue">
                      $1M+
                    </h2>
                    <p>Cost Savings Annually</p>
                </div>

                <div className="flex flex-col items-center justify-center text-center border-gray-200 px-4">
                    <h2 className="font-medium txtBlue">
                      <ScrollCounter target={150} duration={2000} />+
                    </h2>
                    <p>Clients Served</p>
                </div>

                <div className="flex flex-col items-center justify-center text-center border-gray-200 px-4">
                    <h2 className="font-medium txtBlue">
                      <ScrollCounter target={50} duration={2000} />+
                    </h2>
                    <p>Years Leadership Experience</p>
                </div>

                <div className="flex flex-col items-center justify-center text-center border-gray-200 px-4">
                    <h2 className="font-medium txtBlue">
                      <ScrollCounter target={350} duration={2000} />
                    </h2>
                    <p>Reps Placed</p>
                </div>

            </div>
        </div>
    </section>
    
  )
}

export default DRCounters;