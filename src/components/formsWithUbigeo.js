import {
  Box,
  Divider,
  Flex,
  Center,
  Select,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
  VStack,
  AbsoluteCenter,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import useUbigeo from "@/hooks/useUbigeo";
import useAPI from '@/hooks/useAPI';
import useInputValidators from "@/hooks/useInputValidators";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Modals from "@/components/Modal";
import { StoreContext } from "@/store/StoreProvider";
import Cookies from "js-cookie";
import { useToast } from '@chakra-ui/react'

export default function formRegistro() {
  const toast = useToast()
  const [fullNameData, setFullNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [documentNumberData, setDocumentNumberData] = useState("");
  const [phoneData, setPhoneData] = useState("");
  const [addressData, setAddressData] = useState("");
  const [termsData, setTermsData] = useState("");
  const [UUIDData, setUUIDData] = useState("");
  const [clientID, setClientID] = useState("");
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [store] = useContext(StoreContext)
  const { user } = store;
  const {
    departaments,
    provinces,
    districts,
    selectedDepartament,
    setSelectedDepartament,
    selectedProvince,
    setSelectedProvince,
    selectedDistrict,
    setSelectedDistrict,
  } = useUbigeo();

  const { loading, errorData, postData } = useAPI();
  const { handleOnlyNumbers, handleOnlyCharacters } = useInputValidators();

  useEffect(() => {
    const scoreData = JSON.parse(Cookies.get('score'));
    console.log(scoreData);
    if(scoreData) {
      setFullNameData(scoreData.attributes.fullName);
      setDocumentNumberData(scoreData.attributes.documentNumber);
      setUUIDData(scoreData.attributes.uuid);
      setClientID(scoreData.id)
      console.log("clientData", JSON.stringify(scoreData))
    }
    
  }, [])

  const reSend = async () => {
    const url = process.env.NEXT_PUBLIC_API_EMAIL;
    const resend = {
        uuid: UUIDData,
        client: Number(clientID),
        email: emailData
    }

    try {
      const result = await postData(url, resend);

      console.log('resendResult', result);
      if (result.errors) {
        result.errors.map((error) => {
          toast({
            title: error.detail,
            status: 'error',
            isClosable: true,
          })
        })
      }
    } catch (error) {
      console.error('Error en la solicitud POST:', error);
    }
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (
      fullNameData &&
      emailData &&
      documentNumberData &&
      phoneData &&
      addressData &&
      termsData
    ) {
        const url = process.env.NEXT_PUBLIC_API_CLIENTS
        // const url = '/api/clients/'
        const formData = {
              document_number: documentNumberData,
              uuid: UUIDData,
              full_name: fullNameData,
              email: emailData,
              mobile: phoneData,
              district: Number(selectedDistrict),
              address: addressData,
              opt_in: 1
        }
      try {
        const result = await postData(url, formData);

        if (result.errors) {
          result.errors.map((error) => {
            toast({
              title: error.detail,
              status: 'error',
              isClosable: true,
            })
          })
        }

        const regex = /\{(.*)\}/i;
        const title = result.meta.message.title;
        const description = result.meta.message.description;
        const sub_description = result.meta.message.sub_description;

        if (!result.errors) {
          const dataModal = {
            title: title.replace('{full_name}', formData[title.match(regex)[1]]),
            description: description.replace('{email}', formData[description.match(regex)[1]]),
            subdescription: sub_description
          }
          setModalData(dataModal)
          setOpenModal(true);
        }
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
      }
    }
  };

  const handleInputChange = (event) => {
    if (event.target.name === "department") {
      setSelectedDepartament(event.target.value);
    } else if (event.target.name === "province") {
      setSelectedProvince(event.target.value);
    } else if (event.target.name === "district") {
      setSelectedDistrict(event.target.value);
    } else if (event.target.name === "fullName") {
      setFullNameData(event.target.value);
    } else if (event.target.name === "DNI") {
      setDocumentNumberData(event.target.value);
    } else if (event.target.name === "address") {
      setAddressData(event.target.value);
    } else if (event.target.name === "phone") {
      setPhoneData(event.target.value);
    } else if (event.target.name === "email") {
      setEmailData(event.target.value);
    } else if (event.target.name === "terms") {
      setTermsData(event.target.checked);
    }
  };

  return (
    <>
      <form className="formik-form" onSubmit={handleOnSubmit}>
        <Modals type="pre-register" data={modalData} isOpenit={openModal} actionBtn={reSend} onCloseit={() => setOpenModal(false)} />
        <VStack spacing={4} align="flex-start">
          <FormControl>
            <FormLabel></FormLabel>
            <FormLabel htmlFor="fullName">
              <Flex className={`input-position ${fullNameData ? "fill" : ""}`}>
                1
              </Flex>
              Nombre Completo
            </FormLabel>
            <Input
              type="text"
              name="fullName"
              value={fullNameData}
              onInput={handleOnlyCharacters}
              onChange={handleInputChange}
              isDisabled
            />
            {/* <FormErrorMessage>El nombre completo es requerido</FormErrorMessage> */}
          </FormControl>
          
          <FormControl>
            <FormLabel>
              <Flex className={`input-position ${documentNumberData ? "fill" : ""}`}>
                2
              </Flex>
              DNI
            </FormLabel>
            <Input
              name="DNI"
              value={documentNumberData}
              onInput={handleOnlyNumbers}
              onChange={handleInputChange}
              maxLength={8}
              isDisabled
              type="tel"
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex
                className={`input-position ${emailData ? "fill" : ""}`}
              >
                3
              </Flex>
              Correo
            </FormLabel>
            <Input
              name="email"
              value={emailData}
              onChange={handleInputChange}
              type="tel"
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex className={`input-position ${phoneData ? "fill" : ""}`}>
                4
              </Flex>
              Celular
            </FormLabel>
            <Input
              type="tel"
              name="phone"
              value={phoneData}
              onChange={handleInputChange}
              onInput={handleOnlyNumbers}
              maxLength={9}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="department">
              <Flex
                className={`input-position ${
                  selectedDepartament ? "fill" : ""
                }`}
              >
                5
              </Flex>
              Departamento
            </FormLabel>
            <Select
              id="department"
              name="department"
              className="select-input"
              value={selectedDepartament}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar departamento</option>
              {departaments.map((departamento) => (
                <option
                  key={departamento.id}
                  value={departamento.id}
                >
                  {departamento.departamento}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="province">
              <Flex
                className={`input-position ${selectedProvince ? "fill" : ""}`}
              >
                6
              </Flex>
              Provincia
            </FormLabel>
            <Select
              id="province"
              name="province"
              className="select-input"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">Seleccionar provincia</option>
              {provinces.map((provincia) => (
                <option
                  key={provincia.id}
                  value={provincia.id}
                >
                  {provincia.provincia}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="district">
              <Flex
                className={`input-position ${selectedDistrict ? "fill" : ""}`}
              >
                7
              </Flex>
              Distrito
            </FormLabel>
            <Select
              id="district"
              name="district"
              className="select-input"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Seleccionar distrito</option>
              {districts.map((distrito) => (
                <option key={distrito.id} value={distrito.id}>
                  {distrito.distrito}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex
                className={`input-position ${selectedDistrict ? "fill" : ""}`}
              >
                8
              </Flex>
              Dirección
            </FormLabel>
            <Input
              type="text"
              id="address"
              name="address"
              value={addressData}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <Checkbox
              id="terms"
              name="terms"
              colorScheme="red"
              size="lg"
              my={4}
              onChange={handleInputChange}
            >
              Acepto los términos y condiciones
            </Checkbox>
          </FormControl>
          <Center height="50px">
            <Divider />
          </Center>
          <Box position="relative" w="100%">
            <AbsoluteCenter my={6}>
              <Button
                minW={{ base: "80%", sm: "80%", md: "500px" }}
                type="submit"
                colorScheme="blue"
                isLoading={loading}
                isDisabled={!termsData}
              >
                SIGUIENTE <ChevronRightIcon />
              </Button>
            </AbsoluteCenter>
          </Box>
        </VStack>
      </form>
    </>
  );
}
