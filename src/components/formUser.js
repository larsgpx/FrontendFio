import React, { useState, useEffect } from "react";
import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  Container,
  useToast
} from "@chakra-ui/react";
import Cookies from 'js-cookie';
import useInputValidators from "@/hooks/useInputValidators";
import useAPI from "@/hooks/useAPI";
import Modals from "@/components/Modal";

export default function FormUser() {
  const [openModal, setOpenModal] = useState(false);
  const [phoneData, setPhoneData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState("");
  const [infoClient, setInfoClient] = useState("");
  const [fullName, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { handleOnlyNumbers } = useInputValidators();
  const { errorData, postData } = useAPI();
  const toast = useToast()

  useEffect(() => {
    setDisabledBtn(false);
  }, [phoneData,emailData])
  
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_INFO_CLIENT + Cookies.get('token') + '/'
    setLoading(true)
    try {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data) {
              const info = data.data.data;
              setInfoClient(info);
              setFullname(info.name + ' ' + info.last_name_father + ' ' + info.last_name_mother)
              setPhoneData(info.mobile)
              setEmailData(info.email)
            }
            setLoading(false)
        })
    } catch (error) {
        console.error(error);
    }
}, []);

  const handleInputChange = (event) => {
    if (event.target.name === "phone") {
      setPhoneData(event.target.value);
    } else if (event.target.name === "email") {
      setEmailData(event.target.value);
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (emailData || phoneData) {
        const url = process.env.NEXT_PUBLIC_API_UPDATE_INFO_CLIENT
        const formData = 
        {
            uuid: Cookies.get('token'), 
            mobile: phoneData, 
            email: emailData
        }
      postData(url, formData);
      try {
       
        const result = await postData(url, formData);
        if (result.errors) {
          setModalType('error');
          setModalData(result.errors);
          setOpenModal(true);
        } else {
          setModalType('update-info');
          setOpenModal(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Modals type={modalType} data={modalData} isOpenit={openModal} onCloseit={() => setOpenModal(false)} />
      <Container maxW="8xl">
        <form onSubmit={handleOnSubmit}>
          <Flex p={4} flexDirection="column" gap={6}>
            <FormControl isRequired>
              <FormLabel>
                <Flex className={`input-position fill`}>1</Flex> Nombre Completo
              </FormLabel>
              <Input
                type="text"
                name="fullName"
                value={fullName || ''}
                isDisabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                <Flex className={`input-position fill`}>2</Flex>
                Dirección
              </FormLabel>
              <Input
                type="text"
                name="address"
                value={infoClient.address || ''}
                isDisabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                <Flex className={`input-position fill`}>3</Flex>
                Departamento
              </FormLabel>
              <Input
                type="text"
                name="department"
                value={infoClient.department || ''}
                isDisabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                <Flex className={`input-position fill`}>4</Flex>
                Provincia
              </FormLabel>
              <Input
                type="text"
                name="province"
                value={infoClient.province || ''}
                isDisabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                <Flex className={`input-position fill`}>5</Flex>
                Distrito
              </FormLabel>
              <Input
                type="text"
                name="district"
                value={infoClient.district || ''}
                isDisabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                <Flex className={`input-position ${phoneData ? "fill" : ""}`}>
                  6
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
              <FormLabel>
                <Flex className={`input-position ${emailData ? "fill" : ""}`}>
                  7
                </Flex>
                Email
              </FormLabel>
              <Input
                type="email"
                name="email"
                value={emailData}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button isDisabled={disabledBtn} isLoading={loading} colorScheme='blue' type="submit" maxW={300}>Actualizar información</Button>
          </Flex>
        </form>
      </Container>
    </>
  );
}
