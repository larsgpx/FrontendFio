import { Container, Heading, Box, Divider, Flex, Center } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import Forms from '@/components/forms';


export default function formRegistro() {
    return (
    <>
      <HeadTitle title='login' description='Obtén tu línea de efectivo con nosotros' />
      <main>
        <Container maxW='6xl' pt={{base: 10, md: 50}} pb={{base: 30, md: 120}}> 
            <Flex justifyContent='center' flexDirection='column' alignItems='center'>
                <Heading className='title-black' as='h3' size='xl' mb={10}>Login</Heading>
                <Center  my={5}>
                    <Divider height={3}/>
                </Center>
                <Box w='100%'>
                    <Forms url='/api/login/' formType='login' />
                </Box>
            </Flex>
        </Container>
      </main>
    </>
  )
}
