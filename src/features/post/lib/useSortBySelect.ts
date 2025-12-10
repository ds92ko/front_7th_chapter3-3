import { useLocation, useNavigate } from "react-router-dom"
import { buildQueryString } from "../../../shared/lib/params"

export const useSortBySelect = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const selectedSortBy = queryParams.get("sortBy") || ""

  const handleChangeSortBy = (sortBy: string) => {
    const params = buildQueryString(queryParams, { sortBy })
    navigate(`?${params}`)
  }

  return {
    selectedSortBy,
    handleChangeSortBy,
  }
}
