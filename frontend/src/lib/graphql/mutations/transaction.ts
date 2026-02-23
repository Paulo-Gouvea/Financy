import { gql } from "@apollo/client"

export const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($data: CreateTransactionInput!){
        createTransaction(data: $data) {
            id
            description
            type
            selectedDate
            value
            category {
                id
                title
                description
            }
            owner {
                id
                name
                email
            }
        }
    }
`

export const DELETE_TRANSACTION = gql`
    mutation DeleteTransaction($deleteTransactionId: String!) {
        deleteTransaction(id: $deleteTransactionId)
    }
`