import moment from 'moment'
import { React, useState, useEffect, Fragment } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useLazyQuery } from '@apollo/client'
import { object, string } from "yup";

import Content from '../../components/Content'
import List from '../../components/List'

import queries from './queries'
import mutations from './mutations'

export default function Users() {
  const initialState = {
    username: "",
    password: ""
  }

  const schema = object().shape({
    username: string().required("O username do usuário é obrigatório!"),
    password: string().required("O password do usuário é obrigatórios!")
	})
	
	const inputs = [
    {
      type: "text",
      name: "username",
      label: "Username",
      props: {
        placeholder: "Username do usuário",
        style: ""
      }
    },
    {
      type: "text",
      name: "password",
      label: "Senha",
      props: {
        placeholder: "Senha do usuário",
      }
    }
  ]
  
  const [loadUsers, {loading}] = useLazyQuery(queries.GET_DATA, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setState({ columns: state.columns, data: data.users.map(x => Object.assign({}, x)), actions: state.actions });
    },
		onError: (error) => {
			console.log(error)
		}
  })

  const handleAdd = (result) => {
    if(result.success)
      loadUsers()
  }

  const handleDelete = (result) => {
    if(result.success)
      loadUsers()
  }

  const [state, setState] = useState({
    columns: [
      { title: 'Id', field: 'id'},
      { title: 'Username', field: 'username'},
      { title: 'Criado Em', field: 'createdAt', render: rowData => <Fragment> { moment(rowData.createdAt).format('DD/MM/YYYY') } </Fragment> },

    ],
    data: null,
    actions: [
      { 
        action: 'add', 
        title: "Cadastrar Usuário", 
        callback: handleAdd, 
        mutation: { definition: mutations.ADD_DATA, name: 'addUser' }, 
        inputs, 
        schema, 
        initialState 
      },
      { 
        action: 'delete', 
        title: "Deletar Usuário", 
        callback: handleDelete, 
        mutation: { definition: mutations.DELETE_DATA, name: 'removeUser' }
      }
    ] 
  })

  useEffect(() => {
		if(!Array.isArray(state.data) && state.data === null)
      loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state])

  return (
    <Content title={'Usuários'}>
      { loading ?
          <CircularProgress disableShrink />
        :
          <List
            title={'Usuários Cadastrados'}
            columns={state.columns} 
            rows={state.data}
            actions={state.actions}
          />
      }
    </Content>
  )
}