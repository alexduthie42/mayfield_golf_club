import React from 'react';
import './../App.css';
import PageHeader from '../commonComponents/PageHeader';
import background from './../content/MayfieldGolfClub.png'

export default function Schedule() {
  return (
    <div>
      <p>schedule</p>
      <img src={background} className='background'/>
    </div>
  );
}
