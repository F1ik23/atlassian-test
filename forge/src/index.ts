import Resolver from '@forge/resolver';
import task from './resolvers/task';
import project from './resolvers/project';
import user from './resolvers/user';

const resolver = new Resolver();

task(resolver);
project(resolver);
user(resolver);

export const handler = resolver.getDefinitions();

