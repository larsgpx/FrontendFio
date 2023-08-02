import React from "react";
import { chakra, Box, SimpleGrid, Flex, Image } from "@chakra-ui/react";

export default function Feature({features}){
  const Feature = (props) => {
    return (
      <Box p={3}  borderRadius='lg' flexDirection={{base:'column', md: 'row'}} display='flex' gap={5} my={4}>
        <Image
            width='100px'
            objectFit='contain'
            src={props.image}
            alt={'image of ' + props.title}
        />
        <Box>
            <chakra.h3
            mb={3}
            fontSize="lg"
            lineHeight="shorter"
            fontWeight="bold"
            color='black'
            >
            {props.title}
            </chakra.h3>
            <chakra.p
            lineHeight="tall"
            color="black"
            >
            {props.children}
            </chakra.p>
        </Box>
      </Box>
    );
  };

  return (
    <Flex
      p={2}
      w="auto"
      maxW='7xl'
      bg='transparent'
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <SimpleGrid
        columns={1}
        px={2}
        py={3}
        mx="auto"
      >
        {
            features && features.map((feature, index) => (
                <Feature
                key={index}
                title={feature.title}
                image={feature.image}
                >
                {feature.content}
                </Feature>
            ))
        }
      </SimpleGrid>
    </Flex>
  );
};
