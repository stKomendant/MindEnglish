import { mailtrapClient, sender } from "./mailtrap.config";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string,
): Promise<void> => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (
  email: string,
  name: string,
): Promise<void> => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to English Mind!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
      category: "Welcome Email",
    });

    console.log("Welcome email sent successfully", response);
  } catch {
    throw new Error("Error sending welcome email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string,
): Promise<void> => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password - English Mind",
      html: PASSWORD_RESET_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Password reset email send syccessful", response);
  } catch (error) {
    console.error("Error sending password reset successful email", error);
    throw new Error(`Error sending password reset successful email: ${error}`);
  }
};
