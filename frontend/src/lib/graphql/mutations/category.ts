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

export const UPDATE_CATEGORY = gql`
    mutation updateCategory($updateCategoryId: String!, $data: UpdateCategoryInput!) {
        updateCategory(id: $updateCategoryId, data: $data) {
            id,
            title,
            description,
            icon,
            color
            owner {
                name,
                email
            }
        }
    }
`