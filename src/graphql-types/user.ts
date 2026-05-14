import { gql } from "apollo-angular";
import { Creation } from "./creation";

interface User {
    id: string,
    username: string,
    created_at: string,
    role: string,
    bio: string
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
            bio
        }

        getCreations(author: $username, page: 1) {
            name
            rating
            is_canon
            id
            created_at
        }
    }
`

const UPDATE_USER = gql`
    mutation UpdateUser($bio: String) {
        updateUser(bio: $bio)
    }
`

export type { GetProfileResponse }
export { GET_PROFILE, UPDATE_USER }