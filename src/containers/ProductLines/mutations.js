import { gql } from '@apollo/client'

const ADD_DATA = gql`
  mutation AddProductLine(
    $media_id: Int!
    $title: String!
    $description: String!
    $available: Boolean = true
  ) {
    addProductLine(
      data: {
        media_id: $media_id
        title: $title
        description: $description
        available: $available
      }
    ) {
      id
    }
  }
`;

const UPDATE_DATA = gql`
  mutation UpdateProductLine(
    $id: Int!
    $media_id: Int!
    $title: String!
    $description: String!
    $available: Boolean = true
  ) {
    updateProductLine(
      data: {
        id: $id
        media_id: $media_id
        title: $title
        description: $description
        available: $available
      }
    ) {
      id
    }
  }
`;

const DELETE_DATA = gql`
  mutation RemoveProductLine($id: Int!) {
    removeProductLine(id: $id) {
      id
    }
  }
`;

const mutations = {
    ADD_DATA,
    UPDATE_DATA,
    DELETE_DATA
}

export default mutations