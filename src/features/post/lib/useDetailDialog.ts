import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import { useDialogActions, useDialogContext } from "../../../shared/model/useDialog"
import { postWithAuthorQueries } from "../api/queries"

export const useDetailDialog = () => {
  const queryClient = useQueryClient()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const { type, id } = useDialogContext()
  const { resetDialog } = useDialogActions()
  const { data: post } = useQuery(postWithAuthorQueries.detail(queryClient, id))

  const search = queryParams.get("search") || ""

  return {
    isOpen: type === "detail" && !!post,
    post,
    search,
    resetDialog,
  }
}
