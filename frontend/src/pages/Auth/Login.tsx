import { useState } from "react";
import logo from "@/assets/Logo.svg"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {

    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6" >
            <img src={logo} className="w-32 h-11" />
            <Card className="w-full max-w-md rounded-xl" >
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-2xl font-bold">
                        Fazer login
                    </CardTitle>
                    <CardDescription>
                        Entre na sua conta para continuar
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="email">E-mail</Label>
                            <Input 
                                id="email"
                                type="email"
                                placeholder="mail@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Senha</Label>
                            <Input 
                                id="password"
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <div className="flex hover:opacity-70">
                                <Checkbox 
                                    id="remember-user"
                                    name="remember-user"
                                />
                                <Label className="ml-2 hover:cursor-pointer" htmlFor="remember-user">Lembrar-me</Label>
                            </div>

                            <span className="text-primary hover:opacity-70 hover:cursor-pointer">Recuperar senha</span>
                        </div>
                    </form>
                    <Button type="submit" className="w-full mt-5">
                        Entrar
                    </Button>

                    <div className="flex items-center justify-center gap-2 mt-4 mb-2">
                        <span className="block w-1/2 h-px bg-primary"/>
                        <span>ou</span>
                        <span className="block w-1/2 h-px bg-primary"/>
                    </div>

                    <span className="w-100 flex justify-center mb-2">Já tem uma conta?</span>

                    <Button className="bg-background border border-[hsl(var(--gray-300))] text-[hsl(var(--gray-700))] hover:opacity-60">Fazer login</Button>
                </CardContent>
            </Card>
        </div>
    )
}