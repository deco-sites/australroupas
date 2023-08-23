import { Head } from "$fresh/runtime.ts";

function ProductSizeTable({ category }: { category: string }) {

    if (category != "Acessórios") {
        return (
        <>
            <Head>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        .szb-vfr-btns {
                            margin: 0 !important;
                            margin-top: 5px !important;
                        }
                    `,
                }}
            />
            </Head>
            <div class="content inline--default product__select"></div>
            <script
            async
            id="sizebay-vfr-v4"
            src="/australCulture_prescript.js"
            />
        </>
        );
    } else {
        return null;
    }

}

export default ProductSizeTable;
