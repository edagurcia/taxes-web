import * as yup from "yup";

export const loginValidations = yup.object().shape({
  email: yup
    .string()
    .email("Formato de correo electrónico es invalido")
    .required("Dirección de correo electrónico es requerido"),
  password: yup.string().required("Contraseña es requerido"),
});

export const registerValidations = yup.object().shape({
  name: yup
    .string()
    .min(3, "Nombre debe ser al menos de 3 caracteres")
    .required("Nombre es requerido"),
  email: yup
    .string()
    .email("Formato de correo electrónico es invalido")
    .required("Dirección de correo electrónico es requerido"),
  password: yup
    .string()
    .min(8, "Contraseña debe ser al menos de 8 caracteres")
    .required("Contraseña es requerido"),
  confirmPassword: yup
    .string()
    .required("Confirmación de contraseña es obligatoria")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});
