import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field()
  id: string;

  @Field()
  pw: string;

  @Field()
  name: string;
}
