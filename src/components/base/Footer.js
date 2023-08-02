import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  VStack,
  Divider,
  Icon,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GrInstagram } from "react-icons/gr";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

export default function Footer({data}) {

  return (
    <Box bg="#c7323e">
      <Container maxW="8xl">
        <Stack
          direction={{ base: "column", lg: "row" }}
          w="full"
          justify="space-between"
          p={10}
        >
          <Flex justify="center">
            <Image
              src={data && data.data[0].attributes.image}
              alt="Fio Logo"
              rounded="lg"
              width={{ base: "150px", lg: "200px" }}
              height={{ base: "75px", lg: "100px" }}
              my={{ base: 2, lg: 0 }}
            />
          </Flex>
          <HStack
            alignItems="start"
            flex={1}
            justify="space-around"
            fontSize={{ base: "12px", md: "16px" }}
            color="white"
            textAlign={{ base: "center", md: "left" }}
          >
            <Flex justify="start" direction="column">
              <Text as="b">Acerca de Fio</Text>
            {data && data.included.map((about, index) => (
                <div key={index}>
                {about.type === 'AboutInfo' && (
                  <>
                    <Link key={about.id} href={about.attributes.link} color='white'>{about.attributes.name}</Link>
                  </>
                )}
              </div>  
              ))}
              <Image
                width={{ base: "80px", lg: "100px" }}
                mt={3}
                src="libro-reclamaciones.svg"
              />
            </Flex>
          </HStack>
          <HStack
            alignItems="start"
            flex={3}
            justify="end"
            fontSize={{ base: "12px", md: "16px" }}
            color="white"
            _dark={{ color: "white" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Flex justify="start" direction="column">
              {data && data.included.map((contact, index) => (
                <div key={index}>
                {contact.type === 'ContactInfo' && (
                  <>
                    <Text as="b">{contact.attributes.name}</Text>
                    <Text color="white">{contact.attributes.scheduleLabel}</Text>
                    <Text color="white">{contact.attributes.schedule}</Text>
                    <Link href={`mailto:${contact.attributes.email}`}>{contact.attributes.email}</Link>
                    <Link href={contact.attributes.redirectLink}>{contact.attributes.redirectName}</Link>
                  </>
                )}
              </div>  
              ))}
              <VStack py={3}>
                <HStack justify="center" gap={2}>
                  <Link className="social-icons">
                    <Icon
                      _dark={{ color: "white" }}
                      h="20px"
                      w="20px"
                      as={FaFacebookF}
                    />
                  </Link>
                  <Link className="social-icons">
                    <Icon
                      _dark={{ color: "white" }}
                      h="20px"
                      w="20px"
                      as={FiTwitter}
                    />
                  </Link>
                  <Link className="social-icons">
                    <Icon
                      _dark={{ color: "white" }}
                      h="20px"
                      w="20px"
                      as={GrInstagram}
                    />
                  </Link>
                  <Link className="social-icons">
                    <Icon
                      _dark={{ color: "white" }}
                      h="20px"
                      w="20px"
                      as={FaLinkedinIn}
                    />
                  </Link>
                </HStack>
              </VStack>
            </Flex>
          </HStack>
        </Stack>
        <Divider orientation="horizontal" />
        <Stack
          direction={{ base: "column", md: "row" }}
          p={4}
          align="center"
          justify="space-between"
          gap={2}
        >
          <Flex gap={3}>
            
            <Link href={data && data.data[0].attributes.policy} color="white" download>Políticas de Privacidad</Link>
            <Link href={data && data.data[0].attributes.terms} color="white" download>Términos y Condiciones</Link>
          </Flex>
          <Box>
            <Text color="white" maxW={400}>
              Capital Tech Latam es una empresa registrada en la UIF de la
              Superintendencia de Banca, Seguros y AFP
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
