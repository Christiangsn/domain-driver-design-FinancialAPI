
import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UAParser } from 'ua-parser-js'

export interface IUserAgent {
  name: string
  version: string
  type: string
  os: string
}

/**
 * @Return returns info about user-Agent Browser/Request
 * @Param name: string
 * @Param version: string
 * @param type: string
 * @param os: string
 */
export const UserAgent = createParamDecorator((_data: any, ctx: ExecutionContext): IUserAgent => {
  const context = GqlExecutionContext.create(ctx).getContext()
  const headers = context.req.headers
  const uaParser = new UAParser()
  const userAgent = uaParser.setUA(headers['user-agent']).getResult()
  return {
    name: userAgent.browser?.name ?? 'Chrome',
    os: userAgent.os?.name?.toUpperCase().replace(' ', '') ?? 'WINDOWS',
    type: userAgent.device?.type ?? 'Browser',
    version: userAgent.os?.version ?? '00.0.0'
  }
})
