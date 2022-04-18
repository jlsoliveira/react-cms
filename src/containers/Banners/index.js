import moment from 'moment'
import { React, useState, useEffect, Fragment } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useLazyQuery } from '@apollo/client'
import { object, number, boolean } from "yup";

import Content from '../../components/Content'
import List from '../../components/List'

import queries from './queries'
import mutations from './mutations'

export default function Banners() {
  const initialState = {
    media_id: "",
    title: "",
    link: "",
    available: "true",
  }

  const schema = object().shape({
    media_id: number().moreThan(0, "A imagem do banner é obrigatória!").required("A imagem do banner é obrigatória!"),
    available: boolean().required("A opção disponível é obrigatória!")
	})
	
	const inputs = [
    {
      type: "upload",
      name: "media_id",
      objectName: 'media',
      label: "Imagem (Tam.: 1920x720 )",
      props: {
        placeholder: "",
      }   
    },
    {
      type: "text",
      name: "title",
      label: "Título",
      props: {
        placeholder: "Título do banner",
        style: ""
      }
    },
    {
      type: "text",
      name: "link",
      label: "Link",
      props: {
        placeholder: "Link do banner",
      }
    },
    {
      type: "radio",
      name: "available",
      label: "Disponível",
      defaultValue: "true",
      props: {
      },
      options: [
        { label: "Sim", value: "true"},
        { label: "Não", value: "false"}
      ]
    },
  ]
  
  const [loadBanners, { loading }] = useLazyQuery(queries.GET_DATA, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setState({ columns: state.columns, data: data.banners.map(x => Object.assign({}, { ...x, available: x.available.toString()})), actions: state.actions });
    },
		onError: (error) => {
			console.log(error)
		}
  })

  const handleAdd = (result) => {
    if(result.success)
      loadBanners()
  }

  const handleEdit = (result) => {
    if(result.success)
      loadBanners()
  }

  const handleDelete = (result) => {
    if(result.success)
      loadBanners()
  }

  const [state, setState] = useState({
    columns: [
      { title: 'Id', field: 'id'},
      { title: 'Título', field: 'title'},
      { title: 'Disponível', field: 'available', type: 'boolean' },
      { title: 'Criado Em', field: 'createdAt', render: rowData => <Fragment> { moment(rowData.createdAt).format('DD/MM/YYYY') } </Fragment> },  
    ],
    data: null,
    actions: [
      { 
        action: 'add', 
        title: "Cadastrar Banner", 
        callback: handleAdd, 
        mutation: { definition: mutations.ADD_DATA, name: 'addBanner' }, 
        inputs, 
        schema, 
        initialState 
      },
      { 
        action: 'edit', 
        title: "Atualizar Banner", 
        callback: handleEdit, 
        mutation: { definition: mutations.UPDATE_DATA, name: 'updateBanner' },
        inputs, 
        schema, 
        initialState 
      },
      { 
        action: 'delete', 
        title: "Deletar Banner", 
        callback: handleDelete, 
        mutation: { definition: mutations.DELETE_DATA, name: 'removeBanner' }
      }
    ] 
  })

  useEffect(() => {
		if(!Array.isArray(state.data) && state.data === null)
      loadBanners()
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state])

  return (
    <Content title={'Banners'}>
      { loading ?
          <CircularProgress disableShrink />
        :
          <List
            title={'Banners Cadastrados'}
            columns={state.columns} 
            rows={state.data}
            actions={state.actions}
          />
      }
    </Content>
  )
}