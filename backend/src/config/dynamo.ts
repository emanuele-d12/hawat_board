import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

import { env } from './env.js'

const dynamoClient = new DynamoDBClient({
    region: env.awsRegion,
})

export const dynamo = DynamoDBDocumentClient.from(
    dynamoClient
)