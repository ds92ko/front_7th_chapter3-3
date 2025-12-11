import { QueryClient } from "@tanstack/react-query"
import { addPost, deletePost, updatePost } from "../../../entities/post/api/api"
import {
  AddPostBody,
  AddPostResponse,
  DeletePostResponse,
  UpdatePostBody,
  UpdatePostResponse,
} from "../../../entities/post/model/types"
import { userQueries } from "../../../entities/user/api/queries"
import { PostWithAuthor, PostWithAuthorResponse } from "../model/types"
import { postWithAuthorQueries } from "./queries"

export const postMutations = {
  add: (queryClient: QueryClient) => ({
    mutationFn: (body: AddPostBody) => addPost(body),
    onSuccess: async (data: AddPostResponse) => {
      const listQueryKey = postWithAuthorQueries.all
      const listData = queryClient.getQueryData<PostWithAuthorResponse>(listQueryKey)
      const user = await queryClient.ensureQueryData(userQueries.detail(data.userId))

      if (listData) {
        queryClient.setQueryData<PostWithAuthorResponse>(listQueryKey, {
          ...listData,
          data: [
            {
              ...data,
              id: Math.max(...listData.data.map(({ id }) => id), listData.total) + 1,
              tags: [],
              reactions: { likes: 0, dislikes: 0 },
              views: 0,
              author: {
                id: user?.id || data.userId,
                image: user?.image || "",
                username: user?.username || "",
              },
            },
            ...listData.data,
          ],
          total: listData.total + 1,
        })
      }
    },
  }),
  update: (queryClient: QueryClient) => ({
    mutationFn: ({ id, body }: { id: number; body: UpdatePostBody }) => updatePost(id, body),
    onSuccess: (data: UpdatePostResponse) => {
      const listQueryKey = postWithAuthorQueries.all
      const listData = queryClient.getQueryData<PostWithAuthorResponse>(listQueryKey)
      if (listData) {
        queryClient.setQueryData<PostWithAuthorResponse>(listQueryKey, {
          ...listData,
          data: listData.data.map((post) => (post.id === data.id ? { ...post, ...data } : post)),
        })
      }

      const detailQueryKey = [...postWithAuthorQueries.all, data.id]
      const detailData = queryClient.getQueryData<PostWithAuthor>(detailQueryKey)
      if (detailData) {
        queryClient.setQueryData<PostWithAuthor>(detailQueryKey, {
          ...detailData,
          ...data,
        })
      }
    },
  }),
  delete: (queryClient: QueryClient) => ({
    mutationFn: (id: number) => deletePost(id),
    onSettled: (_: DeletePostResponse | undefined, _error: Error | null, id: number) => {
      const listQueryKey = postWithAuthorQueries.all
      const listData = queryClient.getQueryData<PostWithAuthorResponse>(listQueryKey)
      if (listData) {
        queryClient.setQueryData<PostWithAuthorResponse>(listQueryKey, {
          ...listData,
          data: listData.data.filter((post) => post.id !== id),
          total: listData.total - 1,
        })
      }
    },
  }),
}
