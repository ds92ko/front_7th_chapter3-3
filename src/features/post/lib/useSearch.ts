import { ChangeEvent, KeyboardEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { buildQueryString } from "../../../shared/lib/params"

export const useSearch = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [search, setSearch] = useState(queryParams.get("search") || "")

  const handleSearch = {
    change: (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    keydown: (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return
      const params = buildQueryString(queryParams, { search })
      navigate(`?${params}`)
    },
  }

  return {
    search,
    handleSearch,
  }
}
