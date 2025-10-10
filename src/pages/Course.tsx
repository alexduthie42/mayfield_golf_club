import React from 'react';
import './../App.css';
import background from './../content/CourseMap.png'
import HoleButton from '../commonComponents/HoleButton';
import CourseDroneShot from './../content/CourseDroneShot.jpg'
import { TableContainer, Table, Th, Thead, Tbody, Tr, Td, Tfoot, TableCaption, GridItem, Grid, Text } from '@chakra-ui/react';
import UseWindowSize from '../commonComponents/UseWindowSize';
import { MobileWidth } from '../commonComponents/Globals';

export default function Course() {

  const { width } = UseWindowSize();
  const isDesktopView = width > MobileWidth;
  const templateColumns = isDesktopView ? 2 : 1;

  return (
    <div>
      <div>    
        <div className='titleContainer'>
          <img src={CourseDroneShot} className='titleImage'/>
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
        <Grid templateColumns={`repeat(${templateColumns}, 1fr)`} gap={6} className='courseGrid'>
          <GridItem colSpan={1}>
            <div className="courseMapContainer">
              <img src={background} className={isDesktopView ? 'courseMapDesktop' : 'courseMapMobile'} />
              <HoleButton top="40%" left={isDesktopView ? "62.5%" : "73%"} transform="translate(-50%, -50%)" label="1"/>
              <HoleButton top="9%" left={isDesktopView ? "59%" : "67.5%"} transform="translate(-50%, -50%)" label="2"/>
              <HoleButton top="35%" left={isDesktopView ? "56%" : "61.5%"} transform="translate(-50%, -50%)" label="3"/>
              <HoleButton top="22%" left={isDesktopView ? "44.5%" : "39.5%"} transform="translate(-50%, -50%)" label="4"/>
              <HoleButton top="4%" left={isDesktopView ? "35%" : "22%"} transform="translate(-50%, -50%)" label="5"/>
              <HoleButton top="31%" left={isDesktopView ? "40%" : "32%"} transform="translate(-50%, -50%)" label="6"/>
              <HoleButton top="75%" left={isDesktopView ? "55%" : "59%"} transform="translate(-50%, -50%)" label="7"/>
              <HoleButton top="65%" left={isDesktopView ? "42%" : "35%"} transform="translate(-50%, -50%)" label="8"/>
              <HoleButton top="68%" left={isDesktopView ? "62.5%" : "73%"} transform="translate(-50%, -50%)" label="9"/>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>
                        <Text fontWeight="bold" fontSize="lg">Hole</Text>
                        <br/>
                      </Th>
                      <Th>                        
                        <Text fontWeight="bold" fontSize="lg">Distance (m)</Text>
                        <Text fontSize="xs" color="gray.500">MENS</Text>
                      </Th>
                      <Th>
                        <Text fontWeight="bold" fontSize="lg">Par</Text>
                        <Text fontSize="xs" color="gray.500">MENS</Text>
                      </Th>
                      <Th>
                        <Text fontWeight="bold" fontSize="lg">Stroke</Text>
                        <Text fontSize="xs" color="gray.500">MENS</Text>
                      </Th>
                      <Th>                        
                        <Text fontWeight="bold" fontSize="lg">Distance (m)</Text>
                        <Text fontSize="xs" color="gray.500">WOMENS</Text>
                      </Th>
                      <Th>
                        <Text fontWeight="bold" fontSize="lg">Par</Text>
                        <Text fontSize="xs" color="gray.500">WOMENS</Text>
                      </Th>
                      <Th>
                        <Text fontWeight="bold" fontSize="lg">Stroke</Text>
                        <Text fontSize="xs" color="gray.500">WOMENS</Text>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>1</Td>
                      <Td>335</Td>
                      <Td>4</Td>
                      <Td>5</Td>
                      <Td>304</Td>
                      <Td>4</Td>
                      <Td>6</Td>
                    </Tr>
                    <Tr>
                      <Td>2</Td>
                      <Td>162</Td>
                      <Td>3</Td>
                      <Td>13</Td>
                      <Td>137</Td>
                      <Td>3</Td>
                      <Td>18</Td>
                    </Tr>
                    <Tr>
                      <Td>3</Td>
                      <Td>439</Td>
                      <Td>5</Td>
                      <Td>16</Td>
                      <Td>416</Td>
                      <Td>5</Td>
                      <Td>7</Td>
                    </Tr>
                    <Tr>
                      <Td>4</Td>
                      <Td>351</Td>
                      <Td>4</Td>
                      <Td>6</Td>
                      <Td>305</Td>
                      <Td>4</Td>
                      <Td>5</Td>
                    </Tr>
                    <Tr>
                      <Td>5</Td>
                      <Td>124</Td>
                      <Td>3</Td>
                      <Td>12</Td>
                      <Td>113</Td>
                      <Td>2</Td>
                      <Td>16</Td>
                    </Tr>
                    <Tr>
                      <Td>6</Td>
                      <Td>346</Td>
                      <Td>4</Td>
                      <Td>4</Td>
                      <Td>303</Td>
                      <Td>4</Td>
                      <Td>9</Td>
                    </Tr>
                    <Tr>
                      <Td>7</Td>
                      <Td>401</Td>
                      <Td>4</Td>
                      <Td>1</Td>
                      <Td>303</Td>
                      <Td>4</Td>
                      <Td>11</Td>
                    </Tr>
                    <Tr>
                      <Td>8</Td>
                      <Td>462</Td>
                      <Td>5</Td>
                      <Td>8</Td>
                      <Td>431</Td>
                      <Td>5</Td>
                      <Td>2</Td>
                    </Tr>
                    <Tr>
                      <Td>9</Td>
                      <Td>305</Td>
                      <Td>4</Td>
                      <Td>14</Td>
                      <Td>288</Td>
                      <Td>4</Td>
                      <Td>13</Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>OUT</Th>
                      <Th>2925</Th>
                      <Th>36</Th>
                      <Th></Th>
                      <Th>2600</Th>
                      <Th>36</Th>
                      <Th></Th>
                    </Tr>
                  </Tfoot>
                </Table>
                <Table>
                  <Tbody>
                    <Tr>
                      <Td>10</Td>
                      <Td>336</Td>
                      <Td>4</Td>
                      <Td>9</Td>
                      <Td>336</Td>
                      <Td>4</Td>
                      <Td>3</Td>
                    </Tr>
                    <Tr>
                      <Td>11</Td>
                      <Td>139</Td>
                      <Td>3</Td>
                      <Td>17</Td>
                      <Td>139</Td>
                      <Td>3</Td>
                      <Td>17</Td>
                    </Tr>
                    <Tr>
                      <Td>12</Td>
                      <Td>420</Td>
                      <Td>5</Td>
                      <Td>18</Td>
                      <Td>420</Td>
                      <Td>5</Td>
                      <Td>4</Td>
                    </Tr>
                    <Tr>
                      <Td>13</Td>
                      <Td>351</Td>
                      <Td>4</Td>
                      <Td>7</Td>
                      <Td>295</Td>
                      <Td>4</Td>
                      <Td>10</Td>
                    </Tr>
                    <Tr>
                      <Td>14</Td>
                      <Td>110</Td>
                      <Td>3</Td>
                      <Td>15</Td>
                      <Td>122</Td>
                      <Td>3</Td>
                      <Td>15</Td>
                    </Tr>
                    <Tr>
                      <Td>15</Td>
                      <Td>367</Td>
                      <Td>4</Td>
                      <Td>2</Td>
                      <Td>308</Td>
                      <Td>4</Td>
                      <Td>8</Td>
                    </Tr>
                    <Tr>
                      <Td>16</Td>
                      <Td>329</Td>
                      <Td>4</Td>
                      <Td>10</Td>
                      <Td>306</Td>
                      <Td>4</Td>
                      <Td>12</Td>
                    </Tr>
                    <Tr>
                      <Td>17</Td>
                      <Td>482</Td>
                      <Td>5</Td>
                      <Td>3</Td>
                      <Td>462</Td>
                      <Td>5</Td>
                      <Td>1</Td>
                    </Tr>
                    <Tr>
                      <Td>18</Td>
                      <Td>306</Td>
                      <Td>4</Td>
                      <Td>11</Td>
                      <Td>267</Td>
                      <Td>4</Td>
                      <Td>14</Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>IN</Th>
                      <Th>2840</Th>
                      <Th>36</Th>
                      <Th></Th>
                      <Th>2655</Th>
                      <Th>36</Th>
                      <Th></Th>
                    </Tr>
                    <Tr>
                      <Th>OUT</Th>
                      <Th>2925</Th>
                      <Th>36</Th>
                      <Th></Th>
                      <Th>2600</Th>
                      <Th>36</Th>
                      <Th></Th>
                    </Tr>
                    <Tr>
                      <Th>TOTAL</Th>
                      <Th>5765</Th>
                      <Th>72</Th>
                      <Th></Th>
                      <Th>5255</Th>
                      <Th>72</Th>
                      <Th></Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
              </div>
          </GridItem>
        </Grid>


  

    
    </div>
  );
}
