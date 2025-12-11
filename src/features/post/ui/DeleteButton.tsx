import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { postMutations } from "../api/mutations"

interface DeleteButtonProps {
  id: number
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const queryClient = useQueryClient()
  const { mutate: deletePostMutation } = useMutation(postMutations.delete(queryClient))

  return (
    <Button variant="ghost" size="sm" onClick={() => deletePostMutation(id)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

export default DeleteButton
