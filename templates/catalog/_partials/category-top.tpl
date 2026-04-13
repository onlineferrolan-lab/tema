{*
definidas las variables en el logout-both-columns.tpl
*}

<div id="js-product-list-header">


    {if strpos($category.description, 'elementor-element') !== false}
        {if $forceelementorhidden == false}
            <div class="category-info-elementor">
                {$category.description nofilter}
            </div>
        {else}
            <h1 class="text-center">
                {$category.name}
            </h1>
        {/if}
        {if $showfilter == true}

{*            <div class="amazzingfiltercontent">*}
{*                <ul class="elements fakefilter" style="display: none">*}
{*                    <li class="showfilter">*}
{*                        <span class="material-icons">tune</span>*}
{*                        <span class="txt">{l s='Filtro' d='Shop.Theme.Actions'}</span>*}
{*                    </li>*}
{*                </ul>*}

{*                <div class="owl-carousel fakefilteritems" items="8-4-2-2" nav="true" dots="false"></div>*}

{*                <div class="amazingfilterlateral">*}
{*                    {hook h='displayAmazzingFilter'}*}
{*                    <div class="close">*}
{*                        <span class="material-icons">close</span>*}
{*                    </div>*}
{*                </div>*}
{*            </div>*}

            <div class="contentfakefilteritems fullwidth">
                <div class="container">
                    <div class="inside">
                        <div class="title">{l s='Descubre nuestras colecciones' d='Shop.Theme.Actions'}</div>

                        <ul class="owl-carousel fakefilteritems" items="8-6-4-2" nav="true" dots="false"></ul>
                    </div>
                </div>
            </div>

            <div class="amazzingfiltercontent">

                <div class="amazingfilterlateral">
                    {hook h='displayAmazzingFilter'}
                    <div class="close">
                        <span class="material-icons">close</span>
                    </div>
                </div>
            </div>

        {/if}

    {elseif isset($smarty.get.ctx)}
        {*miramos si estamos editando elementor desde BO*}
        <div class="category-info-elementor">
            {$category.description nofilter}
        </div>
    {else}
     <div class="category-info-noelementor">


        {if $show_type1 || $show_type2 || $show_type3}
            <h1 class="text-center">
                {$category.name}
            </h1>
             <div class="description">
                {$category.description nofilter}
             </div>
        {elseif $show_type4}
            <div class="type3">
{*                <div class="img">*}
{*                    {capture name="secondimage"}{hook h='displaymegacategoryimages' cover=1}{/capture}*}
{*                    {if $smarty.capture.secondimage}*}
{*                        <img src="{$smarty.capture.secondimage}" alt="{$category.name}">*}
{*                    {else}*}
{*                        <img src="/img/c/{$category.image.id_image}.jpg" alt="{$category.name}">*}
{*                    {/if}*}
{*                </div>*}
                <div class="inforight">

                    {hook h='displaymegacategoryimages'}

                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <h1 class="">
                                {$category.name}
                            </h1>
                        </div>
                        <div class="col-xs-12 col-sm-6 text-right">
                            {assign var="brand" value=Category::GetIdCategory($category.id)}
                                {if isset($brand)}
                                    <div class="manufacturerimg {if isset($category.level_depth) && ($category.level_depth < 5) }levelcat{/if}">
                                        <a href="{$link->getManufacturerLink($brand)}" title="{Manufacturer::getNameById($brand)}">
                                            <img src="{$urls.img_manu_url}{$brand}.jpg" aria-label="{Manufacturer::getNameById($brand)}">
                                        </a>
                                    </div>
                                {/if}
                        </div>
                    </div>


                    <div class="description">
                        {$category.description nofilter}
                    </div>



                    {assign var="video" value=Category::GetVideo($category.id)}
                    {assign var="attachment" value=Category::GetPdf($category.id)}
                    <div class="category-attachments">
                        {if isset($attachment) }
                            <div class="attachment">
                                <a href="{url entity='attachment' params=['id_attachment' => $attachment]}" title="{l s='Descargar PDF' d='Shop.Themes.Actions'}">
                                    <img src="{$urls.img_url}download.svg" class="download" aria-label="{l s='Descargar PDF' d='Shop.Themes.Actions'}">
                                    <span>{l s='Descargar PDF' d='Shop.Themes.Actions'}</span>
                                    <img src="{$urls.img_url}next.svg" class="next" aria-label="{l s='Descargar PDF' d='Shop.Themes.Actions'}">
                                </a>
                            </div>
                        {/if}

                        {if isset($video) && $video != 'Array'}
                            <div class="video_container">

                                <a class="btn-count"href="#" data-toggle="modal" data-target="#videocategory-modal">
                                    <img src="{$urls.img_url}viewvideo.svg" class="download">
                                    <span  data-src="{$video}">
                                        {l s='Ver vídeo' d='Shop.Themes.Actions'}
                                    </span>
                                    <img src="{$urls.img_url}next.svg" class="next">
                                </a>

                            </div>



                        {/if}
                    </div>

                    {if isset($video) && $video != 'Array'}
                        <div id="videocategory-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="{l s='Close' d='Shop.Theme.Global'}">
                                            <span aria-hidden="true"><i class="material-icons">close</i></span>
                                        </button>

                                    </div>
                                    <div class="modal-body">
                                        <div id="video" class="video_fancy ">
                                            <iframe src="{$video}" width="640" height="360" frameborder="0"
                                                    allow="autoplay; fullscreen" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        {else}
            <h1 class="text-center">
                {$category.name}
            </h1>
        {/if}

         {if $showfilter == true}

             {if $category.id != 11699 }
                 <div class="amazzingfiltercontent">
                     {*no ponemos este filtro para la categoria de busqueda avanzada*}

{*                         <ul class="elements fakefilter" style="display: none">*}
{*                             <li class="showfilter">*}
{*                                 <span class="material-icons">tune</span>*}
{*                                 <span class="txt">{l s='Filtro' d='Shop.Theme.Actions'}</span>*}
{*                             </li>*}
{*                         </ul>*}

                        <ul class="owl-carousel fakefilteritems" items="8-6-4-2" nav="true" dots="false"></ul>

                         <div class="amazingfilterlateral">
                             {hook h='displayAmazzingFilter'}
                             <div class="close">
                                 <span class="material-icons">close</span>
                             </div>
                         </div>

                 </div>
             {else}
                 <div class="amazzingfiltercontent">
                     {*no ponemos este filtro para la categoria de busqueda avanzada*}
                     {if $category.id == 11699 }
                         <div class="standarfilter">
                             {hook h='displayAmazzingFilter'}
                         </div>
                     {else}
                         <ul class="elements fakefilter" style="display: none">
                             <li class="showfilter">
                                 <span class="material-icons">tune</span>
                                 <span class="txt">{l s='Filtro' d='Shop.Theme.Actions'}</span>
                             </li>
                         </ul>

                         <div class="owl-carousel fakefilteritems" items="8-6-4-2" nav="true" dots="false"></div>

                         <div class="amazingfilterlateral">
                             {hook h='displayAmazzingFilter'}
                             <div class="close">
                                 <span class="material-icons">close</span>
                             </div>
                         </div>
                     {/if}

                 </div>
             {/if}


         {/if}

         {assign var=subcategories value=Category::getSubCategoriesStatic($category.id, $language.id)}
         {if $show_type1}

             {if count($subcategories) > 0}
                 <ul class="subcategoriestop">

                    {*ecepcion en azulejos*}
                     {if isset($category.id) && $category.id == 16}
                         {foreach item=subcategory key=key from=$subcategories}
                             <li>
                                 {if $key == 1}
                                     <h2 rel="#cat{$subcategory.id_category}">
                                         {$category.name} {l s='por' d='Shop.Theme.Actions'} {$subcategory.name}
                                     </h2>
                                 {else}
                                     <h2>
                                        <a href="{$link->getCategoryLink($subcategory.id_category)}">{$category.name} {l s='por' d='Shop.Theme.Actions'} {$subcategory.name}</a>
                                     </h2>
                                 {/if}

                             </li>
                         {/foreach}

                    {else}
                         {foreach $subcategories as $subcategory}
                             <li>
                                 <h2 rel="#cat{$subcategory.id_category}">
                                     {$category.name} {l s='por' d='Shop.Theme.Actions'} {$subcategory.name}
                                 </h2>
                             </li>
                         {/foreach}
                     {/if}



                     {*si es categoria azulejos, mostramos busqueda avanzada*}
                     {if $category.id == 16}
                         <li>

                                 <a href="{$link->getCategoryLink('11699')}" class="busquedaavanzada">
                                    {l s='Búsqueda avanzada' d='Shop.Theme.Actions'}
                                 </a>
                         </li>
                     {/if}
                 </ul>

                 <div class="subcategories">

                 {*ecepcion en azulejos*}

                     {foreach item=subcategory key=key from=$subcategories}
                         {if isset($category.id) && $category.id == 16}
                             {if $key != 1}
                                {continue}
                             {/if}
                         {/if}
                         <div class="list" id="cat{$subcategory.id_category}">
                             <div class="subsubname">
                                 {$category.name} {l s='por' d='Shop.Theme.Actions'} {$subcategory.name}
                             </div>

                             {if strlen($subcategory.description) < 300}
                                 <div class="desc">
                                     {$subcategory.description nofilter}
                                 </div>
                             {/if}


                             <div class="sublist">
                                 {foreach $subcategory.subsubcategories as $subsubcategory}
                                     <div class="item" style="background-image: url('{$subsubcategory.image_link}')">
                                         <a href="{$subsubcategory.url}" class="subcategory">
                                             {*                                 <img src="{$subcategory.image.bySize.category_default.url}" alt="{$subcategory.name}">*}
                                             <h3 class="name">{$subsubcategory.name}</h3>
                                             <span class="view">{l s='ver' d='Shop.Theme.Actions'}</span>
                                         </a>
                                     </div>
                                 {/foreach}
                             </div>
                         </div>
                     {/foreach}
                 </div>
             {/if}
         {/if}


         {if $show_type2}
             <div class="subcategories">
                 <div class="sublist">
                     {foreach $subcategories as $subcategory}
                         <div class="item" style="background-image: url('{$subcategory.image_link}')">

                             <a href="{$subcategory.url}" class="subcategory">
                                 {*                                 <img src="{$subcategory.image.bySize.category_default.url}" alt="{$subcategory.name}">*}
                                 <span class="name">{$subcategory.name}</span>
                                 <span class="view">{l s='ver' d='Shop.Theme.Actions'}</span>
                             </a>
                         </div>
                     {/foreach}
                 </div>
             </div>
         {/if}


         {if $show_type3}
             <div class="subcategories type3">
                 <div class="sublist">

                     {assign var="limitpagination" value=12}
                     {assign var="aux" value=0}
                     {foreach $subcategories as $subcategory}
                         {assign var="aux" value=$aux+1}
                         <div class="item {if $aux <= $limitpagination}show{/if}" >

                             <div class="subitem" >
                                 <img src="{$subcategory.image_link}" alt="{$subcategory.name}" loading="lazy">
                                 <div class="contentextrainfo">
                                     {if $acabadoformatocolor == true}
                                            <div class="extra-info-cats">
                                                 {if isset($subcategory.extra_info.acabadofabrica)}
                                                     <span class="extra_acabados extra_acabados_val">{$subcategory.extra_info.acabadofabrica}</span>
                                                     <span class="extra_acabados extra_acabados_txt"
                                                           data-singular="{l s='acabado' d='Shop.Theme.Actions'}"
                                                           data-plural="{l s='acabados' d='Shop.Theme.Actions'}">{if $subcategory.extra_info.acabadofabrica > 1}{l s='acabados' d='Shop.Theme.Actions'}{else}{l s='acabado' d='Shop.Theme.Actions'}{/if}</span>
                                                     <span class="extra_acabados sep">|</span>
                                                     <span class="extra_formatos extra_formatos_val">{$subcategory.extra_info.formatos}</span>
                                                     <span class="extra_formatos extra_formatos_txt"
                                                           data-singular="{l s='formato' d='Shop.Theme.Actions'}"
                                                           data-plural="{l s='formatos' d='Shop.Theme.Actions'}">{if $subcategory.extra_info.formatos > 1}{l s='formatos' d='Shop.Theme.Actions'}{else}{l s='formato' d='Shop.Theme.Actions'}{/if}</span>
                                                     <span class="extra_formatos sep">|</span>
                                                     <span class="extra_colores extra_colores_val">{$subcategory.extra_info.colfabrica}</span>
                                                     <span class="extra_colores" data-singular="{l s='color' d='Shop.Theme.Actions'}"
                                                           data-plural="{l s='colores' d='Shop.Theme.Actions'}">{if $subcategory.extra_info.colfabrica > 1}{l s='colores' d='Shop.Theme.Actions'}{else}{l s='color' d='Shop.Theme.Actions'}{/if}</span>
                                                 {else}
                                                     <span class="extra_acabados extra_acabados_val" style="display:none;"></span>
                                                     <span class="extra_acabados extra_acabados_txt" style="display:none;"
                                                           data-singular="{l s='acabado' d='Shop.Theme.Actions'}"
                                                           data-plural="{l s='acabados' d='Shop.Theme.Actions'}"></span>
                                                     <span class="extra_acabados sep" style="display:none;">|</span>
                                                     <span class="extra_formatos extra_formatos_val" style="display:none;"></span>
                                                     <span class="extra_formatos extra_formatos_txt" style="display:none;"
                                                           data-singular="{l s='formato' d='Shop.Theme.Actions'}"
                                                           data-plural="{l s='formatos' d='Shop.Theme.Actions'}"></span>
                                                     <span class="extra_formatos sep" style="display:none;">|</span>
                                                     <span class="extra_colores extra_colores_val" style="display:none;"></span>
                                                     <span class="extra_colores extra_colores_txt" style="display:none;"
                                                           data-singular="{l s='color' d='Shop.Theme.Actions'}"
                                                           data-plural="{l s='colores' d='Shop.Theme.Actions'}"></span>
                                                 {/if}
                                             </div>
                                     {/if}
                                     <h2 class="name">{$subcategory.name}</h2>
                                 </div>
                                 <a href="{$subcategory.url}" class="infolink">
                                     <span class="view">{l s='Ver' d='Shop.Theme.Actions'}</span>
                                 </a>
                             </div>

                         </div>
                     {/foreach}

                 </div>
                 <div id="subcategories-loadmore">Cargar más</div>
             </div>
         {/if}




     </div>
    {/if}



</div>


