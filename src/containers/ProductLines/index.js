import moment from 'moment'
import { React, useState, useEffect, Fragment } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useLazyQuery } from '@apollo/client'
import { object, string, number, boolean } from "yup";

import Content from '../../components/Content'
import List from '../../components/List'

import queries from './queries'
import mutations from './mutations'

export default function ProductLines() {
  const initialState = {
    media_id: "",
    title: "",
    description: "",
    friendlyUrl: "",
    available: "true",
  }

  const schema = object().shape({
    media_id: number().moreThan(0, "A imagem do produto é obrigatória!").required("A imagem da linha de produto é obrigatória!"),
    description: string().required("A descrição da linha de produto é obrigatória!"),
    available: boolean().required("A opção disponível é obrigatória!")
	})
	
	const inputs = [
    {
      type: "upload",
      name: "media_id",
      objectName: 'media',
      label: "Imagem (Tam.: 600x450 )",
      props: {
        placeholder: "",
      }   
    },
    {
      type: "text",
      name: "title",
      label: "Título",
      props: {
        placeholder: "Título da linha de produto",
        style: ""
      }
    },
    {
      type: "text",
      name: "description",
      label: "Descrição",
      props: {
        placeholder: "Descrição da linha de produto",
        style: ""
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

  const [loadProductLines, {loading}] = useLazyQuery(queries.GET_DATA, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setState({ columns: state.columns, data: data.productLines.map(x => Object.assign({}, { ...x, available: x.available.toString()})), actions: state.actions });
    },
		onError: (error) => {
			console.log(error)
		}
  })

  const handleAdd = (result) => {
    if(result.success)
      loadProductLines()
  }

  const handleEdit = (result) => {
    if(result.success)
      loadProductLines()
  }

  const handleDelete = (result) => {
    if(result.success)
      loadProductLines()
  }

  const [state, setState] = useState({
    columns: [
      { title: 'Publicação', field: 'createdAt', render: rowData => <Fragment> { moment(rowData.createdAt).format('DD/MM/YYYY') } </Fragment> }, 
      { title: 'Título', field: 'title'},
      { title: 'Disponível', field: 'available', type: 'boolean' },       
    ],
    data: null,
    actions: [
      { 
        action: 'add', 
        title: "Cadastrar Linha de Produto", 
        callback: handleAdd, 
        mutation: { definition: mutations.ADD_DATA, name: 'addProductLine' }, 
        inputs, 
        schema, 
        initialState 
      },
      { 
        action: 'edit', 
        title: "Atualizar Linha de Produto", 
        callback: handleEdit, 
        mutation: { definition: mutations.UPDATE_DATA, name: 'updateProductLine' },
        inputs, 
        schema, 
        initialState 
      },
      { 
        action: 'delete', 
        title: "Deletar Linha de Produto", 
        callback: handleDelete, 
        mutation: { definition: mutations.DELETE_DATA, name: 'removeProductLine' }
      }
    ] 
  })

  useEffect(() => {
		if(!Array.isArray(state.data) && state.data === null)
      loadProductLines()
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state])

  return (
    <Content title={'ProductLines'}>
      { loading ?
          <CircularProgress disableShrink />
        :
          <List
            title={'Linhas de Produtos Cadastradas'}
            columns={state.columns} 
            rows={state.data}
            actions={state.actions}
          />
      }
    </Content>
  )
}