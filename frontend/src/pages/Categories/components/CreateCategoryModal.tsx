import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getColoredButton } from "@/lib/ColoredButton"
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/category"
import { COUNT_CATEGORIES, LIST_CATEGORIES } from "@/lib/graphql/queries/categories"
import { getIcons } from "@/lib/icons"
import { useMutation } from "@apollo/client/react"
import { toast } from "sonner"

interface ModalProps {
  open: boolean
  title: string
  description: string
  categoryTitle: string
  setCategoryTitle: (value: string) => void
  categoryDescription: string
  setCategoryDescription: (value: string) => void
  setOpen: (open: boolean) => void
  selectedIcon: string
  setSelectedIcon: (icon: string) => void
  selectedColor: string
  setSelectedColor: (icon: string) => void
}

export function CreateCategoryModal({
  open,
  setOpen,
  title,
  description,
  categoryTitle,
  categoryDescription,
  selectedIcon,
  setSelectedIcon,
  selectedColor,
  setSelectedColor,
  setCategoryTitle,
  setCategoryDescription,
}: ModalProps) {
  const icons = getIcons(selectedIcon, setSelectedIcon)
  const coloredButtons = getColoredButton(selectedColor, setSelectedColor)

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    onCompleted(){
      toast.success("Categoria criada com sucesso")
      setOpen(false) 
    },
    onError(error) {
      toast.error(error.message)
    },
    refetchQueries: [
      { query: LIST_CATEGORIES },
      { query: COUNT_CATEGORIES }
    ],
    awaitRefetchQueries: true
  })

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault() 

    createCategory({
      variables: {
        data: {
          title: categoryTitle,
          description: categoryDescription,
          icon: selectedIcon,
          color: selectedColor
        }
      }
    })

    title = ''
    description = ''
    selectedIcon = ''
    selectedColor = ''
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-4">
            <Field>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                type="text"
                placeholder="Ex. Alimentação"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                className="pl-3 py-6 placeholder:text-gray-400"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                type="text"
                placeholder="Descrição da categoria"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                className="pl-3 py-6 placeholder:text-gray-400"
                required
              />
            </Field>
          </FieldGroup>

          <div className="mt-4">
            <h3 className="text-sm mb-1">Ícone</h3>
            <div className="grid grid-cols-8 gap-2">
              {icons.map((icon) => icon)}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm mb-1">Cor</h3>
            <div className="grid grid-cols-7 gap-4">
              {coloredButtons.map((color) => color)}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="submit" className="w-full" disabled={loading}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}