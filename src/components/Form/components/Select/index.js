import React, { Fragment } from 'react';
import uuid from 'react-uuid'
import { Controller } from "react-hook-form"
import { 
    FormLabel,
    MenuItem,
    Select as SelectMaterialUI
} from "@material-ui/core"

import './style.css';

const Select = ({id, name, label, placeholder, options, control}) => {
    return <Controller
        name={name}
        control={control}
        render={({ 
                field: { onChange, value, ref },
                formState: { errors } 
            }) => (
            <Fragment>
                <FormLabel className="label-select">{label}</FormLabel>
                <SelectMaterialUI 
                    placeholder={placeholder}
                    name={name}
                    label={label} 
                    onChange={onChange}
                    className='form__input__select'
                    value={value}
                    error={errors && !!errors[name]}
                    helperText={
                        errors && errors[name] ? errors[name].message : ""
                    }
                >
                    {options && options.map((item) => 
                        <MenuItem value={item.value} key={uuid()}>{item.label}</MenuItem>
                    )}
                </SelectMaterialUI>
            </Fragment>
        )}
    /> 
}

export default Select