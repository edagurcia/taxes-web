import { Logo } from "../shared/Logo";

export const AuthHeader = () => {
  return (
    <div>
      <Logo />
      <h3 className="font-black flex flex-col mt-2">
        Controla tus impuestos{" "}
        <small className="font-normal mt-[-5px]">Analisa tus costos</small>
      </h3>
    </div>
  );
};
