const transactionTypeDef = `#graphql

type Transaction {
    id: ID!
    userid: ID!
    amount: Float!
    type: String!
    category: String!
    description: String!
    date: String!
    createdAt: String!
    updatedAt: String!
}

type Query {
    transactions: [Transaction!]
    transaction(transactionId: ID!): Transaction
    # category
}

type Mutation {
    createTransaction(input: createTransactionInput!): Transaction
    updateTransaction(input: updateTransaction): Transaction
    deleteTransaction(transactionId: ID!): Transaction
}

    

input createTransactionInput {
    description: String!
    category: String!
    amount: Float!  
    type: String!   
    date: String!
}

input updateTransaction {
    transactionId: ID!
    description: String
    category: String
    amount: Float
    type: String
    date: String
}
`

export default transactionTypeDef
