import Veterinario from "../models/Veterinario.js";

import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  const { email } = req.body;
  // Revisar usuarios duplicados
  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    // Guardar nuevo Veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    res.json({ msg: "Veterinario Guardado", veterinario: veterinarioGuardado });
  } catch (error) {
    console.log(error);
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Veterinario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario Confirmado Correcatmente" });
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  res.json({ msg: "Mostrando perfil" });
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si existe el usuario
  const usuario = await Veterinario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Revisar la confirmacion de la cuenta
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmado");
    return res.status(403).json({ msg: error.message });
  }

  // Revisar el password
  if (await usuario.comprobarPassword(password)) {
    // Autenticar
    res.json({ token: generarJWT(usuario.id) });
  } else {
    const error = new Error("Password incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

export { registrar, perfil, confirmar, autenticar };
