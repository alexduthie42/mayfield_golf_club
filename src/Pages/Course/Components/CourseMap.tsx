import React from 'react';
import './../../../App.css';
import CourseMapImage from './../Content/CourseMapImage.png'
import HoleButton from './HoleButton';
import UseWindowSize from '../../../CommonComponents/UseWindowSize';
import { MobileWidth } from '../../../CommonComponents/Globals';

export default function CourseMap() {

  const { width } = UseWindowSize();
  const isDesktopView = width > MobileWidth;

  return (
    <div className='courseMap'>
      <div className="courseMapBox">
          <img src={CourseMapImage} className={isDesktopView ? 'courseMapDesktop' : 'courseMapMobile'} />
          <HoleButton top="40%" left={isDesktopView ? "73%" : "73%"} transform="translate(-50%, -50%)" label="1"/>
          <HoleButton top="9%" left={isDesktopView ? "67%" : "67.5%"} transform="translate(-50%, -50%)" label="2"/>
          <HoleButton top="35%" left={isDesktopView ? "61.5%" : "61.5%"} transform="translate(-50%, -50%)" label="3"/>
          <HoleButton top="22%" left={isDesktopView ? "39%" : "39.5%"} transform="translate(-50%, -50%)" label="4"/>
          <HoleButton top="4%" left={isDesktopView ? "20%" : "22%"} transform="translate(-50%, -50%)" label="5"/>
          <HoleButton top="31%" left={isDesktopView ? "32%" : "32%"} transform="translate(-50%, -50%)" label="6"/>
          <HoleButton top="75%" left={isDesktopView ? "58.5%" : "59%"} transform="translate(-50%, -50%)" label="7"/>
          <HoleButton top="65%" left={isDesktopView ? "35%" : "35%"} transform="translate(-50%, -50%)" label="8"/>
          <HoleButton top="68%" left={isDesktopView ? "73%" : "73%"} transform="translate(-50%, -50%)" label="9"/>
      </div>
    </div>
  );
}
