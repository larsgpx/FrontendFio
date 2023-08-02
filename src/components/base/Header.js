import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  Image,
  IconButton,
  CloseButton,
  Link,
} from "@chakra-ui/react";
import NextLink from 'next/link'
import { AiOutlineMenu } from "react-icons/ai";

export default function Header() {
  const [islogged, setIslogged] = useState(null)
  const bg = "#d62732";
  const mobileNav = useDisclosure();
  
  useEffect(() => {
    const clientArea = () => {
      if (Cookies.get("loggedIn")) {
        setIslogged(true)
      } else {
        setIslogged(false)
      }
    }
    clientArea();
  }, [])
  
  
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex maxW={{ base: "xl", md: "8xl" }} alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Fio - Home"
              display="flex"
              alignItems="center"
            >
            <Image
              src="logo.svg"
              alt="Fio logo"
              width={{ base: "75px", lg: "80px" }}
              height={{ base: "45px", lg: "50px" }}
              my={{ base: 2, lg: 0 }}
            />
              <VisuallyHidden>Fio</VisuallyHidden>
            </chakra.a>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Link as={NextLink} href='/'><Button className="nav-li" colorScheme="brand">Inicio</Button></Link>
              {/* <Link as={NextLink} href='/productos'><Button className="nav-li" colorScheme="brand">Productos</Button></Link> */}
              <Link as={NextLink} href='/nosotros'><Button className="nav-li" colorScheme="brand">Nosotros</Button></Link>
              <Link as={NextLink} href='/beneficios'><Button className="nav-li" colorScheme="brand">¿Cómo funciona?</Button></Link>
              <Link as={NextLink} href='/preguntas-frecuentes'><Button className="nav-li" colorScheme="brand">Preguntas Frecuentes</Button></Link>
            </HStack>
            {islogged && <Link href='/mi-cuenta' className="btn-outline">
              Área de clientes
            </Link>}

            {!islogged && <Link href='/login' className="btn-outline">
              Área de clientes
            </Link>}
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="white"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                zIndex={1000}
                borderRadius={10}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                  color={'white'}
                />
                <Link onClick={mobileNav.onClose} as={NextLink} href='/'><Button className="nav-li" colorScheme="brand">Inicio</Button></Link>
                {/* <Link onClick={mobileNav.onClose} as={NextLink} href='/productos'><Button className="nav-li" colorScheme="brand">Productos</Button></Link> */}
                <Link onClick={mobileNav.onClose} as={NextLink} href='/nosotros'><Button className="nav-li" colorScheme="brand">Nosotros</Button></Link>
                <Link onClick={mobileNav.onClose} as={NextLink} href='/beneficios'><Button className="nav-li" colorScheme="brand">¿Cómo funciona?</Button></Link>
                <Link onClick={mobileNav.onClose} as={NextLink} href='/preguntas-frecuentes'><Button className="nav-li" colorScheme="brand">Preguntas Frecuentes</Button></Link>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
