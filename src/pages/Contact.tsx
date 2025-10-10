import React from 'react';
import './../App.css';
import PageHeader from '../commonComponents/PageHeader';
import background from './../content/MayfieldGolfClub.png'
import ContactShot from './../content/ContactShot.jpg'


const googleApiKey: string = "AIzaSyDzLvoYjk5irUTeW63xwl2IS1ouV12lsmA";

export default function Contact() {
  return (
    <div>
      <div>    
        <div className='titleContainer'>
          <img src={ContactShot} className='titleImage'/>
          <div className='titleTextContainer'>
            <div className='titleText'>
              CONTACT
            </div>
          </div>
        </div>
      </div>
      <iframe src={`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=place_id:ChIJmY9zTsG7LW0Rarzprjp9YwY`} />
    </div>
  );
}

//
