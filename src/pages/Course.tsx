import React from 'react';
import './../App.css';
import background from './../content/CourseMap.png'
import HoleButton from '../commonComponents/HoleButton';
import slide1 from './../content/CourseDroneShot.jpg'

export default function Course() {
  return (
    <div>
      <div>    
        <div className='titleContainer'>
          <img src={slide1} className='titleImage'/>
          <div className='titleTextContainer'>
            <div className='titleText'>
              COURSE
            </div>
            <div className='titleSubText'>
              9 HOLES - PAR 72
            </div>
          </div>
        </div>
      </div>

      <div className="courseMapContainer">
        <img src={background} className='background' />
        <HoleButton top="40%" left="73%" transform="translate(-50%, -50%)" label="1"/>
        <HoleButton top="9%" left="67.5%" transform="translate(-50%, -50%)" label="2"/>
        <HoleButton top="35%" left="61.5%" transform="translate(-50%, -50%)" label="3"/>
        <HoleButton top="22%" left="39.5%" transform="translate(-50%, -50%)" label="4"/>
        <HoleButton top="4%" left="22%" transform="translate(-50%, -50%)" label="5"/>
        <HoleButton top="31%" left="32%" transform="translate(-50%, -50%)" label="6"/>
        <HoleButton top="75%" left="59%" transform="translate(-50%, -50%)" label="7"/>
        <HoleButton top="65%" left="35%" transform="translate(-50%, -50%)" label="8" />
        <HoleButton top="68%" left="73%" transform="translate(-50%, -50%)" label="9"/>
      </div>
    </div>
  );
}
