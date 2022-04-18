import React from 'react';
import InputMask from "react-input-mask"
import {
    Input
} from "@material-ui/core"

import './style.css';

const Mask = ({id, name, label, mask, placeholder, control, register}) => {
    return <InputMask mask={mask}>
        {(props) => <Input {...props} 
                        type="tel" 
                        placeholder={placeholder}
                        name={name}
                        label={label}
                        className='form__input__mask'
                        inputRef={register}
                        disableUnderline 
                    />
        }
    </InputMask>
}

export default Mask