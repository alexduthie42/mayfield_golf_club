import React from 'react';
import './../App.css';
import {motion} from "framer-motion";

interface PageTitleProps {
  mainText: string;
  subText?: string;
  image: string;
}

export default function PageTitle(pageTitleProps: PageTitleProps) {

  return (  
    <div className='titleContainer'>
        <motion.img
          src={pageTitleProps.image}     
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className='titleImage'/>
        <div className='titleTextContainer'>
        <div className='titleText'>
            {pageTitleProps.mainText}
        </div>
        <div className='titleSubText'>
            {pageTitleProps.subText}
        </div>
        </div>
    </div>
  );
}
