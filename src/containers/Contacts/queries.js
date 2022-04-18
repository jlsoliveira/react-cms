import { gql } from '@apollo/client'

const GET_DATA = gql`
  query {
    contacts(params: { term: "" }) {
      id
      fullname
      email
      cellphone
      city
      state
      message
      createdAt
    }
  }
`;

const queries = {
  GET_DATA
}

export default queries