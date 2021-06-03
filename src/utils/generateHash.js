import bcrypt from 'bcrypt';

export default function generateHash(data) {
  return bcrypt.hashSync(data, bcrypt.genSaltSync(8));
}
