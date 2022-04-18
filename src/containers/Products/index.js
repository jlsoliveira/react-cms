import moment from 'moment'
import { React, useState, useEffect, Fragment } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useLazyQuery } from '@apollo/client'
import { object, string, number, boolean } from "yup";

import Content from '../../components/Content'
import List from '../../components/List'

import queries from './queries'
import mutations from './mutations'
import productLineQueries from '../ProductLines/queries'


export default function Products() {
  const [productLines, setProductLines] = useState([]);

  const initialState = {
    productLine_id: 0,
    media_id: "",
    title: "",
    unitWeight: "",
    description: "",
    preparation: "",
    ingredient: "",
    nutritional: "",
    friendlyUrl: "",
    available: "true",
  }

  const schema = object().shape({
    productLine_id: number().required("A linha do produto é obrigatória!"),
    media_id: number().moreThan(0, "A imagem do produto é obrigatória!").required("A imagem do produto é obrigatória!"),
    title: string().required("O nome do produto é obrigatório!"),
    unitWeight: string().required("Peso/Unidade do produto é obrigatório!"),
    description: string().required("A descrição do produto é obrigatório!"),
    preparation: string().required("O conteúdo do modo de preparo é obrigatório!"),
    ingredient: string().required("O conteúdo do ingrediente é obrigatório!"),
    nutritional: string().required("O conteúdo d a informação nutricional é obrigatório!"),
    available: boolean().required("A opção disponível é obrigatória!")
	})
	
	const [inputs, setInputs] = useState([
    {
      type: "select",
      name: "productLine_id",
      label: "Linha do Produto",
      props: {
        placeholder: "Nenhum linha de produto cadastrada",
      },
      options: productLines && productLines.length > 0 ? productLines.map(x => { return { value: x.id, label: x.title } }) : []
    },
    {
      type: "upload",
      name: "media_id",
      objectName: 'media',
      label: "Imagem (Tam.: 620x620 )",
      props: {
        placeholder: "",
      }
    },
    {
      type: "text",
      name: "title",
      label: "Nome do produto",
      props: {
        placeholder: "ex.: Chá Maçã com Canela Gold",
        style: ""
      }
    },
    {
      type: "text",
      name: "unitWeight",
      label: "Peso/Unidade",
      props: {
        placeholder: "ex.: Peso Líq. 30g / Contém 15 saquinhos",
      }
    },
    {
      type: "text",
      name: "description",
      label: "Descrição do produto",
      props: {
        placeholder: "",
      }
    },
    {
      type: "editor",
      name: "preparation",
      objectName: 'preparation',
      label: "Modo de Preparo",
      props: {
        placeholder: "Modo de Preparo",
      }
    },
    {
      type: "editor",
      name: "ingredient",
      objectName: 'ingredient',
      label: "Ingredientes",
      props: {
        placeholder: "Ingredientes",
      }
    },
    {
      type: "editor",
      name: "nutritional",
      objectName: 'nutritional',
      label: "Informação Nutricional",
      props: {
        placeholder: "Nutricional",
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
    }
  ])
  
  const [loadProducts] = useLazyQuery(queries.GET_DATA, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setState({ columns: state.columns, data: data.products.map(x => Object.assign({}, { ...x, available: x.available.toString()})), actions: state.actions });
    },
		onError: (error) => {
			console.log(error)
		}
  })

  const [loadProductLines, {loading}] = useLazyQuery(productLineQueries.GET_DATA, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setProductLines(data.productLines)

      let newInputs = [ ...inputs ]
      newInputs[0].options = data.productLines.map(x => { return { value: x.id, label: x.title } }) || []

      setInputs(newInputs)
    },
		onError: (error) => {
			console.log(error)
		}
  })

  const handleAdd = (result) => {
    if(result.success)
      loadProducts()
  }

  const handleEdit = (result) => {
    if(result.success)
      loadProducts()
  }

  const handleDelete = (result) => {
    if(result.success)
      loadProducts()
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
        title: "Cadastrar Produto", 
        callback: handleAdd, 
        mutation: { definition: mutations.ADD_DATA, name: 'addProduct' }, 
        inputs, 
        schema, 
        initialState 
      },
      { 
        action: 'edit', 
        title: "Atualizar Produto", 
        callback: handleEdit, 
        mutation: { definition: mutations.UPDATE_DATA, name: 'updateProduct' },
        inputs, 
        schema, 
        initialState 
      },
      { 
        action: 'delete', 
        title: "Deletar Produto", 
        callback: handleDelete, 
        mutation: { definition: mutations.DELETE_DATA, name: 'removeProduct' }
      }
    ] 
  })

  useEffect(() => {
		if(!Array.isArray(state.data) && state.data === null)
      loadProducts()
    
    if(productLines && productLines.length <= 0) {
      loadProductLines()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state])

  return (
    <Content title={'Produtos'}>
      { loading ?
          <CircularProgress disableShrink />
        :
          <List
            title={'Produtos Cadastrados'}
            columns={state.columns} 
            rows={state.data}
            actions={state.actions}
          />
      }
    </Content>
  )
}