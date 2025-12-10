interface UserBase {
  id: number
  image: string
  username: string
}

interface User extends UserBase {
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
    title: string
  }
}

export type UsersResponse = UserBase[]

export type UserResponse = User
