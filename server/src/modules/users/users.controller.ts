import {
    Controller,
    Get,
    Response,
    HttpStatus,
    Param,
    Body,
    Post,
    Put,
    Delete,
    UsePipes,
    ValidationPipe, Inject,
} from '@nestjs/common';
import {IUsersService} from './interfaces/users-service.interface';
import {CreateUserDto} from './dto/createUser.dto';

@Controller('users')
export class UsersController {
    private readonly usersService: IUsersService;

    constructor(@Inject('UsersService') usersService: IUsersService) {
        this.usersService = usersService;
    }

    @Get()
    public async getUsers(@Response() res) {
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    public async getUser(@Response() res, @Param() param) {
        const user = await this.usersService.findById(param.id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createUser(@Response() res, @Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('/:id')
    public async updateUser(@Param() param, @Response() res, @Body() body) {
        const user = await this.usersService.update(param.id, body);
        return res.status(HttpStatus.OK).json(user);
    }

    @Delete('/:id')
    public async deleteUser(@Param() param, @Response() res) {

        const user = await this.usersService.delete(param.id);
        return res.status(HttpStatus.OK).json(user);
    }
}
