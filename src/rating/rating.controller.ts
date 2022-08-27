import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Type,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Auth } from '../auth/decorators/auth.decorator'
import { IdValidationPipe } from '../pipes/id.validation.pipe'
import { User } from '../user/decorators/user.decorator'
import { SetRatingDto } from './dto/set-rating.dto'
import { RatingService } from './rating.service'

@Controller('ratings')
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@Get(':movieId')
	@Auth()
	async getMovieValueByUserId(
		@Param('movieId', IdValidationPipe) movieId: Types.ObjectId,
		@User('_id') _id: Types.ObjectId
	) {
		return this.ratingService.getMovieValueByUserId(movieId, _id)
	}

	@UsePipes(new ValidationPipe())
	@Post('set-rating')
	@HttpCode(200)
	@Auth()
	async setRating(@User('_id') _id: Types.ObjectId, @Body() dto: SetRatingDto) {
		return this.ratingService.setRating(_id, dto)
	}
}
