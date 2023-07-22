interface Props {
  title: string;
  url: string;
}

function NavigatorShare({ title, url }: Props) {
  const handleClick = () => {
    navigator.share({
      title: title,
      url: url,
    });
  };

  return (
    <button
      class="product__share absolute top-[-30px] right-4 lg:static lg:mt-3 lg:ml-5"
      onClick={handleClick}
    >
      <i class="icon icon-share text-[22px] lg:text-[26px] text-primary"></i>
    </button>
  );
}

export default NavigatorShare;
