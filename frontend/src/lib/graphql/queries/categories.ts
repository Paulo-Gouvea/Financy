import { gql } from "@apollo/client"

export const LIST_CATEGORIES = gql`
    query ListCategoriesFromOwner{
        listCategoriesFromOwner {
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