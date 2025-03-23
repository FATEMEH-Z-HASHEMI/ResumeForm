import React from 'react'
import Form from "../sections/Form"
import { FaTwitter , FaFacebookF , FaLinkedinIn } from "react-icons/fa";


function Home() {
  return (
    <div className='w-full h-screen flex flex-col justify-start items-center bg-bg bg-no-repeat bg-center bg-cover py-5'>
      <div className='flex flex-row items-center justify-between w-[70%] md:w-[50%]'>
        <span className='w-7 md:w-10 h-7 md:h-10 bg-form rounded-full shadow-lg'>
        </span>
        <span className='flex flex-row items-center justify-center gap-5 text-form'>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer">
              <FaFacebookF className="cursor-pointer hover:text-slate-400 transition-colors duration-300"/>
          </a>
          <a 
            href="https://ch.linkedin.com"
            target="_blank"
            rel="noopener noreferrer">
            <FaLinkedinIn 
              className='cursor-pointer hover:text-slate-400 transition-colors duration-300'/>
          </a>
          <a 
            href="https://x.com/?lang=en"
            target="_blank"
            rel="noopener noreferrer">
              <FaTwitter 
                className='cursor-pointer hover:text-slate-400 transition-colors duration-300'/>
          </a>
        </span>
      </div>
      
      <Form data-testid="form"/>

    </div>
  )
}

export default Home