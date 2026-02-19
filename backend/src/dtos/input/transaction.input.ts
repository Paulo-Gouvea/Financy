import { Field, InputType, GraphQLISODateTime, Int } from 'type-graphql'

@InputType()
export class CreateTransactionInput {
    @Field(() => String)
    type!: string

    @Field(() => String)
    description!: string

    @Field(() => GraphQLISODateTime)
    selectedDate!: Date

    @Field(() => Number)
    value!: number

    @Field(() => String)
    categoryId!: string
}

@InputType()
export class UpdateTransactionInput {
    @Field(() => String, { nullable: true })
    type!: string

    @Field(() => String, { nullable: true })
    description!: string

    @Field(() => GraphQLISODateTime, { nullable: true })
    selectedDate!: Date

    @Field(() => Number, { nullable: true })
    value!: number
}

@InputType()
export class FilterTransactionInput {
    @Field(() => String, { nullable: true })
    type?: string

    @Field(() => String, { nullable: true })
    description?: string

    @Field(() => String, { nullable: true })
    categoryId?: string

    @Field(() => GraphQLISODateTime, { nullable: true })
    selectedDate?: Date

    @Field(() => Int, { nullable: true })
    page?: number

    @Field(() => Int, { nullable: true })
    perPage?: number
}