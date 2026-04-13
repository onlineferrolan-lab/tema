
{if $page.page_name == "category"}
    {*
    Azulejos (16) - mostramos productos a 3º nivel
    *}
    {if $category.id == 16}
        {assign var="show_type1" value=true  scope="global"}
    {elseif $category.id_parent == 16}
        {assign var="show_type2" value=true scope="global"}
    {else}
        {if Category::CategoryParent($category.id, 16) == true}
            {if $category.level_depth == 4}
{*                {if $category.id == 40}*}
{*                    {assign var="show_type4" value=true scope="global"}*}
{*                {/if}*}
                {assign var="showfilter" value=true scope="global"}
                {assign var="show_type3" value=true scope="global"}
                {assign var="acabadoformatocolor" value=true scope="global"}
            {else}
                {assign var="showfilter" value=true scope="global"}
                {assign var="showproducts" value=true scope="global"}
                {assign var="show_type4" value=true scope="global"}
            {/if}
        {/if}
    {/if}
    {*
    FIN Azulejos (16) - mostramos productos a 3º nivel
    *}

    {*
baño - mostramos productos a 3º nivel
*}
    {if $category.id == 2665}
        {assign var="show_type1" value=true  scope="global"}
    {elseif $category.id_parent == 2665}
        {assign var="show_type2" value=true scope="global"}
    {else}
        {if Category::CategoryParent($category.id, 2665) == true}
            {if $category.level_depth == 3}
                {assign var="showfilter" value=true scope="global"}
                {assign var="show_type3" value=true scope="global"}
            {else}
                {if $category.id == 2745}
                    {assign var="showfilter" value=true scope="global"}
                    {assign var="show_type3" value=true scope="global"}
                    {assign var="acabadoformatocolor" value=true scope="global"}
                {else}
                    {assign var="showfilter" value=true scope="global"}
                    {assign var="showproducts" value=true scope="global"}
                {/if}


{*                {assign var="show_type3" value=true scope="global"}*}
            {/if}
        {/if}
    {/if}
    {*
    FIN baños- mostramos productos a 3º nivel
    *}

    {*
cocinas - mostramos productos a 3º nivel
*}
    {if $category.id == 2666}
        {assign var="show_type1" value=true  scope="global"}
    {elseif $category.id_parent == 2666}
        {assign var="show_type2" value=true scope="global"}
    {else}
        {if Category::CategoryParent($category.id, 2666) == true}
            {if $category.level_depth == 4}
                {assign var="showfilter" value=true scope="global"}
                {assign var="showproducts" value=true scope="global"}
                {*assign var="show_type3" value=true scope="global"*}
            {else}
                {assign var="showfilter" value=true scope="global"}
                {assign var="showproducts" value=true scope="global"}
                {assign var="show_type4" value=true scope="global"}
            {/if}
        {/if}
    {/if}
    {*
    FIN baños- mostramos productos a 3º nivel
    *}

    {*
   parquet (2708) - mostramos productos a 2º nivel
   *}
    {if $category.id == 2667}
        {assign var="show_type2" value=true  scope="global"}
    {elseif $category.id_parent == 2667}
{*        {assign var="show_type2" value=true scope="global"}*}
        {assign var="showfilter" value=true scope="global"}
        {assign var="showproducts" value=true scope="global"}
    {/if}
    {*
   FIN parquet (16) - mostramos productos a 3º nivel
   *}

    {*
construccion (268) - mostramos productos a 2º nivel
*}
    {if $category.id == 2668}
        {assign var="show_type2" value=true  scope="global"}
    {elseif $category.id_parent == 2668}
        {*        {assign var="show_type2" value=true scope="global"}*}
        {assign var="showfilter" value=true scope="global"}
        {assign var="showproducts" value=true scope="global"}
    {/if}
    {*
   FIN construccion (16) - mostramos productos a 3º nivel
   *}


    {*
ferreteria (269) - mostramos productos a 2º nivel
*}
    {if $category.id == 2669}
        {assign var="show_type2" value=true  scope="global"}

    {elseif $category.id_parent == 2669}
{*        {assign var="show_type2" value=true scope="global"}*}
        {assign var="showfilter" value=true scope="global"}
        {assign var="showproducts" value=true scope="global"}
    {/if}
    {*
   FIN ferreteria (16) - mostramos productos a 2º nivel
   *}


    {*
pintura (9486) - mostramos productos a 2º nivel
*}
    {if $category.id == 9486}
        {assign var="show_type2" value=true  scope="global"}

    {elseif $category.id_parent == 9486}
{*        {assign var="show_type2" value=true scope="global"}*}
        {assign var="showfilter" value=true scope="global"}
        {assign var="showproducts" value=true scope="global"}
    {/if}
    {*
   FIN pintura (9486) - mostramos productos a 2º nivel
   *}


    {*
jardineria (2662) - mostramos productos a 2º nivel
*}
    {if $category.id == 2662}
        {assign var="show_type2" value=true  scope="global"}

    {elseif $category.id_parent == 2662}
        {*        {assign var="show_type2" value=true scope="global"}*}
        {assign var="showfilter" value=true scope="global"}
        {assign var="showproducts" value=true scope="global"}
    {/if}
    {*
   FIN pintura (9486) - mostramos productos a 2º nivel
   *}



    {*
    promo mes (3555) - mostramos productos
    *}
    {if $category.id_parent == 9498}
        {assign var="showfilter" value=true scope="global"}
        {assign var="showproducts" value=true scope="global"}
    {/if}
    {*
   FIN parquet (16) - mostramos productos a 3º nivel
   *}

    {*busqueda avanzada*}
    {if $category.id == 11699}
        {assign var="showfilter" value=true scope="global"}
        {assign var="showproducts" value=true scope="global"}
    {/if}
    {*FIN busqueda avanzada*}
{elseif $page.page_name == "manufacturer"}

        {assign var="showproducts" value=true scope="global"}
{elseif $page.page_name == "search"}

        {assign var="showproducts" value=true scope="global"}
    
{elseif $page.page_name == "module-af_seopages-seopage"}

        {assign var="showproducts" value=true scope="global"}
    
{/if}
{*Ecepcion, para los baños, si tenemos parametros urls para filtrar, habilitamos el filtros y mostramos producto*}
{if is_array($category) && $category.id == "2665"}
    {if isset($smarty.get.color) || isset($smarty.get.coleccion)}
        {assign var="showfilter" value=true scope="global"}
        {assign var="showproducts" value=true scope="global"}
        {assign var="forceelementorhidden" value=true scope="global"}
    {/if}
{/if}
