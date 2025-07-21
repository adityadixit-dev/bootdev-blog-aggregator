export class WrongArguementNumberError extends Error {
  constructor(message?: string) {
    super(`Wrong Numbers of Arguements:${message}`);
  }
}

export class CommandNotFoundError extends Error {
  constructor(message?: string) {
    super(`Command not Found:${message}`);
  }
}

export class UserNotCreatedError extends Error {
  constructor(message?: string) {
    super(`Unable to Create User :${message}`);
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(`The user you are trying to create already exists:${message}`);
  }
}

export class UserDoesNotExistError extends Error {
  constructor(message?: string) {
    super(`User not in Database. Please Register first:${message ?? ""}`);
  }
}

export class DeleteFailedError extends Error {
  constructor(message?: string) {
    super(`Unable to Delete:${message ?? ""}`);
  }
}
