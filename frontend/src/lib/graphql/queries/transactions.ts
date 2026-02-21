import { gql } from "@apollo/client"

export const COUNT_TRANSACTIONS = gql`
    query CountTransactionsFromOwner {
        countTransactionsFromOwner
    }
`