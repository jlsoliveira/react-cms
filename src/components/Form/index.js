import { React, useState, Fragment,useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from '@apollo/client'
import { yupResolver } from "@hookform/resolvers/yup"
import {
  CircularProgress,
  FormGroup,
  FormControl,
  Grid,
  IconButton,
} from "@material-ui/core"
import Alert from '@material-ui/lab/Alert'
import * as Components from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close'

import Text from './components/Text';
import Hidden from './components/Hidden';
import Date from './components/Date'
import DateTime from './components/DateTime'
import Time from './components/Time'
import Editor from './components/Editor'
import Select from './components/Select'
import RadioGroup from "./components/RadioGroup"
import Mask from "./components/Mask"
import Upload from "./components/Upload"
import DialogActions from "./components/DialogActions"

export default function Form({ source, inputs, schema, callback, mutation, initialState, close }) {
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitMessageStatus, setSubmitMessageStatus] = useState(false)
  const [submitMessageType, setSubmitMessageType] = useState("")

  const [mutate, { loading }] = useMutation(mutation.definition, {
    onCompleted: (data) => {
      setSubmitMessageStatus(true)

      if (data[mutation.name] && data[mutation.name].id) {
        callback({ success: true, data})
        setSubmitMessage("Ação executada com sucesso!")
        setSubmitMessageType("success")
      } else {
        callback({ success: false})
        setSubmitMessage(
          "Houve um erro inesperado ao executar ação desejada, tente novamente mais tarde!"
        )
        setSubmitMessageType("error")
      }
    },
    onError: (error) => {
      setSubmitMessageStatus(true)
      callback({ success: false})
      setSubmitMessage(
        "Houve um erro inesperado ao executar ação desejada, tente novamente mais tarde!"
      )
      setSubmitMessageType("error")
    },
  })

  const { register, handleSubmit, reset, control } = useForm({
    mode: 'onSubmit',
    defaultValues: initialState,
  	reValidateMode: 'onChange',
		resolver: yupResolver(schema),
		criteriaMode: "firstError",
		shouldFocusError: true,
		shouldUnregister: true,
	})

  const onSubmit = async (data, e) => {
    let variables = source && source.id ? { id: parseInt(source.id), ...data } : { ...data }
    mutate({ variables: variables })
  }

  const onError = (errors, e) => {
    console.log(errors, e)
  }

  const buildField = (input, data) => {
    switch (input.type) {
      case 'text':
        return <Text 
          control={control} 
          id={input.id} 
          name={input.name} 
          label={input.label} 
          readonly={input.readOnly}
          placeholder={input.props.placeholder} />

      case 'hidden':
        return <Hidden
          id={input.id} 
          name={input.name} 
          control={control} />
            
      case 'date':
        return <Date 
          control={control} 
          id={input.id} 
          name={input.name} 
          label={input.label} 
          placeholder={input.props.placeholder} />

      case 'datetime':
        return <DateTime
          control={control} 
          id={input.id} 
          name={input.name} 
          label={input.label} 
          placeholder={input.props.placeholder} />

      case 'time':
        return <Time
          control={control} 
          id={input.id} 
          name={input.name} 
          label={input.label} 
          placeholder={input.props.placeholder} />

      case 'editor':
        return <Editor
          data={data[input.objectName]}
          control={control} 
          id={input.id} 
          name={input.name} 
          label={input.label} 
          placeholder={input.props.placeholder} />
      
      case 'select':
        return <Select
          control={control} 
          id={input.id} 
          name={input.name} 
          label={input.label} 
          options={input.options}
          placeholder={input.props.placeholder} />
      
      case 'radio':
        return  <RadioGroup
          control={control} 
          id={input.id} 
          name={input.name} 
          label={input.label} 
          options={input.options} 
          placeholder={input.props.placeholder} />

      case 'mask':
        return <Mask
          control={control}
          register={register}
          id={input.id} 
          name={input.name} 
          label={input.label} 
          mask={input.props.mask} 
          placeholder={input.props.placeholder} />

      case 'upload':
        return <Upload
          mediaData={data[input.objectName]}
          control={control}
          register={register}
          id={input.id} 
          name={input.name} 
          label={input.label} 
          placeholder={input.props.placeholder} />

      default:
        React.createElement(Components[input.component], input.props)
    }
  }

  useEffect(() => {
    reset(source);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container direction={"column"} spacing={2}>
          { Array.isArray(inputs) && inputs.map((input, index) =>
              <Grid item key={index}>
                <FormGroup>
                  <FormControl>
                    {buildField(input, source)}
                  </FormControl>
                </FormGroup>
              </Grid>
            )
          }
        </Grid>
        <div style={{ marginTop: '20px' }} >
          {loading && <CircularProgress disableShrink />}
          { submitMessageStatus && (
            <Alert
              variant="outlined" 
              severity={submitMessageType}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSubmitMessageStatus(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {submitMessage}
            </Alert>
          )}
        </div>
      </form>
      <DialogActions status={submitMessageType} handleClose={close} handleSubmit={handleSubmit(onSubmit, onError)} />
    </Fragment>
  )
}