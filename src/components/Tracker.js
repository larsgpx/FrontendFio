import { 
    Flex,
    Box,
    Text,
    Spacer,
    Container,
    Skeleton,
    FormLabel,
    Heading,
    Stack,
    Show } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import React, {useState, useEffect} from 'react'
import { FiClock, FiCheck } from "react-icons/fi";
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Cookies from 'js-cookie';

export default function Tracker({uuid}) {
   const [tracking, setTracking] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_TRACKING + uuid + '/'
    setLoading(true)
    // const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_TRACKING + '9440af7c-4a8b-44f2-948f-ae0f43343a19/'
    try {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const tracker = data.data;
            setTracking(tracker);
            setLoading(false)
        })
    } catch (error) {
        console.error(error);
    }
}, []);
    return (
    <>
        <HeadTitle title='Mi cuenta' description='Obtén tu línea de efectivo con nosotros' />
        <Container maxW='8xl'>
            <Heading as='h2' size='md' textAlign='center' color='#E2474B'>SEGUIMIENTO SOLICITUD DE DESEMBOLSO</Heading>
        <Flex minWidth={{base:'100%', md:'max-content'}} flexDirection='column' gap='2'>
            {loading && 
            <>
                <Stack gap={5} mt={10}>
                    <Skeleton height='20px' />
                    <Skeleton height='5px' mb={3} />
                    <Skeleton height='20px' />
                    <Skeleton height='5px' mb={3} />
                    <Skeleton height='20px' />
                    <Skeleton height='5px' mb={3} />
                </Stack>
            </>
            }
            {!loading && tracking && tracking.step.map((track) => (
                <Box key={track.order} my={4}>
                    <Flex bg={track.check ? 'green.200' : 'gray.200'}  borderRadius={10} px={4} minWidth={{base:'100%', md:'max-content'}} alignItems='center' gap='2'>
                        <Box pb='2'>
                            <FormLabel position='relative' top={2}>
                                    <Flex className={`input-position fill`}>
                                    {track.order}
                                    </Flex> 
                            </FormLabel>
                            <Text as='b'>{track.title}</Text>
                        </Box>
                        <Show above='sm'>
                            <Spacer  />
                        </Show>
                        {track.check ? <FiCheck /> : <FiClock />}
                    </Flex>
                    <Text my={2}>
                        {track.status}
                    </Text>
                    <Text>
                        <ArrowForwardIcon /> {track.observation}
                    </Text>
                </Box>
            ))}
        </Flex>
        </Container>
    </>
  )
}
