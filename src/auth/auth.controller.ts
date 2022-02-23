import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/signup')
	singUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
		return this.authService.createUser(authCredentialsDto);
	}

	@Post('/signin')
	signIn(@Body('email') email: string, @Body('password') password: string): Promise<{ accessToken: string }> {
		return this.authService.signIn(email, password);
	}
}
