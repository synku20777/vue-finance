const transactionTypeDef = `#graphql

type Transaction {
    id: ID!
    userId: ID!
    amount: Float!
    paymentType: String!
    category: String!
    description: String!
    date: String!
}

type Query {
    transactions: [Transaction!]
    transaction(transactionId: ID!): Transaction
    categoryStatistics: [CategoryStatistics!]
}

type Mutation {
    createTransaction(input: createTransactionInput!): Transaction
    updateTransaction(input: updateTransaction): Transaction
    deleteTransaction(transactionId: ID!): Transaction
}

type CategoryStatistics {
    category: String!
    totalAmount: Float!
  }

input createTransactionInput {
    description: String!
    category: String!
    amount: Float!
    paymentType: String!
    date: String!
}

input updateTransaction {
    transactionId: ID!
    description: String
    category: String
    amount: Float
    paymentType: String!
    date: String
}
`

export default transactionTypeDef
