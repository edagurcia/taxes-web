import { GoogleButton, LoginForm, Navigation } from "../components";

export const LoginPage = () => {
  return (
    <div className="w-full p-8 md:w-[450px] md:p-2">
      <div className="flex gap-2 items-center justify-center">
        <GoogleButton />
      </div>

      <LoginForm />

      <Navigation
        message="¿No tiene una cuenta aún?"
        label="creé una aquí"
        url="/register"
      />
    </div>
  );
};
