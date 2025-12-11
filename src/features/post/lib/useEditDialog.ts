import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UpdatePostBody } from "../../../entities/post/model/types"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"
import { postMutations } from "../api/mutations"
import { postWithAuthorQueries } from "../api/queries"

export const useEditDialog = () => {
  const queryClient = useQueryClient()
  const { type, id } = useDialogContext()
  const { resetDialog } = useDialogActions()
  const { data: post } = useQuery(postWithAuthorQueries.detail(queryClient, id))
  const { mutate: updatePostMutation } = useMutation(postMutations.update(queryClient))

  const handleUpdate = (editForm: UpdatePostBody) => {
    if (!id) return
    updatePostMutation({ id, body: editForm })
    resetDialog()
  }

  return {
    isOpen: type === "edit" && !!post,
    post,
    resetDialog,
    handleUpdate,
  }
}
