import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  boardNo: number;

  @Field()
  content: string;

  @Field()
  userNo: number;
}
