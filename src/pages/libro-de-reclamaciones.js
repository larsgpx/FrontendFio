import { Container, Heading, Box, Divider, Flex, Center } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import Forms from '@/components/forms';


export default function formRegistro() {
    return (
    <>
      <HeadTitle title='Pre Registro' description='Obtén tu línea de efectivo con nosotros' />
      <main>
        <Container maxW='6xl' pt={{base: 10, md: 50}} pb={{base: 20, md: 100}}> 
            <Flex justifyContent='center' flexDirection='column' alignItems='center'>
                <Heading className='title-black' as='h3' size='xl' mb={10}>LIBRO DE RECLAMACIONES</Heading>
                <Center  my={5}>
                    <Divider height={3}/>
                </Center>
                <Box w='100%'>
                    <Forms url={process.env.NEXT_PUBLIC_API_BOOK_REGISTER} formType='complaintsBook' />
                </Box>
            </Flex>
        </Container>
      </main>
    </>
  )
}
