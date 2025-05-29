export default interface Command {
    /**
     * The description of the command.
     */
    description: string;

    /**
     * The signature of the command.
     */
    signature: string;

    /**
     * The options of the command.
     */
    options?: Record<string, any>;

    /**
     * The handler function for the command.
     */
    handle: (args: Record<string, any>) => Promise<void>;
}