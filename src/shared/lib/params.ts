type Params = Record<string, string | number | undefined>

export const buildQueryString = (existingSearch: URLSearchParams, params?: Params): string => {
  const search = new URLSearchParams(existingSearch)

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v) search.set(k, String(v))
      else search.delete(k)
    })
  }

  return search.toString()
}
