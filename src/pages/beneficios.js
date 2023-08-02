import { Container, Flex, Center, Stack, Text, Heading, Button, Box, Divider } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import Benefits from '@/components/Benefits';

export default function BenefitsPage() {

  return (
    <>
      <HeadTitle title='Beneficios' description='Obtén tu línea de efectivo con nosotros' />
      <main>
        <Box>
            <Container maxW='8xl' pt={{base: 2, md: 50}} pb={{base: 20, md: 100}}> 
                <Heading className='title-highlight' as='h1' size='2xl' mb={10}>BENEFICIOS</Heading>

                <Flex justifyContent='center' alignItems='center' flexWrap='wrap' gap={5}>
                    <Benefits benefits={benefits} />
                </Flex>
            </Container>
        </Box>
        <Box bg='white'>
            <Container maxW='8xl' pt={{base: 2, md: 50}} pb={{base: 20, md: 100}}>
                <Heading className='title-highlight blue' as='h1' size='2xl' mb={10}>¿CÓMO FUNCIONA?</Heading>

                <Text as='p' textAlign='center' px={5} mb={10}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug
                </Text>
                <Flex justifyContent='center' alignItems='center' flexWrap='wrap' gap={5}>
                    <Box maxW='xl' display={{base: 'none', md: 'flex'}} className='line-trought'></Box>
                    <Benefits benefits={howWorks} />
                </Flex>
            </Container>
        </Box>
      </main>
    </>
  )
}

const benefits = [
  {
    image: 'icon-phone.png',
    content: 'Préstamo 100% online'
  },
  {
    image: 'icon-clock.png',
    content: 'Recibe tu préstamo el mismo día'
  },
  {
    image: 'icon-pay.png',
    content: 'Paga solo por el tiempo que necesitas el dinero'
  }
]

const howWorks = [
    {
      image: 'soles.jpg',
      content: 'Solicita tu préstamo'
    },
    {
      image: 'registro.jpg',
      content: 'Registra tus datos'
    },
    {
      image: 'check.jpg',
      content: 'Espera la evaluación y ¡Listo!'
    }
  ]