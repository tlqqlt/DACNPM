import models from '../models';
import generateHash from '../utils/generateHash';

const UserSchema = models.User;

export async function findByUsername(username) {
  return UserSchema.findOne({ where: { username } });
}

export async function createUser(data) {
  // eslint-disable-next-line no-param-reassign
  data.password = generateHash(data.password);
  // eslint-disable-next-line no-param-reassign
  data.role = 'student';
  return UserSchema.create(data);
}
