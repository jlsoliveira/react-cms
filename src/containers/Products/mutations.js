import { gql } from '@apollo/client'

const ADD_DATA = gql`
  mutation AddProduct(
    $productLine_id: Int!
    $media_id: Int!
    $title: String!
    $unitWeight: String!
    $description: String!
    $preparation: String!
    $ingredient: String!
    $nutritional: String!
    $available: Boolean = true
  ) {
    addProduct(
      data: {
        productLine_id: $productLine_id
        media_id: $media_id
        title: $title
        unitWeight: $unitWeight
        description: $description
        preparation: $preparation
        ingredient: $ingredient
        nutritional: $nutritional
        available: $available
      }
    ) {
      id
    }
  }
`;

const UPDATE_DATA = gql`
  mutation UpdateProduct(
    $id: Int!
    $productLine_id: Int!
    $media_id: Int!
    $title: String!
    $unitWeight: String!
    $description: String!
    $preparation: String!
    $ingredient: String!
    $nutritional: String!
    $available: Boolean = true
  ) {
    updateProduct(
      data: {
        id: $id
        productLine_id: $productLine_id
        media_id: $media_id
        title: $title
        unitWeight: $unitWeight
        description: $description
        preparation: $preparation
        ingredient: $ingredient
        nutritional: $nutritional
        available: $available
      }
    ) {
      id
    }
  }
`;

const DELETE_DATA = gql`
  mutation RemoveProduct($id: Int!) {
    removeProduct(id: $id) {
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