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

export const periodValidations = yup.object().shape({
  monthId: yup.string().required("Por favor seleccione un mes"),
  year: yup
    .string()
    .min(4, "Año debe ser al menos de 4 digitos")
    .max(4, "Año debe ser de 4 digitos")
    .required("Por favor proporcione año"),
});

export const businessValidations = yup.object().shape({
  name: yup.string().required("Por favor provea un nombre de comercio"),
});
