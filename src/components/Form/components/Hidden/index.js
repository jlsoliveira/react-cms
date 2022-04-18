import React from 'react';
import { Controller } from "react-hook-form"

import './style.css';

const Hidden = ({id, name, control}) => (
    <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
            <input
                type="hidden"
                id={id}
                name={name}
                onChange={onChange}
                value={value}
                inputRef={ref}
            />
        )}
    /> 
)

export default Hidden