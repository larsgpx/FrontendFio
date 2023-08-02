import { Container, Heading, Box, Flex, Img } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import { useState, useEffect  } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel    
  } from '@chakra-ui/react'
import {
    AddIcon, 
    MinusIcon } from '@chakra-ui/icons';
import { useFetch } from '@/hooks/useFetch';

export default function PreguntasFrecuentes({faqs}) {
  const [faqsFio, setFaqsFio] = useState(faqs);
  const [faqsLists, setFaqsLists] = useState(faqs.data);
  const [paginationPage, setPaginationPage] = useState(2);
  const url = `${process.env.NEXT_PUBLIC_API_FAQS}/?page[number]=${paginationPage}`;
  const { data } = useFetch(url);
  
  const [showOff, setShowOff] = useState(false);
  const showMoreFaqs = () => {
      setPaginationPage(paginationPage + 1);
      if (paginationPage === faqsFio.meta.pagination.pages) {
          setShowOff(true);
      } else {
        setShowOff(false);
      }
      if (data) {
        const lists = [...faqsLists, ...data.data];
        setFaqsLists(lists);
      }
  }
  return (
    <>
      <HeadTitle title='¡Activa tu linea de efectivo con FIO.pe!' description='Obtén tu línea de efectivo con nosotros' />
      <main>
        <Img 
          objectFit='cover'
          src='banner-4.jpg'
          fallbackSrc='banner-4.jpg'
          width='100%'
          maxW='2000px'
          height={{base: '200px', md: '430px'}}
          />
        <Container maxW='8xl' pt={{base: 10, md: 50}} pb={{base: 20, md: 100}}> 
            <Heading className='title-highlight' as='h1' size='2xl' mb={10}>PREGUNTAS FRECUENTES</Heading>

            <Accordion allowMultiple>
                {faqsLists && faqsLists.map((item, index) => (
                    <AccordionItem py={4} borderTop={index === 0 ? 'none' : '1px solid gray'} key={index}>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' style={{fontWeight: 'bold'}}>
                            {item.attributes.question}
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='20px' p={1} border='1px solid' borderRadius={2} />
                            ) : (
                            <AddIcon fontSize='20px'  border='1px solid' borderRadius={2} p={1} />
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        {item.attributes.answer}
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
                )) }
            </Accordion>

            <Flex justifyContent='center' mt={10}>
                <button style={{display: showOff ? 'none' : 'flex'}} onClick={showMoreFaqs} type="button" class="show-more">
                    <span class="show-more__text">Ver más</span>
                    <span class="show-more__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                </button>
            </Flex>
        </Container>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_FAQS
  const res = await fetch(url)
  const faqs = await res.json()

  return {
    props: {
      faqs
    }
  }
}
