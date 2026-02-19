import { prismaClient } from "../../prisma/prisma";
import { CreateUserInput, UpdateUserNameInput } from "../dtos/input/user.input";

export class UserService {
    async createUser(data: CreateUserInput) {
        const findUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })
        
        if(!findUser) throw new Error('Usuário já cadastrado no sistema!')
        
        return prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email
            }
        })
    }

    async findUser(id: string){
        const user = await prismaClient.user.findUnique({
            where: {
                id,
            },
        })

        if (!user) throw new Error('Usuário não existe no sistema!')

        return user
    }

    async findAllUsers(){
        const allUsers = await prismaClient.user.findMany()

        //console.log(allUsers)

        if (!allUsers) throw new Error('Nenhum usuário encontrado no sistema!')

        return allUsers
    }

    async updateUserName(id: string, data: UpdateUserNameInput){
        const user = await prismaClient.user.findUnique({
            where: {
                id
            },
        })

        if(!user) throw new Error("Usuário não encontrado no sistema!")

        return prismaClient.user.update({
            where: { id },
            data: {
                name: data.name
            }
        })
    }
}