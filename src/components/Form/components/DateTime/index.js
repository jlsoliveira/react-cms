import React from 'react';
import { Controller } from "react-hook-form"
import { TextField } from "@material-ui/core"

import './style.css';

const DateTime = ({id, name, label, placeholder, control}) => {
    return <Controller
        control={control}
        name={name}
        render={({ 
            field: { onChange, value, ref },
            formState: { errors }  
        }) => (
            <TextField
                id={id}
                name={name}
                label={label}
                placeholder={placeholder}
                className='form__input__datetime'
                type="datetime-local"
                value={value}
                onChange={ ( e ) => {
                    onChange(e.target.value)
                }}
                error={errors && !!errors[name]}
                helperText={
                    errors && errors[name] ? errors[name].message : ""
                }
                inputRef={ref}
                variant="outlined"
            />
        )}
    />
}

export default DateTime