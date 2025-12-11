import { apiClient } from "../../../shared/api/base"
import {
  Comment,
  CommentRequestBody,
  CommentResponse,
  CommentsResponse,
  UpdateCommentRequestBody,
} from "../model/types"

export const getComments = async (id: number) => {
  const response = await apiClient.get<CommentsResponse>(`/api/comments/post/${id}`)
  return response
}

export const postComment = async (body: CommentRequestBody) => {
  const response = await apiClient.post<CommentResponse>("/api/comments", body)
  return response
}

export const putComment = async (id: number, body: UpdateCommentRequestBody) => {
  const response = await apiClient.put<Comment>(`/api/comments/${id}`, body)
  return response
}

export const patchComment = async (id: number, body: UpdateCommentRequestBody) => {
  const response = await apiClient.patch<Comment>(`/api/comments/${id}`, body)
  return response
}

export const deleteComment = async (id: number) => {
  const response = await apiClient.delete<Comment>(`/api/comments/${id}`)
  return response
}
