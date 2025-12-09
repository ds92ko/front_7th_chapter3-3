export class ApiClient {
  private baseUrl: string

  constructor(url?: string) {
    this.baseUrl = url ?? ""
  }

  private buildUrl(endpoint: string, queryParams?: Record<string, string | number>): string {
    const url = new URL(endpoint, this.baseUrl)

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString())
      })
    }

    return url.toString()
  }

  private async handleResponse<TResult>(response: Response): Promise<TResult> {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return undefined as TResult
    }

    try {
      return await response.json()
    } catch (error) {
      throw new Error(`Error parsing JSON response: ${error}`)
    }
  }

  private async request<TResult = unknown>(
    endpoint: string,
    options: RequestInit,
    queryParams?: Record<string, string | number>,
  ): Promise<TResult> {
    const url = this.buildUrl(endpoint, queryParams)
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    return this.handleResponse<TResult>(response)
  }

  public async get<TResult = unknown>(
    endpoint: string,
    queryParams?: Record<string, string | number>,
  ): Promise<TResult> {
    return this.request<TResult>(endpoint, { method: "GET" }, queryParams)
  }

  public async post<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
  ): Promise<TResult> {
    return this.request<TResult>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  public async put<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
  ): Promise<TResult> {
    return this.request<TResult>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    })
  }

  public async patch<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
  ): Promise<TResult> {
    return this.request<TResult>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    })
  }

  public async delete<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body?: TData,
  ): Promise<TResult> {
    return this.request<TResult>(endpoint, {
      method: "DELETE",
      ...(body && { body: JSON.stringify(body) }),
    })
  }
}

export const apiClient = new ApiClient()
