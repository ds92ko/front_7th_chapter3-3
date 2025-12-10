import { useLocation, useNavigate } from "react-router-dom"
import { buildQueryString } from "../../../shared/lib/params"

export const useOrderSelect = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const selectedOrder = queryParams.get("order") || "asc"

  const handleChangeOrder = (order: string) => {
    const params = buildQueryString(queryParams, { order })
    navigate(`?${params}`)
  }

  return {
    selectedOrder,
    handleChangeOrder,
  }
}
