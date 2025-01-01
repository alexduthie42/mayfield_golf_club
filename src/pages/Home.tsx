import React from 'react';
import './../App.css';
import slide1 from './../content/slides/slide1.jpg'
import slide2 from './../content/slides/slide2.jpg'
import slide3 from './../content/slides/slide3.jpg'
import slide4 from './../content/slides/slide4.jpg'
import slide5 from './../content/slides/slide5.jpg'
import emblem from './../content/MayfieldGolfClubEmblem.png'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slides = [slide1, slide2, slide3, slide4, slide5]

export default function Home() {

  const slideShow = () => {
    let slideShow = []; 

    for (let index = 0; index < slides.length; index++) {
      slideShow.push(
        <div className="each-slide-effect" key={index}>
          <img src={slides[index]} key={index} className='slideShowImage'/>
        </div>
      )
    }
    
    return slideShow;
  }

  return (
    <div>    
      <div className='slideShowContainer'>
        <img src={emblem} className='slideShowEmblem'/>
        <Slide duration={5000} arrows={false} canSwipe={false} pauseOnHover={false} cssClass='slideShow'>
            {slideShow()}
        </Slide>
      </div>
    </div>

  );
}
