export interface RegisterInput {
    name: string,
    email: string,
    password: string
}

export interface LoginInput {
    email: string,
    password: string
}

export interface User {
    id: string,
    name: string,
    email: string,
    createdAt?: string,
    updatedAt?: string
}

export interface Transaction {
    id: string,
    type: string,
    description?: string,
    selectedDate: Date,
    value: number;
    ownerId: string,
    owner?: User
    categoryId: string,
    category?: Category,
}

export interface Category {
    id: string,
    title: string,
    description: string,
    icon: string,
    color: string,
    totalOfTransactions: number,
    balance: number,
    transactions: Transaction[],
    ownerId: string,
    owner?: User
}
