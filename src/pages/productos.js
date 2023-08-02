import HeadTitle from "@/components/base/HeadTitle";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Stack, Container, Heading, Box, Flex, Image, Text, Divider, ButtonGroup, Button, Wrap, WrapItem } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useFetch } from "@/hooks/useFetch";
export default function Productos() {

  return (
    <>
      <HeadTitle
        title="Productos"
        description="Obtén tu línea de efectivo con nosotros"
      />
      <main>
        <Container
          maxW="8xl"
          pt={{ base: 10, md: 50 }}
          pb={{ base: 20, md: 100 }}
        >
            <Heading className="title-highlight" as="h1" size="2xl" mb={10}>
            PRODUCTOS
            </Heading>
            <Wrap spacing='30px' justify='center'>
                {
                products && products.map((product) => (
                    <WrapItem key={product.id}>
                        <Card align='center' maxW='sm'>
                            <CardBody>
                                <Image
                                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                                />
                                <Stack mt='6' spacing='3'>
                                <Heading align='center' size='md'>{product.title}</Heading>
                                <Text align='center' fontSize='2xl'>
                                    {product.price}
                                </Text>
                                </Stack>
                            </CardBody>
                            <CardFooter>
                                <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='blue'>
                                    Ver detalle
                                </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    </WrapItem>
                ))
                }
            </Wrap>
        </Container>
      </main>
    </>
  );
}


const products = [
    {
        id: 1,
        title: 'Producto 1',
        price: 'XX.XX'
    },
    {
        id: 2,
        title: 'Producto 2',
        price: 'XX.XX'
    },
    {
        id: 3,
        title: 'Producto 3',
        price: 'XX.XX'
    }
]