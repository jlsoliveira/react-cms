import React, { useState } from 'react';
import { Controller } from "react-hook-form"
import { FormLabel } from "@material-ui/core"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-decoupled-document'

import config from './config';

import './style.css';

const Editor = ({ id, name, label, control, data}) => {
    const [editorData, setEditorData] = useState(data);

    return <div className='form__input__editor'>
        <FormLabel>{label}</FormLabel> 
        <Controller
            control={control}
            name={name}
            defaultValue={editorData}
            render={({
                field: { onChange, onBlur, value, name, ref, },
                fieldState: { invalid, isTouched, isDirty, error } 
            }) => {
                return (
                    <CKEditor
                        editor={ ClassicEditor }
                        config={config}
                        data={editorData}
                        onReady={ editor => {
                            editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                            );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData()
                            setEditorData(data)
                            onChange(data)
                        } }
                        // onBlur={ ( event, editor ) => {
                        //     console.log( 'Blur.', editor )
                        // } }
                        // onFocus={ ( event, editor ) => {
                        //   console.log( 'Focus.', editor )
                        // } }
                    />
                )
            }}
        />
    </div>
}

export default Editor