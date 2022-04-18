import { gql } from '@apollo/client'

const GET_DATA = gql`
  query {
    productLines(params: { term: "" }) {
      id
      media_id
      title
      description
      friendlyUrl
      available
      createdAt
      updatedAt
      media {
        filename
        filename_original
      }
      createdBy {
        username
      }
      updatedBy {
        username
      }
    }
  }
`;

const queries = {
  GET_DATA
}

export default queries