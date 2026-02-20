import { useState } from "react";
import logo from "@/assets/Logo.svg"
import { UserRoundPlus, Lock, Mail, EyeClosed, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

export function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordIsHidden, setPasswordIsHidden] = useState(true)
    const [loading, setLoading] = useState(false)

    const login = useAuthStore((state) => state.login)

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const loginMutate = await login({
                email,
                password
            })
            if(loginMutate){
                toast.success("Login realizado com sucesso!")
            }
        } catch (error) {
            toast.error("Falha ao realizar o login!")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleHidePassword = () => {
        setPasswordIsHidden((state) => !state)
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6" >
            <img src={logo} className="w-32 h-11" />
            <Card className="w-full max-w-md rounded-xl" >
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-xl font-bold">
                        Fazer login
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Entre na sua conta para continuar
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="email" className="text-gray-700">E-mail</Label>
                            <div className="relative w-full">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground text-gray-400"/>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder="mail@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 py-6 placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password" className="text-gray-700">Senha</Label>
                            <div className="relative w-full">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground text-gray-400"/>
                                <Input 
                                    id="password"
                                    type={passwordIsHidden ? "password" : "text"}
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 py-6 placeholder:text-gray-400"
                                    required
                                />
                                {
                                    passwordIsHidden 
                                    ?
                                    <EyeClosed onClick={handleHidePassword} className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:cursor-pointer"/>
                                    : 
                                    <Eye onClick={handleHidePassword} className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:cursor-pointer"/>
                                }
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <div className="flex hover:opacity-70">
                                <Checkbox 
                                    id="remember-user"
                                    name="remember-user"
                                />
                                <Label className="ml-2 hover:cursor-pointer text-gray-500" htmlFor="remember-user">Lembrar-me</Label>
                            </div>

                            <span className="text-primary text-xs font-normal hover:opacity-70 hover:cursor-pointer">Recuperar senha</span>
                        </div>
                        <Button type="submit" className="w-full mt-5 py-5" disabled={loading}>
                            Entrar
                        </Button>
                    </form>

                    <div className="flex items-center justify-center gap-2 mt-4">
                        <span className="block w-1/2 h-px bg-gray-300"/>
                        <span className="text-xs text-gray-500">ou</span>
                        <span className="block w-1/2 h-px bg-gray-300"/>
                    </div>

                    <span className="w-100 flex justify-center mt-5 mb-4 text-xs text-gray-600">Ainda não tem uma conta?</span>

                    <Button className="bg-background border border-gray-300 text-gray-700 py-5 hover:opacity-60">
                        <Link to="/signup" className="w-full flex justify-center">
                            <UserRoundPlus className="mr-2"/>
                            Criar conta
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}