import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Heading,
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text
} from "@chakra-ui/react";
import useAPI from "@/hooks/useAPI";
import Cookies from 'js-cookie';

export default function FormUser() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(null);


  useEffect(() => {
    //  const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_WITHDRAWN_HISTORY + Cookies.get('token') + '/'
     const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_WITHDRAWN_HISTORY + 'b15ac003-cbfc-4bda-ba0c-a2f9eadf8a67/'
     setLoading(true)
     try {
         fetch(url)
         .then(response => response.json())
         .then(data => {
             setHistory(data.data.withdrawals);
         })
     } catch (error) {
         console.error(error);
     }
  }, [])
  

  return (
    <>
      <Container maxW="8xl">
        <Heading size="sm" color="black">
            Mi historial de prestamos
        </Heading>
        <TableContainer mt={8}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Fecha solicitud del préstamo</Th>
                <Th>Fecha vencimiento del prestamo</Th>
                <Th>Monto solicitado</Th>
                <Th>Estado</Th>
                <Th>Capital Pagado</Th>
                <Th>Capital Pendiente</Th>
              </Tr>
            </Thead>
            <Tbody>
            {history && history.map((data, idx) => (
              <Tr key={`${idx}-history`}>
                <Td>{moment(data.created_at).format("DD/MM/YYYY")}</Td>
                <Td>{data.due_date}</Td>
                <Td isNumeric>{data.amount}</Td>
                <Td color={data.status === 'WITHDRAWN' ? 'yellow.600' : 'green'}>{statusWithdrawn[data.status]}</Td>
                <Td isNumeric>{data.paid_capital}</Td>
                <Td isNumeric>{data.pending_capital}</Td>
              </Tr>
            ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Fecha solicitud del préstamo</Th>
                <Th>Fecha vencimiento del prestamo</Th>
                <Th>Monto solicitado</Th>
                <Th>Estado</Th>
                <Th>Capital Pagado</Th>
                <Th>Capital Pendiente</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        {!history && <Text m={6}>No hay historial de préstamo...</Text>}
      </Container>
    </>
  );
}


const statusWithdrawn = {
  WITHDRAWN: 'Retiro',
  PAID: 'Pagado'
}