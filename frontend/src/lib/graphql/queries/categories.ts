import { gql } from "@apollo/client"

export const LIST_CATEGORIES = gql`
    query ListCategoriesFromOwner{
        listCategoriesFromOwner {
            id,
            title,
            description,
            icon, 
            color,
            totalOfTransactions,
            balance,
            owner {
                name,
                email
            }
        }                         
    }   
`

export const COUNT_CATEGORIES = gql`
    query CountCategoriesFromOwner {
        countCategoriesFromOwner
    }
`

export const GET_CATEGORIES_WITH_THE_MOST_TRANSACTIONS = gql`
    query GetCategoryWithTheMostTransactions {
        getCategoryWithTheMostTransactions {
            id, 
            title,
            icon, 
            color,
            description,
            totalOfTransactions
        }
    }
`