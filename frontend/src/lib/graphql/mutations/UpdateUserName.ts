import { gql } from "@apollo/client";

export const UPDATE_USERNAME = gql`
    mutation UpdateUserName($id: String!,  $data: UpdateUserNameInput!) {
        updateUserName(id: $id, data: $data) {
            id,
            name,
        }
    }
`