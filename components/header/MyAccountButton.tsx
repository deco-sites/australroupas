import { useUser } from "deco-sites/std/packs/vtex/hooks/useUser.ts";
import { useUI } from "deco-sites/australroupas/sdk/useUI.ts";

const MyAccountButton = () => {
  const { user } = useUser();
  const { vtexIdScriptsLoaded } = useUI();

  return (
    <a
      class="p-2.5 lg:ml-7.5"
      href="#"
      aria-label="Log in"
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
      }}
    >
      <i
        class={`icon-user text-xl lg:text-2.5xl`}
      >
      </i>
    </a>
  );
};

export default MyAccountButton;
