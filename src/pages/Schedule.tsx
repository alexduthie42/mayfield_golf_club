import React from 'react';
import './../App.css';
import PageHeader from '../commonComponents/PageHeader';
import background from './../content/MayfieldGolfClub.png'
import { 
  Accordion, 
  AccordionItem, 
  AccordionButton, 
  Box, 
  AccordionIcon,
  AccordionPanel,
  Heading,
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody
} from '@chakra-ui/react'

function MonthItem(monthName: string, events: string[] ) {
  return (
    <AccordionItem key={monthName}>
      <h2>
        <AccordionButton>
          <Box as='span' flex='1' textAlign='left'>
            {monthName}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Event</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.map(function(event) {
                return EventRow(event);
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </AccordionPanel>
    </AccordionItem>
  )
}

function EventRow(event: string ) {
  return (
    <Tr key={event}>
      <Td>January 1st</Td>
      <Td>{event}</Td>
      <Td>test</Td>
    </Tr>
  )
}

export default function Schedule() {
  return (
    <div>
      <div className='heading'>
        <Heading as='h2' size='2xl' variant="boldBlue">
          2024 Schedule
        </Heading>
      </div>
      <div className='accordion'>
        <Accordion allowToggle>
          {MonthItem("January", ["golf", "more golf"])}
          {MonthItem("February", ["golf", "more golf"])}
          {MonthItem("March", ["golf", "more golf"])}
          {MonthItem("April", ["golf", "more golf"])}
          {MonthItem("May", ["golf", "more golf"])}
          {MonthItem("June", ["golf", "more golf"])}
          {MonthItem("July", ["golf", "more golf"])}
          {MonthItem("August", ["golf", "more golf"])}
          {MonthItem("September", ["golf", "more golf"])}
          {MonthItem("October", ["golf", "more golf"])}
          {MonthItem("November", ["golf", "more golf"])}
          {MonthItem("December", ["golf", "more golf"])}
        </Accordion>
      </div>
    </div>
  );
}
