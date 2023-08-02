import { HStack, useRadioGroup } from '@chakra-ui/react'
import React, { useState } from "react";
import RadioCard from "./RadioCard";

export default function RadioGroup({nameItem, items, bigger, setValue}) {
    const [radioValue, setRadioValue] = useState(0);
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: nameItem,
        defaultValue: null,
        onChange: setValue,
    })

    const group = getRootProps()        

    return (
        <HStack className={`radio-list ${bigger ? 'bigger' : ''}`} justify='space-between' {...group}>
            {items && items.map((value) => {
                const radio = getRadioProps({ value })
                return (
                <RadioCard key={value} {...radio} subtitle={bigger ? true : false}>
                    {value}
                </RadioCard>
                )
            })}
        </HStack>
    )
  }
  