"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetSuccessEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendVerificationEmail = void 0;
const mailtrap_config_1 = require("./mailtrap.config");
const emailTemplates_1 = require("./emailTemplates");
const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Verify your email",
            html: emailTemplates_1.VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });
        console.log("Email sent successfully", response);
    }
    catch (error) {
        console.error("Error sending verification email", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Welcome to English Mind!",
            html: emailTemplates_1.WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
            category: "Welcome Email",
        });
        console.log("Welcome email sent successfully", response);
    }
    catch {
        throw new Error("Error sending welcome email");
    }
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = async (email, resetCode) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Reset your password - English Mind",
            html: emailTemplates_1.PASSWORD_RESET_TEMPLATE.replace("{resetCode}", resetCode),
            category: "Password Reset",
        });
        console.log("Password reset email sent successfully", response);
    }
    catch (error) {
        console.error("Error sending password reset email", error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: emailTemplates_1.PASSWORD_RESET_TEMPLATE,
            category: "Password Reset",
        });
        console.log("Password reset email send syccessful", response);
    }
    catch (error) {
        console.error("Error sending password reset successful email", error);
        throw new Error(`Error sending password reset successful email: ${error}`);
    }
};
exports.sendResetSuccessEmail = sendResetSuccessEmail;
