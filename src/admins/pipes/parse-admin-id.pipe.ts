import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class MyParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    console.log('Pipe...')
    const innerValue = parseInt(value)
    if (isNaN(innerValue)) {
      throw new BadRequestException('Validation Failed')
    }
    return innerValue
  }
}
