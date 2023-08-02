import {
  Box,
  Stack,
  Skeleton,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import RadioGroup from "./RadioGroup";
import React, { useState, useEffect } from "react";
import SliderComponent from "./SliderComponent";

export default function Calculator({calculatorValues, calculatorResult, min = 50, max = 2000, title = '¿Cuánto dinero necesitas?'}) {
  const [sliderValue, setSliderValue] = useState(null);
  const [fieldValue, setFieldValue] = useState(null);
  const [modeValue, setModeValue] = useState('monthly');
  const [showTable, setShowTable] = useState(false);
  const [paydayValue, setPaydayValue] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const slicePayDay = (paydayValue && paydayValue.includes('/')) ? paydayValue.slice(0,2) : paydayValue;
    const datos = {
      amount: sliderValue, //monto
      mode: modeValue, //monthly or daily
      fields: fieldValue, //cuota
      payDay: slicePayDay, //dia de pago
    };

    calculatorResult(datos);

    (async () => {
      try {
        setLoading(true)
        if (sliderValue && modeValue && fieldValue && paydayValue) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}${process.env.NEXT_PUBLIC_API_SCHEDULES}/?fields[amount]=${sliderValue}&fields[mode]=${modeValue}&fields[value]=${fieldValue}&fields[day]=${slicePayDay}&fields[payment]=false`);
          const data = await res.json();
          calculatorValues(data);
          setResult(data);
          setShowTable(true)
          setLoading(false);
        }
      } catch (err) {
        // console.log(err);
        setShowTable(false)
      }
    
    })();
  }, [sliderValue, modeValue, fieldValue, paydayValue]);

  return (
    <Box>
      <Stack spacing={2} direction="column">
        <Heading size="sm" color="black">
          {title}
        </Heading>
        <Heading size="2xl" pt="4" alignSelf={"center"} color="black">
          s/ {sliderValue}
        </Heading>
        <Box w="100%" p={2} pt={6} pb={2}>
          <SliderComponent min={min} max={max} step={50} defaultValue={min} type='amount' valueSeted={setSliderValue} />
        </Box>
        <Box>
        <Tabs  onClick={() => setShowTable(false)} mt={4} align='center'>
          <TabList>
            <Tab>En meses</Tab>
            <Tab> En dias</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
            <Box pt={10}>
              {/* Cuotas mes */}
              <Text color="black" as="p">
                ¿En cuántas cuotas?
              </Text>
              <RadioGroup
                nameItem="months"
                items={months}
                setValue={setFieldValue}
              />
            </Box>
            </TabPanel>
            <TabPanel>
            <Box pt={10} className="asd" minW={{base: '100%', md: '540px'}}>
              {/* Cuotas mes */}
              <Text color="black" as="p">
                ¿En cuántas cuotas?
              </Text>
              <SliderComponent min={7} max={30} step={1} defaultValue={fieldValue} type='days' valueSeted={setFieldValue} />
            </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Box>
       
        <Box pt={10}>
          <Text color="black" as="p">
            ¿Cuándo prefieres pagar la primera cuota?
          </Text>
          <RadioGroup
            bigger={true}
            nameItem="payDay"
            items={payDay}
            setValue={setPaydayValue}
          />
        </Box>
      </Stack>
      <Stack>
        {showTable && loading && <Skeleton mt={10} borderRadius={8} height='250px' />}
        {fieldValue && paydayValue && sliderValue && showTable && !loading&& (
          <>
            <TableContainer
              mt={10}
              mb={2}
              border="1px solid #dadada"
              borderRadius={8}
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Fecha</Th>
                    <Th isNumeric>Monto a Pagar</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {result &&
                    result.data.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.attributes.scheduleDate}</Td>
                        <Td isNumeric>{item.attributes.totalAmount}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Text color='gray'>
              *Los intereses cobrados son por un día. 
            </Text>
            <Text color='gray'>
            **Adelanta tus pagos sin
              costo extra y ahorra dinero.
            </Text>
          </>
        )}
      </Stack>
    </Box>
  );
}

const months = ["1", "2", "3", "4", "5", "6"];

const payDay = ["05/12/2022", "20/12/2022"];
