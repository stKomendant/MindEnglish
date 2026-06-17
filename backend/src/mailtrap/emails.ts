import { mailtrapClient, sender } from "./mailtrap.config";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates";

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
