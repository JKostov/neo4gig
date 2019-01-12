import {
    Controller,
    Get,
    Response,
    HttpStatus,
    Param,
    Body,
    Post,
    Put,
    UsePipes,
    ValidationPipe, Inject,
} from '@nestjs/common';
import { CreateGenreNeoDto } from './dto/createGenre.neo.dto';
import { IGenresNeoService } from './interfaces/genres-service.neo.interface';

@Controller('genres')
export class GenresController {
    private readonly genresService: IGenresNeoService;

    constructor(@Inject('GenresNeoService') genresService: IGenresNeoService) {
        this.genresService = genresService;
    }

    @Get()
    public async getUsers(@Response() res) {
        const users = await this.genresService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    public async getUser(@Response() res, @Param() param) {
        const user = await this.genresService.findById(param.id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createUser(@Response() res, @Body() createGenreNeoDto: CreateGenreNeoDto) {
        const user = await this.genresService.create(createGenreNeoDto);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('/:id')
    public async updateUser(@Param() param, @Response() res, @Body() body) {
        const user = await this.genresService.update(param.id, body);
        return res.status(HttpStatus.OK).json(user);
    }
}
