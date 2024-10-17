import { ApiProperty } from '@nestjs/swagger'

export class ResponseS12Ok {
  @ApiProperty()
  success: boolean

  @ApiProperty()
  data: any
}
