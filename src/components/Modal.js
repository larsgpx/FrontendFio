import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
    Heading,
    Text,
    Flex,
    Center,
    Link
  } from '@chakra-ui/react'
  import { ChevronLeftIcon } from '@chakra-ui/icons'
  const Modals = ({ isOpenit, onCloseit, actionBtn, data = null, type = 'thankyou' }) => {

    if (type === 'pre-register') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={8} borderRadius={10} gap={5} justifyContent='center' flexDirection='column' alignItems='center'> 
                        <Text className='title-red' as='p'>
                            {data.title}
                        </Text>
                        <Center>
                            <Text textAlign='center'>
                            {data.description}
                            </Text>
                        </Center>
                        <Center>
                            <Text>
                            {data.subdescription}
                            </Text>
                        </Center>
    
                        <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={actionBtn}>
                    Reenviar Correo
                    </Button>
                    <Link
                    color='gray.500'
                    href='/'
                    >
                    <ChevronLeftIcon /> Regresar al inicio
                    </Link>
                    </Flex>
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    } else if (type === 'congrats') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={8} borderRadius={10} gap={5} justifyContent='center' flexDirection='column' alignItems='center'> 
                        <Text className='title-red' as='p'>
                            {data.title}
                        </Text>
                        <Center>
                            <Text textAlign='center'>
                            {data.description}
                            </Text>
                        </Center>
                        <Center>
                            <Text color='gray.500'>
                            {data.subdescription}
                            </Text>
                        </Center>
                    <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={onCloseit}>
                        Cerrar
                    </Button>
                    </Flex>
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    } else if (type === 'nonFieldErrors') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={8} borderRadius={10} gap={5} justifyContent='center' flexDirection='column' alignItems='center'> 
                            <Text className='title-red' as='p' mb={0}>
                            {data.title}
                            </Text>
                        <Center mb={4}>
                            <Text textAlign='center'>
                                {data.description}
                            </Text>
                        </Center>
                    <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={onCloseit}>
                    Cerrar
                    </Button>
                    </Flex>
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    } else if (type === 'error') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={8} borderRadius={10} gap={5} justifyContent='center' flexDirection='column' alignItems='center'> 
                            <Text className='title-red' as='p' mb={0}>
                                ¡Lo sentimos!
                            </Text>
                        <Center mb={4}>
                            {data && data.map((msg, index) => (
                                <Text key={index} textAlign='center'>
                                    {msg.detail}
                                </Text>
                            ))}
                        </Center>
                    <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={onCloseit}>
                    Cerrar
                    </Button>
                    </Flex>
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    } else if (type === 'update-info') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={4} borderRadius={10} gap={10} justifyContent='center' flexDirection='column' alignItems='center'> 
                        <Center>
                            <Text textAlign='center'>
                            ¡Se actualizó Satisfactoriamente la información!
                            </Text>
                        </Center>
    
                        <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={onCloseit}>
                    Cerrar
                    </Button>
                    </Flex>
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    } else {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={4} borderRadius={10} gap={10} justifyContent='center' flexDirection='column' alignItems='center'> 
                        <Text className='title-red' as='p'>
                            ¡Se realizó el registro con éxito!
                        </Text>
                        <Center>
                            <Text textAlign='center'>
                            Gracias por tomarse el tiempo de completar nuestro formulario. Valoramos su opinión y trabajaremos para resolver su problema lo antes posible
                            </Text>
                        </Center>
    
                        <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={onCloseit}>
                    Cerrar
                    </Button>
                    </Flex>
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    }
    };
    
export default Modals;