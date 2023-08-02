import React, { useState, useEffect } from "react";
import { chakra, Tooltip, FormControl, FormLabel, Input, Flex, Image } from "@chakra-ui/react";
import RadioGroup from "./RadioGroup";
import useInputValidators from "@/hooks/useInputValidators";
import Cookies from "js-cookie";

export default function DocumentType({documentSeted, documentTypeSelected}) {
    const [documentType, setDocumentType] = useState('');
    const [ipClient, setIpClient] = useState('');
    const [documentTypeValue, setDocumentTypeValue] = useState(null);
    const [digitVerificator, setDigitVerificator] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const handleInputChange = (e) => setDocumentTypeValue(e.target.value)
    const handleDigitChange = (e) => setDigitVerificator(e.target.value)
    const { handleOnlyNumbers } = useInputValidators();
    
    useEffect(() => {
        if (documentTypeValue && documentTypeValue.length >= 8 && documentType) {
            const data = {
                document_number: documentTypeValue              
            }
            documentSeted(data);
            documentTypeSelected(documentType);
        } else {
            documentSeted(null);
            documentTypeSelected(null);
        }
      }, [documentType, documentTypeValue, digitVerificator]);

      useEffect(() => {
        setDocumentTypeValue('')
        setDigitVerificator('')
      },[documentType]);
    return (
        <Flex
        p={2}
        w="auto"
        justifyContent="center"
        alignItems="start"
        flexDirection="column"
        className='document-types'
        >
            <chakra.h3
                mb={3}
                fontSize="lg"
                lineHeight="shorter"
                fontWeight="bold"
                color="#C84044"
                >
                Tipo de documento
            </chakra.h3>
            <RadioGroup onClick={() => setSelectedOption(documentType)} nameItem='documentType' items={documentTypeList} setValue={setDocumentType} />
            <FormControl mt={5} isRequired>
                <FormLabel color="#C84044">{documentType}</FormLabel>
                <Flex flexDirection='row' gap={2}>
                    <Input type="tel" onInput={handleOnlyNumbers} isDisabled={documentType ? false : true} maxLength={documentType === 'DNI' ? 8 : 9} value={documentTypeValue} onChange={handleInputChange} placeholder='Documento de identidad' />
                </Flex>
            </FormControl>
        </Flex>
    );
};

const documentTypeList = ['DNI','Extranjeria'];