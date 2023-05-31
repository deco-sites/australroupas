import { useSignal } from "@preact/signals";

export interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  placeholderName?: string;
  placebolderEmail?: string;
  textSubmitButton?: string;
  /**
   * @format color
   * @description Will be a readable tone of button if not specified
   */
  colorButton?: string;
  successText?: string;
  errorText?: string;
}

function Newsletter({
  title,
  subtitle,
  description,
  placeholderName,
  placebolderEmail,
  textSubmitButton,
  colorButton,
  successText,
  errorText,
}: Props) {
  const loading = useSignal(false);

  return (
    <div class="max-w-3xl lg:mx-25 bg-white lg:flex border-t border-t-[#E4E4EA] p-6 lg:px-0">
      <div class="flex flex-col lg:w-2/5 gap-2.5 mb-2.5 px-4.5 lg:px-0">
        <span class="text-black text-sm uppercase">
          {title ? title : "Newsletter"}
        </span>
        <h3 class="text-black lg:text-1.5xl text-base font-bold tracking-wider">
          {subtitle ? subtitle : "Cadastre-se na nossa newsletter"}
        </h3>
        <p class="text-black text-xs">
          {description
            ? description
            : "Cadastre-se e ganhe 10%OFF em sua primeira compra"}
        </p>
      </div>
      <form class="flex flex-col items-center lg:flex-row lg:w-3/5 gap-2.5 px-4.5 mb-2.5 lg:px-0">
        <input
          class="outline-none bg-white lg:w-2/5 rounded-md indent-2.5 border border-[#AEAEB2] w-full h-10 text-sm placeholder:text-sm placeholder:indent-2.5"
          required
          type="text"
          name="name"
          id="name"
          placeholder={placeholderName ? placeholderName : "Nome"}
        />
        <input
          class="outline-none bg-white lg:w-2/5 rounded-md indent-2.5 border border-[#AEAEB2] w-full h-10 text-sm placeholder:text-sm placeholder:indent-2.5"
          required
          type="email"
          name="email"
          id="email"
          placeholder={placebolderEmail ? placebolderEmail : "E-mail"}
        />
        <input
          class="text-white lg:w-1/5 rounded-md text-base h-10 py-1 p-2.5"
          style={{ backgroundColor: colorButton }}
          type="submit"
          value={textSubmitButton ? textSubmitButton : "Enviar"}
        />
      </form>
      <div
        class={`hidden flex justify-center items-center overflow-y-hidden fixed inset-0 z-50`}
        style={{ backgroundColor: "rgba(0,0,0,.4)" }}
      >
        <div
          class={`bg-white w-[32em] flex flex-col justify-center items-center p-5 relative`}
        >
          <button class="absolute top-3 right-3">
            <i class={`icon-close text-base text-black`}></i>
          </button>
          <i class={`icon-warning text-3xl text-neutral`}></i>
          <h4 class="text-base mt-4.5 mb-5 text-black">Ocorreu um erro!</h4>
          <span class="text-xs text-black">e-mail já cadastrado</span>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
