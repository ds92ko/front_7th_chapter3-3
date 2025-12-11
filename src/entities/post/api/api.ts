import { apiClient } from "../../../shared/api/base"
import {
  AddPostBody,
  AddPostResponse,
  DeletePostResponse,
  PostsParams,
  PostsResponse,
  UpdatePostBody,
  UpdatePostResponse,
} from "../model/types"

export const getPosts = async (params: PostsParams) => {
  const response = await apiClient.get<PostsResponse>("/api/posts", params)
  return response
}

export const addPost = async (body: AddPostBody) => {
  const response = await apiClient.post<AddPostResponse>("/api/posts/add", body)
  return response
}

export const updatePost = async (id: number, body: UpdatePostBody) => {
  const response = await apiClient.put<UpdatePostResponse>(`/api/posts/${id}`, body)
  return response
}

export const deletePost = async (id: number) => {
  const response = await apiClient.delete<DeletePostResponse>(`/api/posts/${id}`)
  return response
}
