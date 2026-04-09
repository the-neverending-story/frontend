import { gql } from "apollo-angular"

interface CreateCreationResponse {
  createCreation: {
    id: string
  }
}

interface GetCreationsResponse {
  getCreations: Creation[]
}

interface Creation {
  author_username: string,
  category: string,
  created_at: string,
  id: string,
  name: string,
  rating: number
}

const CREATE_CREATION = gql`
  mutation CreateCreation($name: String!, $category: String!, $content: String!) {
    createCreation(name: $name, category: $category, content: $content) {
        id
    }
  }
`

const GET_CREATIONS = gql`
  query GetCreations($page: Int!) {
    getCreations(page: $page) {
        name
        id
        created_at
        rating
        author_username
        category
    }
  }
`

export type { CreateCreationResponse, GetCreationsResponse, Creation }
export { CREATE_CREATION, GET_CREATIONS }