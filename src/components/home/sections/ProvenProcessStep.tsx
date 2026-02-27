import React from 'react'
import ScrollCards from "@/components/home/ScrollCards";
import ScrollReveal from "@/components/home/ScrollReveal";

const ProvenProcessStep = () => {
  return (
    <section className='provenProcessStep flex flex-col items-center pb-30 md:px-0 px-12'>
        <ScrollReveal delay={0.2}>
          <h3 className='text-center rounded-full dot-heading font-medium mb-5 px-10 py-4'><span className='pl-2'>How it Works</span></h3>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h2 className='txtBlue font-medium mb-10 text-center heading-bottom-line-blue-orange'>
              Our Proven Process, <span className='txtYellow'>Step by</span> <br className="sm:block hidden" /> Step
          </h2>
        </ScrollReveal>
        <ScrollCards />
        {/* <ScrollCards2 /> */}
    </section>
    
  )
}

export default ProvenProcessStep;