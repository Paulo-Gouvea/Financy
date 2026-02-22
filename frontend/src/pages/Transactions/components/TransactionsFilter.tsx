import { Card } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Search } from "lucide-react";

export function TransactionsFilter() {
    return(
        <Card className="mt-6">
            <FieldGroup className="px-6 pt-6 pb-8 flex flex-row items-center justify-center">
                <Field>
                    <Label htmlFor="description">Buscar</Label>
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground text-gray-400"/>
                        <Input 
                            id="description"
                            type="text"
                            placeholder="Buscar por descrição"
                            //value={email}
                            //onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 py-6 placeholder:text-gray-400"
                            required
                        />
                    </div>
                </Field>

                <Field>
                    <Label htmlFor="title">Tipo</Label>
                    <Select>
                        <SelectTrigger className="w-[220px] px-4 py-6">
                            <SelectValue className="py-8" placeholder="Todas" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="todas">Todas</SelectItem>
                            <SelectItem value="receitas">Receitas</SelectItem>
                            <SelectItem value="despesas">Despesas</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <Label htmlFor="title">Categoria</Label>
                    <Select>
                        <SelectTrigger className="w-[220px] px-4 py-6">
                            <SelectValue className="py-8" placeholder="Todas" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="todas">Todas</SelectItem>
                            <SelectItem value="receitas">Receitas</SelectItem>
                            <SelectItem value="despesas">Despesas</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <Label htmlFor="title">Período</Label>
                    <Select>
                        <SelectTrigger className="w-[220px] px-4 py-6">
                            <SelectValue className="py-8" placeholder="Todas" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="todas">Todas</SelectItem>
                            <SelectItem value="receitas">Receitas</SelectItem>
                            <SelectItem value="despesas">Despesas</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
          </FieldGroup>
        </Card>
    )
}