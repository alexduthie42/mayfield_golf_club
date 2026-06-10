import React from 'react';
import './../../../App.css';
import { TableContainer, Table, Th, Thead, Tbody, Tr, Td, Tfoot, Box, Text, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon } from '@chakra-ui/react';

export default function CourseTableLong() {

    const tableHeader = (
        <Thead>
            <Tr>
                <Th>
                    <Text fontWeight="bold" fontSize="sm" textAlign="center">Hole</Text>
                </Th>
                <Th>                        
                    <Text fontWeight="bold" fontSize="sm" textAlign="center">Metres</Text>
                </Th>
                <Th>
                    <Text fontWeight="bold" fontSize="sm" textAlign="center">Par</Text>
                </Th>
                <Th>
                    <Text fontWeight="bold" fontSize="sm" textAlign="center">Stroke</Text>
                </Th>
            </Tr>
        </Thead>
    )

    function tableRow(hole: string, metres: string, par: string, stroke: string): JSX.Element {
        return (
            <Tr>
                <Td textAlign="center">{hole}</Td>
                <Td textAlign="center">{metres}</Td>
                <Td textAlign="center">{par}</Td>
                <Td textAlign="center">{stroke}</Td>
            </Tr>
        )
    }

    function footerRow(header: string, metres: string, par: string): JSX.Element {
        return (
            <Tr bg="green.100">
                <Th textAlign="center">{header}</Th>
                <Th textAlign="center">{metres}</Th>
                <Th textAlign="center">{par}</Th>
                <Th textAlign="center"></Th>
            </Tr>
        )
    }

    return (
        <div>
            <Accordion allowToggle className='accordionCourse'>
                <AccordionItem key='mens'>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            <Text className='textLarge'>Mens</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <TableContainer className='courseTableContainerMobile'>
                            <Table variant='striped' className='courseTableMobile'>
                                {tableHeader}
                                <Tbody>
                                    {tableRow('1', '355', '4' , '5')}
                                    {tableRow('2', '162', '3', '13')}
                                    {tableRow('3', '439', '5', '16')}
                                    {tableRow('4', '351', '4', '6')}
                                    {tableRow('5', '124', '3', '12')}
                                    {tableRow('6', '346', '4', '4')}
                                    {tableRow('7', '401', '4', '1')}
                                    {tableRow('8', '462', '5', '8')}
                                    {tableRow('9', '305', '4', '14')}
                                </Tbody>
                                <Tfoot>
                                    {footerRow('OUT','2925','36')}
                                </Tfoot>
                            </Table>
                            <Table variant='striped' className='courseTableLongTable'>
                                <Tbody>
                                    {tableRow('10', '336', '4', '9')}
                                    {tableRow('11', '139', '3', '17')}
                                    {tableRow('12', '420', '5', '18')}
                                    {tableRow('13', '351', '4', '7')}
                                    {tableRow('14', '110', '3', '15')}
                                    {tableRow('15', '367', '4', '2')}
                                    {tableRow('16', '329', '4', '10')}
                                    {tableRow('17', '482', '5', '3')}
                                    {tableRow('18', '306', '4', '11')}
                                </Tbody>
                                <Tfoot>
                                    {footerRow('IN','2840','36')}
                                    {footerRow('OUT','2925','36')}
                                    {footerRow('TOTAL','5765','72')}
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem key='womens'>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                <Text className='textLarge'>Womens</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <TableContainer className='courseTableLongContainer'>
                            <Table variant='striped' className='courseTableLongTable'>
                                {tableHeader}
                                <Tbody>
                                    {tableRow('1', '304', '4', '6')}
                                    {tableRow('2', '137', '3', '18')}
                                    {tableRow('3', '416', '5', '7')}
                                    {tableRow('4', '305', '4', '5')}
                                    {tableRow('5', '113', '2', '16')}
                                    {tableRow('6', '303', '4', '9')}
                                    {tableRow('7', '303', '4', '11')}
                                    {tableRow('8', '431', '5', '2')}
                                    {tableRow('9', '288', '4', '13')}
                                </Tbody>
                                <Tfoot>
                                    {footerRow('OUT','2600','36')}
                                </Tfoot>
                            </Table>
                            <Table variant='striped' className='courseTableLongTable'>
                                <Tbody>
                                    {tableRow('10', '336', '4', '3')}
                                    {tableRow('11', '139', '3', '17')}
                                    {tableRow('12', '420', '5', '4')}
                                    {tableRow('13', '295', '4', '10')}
                                    {tableRow('14', '122', '3', '15')}
                                    {tableRow('15', '308', '4', '8')}
                                    {tableRow('16', '306', '4', '12')}
                                    {tableRow('17', '462', '5', '1')}
                                    {tableRow('18', '267', '4', '14')}
                                </Tbody>
                                <Tfoot>
                                    {footerRow('IN','2655','36')}
                                    {footerRow('OUT','2600','36')}
                                    {footerRow('TOTAL','5255','72')}
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
  );
}
