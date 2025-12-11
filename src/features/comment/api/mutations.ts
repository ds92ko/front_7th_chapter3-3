import { QueryClient } from "@tanstack/react-query"
import { deleteComment, patchComment, postComment, putComment } from "../../../entities/comment/api/api"
import { commentQueries } from "../../../entities/comment/api/queries"
import { Comment, CommentRequestBody, CommentResponse } from "../../../entities/comment/model/types"

export const commentMutations = {
  add: (queryClient: QueryClient) => ({
    mutationFn: (body: CommentRequestBody) => postComment(body),
    onSuccess: async (data: CommentResponse) => {
      const listQueryKey = commentQueries.list(data.postId).queryKey
      const listData = queryClient.getQueryData(listQueryKey)
      if (listData) {
        queryClient.setQueryData(listQueryKey, {
          ...listData,
          comments: [
            ...listData.comments,
            {
              ...data,
              likes: 0,
            },
          ],
          total: listData.total + 1,
        })
      }
    },
  }),
  update: (queryClient: QueryClient) => ({
    mutationFn: (comment: Comment) => putComment(comment),
    onSettled: async (_: Comment | undefined, _error: Error | null, data: Comment) => {
      const listQueryKey = commentQueries.list(data.postId).queryKey
      const listData = queryClient.getQueryData(listQueryKey)
      if (listData) {
        queryClient.setQueryData(listQueryKey, {
          ...listData,
          comments: listData.comments.map((comment) =>
            comment.id === data.id ? { ...data, likes: comment.likes } : comment,
          ),
        })
      }
    },
  }),
  delete: (queryClient: QueryClient) => ({
    mutationFn: ({ id }: { id: number; postId: number }) => deleteComment(id),
    onSettled: async (_: Comment | undefined, _error: Error | null, { id, postId }: { id: number; postId: number }) => {
      const listQueryKey = commentQueries.list(postId).queryKey
      const listData = queryClient.getQueryData(listQueryKey)
      if (listData) {
        queryClient.setQueryData(listQueryKey, {
          ...listData,
          comments: listData.comments.filter((comment) => comment.id !== id),
          total: listData.total - 1,
        })
      }
    },
  }),
  like: (queryClient: QueryClient) => ({
    mutationFn: (comment: Comment) => patchComment(comment),
    onSettled: async (_: Comment | undefined, _error: Error | null, data: Comment) => {
      const listQueryKey = commentQueries.list(data.postId).queryKey
      const listData = queryClient.getQueryData(listQueryKey)
      if (listData) {
        queryClient.setQueryData(listQueryKey, {
          ...listData,
          comments: listData.comments.map((comment) =>
            comment.id === data.id ? { ...comment, likes: comment.likes + 1 } : comment,
          ),
        })
      }
    },
  }),
}
