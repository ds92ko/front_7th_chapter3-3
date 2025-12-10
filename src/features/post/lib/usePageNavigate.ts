import { useLocation, useNavigate } from "react-router-dom"
import { buildQueryString } from "../../../shared/lib/params"

export const usePageNavigate = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const skip = parseInt(queryParams.get("skip") || "0")
  const limit = parseInt(queryParams.get("limit") || "10")

  const handleNavigate = {
    prev: () => {
      const params = buildQueryString(queryParams, { skip: Math.max(0, skip - limit) })
      navigate(`?${params}`)
    },
    next: () => {
      const params = buildQueryString(queryParams, { skip: skip + limit })
      navigate(`?${params}`)
    },
  }

  return {
    skip,
    limit,
    handleNavigate,
  }
}
