import React from "react";
import { chakra, Box, SimpleGrid, Flex, Image } from "@chakra-ui/react";

export default function Benefits({benefits}){
  const Benefit = (props) => {
    return (
      <Box p={3} borderRadius='lg' flexDirection={{base: 'row', md: 'column'}} display='flex' alignItems='center' justifyContent='start' gap={{base: 3, md: 4}} my={4}>
        <Image
            width={{base:'60px', md:'150px'}}
            objectFit='contain'
            src={props.image}
            alt={'image of ' + props.title}
        />
        <Box>
            <chakra.b
            height='40px'
            fontSize={{base: 'md', md: 'xl'}}
            lineHeight="tall"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            >
            {props.children}
            </chakra.b>
        </Box>
      </Box>
    );
  };

  return (
    <Flex
      p={2}
      w="auto"
      justifyContent="center"
      alignItems="center"
      flexDirection={{base: 'column', md: 'row'}}
      textAlign={{base: 'left', md: 'center'}}
      zIndex={2}
    >
      <SimpleGrid
        columns={{base: 1, md: 3}}
        px={2}
        py={3}
        mx="auto"
      >
        {
            benefits && benefits.map((benefit, index) => (
                <Benefit
                key={index}
                image={benefit.image}
                >
                {benefit.content}
                </Benefit>
            ))
        }
      </SimpleGrid>
    </Flex>
  );
};
