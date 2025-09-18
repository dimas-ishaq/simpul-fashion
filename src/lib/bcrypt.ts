import bcrypt from "bcrypt";

const saltRounds = 10;

export function hashPassword(strPassword: string | Buffer<ArrayBufferLike>) {
  return bcrypt.hash(strPassword, saltRounds);
}

export function comparePassword(strPassword: string, hashPassword: string) {
  return bcrypt.compare(strPassword, hashPassword);
}
