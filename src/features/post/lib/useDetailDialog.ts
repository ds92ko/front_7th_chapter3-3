import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"
import { postWithAuthorQueries } from "../api/queries"

export const useDetailDialog = () => {
  const queryClient = useQueryClient()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const { dialogs } = useDialogContext()
  const { resetDialog } = useDialogActions()
  const id = dialogs.find((dialog) => dialog.type === "detail")?.id ?? null
  const { data: post } = useQuery(postWithAuthorQueries.detail(queryClient, id))

  const search = queryParams.get("search") || ""

  return {
    isOpen: !!post,
    post,
    search,
    resetDialog,
  }
}
