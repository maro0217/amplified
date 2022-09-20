/* Amplify Params - DO NOT EDIT
	API_AMPLIFIED_GRAPHQLAPIIDOUTPUT
	API_AMPLIFIED_TODOTABLE_ARN
	API_AMPLIFIED_TODOTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, PutCommandOutput } from "@aws-sdk/lib-dynamodb";
import { AppSyncResolverEvent } from "aws-lambda";

type Todo = {
  todo: {
    id: string,
    name: string,
    description: string
  }
}

// const marshallOptions = {
//   convertClassInstanceToMap: true
// }

const dbClient = new DynamoDBClient({
  region: process.env.REGION
})

const docClient = DynamoDBDocumentClient.from(dbClient)

export const handler = async (event: AppSyncResolverEvent<Todo>) => {
  try {
    const command = new PutCommand({
      TableName: 'Todo-g2brcplterb45clsd2ohm52rzu-dev',
      Item: {
        id: event.id,
        name: event.arguments.todo.name,
        description: event.arguments.todo.description,
        createdAt: event.created
      }
    })

    const client: PutCommandOutput = await docClient.send(command)
    return {
      statuscode: client.$metadata.httpStatusCode
    }
  } catch (err) {
    console.log(err)
  }
}