import { existsSync, readFileSync } from "fs";
import ViewNotFoundError from "./Errors/ViewNotFoundError.js";
import Print from "../Support/Facades/Print.js";
import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/smtp-transport/index.js";

export default abstract class Mail {
    /**
     * The subject of the email.
     */
    abstract subject: string;

    /**
     * The view location of the email.
     */
    abstract view: string;

    buildView: string|null = null;

    public async send(to: string|string[]): Promise<void> {
        const view = this.build();

        const transporter = this.getTransporter();
        transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
            to,
            subject: this.subject,
            html: view,
        });
    }

    private build(): string {
        if (this.buildView) {
            return this.buildView;
        }

        Print.debug(existsSync(this.view));
        Print.debug(this.view);
        if (!existsSync(this.view))
            throw new ViewNotFoundError(this.view);

        let content = readFileSync(this.view, 'utf-8');
        content = content.replaceAll(/{{\s*([\s\S]*?)\s*}}/g, (match, p1) => {
            Print.debug(`View: ${match}, ${p1}`);
            Print.debug(eval(p1));
            return eval(p1);
        });

        this.buildView = content;
        return content;
    }
    private getTransporter() {
        return nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT) : undefined,
            secure: process.env.MAIL_SECURE === 'true',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        } as Options);
    }
}