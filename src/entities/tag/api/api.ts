import { apiClient } from "../../../shared/api/base"
import { Tag } from "../model/types"

export const getTags = async () => {
  const response = await apiClient.get<Tag[]>("/api/posts/tags")
  return response
}
