import React from 'react';
import './../App.css';
import PageHeader from '../commonComponents/PageHeader';
import background from './../content/MayfieldGolfClub.png'

export default function Course() {
  return (
    <div>
      <p>course</p>
      <img src={background} className='background'/>
    </div>
  );
}
