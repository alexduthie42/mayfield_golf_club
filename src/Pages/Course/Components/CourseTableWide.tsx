import React from 'react';
import './../../../App.css';
import { TableContainer, Table, Th, Thead, Tbody, Tr, Td, Tfoot, TableCaption, GridItem, Grid, Text } from '@chakra-ui/react';

export default function CourseTableWide() {


    const tableHeader = (
        <Thead>
            <Tr>
                <Th px={0} textAlign="center">
                    <Text fontWeight="bold" fontSize="md">Hole</Text>
                    <br/>
                </Th>
                <Th px={0} textAlign="center">                        
                    <Text fontWeight="bold" fontSize="md">Metres</Text>
                    <Text fontSize="xs" color="gray.500">MENS</Text>
                </Th>
                <Th px={0} textAlign="center">
                    <Text fontWeight="bold" fontSize="md">Par</Text>
                    <Text fontSize="xs" color="gray.500">MENS</Text>
                </Th>
                <Th px={0} textAlign="center">
                    <Text fontWeight="bold" fontSize="md">Stroke</Text>
                    <Text fontSize="xs" color="gray.500">MENS</Text>
                </Th>
                <Th px={0} textAlign="center">                        
                    <Text fontWeight="bold" fontSize="md">Metres</Text>
                    <Text fontSize="xs" color="gray.500">WOMENS</Text>
                </Th>
                <Th px={0} textAlign="center">
                    <Text fontWeight="bold" fontSize="md">Par</Text>
                    <Text fontSize="xs" color="gray.500">WOMENS</Text>
                </Th>
                <Th px={0} textAlign="center">
                    <Text fontWeight="bold" fontSize="md">Stroke</Text>
                    <Text fontSize="xs" color="gray.500">WOMENS</Text>
                </Th>
            </Tr>
        </Thead>    
    )

    function tableRow(hole: string, metresMen: string, parMen: string, strokeMen: string
        , metresWomen: string, parWomen: string, strokeWomen: string
    ): JSX.Element {
        return (
            <Tr>
                <Td px={0} textAlign="center">{hole}</Td>
                <Td px={0} textAlign="center">{metresMen}</Td>
                <Td px={0} textAlign="center">{parMen}</Td>
                <Td px={0} textAlign="center">{strokeMen}</Td>
                <Td px={0} textAlign="center">{metresWomen}</Td>
                <Td px={0} textAlign="center">{parWomen}</Td>
                <Td px={0} textAlign="center">{strokeWomen}</Td>
            </Tr>
        )
    }

    function footerRow(header: string, metresMen: string, parMen: string, metresWomen: string, parWomen: string): JSX.Element {
        return (
            <Tr bg="green.100">
                <Th px={0} textAlign="center">{header}</Th>
                <Th px={0} textAlign="center">{metresMen}</Th>
                <Th px={0} textAlign="center">{parMen}</Th>
                <Th px={0} textAlign="center"></Th>
                <Th px={0} textAlign="center">{metresWomen}</Th>
                <Th px={0} textAlign="center">{parWomen}</Th>
                <Th px={0} textAlign="center"></Th>
            </Tr>
        )
    }

  return (
    <div>
        <TableContainer className='courseTableContainerDesktop'>
            <Table layout="fixed" variant='striped' className='courseTableTableDesktop'>
                {tableHeader}
                <Tbody>
                    {tableRow('1', '355', '4' , '5', '304','4','6')}
                    {tableRow('2', '162', '3', '13', '137', '3', '18')}
                    {tableRow('3', '439', '5', '16', '416', '5', '7')}
                    {tableRow('4', '351', '4', '6', '305', '4', '5')}
                    {tableRow('5', '124', '3', '12', '113', '2', '16')}
                    {tableRow('6', '346', '4', '4', '303', '4', '9')}
                    {tableRow('7', '401', '4', '1', '303', '4', '11')}
                    {tableRow('8', '462', '5', '8', '431', '5', '2')}
                    {tableRow('9', '305', '4', '14', '288', '4', '13')}
                </Tbody>
                <Tfoot>
                    {footerRow('OUT', '2925', '36', '2600', '36')}
                </Tfoot>
            </Table>
            <Table variant='striped' className='courseTableDesktop'>
                <Tbody>
                    {tableRow('10', '336', '4', '9', '336', '4', '3')}
                    {tableRow('11', '139', '3', '17', '139', '3', '17')}
                    {tableRow('12', '420', '5', '18', '420', '5', '4')}
                    {tableRow('13', '351', '4', '7', '295', '4', '10')}
                    {tableRow('14', '110', '3', '15', '122', '3', '15')}
                    {tableRow('15', '367', '4', '2', '308', '4', '8')}
                    {tableRow('16', '329', '4', '10', '306', '4', '12')}
                    {tableRow('17', '482', '5', '3', '462', '5', '1')}
                    {tableRow('18', '306', '4', '11', '267', '4', '14')}
                </Tbody>
                <Tfoot>
                    {footerRow('IN', '2840', '36', '2655', '36')}
                    {footerRow('OUT', '2925', '36', '2600', '36')}
                    {footerRow('TOTAL', '5765', '72', '5255', '72')}
                </Tfoot>
            </Table>
        </TableContainer>
    </div>
  );
}
