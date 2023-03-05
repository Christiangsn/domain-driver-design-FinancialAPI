import { InfraModule } from '@infra/infra.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    InfraModule,
    MongooseModule.forRoot('mongodb://localhost/finance_api')
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
