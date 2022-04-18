import React, { useState } from 'react';
import { Controller } from "react-hook-form"
import UploadFile from "../../../UploadFile"
import { FormLabel } from "@material-ui/core"

import './style.css';

const Upload = ({id, name, label, placeholder, mediaData, control, register, handleCallback}) => {
    const [ mediaValue, setMediaValue ] = useState(mediaData && mediaData.id ? mediaData.id : 0)

    return <div className='form__input__upload'>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Controller
            control={control}
            id={id}
            name={name}
            render={({ 
                field: { onChange, ref },
                formState: { errors }
            }) => {
                return (
                    <UploadFile 
                        name={name}
                        inputRef={ref}
                        value={mediaValue}
                        mediaData={mediaData}
                        handleOnChange={(value) => {
                            setMediaValue(value)
                            onChange(value)
                        }}
                        errors={errors}
                        callback={handleCallback}
                    />
                )
            }}
        />
    </div>
}

export default Upload