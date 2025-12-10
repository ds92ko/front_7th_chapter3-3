import { useLocation, useNavigate } from "react-router-dom"
import { buildQueryString } from "../../../shared/lib/params"

export const useLimitSelect = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const selectedLimit = queryParams.get("limit") || "10"

  const handleChangeLimit = (limit: string) => {
    const params = buildQueryString(queryParams, { limit })
    navigate(`?${params}`)
  }

  return {
    selectedLimit,
    handleChangeLimit,
  }
}
