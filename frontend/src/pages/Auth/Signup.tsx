import { useState } from "react";
import logo from "@/assets/Logo.svg"
import { Lock, Mail, EyeClosed, Eye, LogIn, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

export function SignUp(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordIsHidden, setPasswordIsHidden] = useState(true)
    const [loading, setLoading] = useState(false)

    const signup = useAuthStore((state) => state.signup)

    const handleSubmit = async (e: React.SubmitEvent) => {
        // não esquecer de cuidar da validação de 8 caracteres na senha
        
        e.preventDefault()
        setLoading(true)

        try {
            const signupMutate = await signup({
                name,
                email,
                password
            })
            if(signupMutate){
                toast.success("Cadastro realizado com sucesso!")
                setName('')
                setEmail('')
                setPassword('')
            }
        } catch (error) {
            toast.error("Erro ao realizar o cadastro!")
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
                        Criar conta
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Comece a controlar suas finanças ainda hoje
                    </CardDescription>
                </CardHeader>
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
                        <span className="text-xs text-gray-500">A senha deve ter no mínimo 8 caracteres</span>
                        <Button type="submit" className="w-full mt-5 py-5" disabled={loading}>
                            Cadastrar
                        </Button>
                    </form>

                    <div className="flex items-center justify-center gap-2 mt-4">
                        <span className="block w-1/2 h-px bg-gray-300"/>
                        <span className="text-xs text-gray-500">ou</span>
                        <span className="block w-1/2 h-px bg-gray-300"/>
                    </div>

                    <span className="w-100 flex justify-center mt-5 mb-4 text-xs text-gray-600">Já tem uma conta?</span>

                    <Button className="bg-background border border-gray-300 text-gray-700 py-5 hover:opacity-60">
                        <Link to="/login" className="w-full flex justify-center">
                            <LogIn className="mr-2" />
                            Fazer Login
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}