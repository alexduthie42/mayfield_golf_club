import React from 'react';
import './../../App.css';
import slide1 from './Content/Slides/Slide1.jpg'
import slide2 from './Content/Slides/Slide2.jpg'
import slide3 from './Content/Slides/Slide3.jpg'
import slide4 from './Content/Slides/Slide4.jpg'
import slide5 from './Content/Slides/Slide5.jpg'
import image1 from './Content/Image1.jpg'
import image2 from './Content/Image2.jpg'
import emblem from './../../Content/MayfieldGolfClubEmblem.png'
import UseWindowSize from '../../CommonComponents/UseWindowSize';
import { MobileWidth } from '../../CommonComponents/Globals';
import { Slide } from 'react-slideshow-image';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import 'react-slideshow-image/dist/styles.css';
import { GoogleApiKey } from '../../CommonComponents/Globals';

const slides = [slide1, slide2, slide3, slide4, slide5]

export default function Home() {

  const { width } = UseWindowSize();
  const isDesktopView = width > MobileWidth;

  const slideShow = () => {
    let slideShow = []; 

    for (let index = 0; index < slides.length; index++) {
      slideShow.push(
        <div className="each-slide-effect" key={index}>
          <img src={slides[index]} key={index} className='slideShowImage'/>
        </div>
      )
    }
    
    return (      
      <div className='slideShowContainer'>
        <img src={emblem} className='slideShowEmblem'/>
        <Slide duration={5000} arrows={false} canSwipe={false} pauseOnHover={false} cssClass='slideShow'>
            {slideShow}
        </Slide>
      </div>
    );
  }


  if (isDesktopView)
  {
    return (
    <div>    
      {slideShow()}
      <div className='homePageContainerDesktop'>
        <div className='homeTextContainerDesktop'>
          <div className='homeTextContainerCenter'>
            <Text className='textLargeBold'>ONE OF THE BEST 9 HOLE GOLF COURSES IN MID CANTERBURY</Text>
          </div>
          <div className='courseTextMobile'>
            <Text className='textLarge'>Mayfield Golf Club is a friendly country course in the heart of Mid Canterbury. 
              Our scenic nine-hole layout, played twice for a full 18, offers irrigated fairways, year‑round playability, and a relaxed atmosphere surrounded by rolling farmland on the bank of the Hinds river. 
              Whether you’re a seasoned golfer or just starting out, Mayfield provides an affordable, welcoming place to enjoy the game, connect with others, and experience the charm of rural New Zealand golf.</Text>
          </div>
        </div>
        <Grid templateColumns={`repeat(2, 1fr)`} gap={0} className='homeGridDesktop'>
          <GridItem colSpan={1} display="flex" alignItems="center" justifyContent="center">
            <div>
              <div className='homeTextContainerDesktop'>
                <div className='homeTextContainerCenter'>
                  <Text className='textLargeBold'>GREEN FEES</Text>
                </div>
                <div className='courseTextMobile'>
                  <Text className='textLarge'>
                    18 Holes: $30
                    <br/>
                    9 Holes: $20
                    <br/>
                    Juniors: $10
                    <br/>
                  </Text>
                </div>
              </div>
              <div className='homeTextContainerDesktop'>
                <div className='homeTextContainerCenter'>
                  <Text className='textLargeBold'>WHERE TO FIND US</Text>
                </div>
                <div className='courseTextMobile'>
                  <Text className='textLarge'>
                    Mayfield Golf Course is located at 30 Bulls Road, Mayfield, Canterbury, New Zealand.
                    <br/>
                    Use the map below to locate us.
                  </Text>
                </div>
              </div>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <img src={image1} className='titleImage'/>
          </GridItem>
        </Grid>
      </div>
      <iframe className='googleMap' src={`https://www.google.com/maps/embed/v1/place?key=${GoogleApiKey}&q=place_id:ChIJmY9zTsG7LW0Rarzprjp9YwY`} />
    </div>
    );
  }
  else 
  {
    return (
    <div>    
      {slideShow()}
      <div className='homePageContainerMobile'>
        <div className='homeTextContainerMobile'>
          <div className='homeTextContainerCenter'>
            <Text className='textLargeBold'>ONE OF THE BEST 9 HOLE GOLF COURSES IN MID CANTERBURY</Text>
          </div>
          <div className='courseTextMobile'>
            <Text className='textLarge'>Mayfield Golf Club is a friendly country course in the heart of Mid Canterbury. 
              Our scenic nine-hole layout, played twice for a full 18, offers irrigated fairways, year‑round playability, and a relaxed atmosphere surrounded by rolling farmland on the bank of the Hinds river. 
              Whether you’re a seasoned golfer or just starting out, Mayfield provides an affordable, welcoming place to enjoy the game, connect with others, and experience the charm of rural New Zealand golf.</Text>
          </div>
        </div>
        <img src={image1}/>
        <div className='homeTextContainerMobile'>
          <div className='homeTextContainerCenter'>
            <Text className='textLargeBold'>GREEN FEES</Text>
          </div>
          <div className='courseTextMobile'>
            <Text className='textLarge'>
              18 Holes: $30
              <br/>
              9 Holes: $20
              <br/>
              Juniors: $10
              <br/>
            </Text>
          </div>
        </div>
        <img src={image2}/>
        <div className='homeTextContainerMobile'>
          <div className='homeTextContainerCenter'>
            <Text className='textLargeBold'>WHERE TO FIND US</Text>
          </div>
          <div className='courseTextMobile'>
            <Text className='textLarge'>
              Mayfield Golf Course is located at 30 Bulls Road, Mayfield, Canterbury, New Zealand.
              <br/>
              Use the map below to locate us.
            </Text>
          </div>
        </div>
      </div>
      <iframe className='googleMap' src={`https://www.google.com/maps/embed/v1/place?key=${GoogleApiKey}&q=place_id:ChIJmY9zTsG7LW0Rarzprjp9YwY`} />
    </div>
    );
  }
}
