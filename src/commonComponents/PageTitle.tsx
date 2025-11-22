import React from 'react';
import './../App.css';

interface PageTitleProps {
  mainText: string;
  subText?: string;
  image: string;
}

export default function PageTitle(pageTitleProps: PageTitleProps) {

  return (  
    <div className='titleContainer'>
        <img src={pageTitleProps.image} className='titleImage'/>
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
