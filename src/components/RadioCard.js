import { Box, useRadio, Text } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'


export default function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props)
    const subtitle = props.subtitle;
    const children = props.children;

    const day = subtitle && children && props.children.slice(0,2);
  
    const input = getInputProps()
    const checkbox = getRadioProps()
  
    return (
      <Box className='box-radio' as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          bg='gray.100'
          _checked={{
            borderColor: 'blue.300',
          }}
          px={5}
          py={3}
          className='month-selected'
        >
          <Text as='b' fontSize='lg'>
            {props.children} <CheckIcon />
          </Text>
          <Text fontSize='xs' display={subtitle ? '' : 'none'}>
            el {day} de cada mes
          </Text>
        </Box>
      </Box>
    )
  }
  