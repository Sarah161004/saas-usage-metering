export declare class EmailService {
    sendSoftLimitEmail(toEmail: string, month: string, used: number, limit: number): Promise<void>;
    sendHardLimitEmail(toEmail: string, month: string, used: number, limit: number): Promise<void>;
    testEmail(): Promise<{
        success: boolean;
        status: number;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        status?: undefined;
    }>;
}
