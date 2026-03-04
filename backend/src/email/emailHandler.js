import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clieantURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome top Chattup",
    html: createWelcomeEmailTemplate(name, clieantURL),
  });

  if (error) {
    console.error("error sending welcome email ", error);
    throw new Error("failed to send welcome email");
  }

  console.log("Welcome email was sent successfully ", data);
};
