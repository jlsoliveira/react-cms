import React from 'react';
import { Controller } from "react-hook-form"
import { TextField } from "@material-ui/core"

import './style.css';

const Text = ({id, name, label, placeholder, readonly, control}) => (
    <Controller
        name={name}
        control={control}
        render={({ 
            field: { onChange, value, ref },
            formState: { errors } 
        }) => (
            <TextField
                id={id}
                name={name}
                label={label}    
                placeholder={placeholder}
                className='form__input__text'
                onChange={onChange}
                value={value}
                inputProps={
                    { readOnly: readonly }
                }
                error={errors && !!errors[name]}
                helperText={
                    errors && errors[name] ? errors[name].message : ""
                }
                inputRef={ref}
                variant="outlined"
            />
        )}
    /> 
)

export default Text