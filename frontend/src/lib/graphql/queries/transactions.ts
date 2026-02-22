import { gql } from "@apollo/client"

export const COUNT_TRANSACTIONS = gql`
    query CountTransactionsFromOwner {
        countTransactionsFromOwner
    }
`

export const LIST_TRANSACTIONS = gql`
query listAllTransactionsFromOwner {
    listTransactionsFromOwner {
        id
        description
        type
        value
        selectedDate
        category {
            id
            title
            description
            icon
            color
        }
        owner {
            id
            name
            email
        }
    }
}
`

export const FILTER_TRANSACTIONS = gql`
    query FilterTransaction($data: FilterTransactionInput) {
  filterTransactions(data: $data) {
    transactions {
      id,
      description,
      type,
      selectedDate,
      value,
      category {
        title,
        description,
        color,
        icon
      }
    },
    totalOfTransactions,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPreviousPage
  }
}
`