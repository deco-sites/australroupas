import Icon from "$store/components/ui/Icon.tsx";

function BtnClose() {
  return (
    <label
    aria-label="Close"
    class="absolute -right-10 top-2"
    for="menu"
    onClick={() => {
      const menuPai = document.querySelectorAll<HTMLInputElement>(`input[id^="item"]`);
      menuPai.forEach(element => {
        element.checked = false;
      });
    }}
    >
      <Icon
        id="XMark"
        width={35}
        height={35}
        strokeWidth={1.5}
        class="text-white"
      />
    </label>
  );
}

export default BtnClose;
