import nodemailer from "nodemailer";

const emailRegsitro = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PASS,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;
  // Enviar email

  const info = await transporter.sendMail({
    from: "APV - Administracion de Pacientes de Veterinaria",
    to: email,
    subject: "Comprueba tu cuenta en APV",
    text: "Comprueba tu cuenta en APV",
    html: `
      <p>Hola: ${nombre} comprueba tu cuenta en APV.</p>
      <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: 
      <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Comprobar cuenta</a></p>

      <p>Si tu no solicitaste esta cuenta, ignora este mensaje</p>
    `,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailRegsitro;
