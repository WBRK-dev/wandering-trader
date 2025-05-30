export default class NotLoggedInError extends Error {
  constructor() {
    super("You must be logged in to perform this action.");
    this.name = "NotLoggedInError";
  }
}