import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from '..//auth/decorators/auth.decorator'
import { IdValidationPipe } from '../pipes/id.validation.pipe'
import { GenreIdsDto } from './genreIds.dto'
import { MovieService } from './movie.service'
import { UpdateMovieDto } from './update-movie.dto'

@Controller('movies')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.movieService.bySlug(slug)
	}

	@Get('by-actor/:actorId')
	async byActorId(@Param('actorId', IdValidationPipe) actorId: Types.ObjectId) {
		return this.movieService.byActor(actorId)
	}

	@UsePipes(new ValidationPipe())
	@Post('by-genres')
	@HttpCode(200)
	async beGenres(@Body() { genreIds }: GenreIdsDto) {
		return this.movieService.byGenres(genreIds)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.movieService.getAll(searchTerm)
	}

	@Get('most-popular')
	async mostPopular() {
		return this.movieService.getMostPopular()
	}

	@Put('update-count-opened')
	@HttpCode(200)
	async updateCountOpened(@Body('slug') slug: string) {
		return this.movieService.updateCountOpened(slug)
	}

	@Get(':id')
	@Auth('admin')
	async get(@Param('id', IdValidationPipe) id: string) {
		return this.movieService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.movieService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: UpdateMovieDto
	) {
		return this.movieService.update(id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id', IdValidationPipe) id: string) {
		return this.movieService.delete(id)
	}
}
