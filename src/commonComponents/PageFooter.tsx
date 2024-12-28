import React from 'react';
import './../App.css';
import emblem from './../content/MayfieldGolfClubEmblem.png';
import { Text } from '@chakra-ui/react'
import { Center, AbsoluteCenter, Grid, GridItem } from '@chakra-ui/react';
import { PhoneIcon, StarIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/react';

export default function PageFooter() {

    const googleMapUrl = 'https://www.google.com/maps/place/Mayfield+Golf+Club/@-43.8140236,171.4369777,15.5z/data=!4m14!1m7!3m6!1s0x6d2dbbc14e738f99:0x6637d3aaee9bc6a!2sMayfield+Golf+Club!8m2!3d-43.8162247!4d171.440136!16s%2Fg%2F1tdyftvc!3m5!1s0x6d2dbbc14e738f99:0x6637d3aaee9bc6a!8m2!3d-43.8162247!4d171.440136!16s%2Fg%2F1tdyftvc?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D';
    const emailAddress = 'mayfield@golf.co.nz';

    return (
        <div className='footer'>
          <Grid templateColumns='repeat(3, 1fr)' className='footergrid'>     
              <Center>
                <GridItem colSpan={1}>
                    <Text>Address	&nbsp;<StarIcon/></Text>
                    <Link href={googleMapUrl}>30 Bulls Road
                      <br></br>Mayfield 7778
                    </Link>
                </GridItem>  
              </Center> 
              <Center>     
                <GridItem colSpan={1}>
                    <img src={emblem} className='footeremblem'/>
                </GridItem>   
              </Center>    
              <Center>   
                <GridItem colSpan={1}>
                    <Text>Contact	&nbsp;<PhoneIcon/></Text>
                    <Link href={emailAddress}>Email: {emailAddress}</Link>
                    <Text>Phone: +64 3 303 6342</Text>
                </GridItem>
              </Center>
          </Grid>
        </div>
    );
}
