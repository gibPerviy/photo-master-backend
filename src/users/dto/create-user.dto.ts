// import { IsString, IsInt } from 'class-validator'

// export class CreateCatDto {
//   @IsString()
//   name: string

//   @IsInt()
//   age: number

//   @IsString()
//   breed: string
// }

export class CreateUserDto {
  id: number
  full_name: string
}
