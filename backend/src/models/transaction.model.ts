import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { CategoryModel } from "./category.model";

@ObjectType()
export class TransactionModel {
    @Field(() => ID)
    id!: string

    @Field(() => String)
    type!: string

    @Field(() => String, { nullable: true })
    description: string

    @Field(() => GraphQLISODateTime)
    selectedDate!: Date

    @Field(() => Number)
    value!: number

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date

    @Field(() => String)
    ownerId!: string

    @Field(() => UserModel, { nullable: true })
    owner?: UserModel

    @Field(() => String)
    categoryId!: string

    @Field(() => CategoryModel, { nullable: true })
    category?: CategoryModel
}