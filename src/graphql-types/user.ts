import { gql } from "apollo-angular";
import { Creation } from "./creation";

interface User {
    id: string,
    username: string,
    created_at: string,
    role: string
}

interface GetProfileResponse {
    getUser: User,
    getCreations: Creation[]
}

const GET_PROFILE = gql`
    query GetUser($username: String!) {
        getUser(username: $username) {
            id
            username
            created_at
            role
        }

        getCreations(author: $username, page: 1) {
            name
            rating
            is_canon
        }
    }
`

export type { GetProfileResponse }
export { GET_PROFILE }