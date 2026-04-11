import { gql } from "apollo-angular"

interface CreateCreationResponse {
  createCreation: {
    id: string
  }
}

interface GetCreationsResponse {
  getCreations: Creation[]
}

interface GetCreationResponse {
  getCreation: Creation,
  getRate: Rate
}

interface Creation {
  author_username: string,
  category: string,
  created_at: string,
  id: string,
  name: string,
  rating: number,
  content: string;
}

interface Rate {
  id: string,
  is_positive: string
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

const GET_CREATION = gql`
  query GetCreation($id: String!) {
    getCreation(id: $id) {
      name
      rating
      author_username
      content
      category
    }

    getRate(id: $id) {
      is_positive
    }
  }
`

export type { CreateCreationResponse, GetCreationsResponse, Creation, GetCreationResponse }
export { CREATE_CREATION, GET_CREATIONS, GET_CREATION }