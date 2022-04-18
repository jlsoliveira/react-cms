import React from 'react'
import uuid from 'react-uuid'
import { Controller } from "react-hook-form"
import {
    FormLabel,
    Radio,
    RadioGroup as RadioGroupMaterialUI,
    FormControlLabel
  } from "@material-ui/core"

import './style.css';

const RadioGroup = ({id, name, label, options, control}) => {
    return <div className='form__input__radio__group'>
        <FormLabel>{label}</FormLabel>
        <Controller
            control={control}
            name={name}
            className="div-options"
            render={({ 
                field: { onChange, value, ref },
                formState: { errors }
            }) => (
                <RadioGroupMaterialUI 
                    aria-label={name}
                    value={value}
                    onChange={onChange} 
                    ref={ref}
                >
                    {options && options.map((item) => 
                        <FormControlLabel value={item.value} control={<Radio />} label={item.label} key={uuid()} />
                    )}
                </RadioGroupMaterialUI>
            )}
        />
    </div>
}

export default RadioGroup