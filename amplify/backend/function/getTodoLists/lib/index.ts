/* Amplify Params - DO NOT EDIT
	API_AMPLIFIED_GRAPHQLAPIIDOUTPUT
	API_AMPLIFIED_TODOTABLE_ARN
	API_AMPLIFIED_TODOTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand, ScanCommandInput, ScanCommandOutput } from '@aws-sdk/lib-dynamodb'

const docClient = new DynamoDBClient({
  region: process.env.REGION
})
const documentClient = DynamoDBDocumentClient.from(docClient)

export const handler = async () => {
  try {
    const command = new ScanCommand({
      TableName: 'Todo-g2brcplterb45clsd2ohm52rzu-dev'
    } as ScanCommandInput)
    const client: ScanCommandOutput = await documentClient.send(command)
    console.log(client)
    return client.Items
  } catch (err) {
      console.log(err);
    }
};