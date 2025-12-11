import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentQueries } from "../../../entities/comment/api/queries"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"
import { commentMutations } from "../api/mutations"

export const useEditCommentDialog = () => {
  const queryClient = useQueryClient()
  const { type, id } = useDialogContext()
  const { resetDialog } = useDialogActions()

  const postId = type?.split("-")[2]
  const listQueryKey = commentQueries.list(Number(postId)).queryKey
  const listData = queryClient.getQueryData(listQueryKey)
  const comment = listData?.comments.find((comment) => comment.id === id)

  const isOpen = type?.startsWith("edit-comment-")

  const { mutate: updateCommentMutation } = useMutation(commentMutations.update(queryClient))

  const handleUpdate = (body: string) => {
    if (!comment) return
    updateCommentMutation({ ...comment, body })
    resetDialog()
  }

  return {
    isOpen,
    comment,
    resetDialog,
    handleUpdate,
  }
}
