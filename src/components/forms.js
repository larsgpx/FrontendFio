import React, { useState, useContext } from "react";
import { StoreContext } from "@/store/StoreProvider";
import { Field, Formik, useFormik } from 'formik';
import { useRouter } from 'next/navigation'
import { Box,
  AbsoluteCenter,
  Button,
  Checkbox,
  Flex,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
  Stack,
  Radio, 
  RadioGroup,
  Divider,
  Center,
  Text,
  Textarea
  } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Modals from './Modal';
import * as Yup from 'yup';
import useAPI from '@/hooks/useAPI';
import useUbigeo from '@/hooks/useUbigeo';
import useInputValidators from "@/hooks/useInputValidators";
import Cookies from 'js-cookie';


export default function forms({formType, url}) {
  const [openModal, setOpenModal] = useState(false);
  const [fullNameData, setFullNameData] = useState('|');
  const [formRegisterData, setFormRegisterData] = useState({});
  const [errorLogin, setErrorLogin] = useState('');
  const router = useRouter()
  const [store] = useContext(StoreContext)
  const { section } = store;

  const SetCookie = (name, value) => {
    Cookies.set(name, value, {
      expires: 7,
    });
  };
  
  const onlyNumbers = /^[0-9\b]+$/;
  const onlyCharacters = /^[A-Za-z\s]*$/;
  const { loading, errorData, postData } = useAPI();
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

  const {
    handleOnlyNumbers,
    handleOnlyCharacters
  } = useInputValidators();


  const logIn = async (values) => {
    console.log('logged', values)
    if (Cookies.get('loggedIn')) {
      router.push('/mi-cuenta')
    } else {
      try {
        const result = await postData(url, values);
        if (result && result.data) {
          SetCookie('loggedIn', true);
          SetCookie('token', result.data.token);
          SetCookie('origin', result.data.origin);
          SetCookie('client', result.data.client_id);
          SetCookie('account', result.data.has_account);

          const JsonResult = {
            token: result.data.token,
            origin: result.data.origin,
            client: result.data.client_id,
            account: result.data.has_account,
            uuid: result.data.uuid,
            min: result.data.get_minimum_amount_withdrawn,
            max: result.data.get_maximum_amount_withdrawn,
            min_days: result.data.get_minimum_days_withdrawn
          };

          SetCookie('user-data', JSON.stringify(JsonResult))
          setErrorLogin('')
          router.push('/mi-cuenta');
        } else if (result && result.errors) {
          setErrorLogin(result.errors.detail)
        }
        
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
      }
      router.push('/mi-cuenta')
    }
  }

  const handlePost = async (url, data) => {
    try {
      const result = await postData(url, data);
      console.log(result); // Resultado de la API
    } catch (error) {
      console.error('Error en la solicitud POST:', error);
    }
  };

  const handleOnChange = (event) => {
    setFormRegisterData({
      fullName: event.target.name === 'fullName' ? event.target.value : '',
      documentNumber: event.target.name === 'documentNumber' ? event.target.value : '',
      phone: event.target.name === 'phone' ? event.target.value : '',
      address: event.target.name === 'address' ? event.target.value : '',
      optIn: 1,
      terms: event.target.name === 'terms' ? event.target.checked : '',
    })

    if (event.target.name === 'department') {
      setSelectedDepartament(event.target.value);
    } else if (event.target.name === 'province') {
      setSelectedProvince(event.target.value);
    } else if (event.target.name === 'district') {
      setSelectedDistrict(event.target.value);
    }
    
  };


  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
    .matches(onlyCharacters, 'Solo se permiten caracteres y espacios')
    .required('Campo requerido'),
    documentNumber: Yup.string()
    .matches(onlyNumbers, 'Solo se permiten numeros')
    .required('Campo requerido'),
    phone: Yup.string()
    .matches(onlyNumbers, 'Solo se permiten numeros')
    .required('Campo requerido'),
    address: Yup.string()
    .required('Campo requerido'),
  });

  const validationSchemaBook = Yup.object().shape({
    name: Yup.string()
    .matches(onlyCharacters, 'Solo se permiten caracteres y espacios')
    .required('Campo requerido'),
    last_name_father: Yup.string()
    .matches(onlyCharacters, 'Solo se permiten caracteres y espacios')
    .required('Campo requerido'),
    last_name_mother: Yup.string()
    .matches(onlyCharacters, 'Solo se permiten caracteres y espacios')
    .required('Campo requerido'),
    document_number: Yup.string()
    .matches(onlyNumbers, 'Solo se permiten numeros')
    .required('Campo requerido'),
    mobile: Yup.string()
    .matches(onlyNumbers, 'Solo se permiten numeros')
    .required('Campo requerido'),
    email: Yup.string()
    .email('Formato de correo electrónico no válido')
    .required('Campo requerido')
  });

  //forms

  const LoginForm = () => {
    return (
      <Formik
      initialValues={{
        password: '',
        document_number: section.document_number || ''
      }}
      onSubmit={logIn}
    >

      {({ handleSubmit, errors, touched, values }) => (
        <form className='formik-form' onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={!!errors.document_number && touched.document_number}>
              <FormLabel htmlFor="document_number"><Flex className={`input-position ${!errors.document_number && touched.document_number ? 'fill':''}`}>1</Flex> DNI </FormLabel>
              <Field
                as={Input}
                id="document_number"
                name="document_number"
                maxLength={8}
                type="tel"
                onInput={handleOnlyNumbers}
                autoComplete='off'
                validate={(value) => {
                  let error;

                  if (value.length !== 8) {
                    error = "Debería tener 8 caracteres";
                  }

                  return error;
                }}
              />
              <FormErrorMessage>{errors.document_number}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password && touched.password}>
              
              <FormLabel htmlFor="password"><Flex className={`input-position ${!errors.password && touched.password ? 'fill':''}`}>2</Flex> Ingresa contraseña * </FormLabel>
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                validate={(value) => {
                  let error;

                  if (value.length < 6) {
                    error = "Debería tener al menos 6 caracteres";
                  }

                  return error;
                }}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            
            <Center height='50px'>
              <Divider />
            </Center>
            <Box position='relative' w='100%'>
              <AbsoluteCenter my={6}>
                <Button isLoading={loading} minW={{base: '80%', sm: '80%', md: '500px'}} type="submit" colorScheme="blue" >
                  INGRESAR
                </Button>
                <Text color='red' align='center' mt={3}>{errorLogin}</Text>
              </AbsoluteCenter>
            </Box>
          </VStack>
        </form>
      )}
    </Formik>
  )
  };

  const FormPreRegister = () => {
    return (
        <Formik
        initialValues={formRegisterData}
      >
        {({ handleSubmit, errors, touched, values }) => (
          <form className='formik-form' onChange={handleOnChange} onSubmit={handleSubmit}>
            <Modals fullName={values.fullName} isOpenit={openModal} onCloseit={() => setOpenModal(false)} />
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.fullName && touched.fullName}>
                
                <FormLabel htmlFor="fullName"><Flex className={`input-position ${!errors.fullName && touched.fullName ? 'fill':''}`}>1</Flex> Nombre Completo </FormLabel>
                <Field
                  as={Input}
                  id="fullName"
                  name="fullName"
                  type="text"
                  
                />
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.documentNumber && touched.documentNumber}>
              
                <FormLabel htmlFor="documentNumber"><Flex className={`input-position ${!errors.documentNumber && touched.documentNumber ? 'fill':''}`}>2</Flex> DNI </FormLabel>
                <Field
                  as={Input}
                  id="documentNumber"
                  name="documentNumber"
                  maxLength={8}
                  type="tel"
                  onInput={handleOnlyNumbers}
                />
                <FormErrorMessage>{errors.documentNumber}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.phone && touched.phone}>
                
                <FormLabel htmlFor="phone"><Flex className={`input-position ${!errors.phone && touched.phone ? 'fill':''}`}>3</Flex> Celular </FormLabel>
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  type="tel"
                  onInput={handleOnlyNumbers}
                  maxLength={9}
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.department && touched.department}>
                
                <FormLabel htmlFor="department"><Flex className={`input-position ${selectedDepartament ? 'fill':''}`}>4</Flex> Departamento </FormLabel>
                <Field 
                as="select"
                id="department"
                name="department"
                className="select-input"
                value={selectedDepartament}>
                  <option value="">Seleccionar departamento</option>
                  {departaments.map((departamento) => (
                    <option key={departamento.coddepartamento} value={departamento.coddepartamento}>
                      {departamento.departamento}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage>{errors.department}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.province && touched.province}>
                
                <FormLabel htmlFor="province"><Flex className={`input-position ${!errors.province && touched.province ? 'fill':''}`}>5</Flex> Provincia </FormLabel>
                <Field 
                as="select"
                id="province"
                name="province"
                className="select-input"
                value={selectedProvince}>
                  <option value="">Seleccionar provincia</option>
                  {provinces.map((provincia) => (
                    <option key={provincia.codprovincia} value={provincia.codprovincia}>
                      {provincia.provincia}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage>{errors.province}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.district && touched.district}>
              
                <FormLabel htmlFor="district"><Flex className={`input-position ${!errors.district && touched.district ? 'fill':''}`}>6</Flex> Distrito </FormLabel>
                 <Field 
                as="select"
                id="district"
                name="district"
                className="select-input"
                value={selectedDistrict}>
                  <option value="">Seleccionar distrito</option>
                  {districts.map((distrito) => (
                    <option key={distrito.coddistrito} value={distrito.coddistrito}>
                      {distrito.distrito}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage>{errors.district}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.address && touched.address}>
              
                <FormLabel htmlFor="address"><Flex className={`input-position ${!errors.address && touched.address ? 'fill':''}`}>7</Flex> Dirección </FormLabel>
                <Field
                  as={Input}
                  id="address"
                  name="address"
                  type="text"
                />
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              </FormControl>
              <Field
                as={Checkbox}
                id="terms"
                name="terms"
                colorScheme="red"
                size='lg'
                my={4}
              >
                Acepto los términos y condiciones
              </Field>
              <Center height='50px'>
                <Divider />
              </Center>
              <Box position='relative' w='100%'>
                <AbsoluteCenter my={6}>
                  <Button isLoading={loading} minW={{base: '80%', sm: '80%', md: '500px'}} type="submit" colorScheme="blue" isDisabled={!values.terms}>
                    SIGUIENTE <ChevronRightIcon />
                  </Button>
                </AbsoluteCenter>
              </Box>
            </VStack>
          </form>
        )}
      </Formik>
    )
  }

  const CreatePasswordForm = () => {
    return (
        <Formik
        initialValues={{
          password: '',
          passwordagain: ''
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleSubmit, errors, touched, values }) => (
          <form className='formik-form' onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.password && touched.password}>
                
                <FormLabel htmlFor="password"><Flex className={`input-position ${!errors.password && touched.password ? 'fill':''}`}>1</Flex> Ingresa contraseña * </FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  validate={(value) => {
                    let error;

                    if (value.length < 8) {
                      error = "Debería tener al menos 8 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.passwordagain && touched.passwordagain}>
                
                <FormLabel htmlFor="passwordagain"><Flex className={`input-position ${!errors.passwordagain && touched.passwordagain ? 'fill':''}`}>2</Flex> Repite tu contraseña * </FormLabel>
                <Field
                  as={Input}
                  id="passwordagain"
                  name="passwordagain"
                  type="password"
                  validate={(value) => {
                    let error;

                    if (value !== values.password) {
                      error = "No es igual al campo contraseña";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.passwordagain}</FormErrorMessage>
              </FormControl>
              <Center height='50px'>
                <Divider />
              </Center>
              <Box position='relative' w='100%'>
                <AbsoluteCenter my={6}>
                  <Button  minW={{base: '80%', sm: '80%', md: '500px'}} type="submit" colorScheme="blue" >
                    CREAR
                  </Button>
                </AbsoluteCenter>
              </Box>
            </VStack>
          </form>
        )}
      </Formik>
    )
  }

  const ComplaintsBookForm = () => {
    return (
        <Formik
        initialValues={{
          name: '',
          last_name_father: '',
          last_name_mother: '',
          document_number: '',
          mobile: '',
          email: '',
          complaints_type: '',
          complaints_details: '',
          consumer_request: ''
        }}
        validationSchema={validationSchemaBook}
        onSubmit={async (values) => {
          // alert(JSON.stringify(values, null, 2));
          setOpenModal(true);
          const result = await postData(url, values);
          console.log(result);
        }}
      >
        {({ handleSubmit, errors, touched, values, setFieldValue }) => (
          <form className='formik-form' onSubmit={handleSubmit}>
            <Modals name={values.name} isOpenit={openModal} onCloseit={() => setOpenModal(false)} />
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.name && touched.name}>
                
                <FormLabel htmlFor="name"><Flex className={`input-position ${!errors.name && touched.name ? 'fill':''}`}>1</Flex> Nombre</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  onInput={handleOnlyCharacters}
                  validate={(value) => {
                    let error;

                    if (value.length < 3) {
                      error = "Debería tener al menos 3 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.last_name_father && touched.last_name_father}>
                
                <FormLabel htmlFor="last_name_father"><Flex className={`input-position ${!errors.last_name_father && touched.last_name_father ? 'fill':''}`}>2</Flex> Apellido Paterno</FormLabel>
                <Field
                  as={Input}
                  id="last_name_father"
                  name="last_name_father"
                  type="text"
                  onInput={handleOnlyCharacters}
                  validate={(value) => {
                    let error;

                    if (value.length < 3) {
                      error = "Debería tener al menos 3 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.last_name_father}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.last_name_mother && touched.last_name_mother}>
                
                <FormLabel htmlFor="last_name_mother"><Flex className={`input-position ${!errors.last_name_mother && touched.last_name_mother ? 'fill':''}`}>3</Flex> Apellido Materno</FormLabel>
                <Field
                  as={Input}
                  id="last_name_mother"
                  name="last_name_mother"
                  type="text"
                  onInput={handleOnlyCharacters}
                  validate={(value) => {
                    let error;

                    if (value.length < 3) {
                      error = "Debería tener al menos 3 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.last_name_mother}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.document_number && touched.document_number}>
              
                <FormLabel htmlFor="document_number"><Flex className={`input-position ${!errors.document_number && touched.document_number ? 'fill':''}`}>4</Flex> DNI </FormLabel>
                <Field
                  as={Input}
                  id="document_number"
                  name="document_number"
                  maxLength={8}
                  type="tel"
                  onInput={handleOnlyNumbers}
                  validate={(value) => {
                    let error;

                    if (value.length !== 8) {
                      error = "Debería tener 8 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.document_number}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.mobile && touched.mobile}>
                
                <FormLabel htmlFor="mobile"><Flex className={`input-position ${!errors.mobile && touched.mobile ? 'fill':''}`}>5</Flex> Celular </FormLabel>
                <Field
                  as={Input}
                  id="mobile"
                  name="mobile"
                  type="tel"
                  onInput={handleOnlyNumbers}
                  maxLength={9}
                  validate={(value) => {
                    let error;

                    if (value.length < 9) {
                      error = "Debería tener al menos 9 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.mobile}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email && touched.email}>
                
                <FormLabel htmlFor="email"><Flex className={`input-position ${!errors.email && touched.email ? 'fill':''}`}>6</Flex> Correo </FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="text"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.complaints_type && touched.complaints_type}>
                <FormLabel htmlFor="complaints_type"><Flex className={`input-position ${!errors.complaints_type && touched.complaints_type ? 'fill':''}`}>7</Flex> Tipo </FormLabel>
                <RadioGroup
                defaultValue='CLAIM' 
                name="complaints_type"
                onChange={(value) => setFieldValue("complaints_type", value)}
                >
                  <Field
                  as={RadioGroup}
                  id="complaints_type"
                  name="complaints_type"
                  type="text"
                />
                  <Stack>
                    <Radio size='lg' value='CLAIM' colorScheme='red'>
                      Reclamo
                    </Radio>
                    <Radio size='lg' value='COMPLAINTS'  colorScheme='red'>
                      Queja
                    </Radio>
                  </Stack>
                </RadioGroup>
                
                <FormErrorMessage>{errors.complaints_type}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.complaints_details && touched.complaints_details}>
                <FormLabel htmlFor="complaints_details"><Flex className={`input-position ${!errors.complaints_details && touched.complaints_details ? 'fill':''}`}>8</Flex> Detalle del consumidor </FormLabel>
                <Field
                  as={Textarea}
                  id="complaints_details"
                  name="complaints_details"
                  type="textarea"
                  className="textarea-form"
                  validate={(value) => {
                    let error;

                    if (value.length < 3) {
                      error = "Debería tener al menos 2 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.complaints_details}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.consumer_request && touched.consumer_request}>
              
                <FormLabel htmlFor="consumer_request"><Flex className={`input-position ${!errors.consumer_request && touched.consumer_request ? 'fill':''}`}>9</Flex> Pedido del consumidor </FormLabel>
                <Field
                  as={Textarea}
                  id="consumer_request"
                  name="consumer_request"
                  type="textarea"
                  className="textarea-form"
                  validate={(value) => {
                    let error;

                    if (value.length < 4) {
                      error = "Debería tener al menos 4 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.consumer_request}</FormErrorMessage>
              </FormControl>
              <Center height='50px'>
                <Divider />
              </Center>
              <Box position='relative' w='100%'>
                <AbsoluteCenter my={6}>
                  <Button minW={{base: '80%', sm: '80%', md: '500px'}} type="submit" colorScheme="blue" >
                    ENVIAR
                  </Button>
                </AbsoluteCenter>
              </Box>
            </VStack>
          </form>
        )}
      </Formik>
    )
  }

  const FormDefault = () => {
    return (
      <>
        <Box>
          <p>No Form selected..</p>
        </Box>
      </>
    )
  }

 
  
  const RenderForm = () => {
    if (formType === 'login') {
      return <LoginForm />
    } else if (formType === 'preRegister') {
      return <FormPreRegister />
    } else if (formType === 'complaintsBook') {
      return <ComplaintsBookForm />
    } else if (formType === 'password') {
      return <CreatePasswordForm />
    } else {
      return <FormDefault />
    }
  }
  return (
    <>
      {
        <RenderForm />
      }
    </>
  )
}