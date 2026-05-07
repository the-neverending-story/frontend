import { gql } from "apollo-angular";

interface RateResponse {
    rate: {
        id: string
    }
}

const RATE = gql`
    mutation AddRating($creationId: String!, $isPositive: Boolean!) {
        addRating(creationId: $creationId, isPositive: $isPositive) {
            id
        }
    }
`

export type { RateResponse }
export { RATE }