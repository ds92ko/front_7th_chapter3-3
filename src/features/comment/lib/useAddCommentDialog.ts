import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentRequestBody } from "../../../entities/comment/model/types"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"
import { commentMutations } from "../api/mutations"

export const useAddCommentDialog = () => {
  const queryClient = useQueryClient()
  const { type, id } = useDialogContext()
  const { resetDialog } = useDialogActions()
  const { mutate: addCommentMutation } = useMutation(commentMutations.add(queryClient))

  const handleAdd = (body: CommentRequestBody) => {
    addCommentMutation(body)
    resetDialog()
  }

  return {
    isOpen: type === "add-comment" && !!id,
    id,
    resetDialog,
    handleAdd,
  }
}
