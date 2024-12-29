import React from 'react';
import './../App.css';
import PageHeader from '../commonComponents/PageHeader';
import slide1 from './../content/slides/slide1.jpg'
import slide2 from './../content/slides/slide2.jpg'
import slide3 from './../content/slides/slide3.jpg'
import slide4 from './../content/slides/slide4.jpg'
import slide5 from './../content/slides/slide5.jpg'
import emblem from './../content/MayfieldGolfClubEmblem.png'

const images = [slide1, slide2, slide3, slide4, slide5]

export default function Home() {

  const [count, setCount] = React.useState(0);
  const [image, setImage] = React.useState(images[0]);


  React.useEffect(() => {
    // set an interval timer if we are currently moused over
      const timer = setInterval(() => {
        // cycle prevCount using mod instead of checking for hard-coded length
        setCount((prevCount) => (prevCount + 1) % images.length);
        setImage(images[count])
      }, 5000);
      // automatically clear timer the next time this effect is fired or
      // the component is unmounted
      return () => clearInterval(timer);
    // the dependency on mousedOver means that this effect is fired
    // every time mousedOver changes
  }, );


  return (
    <div>    
      <div className='slideShowContainer'>
        <img src={emblem} className='slideShowEmblem'/>
        <img src={image} className='slideShowImage'/>
      </div>
    </div>

  );
}
