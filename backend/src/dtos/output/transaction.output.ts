import { Field, Int, ObjectType } from "type-graphql"
import { TransactionModel } from "../../models/transaction.model"

@ObjectType()
export class FilterTransactionOutput {
  @Field(() => [TransactionModel])
  transactions!: TransactionModel[]

  @Field(() => Int)
  totalOfTransactions!: number

  @Field(() => Int)
  page!: number

  @Field(() => Int)
  perPage!: number

  @Field(() => Int)
  totalPages!: number

  @Field(() => Boolean)
  hasNextPage!: boolean

  @Field(() => Boolean)
  hasPreviousPage!: boolean
}
