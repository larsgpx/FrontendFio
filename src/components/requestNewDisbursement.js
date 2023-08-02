import React, { useState, useEffect } from "react";
import {
  Button,
  Container
} from "@chakra-ui/react";
import Cookies from 'js-cookie';
import useInputValidators from "@/hooks/useInputValidators";
import useAPI from "@/hooks/useAPI";
import Modals from "@/components/Modal";
import Calculator from "./Calculator";

export default function FormUser() {
    const [calculatorData, setCalculatorData] = useState(null)
    const [calculatorValues, setCalculatorValues] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { errorData, postData } = useAPI();

  const handleRequest = async (event) => {
    setLoading(true)
    event.preventDefault();
    console.log('calculatorData', calculatorData);
    console.log('calculatorValues', calculatorValues);
    setLoading(false)
  };

  return (
    <>
      <Modals type="update-info" isOpenit={openModal} onCloseit={() => setOpenModal(false)} />
      <Container maxW="8xl">
        <Calculator title='Saldo disponible' calculatorValues={setCalculatorData} calculatorResult={setCalculatorValues} />
        <Button mt={8} isDisabled={!calculatorData} onClick={handleRequest} isLoading={loading} colorScheme="blue">
            SOLICITAR NUEVO PRÉSTAMO
        </Button>
      </Container>
    </>
  );
}
