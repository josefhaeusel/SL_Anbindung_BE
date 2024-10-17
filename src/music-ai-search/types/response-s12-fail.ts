import { ApiProperty } from '@nestjs/swagger'

export class ResponseS12Fail {
  @ApiProperty()
  success: boolean

  @ApiProperty()
  message: string
}
