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
import { CreateEventNeoDto } from './dto/createEvent.neo.dto';
import { IEventsNeoService } from './interfaces/events-service.neo.interface';

@Controller('events')
export class EventsController {
    private readonly eventsNeoService: IEventsNeoService;

    constructor(@Inject('EventsNeoService') eventsNeoService: IEventsNeoService) {
        this.eventsNeoService = eventsNeoService;
    }

    @Get()
    public async getUsers(@Response() res) {
        const users = await this.eventsNeoService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    public async getUser(@Response() res, @Param() param) {
        const user = await this.eventsNeoService.findById(param.id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createUser(@Response() res, @Body() createEventNeoDto: CreateEventNeoDto) {
        const user = await this.eventsNeoService.create(createEventNeoDto);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('/:id')
    public async updateUser(@Param() param, @Response() res, @Body() body) {
        const user = await this.eventsNeoService.update(param.id, body);
        return res.status(HttpStatus.OK).json(user);
    }
}
