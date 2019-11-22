import faker from 'faker';
import { factory } from 'factory-girl';

factory.define('', {
  name: faker.name.firstName,
});

export default factory;
