import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsStrongPassword, MinLength } from 'class-validator'

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  fullName!: string

  @IsEmail()
  @IsNotEmpty()
  email!: string

  @IsPhoneNumber('RU')
  @IsNotEmpty()
  phone!: string

  @IsStrongPassword()
  @IsNotEmpty()
  password!: string
}
