import React from 'react';
import './../App.css';
import PageHeader from '../commonComponents/PageHeader';
import background from './../content/MayfieldGolfClub.png'

const googleApiKey: string = "AIzaSyDzLvoYjk5irUTeW63xwl2IS1ouV12lsmA";

export default function Contact() {
  return (
    <div>
      <p>contact</p>
      <img src={background} className='background'/>
      <iframe src={`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=place_id:ChIJmY9zTsG7LW0Rarzprjp9YwY`} />
    </div>
  );
}

//
