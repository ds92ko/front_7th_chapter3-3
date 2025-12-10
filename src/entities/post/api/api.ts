import { apiClient } from "../../../shared/api/base"
import { PostsParams, PostsResponse } from "../model/types"

export const getPosts = async (params: PostsParams) => {
  const response = await apiClient.get<PostsResponse>("/api/posts", params)
  return response
}
