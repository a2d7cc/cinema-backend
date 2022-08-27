import { Prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserModel } from '../user/user.model'
import { MovieModel } from '../movie/movie.model'

export interface RatingModel	 extends Base {}
export class RatingModel extends TimeStamps {
	@Prop({ ref: () => UserModel })
	userId?: Ref<UserModel>[]

	@Prop({ ref: () => MovieModel })
	movieId?: Ref<MovieModel>[]

	@Prop()
	value: number
}
