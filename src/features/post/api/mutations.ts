import { QueryClient } from "@tanstack/react-query"
import { deletePost, updatePost } from "../../../entities/post/api/api"
import { DeletePostResponse, UpdatePostBody, UpdatePostResponse } from "../../../entities/post/model/types"
import { PostWithAuthor, PostWithAuthorResponse } from "../model/types"
import { postWithAuthorQueries } from "./queries"

export const postMutations = {
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
    onSuccess: (_: DeletePostResponse, id: number) => {
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
