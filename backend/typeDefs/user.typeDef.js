const userTypeDef = `#graphql
type User {
    id: ID!
    username: String!
    name: String!
    email: String!
    password: String!
    }

    type Query {
    # users: [User!]
    authUser: User
    user(id: ID!): User
    }

    type Mutation {
    register(input: RegisterInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
    }

    input RegisterInput {
    username: String!
    name: String!
    email: String!
    password: String!
    }

    input LoginInput {
    email: String!
    password: String!
    }

    type LogoutResponse {
    message: String!
    }
    `

export default userTypeDef
