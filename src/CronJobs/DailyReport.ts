import SendStatsReportMail from "../Services/SendStatsReportMail.js";

export default async function (): Promise<void> {
    const startTime = Date.now() - 24 * 60 * 60 * 1000;

    await SendStatsReportMail(
        startTime, 
        `Daily Report - ${new Date(startTime).toLocaleDateString('nl-NL')} t/m ${new Date().toLocaleDateString('nl-NL')}`,
    );
}