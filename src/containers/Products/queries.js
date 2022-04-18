import { gql } from '@apollo/client'

const GET_DATA = gql`
  query {
    products(params: { term: "" }) {
      id
      productLine_id
      media_id
      title
      unitWeight
      description
      preparation
      ingredient
      nutritional
      friendlyUrl
      available
      createdAt
      updatedAt
      productLine {
        id
        title
      }
      media {
        id
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