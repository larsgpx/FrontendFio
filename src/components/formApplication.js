import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Select,
} from "@chakra-ui/react";
import Calculator from "./Calculator";
import InputMask from 'react-input-mask';
import useBankFormat from "@/hooks/useBankFormat";

export default function formApplication({onFormData, errorsData}) {
  const [calculatorData, setCalculatorData] = useState('')
  const [formatBank, setFormatBank] = useState("3,10");  
  const [banks, setBanks] = useState('');
  const [bankID, setBankID] = useState('');
  const [bankSelected, setBankSelected] = useState("");
  const [numberBank, setNumberBank] = useState('');
  const [calculatorValues, setCalculatorValues] = useState('');
  const [loading, setLoading] = useState(false);
  const { formatAccount } = useBankFormat();
  useEffect(() => {
    const fetchBankData = async () => {
      setLoading(true)
      try {
        const url =
          process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_BANKS;
        const response = await fetch(url);
        const data = await response.json();
        if (!banks) {
          setBanks(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBankData();
  }, []);

  const handleNumberBankChange = (event) => {
    const value = event.target.value.replaceAll('-','');
    setNumberBank(value);
  };

  useEffect(() => {
    const formApp = {
      calculator: {
        amount: calculatorValues && calculatorValues.amount || null,
        payDay: calculatorValues && calculatorValues.payDay || null
      },
      typeBank: bankSelected,
      typeBankID: bankID,
      bankAccount: numberBank
    }

    onFormData(formApp);
  }, [calculatorData,bankSelected, numberBank])

  return (
    <>
    <form>
      <Flex p={4} flexDirection="column" gap={6}>
        <FormControl isRequired>
          <FormLabel>
            <Flex className={`input-position fill`}>1</Flex> Banco
          </FormLabel>
          <Select
            id="bank"
            name="bank"
            className="select-input"
            value={bankSelected}
            onChange={(e) => {setBankSelected(e.target.value);setFormatBank(e.target.selectedOptions[0].getAttribute('format'));setBankID(e.target.selectedOptions[0].getAttribute('id'));setNumberBank('')}}
          >
            <option value="">Seleccionar Banco</option>
            {banks &&
              banks.data.map((bank) => (
                <option
                  key={bank.id}
                  id={bank.id}
                  format={bank.attributes.format}
                  value={bank.attributes.name}
                >
                  {bank.attributes.name}
                </option>
              ))}
          </Select>
          {errorsData.map((error) => (
            <>
              {(error.source.pointer.split('/')[3] === 'bank') ? <Text mt={2} color='red'>{error.detail} </Text> : ''}
            </>
          ))}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>
            <Flex className={`input-position fill`}>2</Flex> Numero de cuenta
          </FormLabel>
          <InputMask 
          mask={formatAccount(formatBank)}
          className="select-input"
          value={numberBank}
          onChange={handleNumberBankChange}
          maskChar=" " 
          />
          {errorsData.map((error) => (
            <>
              {error.source.pointer.split('/')[3] === 'number' ? <Text mt={2} color='red'>{error.detail} </Text> : ''}
            </>
          ))}
        </FormControl>

        <Stack>
          <FormLabel position="relative">
            <Flex className={`input-position fill`}>3</Flex>
          </FormLabel>
          <Box boxShadow="base" p={6} borderRadius={10}>
            <Calculator calculatorValues={setCalculatorData} calculatorResult={setCalculatorValues} />
            {errorsData.map((error) => (
            <>
              {(error.source.pointer.split('/')[3] === 'amount') ? <Text mt={2} color='red'>{error.detail} </Text> : ''}
            </>
          ))}
          </Box>
        </Stack>
      </Flex>
    </form>
    </>
  );
}