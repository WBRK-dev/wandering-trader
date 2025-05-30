export default class ViewNotFoundError extends Error {
  constructor(location?: string) {
    super(`View file not found at: ${location || "unknown location"}`);
    this.name = "ViewNotFoundError";
  }
}