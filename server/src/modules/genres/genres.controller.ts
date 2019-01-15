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
    public async getGenres(@Response() res) {
        const genres = await this.genresService.findAllWithUsers();
        return res.status(HttpStatus.OK).json(genres);
    }

    @Get('/:id')
    public async getGenre(@Response() res, @Param() param) {
        const genre = await this.genresService.findById(param.id);
        return res.status(HttpStatus.OK).json(genre);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createGenre(@Response() res, @Body() createGenreNeoDto: CreateGenreNeoDto) {
        const genre = await this.genresService.create(createGenreNeoDto);
        return res.status(HttpStatus.OK).json(genre);
    }

    @Put('/:id')
    public async updateGenre(@Param() param, @Response() res, @Body() body) {
        const genre = await this.genresService.update(param.id, body);
        return res.status(HttpStatus.OK).json(genre);
    }
}
