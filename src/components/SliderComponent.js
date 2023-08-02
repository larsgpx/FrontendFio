import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'
import React, { useState, useEffect } from "react";
export default function SliderComponent({min, max, type, step, defaultValue, valueSeted}) {
    const [sliderValue, setSliderValue] = useState(defaultValue);
    const labelStyles = {
        mt: "3",
        mb: "3",
        fontSize: "sm",
    };
    useEffect(() => {
      valueSeted(sliderValue);
    }, [valueSeted]);

    return (
      <>
        <Slider
            min={min}
            max={max}
            step={step}
            colorScheme="blue"
            defaultValue={defaultValue}
            aria-label="slider-ex-6"
            onChange={(val) => {valueSeted(val);setSliderValue(val)}}
          >
            <SliderMark color="black" value={min} {...labelStyles}>
             {type === 'amount' ? 's/' : ''} {min}
            </SliderMark>
            <SliderMark
              left={{ base: type === 'amount' ? "88%!important" : "94%!important", sm: type === 'amount' ? "92%!important" : "97%!important" }}
              value={max}
              {...labelStyles}
            >
              {type === 'amount' ? 's/' : ''}{max}
            </SliderMark>
            {!type && (
              <SliderMark
              value={sliderValue}
              textAlign='center'
              bg='blue.500'
              color='white'
              mt='-10'
              ml='-5'
              w='12'
              >
                {type === 'amount' ? 's/' : ''}{sliderValue}
              </SliderMark>
            )}
            <SliderTrack bg={"gray.200"} height={2}>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} bg="blue.500" />
          </Slider>  
    </>
    )
}