import { useUser } from "deco-sites/std/packs/vtex/hooks/useUser.ts";
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "deco-sites/australroupas/sdk/useUI.ts";

const MyAccountButton = () => {
  const { user } = useUser();
  const { vtexIdScriptsLoaded, displayOverlayServiceMenu, displayModalLogin } = useUI();

  return (
    <>
    <a
      class="p-2.5 lg:ml-7.5 relative"
      href="#"
      aria-label="Log in"
      onClick={ (e) => {
        e.preventDefault();
        displayOverlayServiceMenu.value = !displayOverlayServiceMenu.value;
        displayModalLogin.value = !displayModalLogin.value;
      }}
      >
      <i
        class={`icon-user text-xl lg:text-2.5xl`}
        >
      </i>
    </a>
    <div class={`${displayModalLogin.value ? "flex" : "hidden"} flex-col popupLogin lg:right-[77px] lg:mt-5 lg:before:right-4`}>
        <p class={`text-black text-sm font-bold pb-[22px] mb-2.5 border-b border-[#C7C7C7]`}>Olá! Seja bem vindo!</p>
        <a href="#"
        class={`text-primary text-sm underline py-2.5`}
        onClick={async (e) => {
          e.preventDefault();
          if (user.value?.email) {
            window.location.pathname = "/account";
          } else {
            const execute = () => {
              vtexIdScriptsLoaded.value = true;
              // deno-lint-ignore ban-ts-comment
              // @ts-expect-error
              window.vtexid.start({
                userEmail: "",
                locale: "pt-BR",
                forceReload: true,
              });
            };
            if (!vtexIdScriptsLoaded.value) {
              const { loadVtexIdScripts } = await import(
                "deco-sites/australroupas/sdk/loadVtexIdScripts.ts"
              );
              loadVtexIdScripts(execute);
            } else {
              execute();
            }
          }
        }}>Entre ou cadastre-se</a>
        <Button
          class="p-2.5 text-xl lg:hidden absolute top-0 right-0"
          onClick={(e) => {
            e.preventDefault();
            displayOverlayServiceMenu.value = !displayOverlayServiceMenu.value;
            displayModalLogin.value = false;
          }}
        >
          <i class={`icon-close`}></i>
        </Button>
      </div>
        </>
  );
};

export default MyAccountButton;
