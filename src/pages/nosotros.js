import { Container, Flex, Center, Stack, Text, Heading, Img } from '@chakra-ui/react'

import HeadTitle from '@/components/base/HeadTitle';
import Feature from '@/components/Feature';

export default function Nosotros({data}) {
  
  const features = [
    {
      title: 'Misión',
      image: 'mision.png',
      content: data[0].attributes.mission
    },
    {
      title: 'Visión',
      image: 'vision.png',
      content: data[0].attributes.vision
    }
  ]

  return (
    <>
      <HeadTitle title='¡Activa tu linea de efectivo con FIO.pe!' description='Obtén tu línea de efectivo con nosotros' />
      {data && data.map((about) => (
        <main>
          <Img 
          objectFit='cover'
          src={about.attributes.banner}
          fallbackSrc='banner-3.jpg'
          width='100%'
          maxW='2000px'
          height={{base: '200px', md: '430px'}}
          />
          <Container maxW='8xl' pt={{base: 10, md: 50}} pb={{base: 20, md: 100}}>
              <Heading className='title-highlight t-uppercase' as='h1' size='2xl' mb={10}> {about.attributes.title}</Heading>

              <Text as='p' textAlign='center' px={5} mb={10}>
              {about.attributes.description}
              </Text>

              <Flex justifyContent='center' alignItems='center' flexWrap='wrap' gap={5}>
                  <Feature features={features} />
              </Flex>
          </Container>
        </main>
      ))}

      {!data && <Heading className='title-highlight t-uppercase' as='h1' size='2xl' mt={10} mb={10}> Sin información para mostrar</Heading>}
    </>
  )
}

  
export async function getServerSideProps() {
  const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_ABOUT
  const res = await fetch(url)
  const about = await res.json()
  const { data } = about;
  return {
    props: {
      data
    }
  }
}
