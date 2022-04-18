import moment from 'moment'
import { React, useState, useEffect, Fragment } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useLazyQuery } from '@apollo/client'

import Content from '../../components/Content'
import List from '../../components/List'

import queries from './queries'
import mutations from './mutations'

export default function Contacts() {

  const [loadContacts, {loading}] = useLazyQuery(queries.GET_DATA, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setState({ columns: state.columns, data: data.contacts.map(x => Object.assign({}, x)), actions: state.actions });
    },
		onError: (error) => {
			console.log(error)
		}
  })

  const handleDelete = (result) => {
    if(result.success)
      loadContacts()
  }

  const [state, setState] = useState({
    columns: [
      { title: 'Data', field: 'createdAt', render: rowData => <Fragment> { moment(rowData.createdAt).format('DD/MM/YYYY') } </Fragment> },
      { title: 'Nome', field: 'fullname'},
      { title: 'Email', field: 'email'},
      { title: 'Telefone', field: 'cellphone'},
      { title: 'Cidade', field: 'city'},
      { title: 'Estado', field: 'state'},
      { title: 'Mensagem', field: 'message'},
      
      
    ],
    data: null,
    actions: [
      { 
        action: 'delete', 
        title: "Deletar Contato", 
        callback: handleDelete, 
        mutation: { definition: mutations.DELETE_DATA, name: 'removeContact' }
      }
    ] 
  })

  useEffect(() => {
		if(!Array.isArray(state.data) && state.data === null)
      loadContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state])

  return (
    <Content title={'Contatos'}>
      { loading ?
          <CircularProgress disableShrink />
        :
          <List
            title={'Contatos Cadastrados'}
            columns={state.columns} 
            rows={state.data}
            actions={state.actions}
          />
      }
    </Content>
  )
}