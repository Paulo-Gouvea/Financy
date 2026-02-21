import { gql } from "@apollo/client"

export const CREATE_CATEGORY = gql`
    mutation CreateCategory($data: CreateCategoryInput!){
        createCategory(data: $data) {
            id
            title
            description
            color
            owner {
                id
                name
                email
            }
        }
    }
`

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($deleteCategoryId: String!) {
        deleteCategory(id: $deleteCategoryId)
    }
`