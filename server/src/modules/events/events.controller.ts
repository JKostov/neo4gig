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
    public async getEvents(@Response() res) {
        const events = await this.eventsNeoService.findAll();
        return res.status(HttpStatus.OK).json(events);
    }

    @Get('/:id')
    public async getEvent(@Response() res, @Param() param) {
        const event = await this.eventsNeoService.findById(param.id);
        return res.status(HttpStatus.OK).json(event);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createEvent(@Response() res, @Body() createEventNeoDto: CreateEventNeoDto) {
        const event = await this.eventsNeoService.create(createEventNeoDto);
        return res.status(HttpStatus.OK).json(event);
    }

    @Put('/:id')
    public async updateEvent(@Param() param, @Response() res, @Body() body) {
        const event = await this.eventsNeoService.update(param.id, body);
        return res.status(HttpStatus.OK).json(event);
    }
}
