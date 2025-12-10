import { useLocation, useNavigate } from "react-router-dom"
import { buildQueryString } from "../../../shared/lib/params"

export const useTagSelect = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const selectedTag = queryParams.get("tag") || "all"

  const handleChangeTag = (tag: string) => {
    const params = buildQueryString(queryParams, { tag })
    navigate(`?${params}`)
  }

  return {
    selectedTag,
    handleChangeTag,
  }
}
