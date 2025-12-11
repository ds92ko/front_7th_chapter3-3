import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import { commentQueries } from "../../../entities/comment/api/queries"

export const useCommentList = (postId: number) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const search = queryParams.get("search") || ""
  const { data: comments } = useQuery(commentQueries.list(postId))

  return {
    comments,
    search,
  }
}
