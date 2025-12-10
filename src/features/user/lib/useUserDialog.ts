import { useQuery } from "@tanstack/react-query"
import { userQueries } from "../../../entities/user/api/queries"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"

export const useUserDialog = () => {
  const { type, id } = useDialogContext()
  const { resetDialog } = useDialogActions()
  const { data: user } = useQuery(userQueries.detail(id))

  return {
    user,
    isOpen: type === "user" && !!user,
    resetDialog,
  }
}
