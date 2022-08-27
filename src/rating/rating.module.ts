import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { RatingController } from './rating.controller'
import { RatingService } from './rating.service'
import { RatingModel } from './rating.model'
import { MovieModule } from '../movie/movie.module'
import { UserModule } from '../user/user.module'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: RatingModel,
				schemaOptions: {
					collection: 'Rating',
				},
			},
		]),
		MovieModule,
	],
	controllers: [RatingController],
	providers: [RatingService],
})
export class RatingModule {}
