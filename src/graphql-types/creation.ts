import { gql } from "apollo-angular"

interface CreateCreationResponse {
  createCreation: {
    id: string
  }
}

const CREATE_CREATION = gql`
  mutation CreateCreation($name: String!, $category: String!, $content: String!) {
    createCreation(name: $name, category: $category, content: $content) {
        id
    }
  }
`

export type { CreateCreationResponse }
export { CREATE_CREATION }