/* Amplify Params - DO NOT EDIT
	API_AMPLIFIED_GRAPHQLAPIIDOUTPUT
	API_AMPLIFIED_TODOTABLE_ARN
	API_AMPLIFIED_TODOTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, PutCommandInput, PutCommandOutput } from "@aws-sdk/lib-dynamodb";
import { AppSyncResolverEvent } from "aws-lambda";

type Todo = {
  todo: {
    id: string,
    name: string,
    description: string
  }
}

const docClient = new DynamoDBClient({
  region: process.env.REGION
})

const documentClient = DynamoDBDocumentClient.from(docClient)

export const handler = async (event: AppSyncResolverEvent<Todo>) => {
  console.log(event)
  console.log(event.arguments.todo)
  console.log(event.arguments)
  try {
    const command = new PutCommand({
      TableName: 'Todo-g2brcplterb45clsd2ohm52rzu-dev',
      Item: {
        name: event.arguments.todo.name,
        description: event.arguments.todo.description
      }
    } as PutCommandInput)
    const client: PutCommandOutput = await documentClient.send(command)
    return client
  } catch (err) {
    console.log(err)
  }
}