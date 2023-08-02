import Carousel from "@/components/Carousel";
import {
  Container,
  Flex,
  Center,
  Stack,
  Text,
  Heading,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import Calculator from "@/components/Calculator";
import DocumentType from "@/components/DocumentType";
import Tips from "@/components/Tips";
import HeadTitle from "@/components/base/HeadTitle";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "@/store/StoreProvider";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useAPI from "@/hooks/useAPI";
import ReCAPTCHA from "react-google-recaptcha";
import Modals from "@/components/Modal";

export default function Home({ data }) {
  const toast = useToast();
  const [homeData, setHomeData] = useState(data);
  const [minCalculator, setMinCalculator] = useState(50);
  const [maxCalculator, setMaxCalculator] = useState(700);
  const [calculatorCheck, setCalculatorCheck] = useState(false);
  const [calculatorData, setCalculatorData] = useState(false);
  const [calculatorValues, setCalculatorValues] = useState(null);
  const [documentSelected, setDocumentSelected] = useState(false);
  const [documentTypeSeted, setDocumentTypeSeted] = useState(false);
  const [recaptcha, setRecaptcha] = useState(false);
  const [recaptchaExpired, setRecaptchaExpired] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMsg, setModalMsg] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [store, dispatch] = useContext(StoreContext);
  const { postData } = useAPI();
  const router = useRouter();

  useEffect(() => {
    Cookies.remove('score')
  }, [])

  useEffect(() => {
    setMinCalculator(Number(homeData[0].attributes.minimumAmountWithdrawn))
    setMaxCalculator(Number(homeData[0].attributes.maximumAmountWithdrawn))
    dispatch({
      type: "userInformation",
      payload: documentSelected,
    });
  }, [documentSelected]);

  const recaptchaOnChange = (value) => {
    if (value) {
      setRecaptcha(true);
      setRecaptchaExpired(false);
    }
  };

  const handleButtonClick = async (section) => {
    if (section === "calculator") {
      setCalculatorCheck(true);
    } else if (
      section === "documentType" &&
      documentTypeSeted &&
      documentTypeSeted === "DNI"
    ) {
      setLoadingBtn(true)
      const data = await postData(
        process.env.NEXT_PUBLIC_API_SCORES,
        documentSelected
      );

      //caso exitoso - cliente nuevo con sentinel limpio
      if (data && !data.errors && recaptcha && !recaptchaExpired && data.meta.origin === 'prospect') {
        dispatch({
          type: "userDataSentinel",
          payload: data.data.attributes,
        });
        Cookies.set("score", JSON.stringify(data.data), { expires: 7 });
        router.push("/form-registro");
      } else if ( 
        data.errors &&
        data.errors[0].detail.origin &&
        (data.errors[0].origin === "account" //Caso 1: Cuando el cliente ya tenga línea de crédito registrada te va a mandar esta estructura
        ) && data.errors[0].status === '200') {
          toast({
            position:'top-right',
            title: data.errors[0].detail.detail,
            description: "Redireccionando a login...",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
        setTimeout(() => {
          router.push("/login");
        }, 3100);
      } else if ( 
        data.errors &&
        data.errors[0].origin &&
        data.errors[0].origin === "account" //Caso 2: Cuando el cliente tiene linea de credito pero se le rechazo (no fue aprobada)
        && data.errors[0].status === '404') {
          toast({
            position:'top-right',
            title: data.errors[0].detail,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
      } else if ( 
        data &&
        !data.errors &&
        recaptcha &&
        !recaptchaExpired &&
        data.meta.origin === 'client') { //Caso 3: Si el DNI ingresado esta asociado a un cliente, te devuelvo un campo meta. si es cliente lo rediriges al login
          toast({
            position:'top-right',
            title: "Redireccionando a login...",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
        setTimeout(() => {
          router.push("/login");
        }, 3100);
      } else if ( 
        data.errors
        && data.errors[0].status === '400') { //Caso 4: LINEA CREDITO RECHAZADO - "No califica para una línea de crédito"
          toast({
            position:'top-right',
            title: data.errors[0].detail.detail || data.errors[0].detail,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          // setTimeout(() => {
          //   router.push("/login");
          // }, 3100);
      }
      //end cases
    } else if (
      section === "documentType" &&
      documentSelected &&
      recaptcha &&
      !recaptchaExpired
    ) {
      router.push("/form-registro");
    }
    setLoadingBtn(false)
  };
  return (
    <>
      <HeadTitle
        title="¡Activa tu linea de efectivo con FIO.pe!"
        description="Obtén tu línea de efectivo con nosotros"
      />
      <main>
        <Modals
          type="error"
          data={modalMsg}
          isOpenit={openModal}
          onCloseit={() => setOpenModal(false)}
        />
        {homeData && (
          <div>
            <Carousel sliders={homeData[0].attributes.banners} />
            <Container
              maxW="8xl"
              pt={{ base: 2, md: 50 }}
              pb={{ base: 20, md: 100 }}
            >
              <Flex
                flexWrap="wrap"
                alignItems="start"
                justify="center"
                w="full"
                color="white"
              >
                <Center w="100%" maxW={600}>
                  <Stack spacing={0} mt={10} mb={10}>
                    <Heading className="heading-red">
                      {homeData[0].attributes.title}
                    </Heading>
                    <Text as="p" color="black" pt={5} mt={0} pb={6}>
                      {homeData[0].attributes.description}
                    </Text>
                    <Tips features={homeData[0].attributes.tips} />
                  </Stack>
                </Center>
                <Center w="100%" maxW={700}>
                  <Box
                    boxShadow="md"
                    className="home-box"
                    mt={{ base: "10", sm: "1" }}
                    maxW="full"
                    borderWidth="1px"
                    borderRadius="lg"
                    bg="white"
                    color="black"
                    p={{ base: "2", sm: "5" }}
                    pt={5}
                  >
                    {!calculatorCheck && (
                      <Calculator min={minCalculator} max={maxCalculator} calculatorValues={setCalculatorData} calculatorResult={setCalculatorValues} />
                    )}

                    {calculatorCheck && (
                      <>
                        <DocumentType
                          documentSeted={setDocumentSelected}
                          documentTypeSelected={setDocumentTypeSeted}
                        />
                        <Box mt={4} display="flex" justifyContent="center">
                          <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_API_CAPTCHA_SITE}
                            onChange={recaptchaOnChange}
                            onExpired={() => setRecaptchaExpired(true)}
                          />
                        </Box>
                      </>
                    )}
                    <Box className="buttons" pt={8}>
                      <Button
                        onClick={() => handleButtonClick("calculator")}
                        isDisabled={!calculatorData}
                        display={!calculatorCheck ? "flex" : "none"}
                        size="lg"
                        width="full"
                        colorScheme="blue"
                      >
                        SOLICITAR PRÉSTAMO
                      </Button>
                      <Button
                        onClick={() => handleButtonClick("documentType")}
                        isDisabled={!recaptcha}
                        display={calculatorCheck ? "flex" : "none"}
                        size="lg"
                        width="full"
                        colorScheme="blue"
                        isLoading={loadingBtn}
                      >
                        SOLICITAR
                      </Button>
                    </Box>
                  </Box>
                </Center>
              </Flex>
            </Container>
          </div>
        )}
        {!homeData && (
          <>
            <h1>No DATA</h1>
          </>
        )}
      </main>
    </>
  );
}

const features = [
  {
    title: "Cuenta Bancaria",
    image: "banco.svg",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Documento de identidad",
    image: "card.svg",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Número de celular",
    image: "phone.svg",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export async function getServerSideProps() {
  const url =
    process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_HOME;
  const res = await fetch(url);
  const home = await res.json();
  const { data } = home;
  return {
    props: {
      data,
    },
  };
}
