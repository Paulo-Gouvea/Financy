import { useState } from "react";
import logo from "@/assets/Logo.svg"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            </Card>
        </div>
    )
}