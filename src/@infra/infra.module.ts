import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { resolve } from 'path'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql')
    })
  ]
})
export class InfraModule {}

/// verify existing apollo in graphql
/// remover package
