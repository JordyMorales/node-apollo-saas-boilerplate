import { gql } from 'apollo-server-express';

import userSchema from './user';
import teamSchema from './team';

const linkSchema = gql`
  scalar DateTime

  directive @requireAuth on FIELD_DEFINITION
  directive @analyticsIdentify on FIELD_DEFINITION
  directive @analyticsTrack(event: String) on FIELD_DEFINITION
  directive @computed(value: String) on FIELD_DEFINITION

  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  # type Subscription {
  #   _: Boolean
  # }
`;

export default [linkSchema, userSchema, teamSchema];
