const userTypeDef = `#graphql
type User {
    _id: ID!
    username: String!
    email: String!
    name: String!
    password: String!
    transactions: [Transaction!]
    }

    type Query {
    # users: [User!]
    authUser: User
    user(userId: ID!): User
    }

    type Mutation {
    register(input: RegisterInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
    }

    input RegisterInput {
        name: String!
        email: String!
        username: String!
        password: String!
    }

    input LoginInput {
    username: String!
    password: String!
    }

    type LogoutResponse {
    message: String!
    }
    `

export default userTypeDef
