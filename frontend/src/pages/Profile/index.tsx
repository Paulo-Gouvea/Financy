import { useState } from "react";
import { Mail, LogIn, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@apollo/client/react"
import type { User as UserType } from "../../types"
import { UPDATE_USERNAME } from "@/lib/graphql/mutations/UpdateUserName";
import { toast } from "sonner";

export function Profile(){
    const { user, logout, setUser } = useAuthStore()
    const navigate = useNavigate()

    const [name, setName] = useState(user?.name)
    const [loading, setLoading] = useState(false)

    type UpdateUserNameMutationData = { updateUserName: UserType }
    type UpdateUserNameVariables = {
        id: string,
        data: {
            name?: string
        }
    }

    const [updateUserMutation] = useMutation<
        UpdateUserNameMutationData,
        UpdateUserNameVariables
    >(UPDATE_USERNAME, {
        onCompleted: (res: UpdateUserNameMutationData) => {
            console.log('res ==> ' +JSON.stringify(res))
            const updatedUser = res.updateUserName
            setUser(updatedUser)
            setName(updatedUser.name)
        }
    })

    const handleSubmit = async (e: React.SubmitEvent) => {  
        e.preventDefault()
        setLoading(true)

        if(!user) return

        try {
            await updateUserMutation({
                variables: {
                    id: user.id,
                    data: {
                        name
                    }
                }
            })

            toast.success("Mudança de nome realizada com sucesso!")
        } catch (error) {
            toast.error("Erro ao atualizar o nome do usuário!")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    function createAvatar(){
        let namesList: string[] = []

        if(user !== undefined && user !== null){
            namesList = user.name.split(" ", user?.name.length)
        } 

        const firstName = namesList[0] 
        let lastName = ''
        let avatar = `${firstName.charAt(0)}`

        if(namesList.length > 1){
            lastName = namesList[namesList.length - 1]
            avatar = avatar + `${lastName.charAt(0)}`
        }

        return avatar
    }

    return (
            <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center gap-6" >
            <Card className="w-full max-w-md rounded-xl mt-8" >
                <CardHeader className="flex flex-col items-center">
                    <div className="bg-gray-300 w-20 h-20 mb-4 rounded-full flex items-center justify-center text-3xl">
                        {createAvatar()}
                    </div>
                    <CardTitle className="text-xl font-bold">
                        {
                            user?.name
                        }
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        {
                            user?.email
                        }
                    </CardDescription>
                </CardHeader>
                <div className="flex items-center justify-center gap-2 px-6 mt-4">
                    <span className="block w-full h-px mb-6 bg-gray-300"/>
                </div>
                <CardContent className="flex flex-col">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="name" className="text-gray-700">Nome completo</Label>
                            <div className="relative w-full">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground text-gray-400"/>
                                <Input 
                                    id="name"
                                    type="text"
                                    placeholder="Seu nome completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 py-6 placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email" className="text-gray-700">E-mail</Label>
                            <div className="relative w-full">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground text-black"/>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder="mail@exemplo.com"
                                    value={user?.email}
                                    className="pl-10 py-6 placeholder:text-gray-400"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <span className="text-xs text-gray-500">O e-mail não pode ser alterado</span>
                        <Button type="submit" className="w-full py-5" disabled={loading}>
                            Salvar alterações
                        </Button>
                    </form>

                    <Button onClick={handleLogout} className="bg-background border border-gray-300 text-gray-700 mt-4 py-5 hover:opacity-60">
                        <LogIn className="text-[hsl(var(--danger))]" />
                        Sair da conta
                    </Button>
                </CardContent>
            </Card>
            </div>
    )
}