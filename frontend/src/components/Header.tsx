import { useAuthStore } from "@/stores/auth"
import logoIcon from "@/assets/Logo.svg"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"

export function Header() {
    const { user, isAuthenticated } = useAuthStore()
    const location = useLocation()
    const isDashboardPage = location.pathname === "/"
    const isTransactionsPage = location.pathname === "/transactions"
    const isCategoriesPage = location.pathname === "/categories"

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
        <div className="w-full px-16 py-6 bg-white">
            {
                isAuthenticated && (
                    <div className="flex justify-between w-full" >
                        <div className="flex items-center justify-center w-24">
                            <img className="w-full" src={logoIcon}/>
                        </div>
                    
                        <div>
                            <Link to="/">
                            <Button
                                size="sm"
                                className={isDashboardPage ? "gap-2 text-primary shadow-none bg-white hover:text-primary" : "gap-2 text-gray-600 bg-white hover:bg-white hover:text-primary"}
                                variant={isDashboardPage ? "default" : "ghost"}
                            >
                                Dashboard
                            </Button>
                            </Link>

                            <Link to="/transactions">
                            <Button
                                size="sm"
                                className={isTransactionsPage ? "gap-2 text-primary shadow-none bg-white hover:text-primary" : "gap-2 text-gray-600 bg-white hover:bg-white hover:text-primary"}
                                variant={isTransactionsPage ? "default" : "ghost"}
                            >
                                Transações
                            </Button>
                            </Link>

                            <Link to="/categories">
                            <Button
                                size="sm"
                                className={isCategoriesPage ? "gap-2 text-primary shadow-none bg-white hover:text-primary" : "gap-2 text-gray-600 bg-white hover:bg-white hover:text-primary"}
                                variant={isCategoriesPage ? "default" : "ghost"}
                            >
                                Categorias
                            </Button>
                            </Link>
                        </div>

                        <Link to="/profile" className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80">
                            {createAvatar()}
                        </Link>
                    </div>
                )
            }
        </div>
    )
}