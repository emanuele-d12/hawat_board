import 'dotenv/config'
import os from 'node:os'

export const env = {

    port: Number(process.env.PORT) || 3000,

    dataDir: process.env.DATA_DIR || './data/',

    instanceName:
        process.env.INSTANCE_NAME || os.hostname(),

    version:
        process.env.APP_VERSION || '1.0.0',

    persistence:
        process.env.PERSISTENCE || 'json',

    awsRegion:
        process.env.AWS_REGION || 'eu-north-1',

    dynamoTable:
        process.env.DYNAMODB_TABLE || 'hawat-board',


}