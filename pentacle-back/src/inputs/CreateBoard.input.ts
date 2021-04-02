import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateBoardInput {
  @Field()
  title: string;

  @Field()
  b_content: string;

  @Field()
  userNo: number;
}
