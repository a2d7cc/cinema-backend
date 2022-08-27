import { Prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ActorModel } from '../actor/actor.model'
import { GenreModel } from '../genre/genre.model'

export interface MovieModel extends Base {}

export class Parameters {
	@Prop()
	year: number

	@Prop()
	duration: number

	@Prop()
	country: string
}

export class MovieModel extends TimeStamps {
	@Prop()
	poster: string

	@Prop()
	bigPoster: string

	@Prop()
	title: string

	@Prop({ unique: true })
	slug: string

	@Prop()
	description: string

	@Prop()
	parameters?: Parameters

	@Prop({ default: 4.0 })
	rating?: number

	@Prop()
	videoUrl: string

	@Prop({ default: 0 })
	countOpened?: number

	@Prop({ ref: () => GenreModel })
	genres: Ref<GenreModel>[]

	@Prop({ ref: () => ActorModel })
	actors: Ref<ActorModel>[]

	@Prop({ default: false })
	isSendTelegram?: boolean
}
