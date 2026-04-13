<div id="js-product-list-header">

    {if $listing.pagination.items_shown_from == 1 && isset($category) }
        <div class="block-category">
            {assign var="brand" value=Category::GetIdCategory($category.id)}
            <div class="category-header-manu">
                {*<h1 class="h1">{$category.name}</h1>*}
                {if isset($brand)  and $brand > 0}
                    <div class="manufacturerimg {if isset($category.level_depth) && ($category.level_depth < 5) }levelcat{/if}">
                        <a href="{$link->getManufacturerLink($brand)} ">
                            <img src="{$urls.img_manu_url|replace:"ferrolan8.ecomm360.net":"ferrolan.es"}{$brand}.jpg">
                        </a>
                    </div>
                {/if}
            </div>
            {if $category.id_parent != 17 && $category.id_parent != 18 && $category.id_parent != 19 && $category.id_parent != 20}
                <div class="block-category-inner {*if $category.level_depth == 4 && ($category.id_parent == 17 || $category.id_parent == 18 ||$category.id_parent == 19 || $category.id_parent == 20) && $category.description|count_characters > 500}long{/if*}">
                    {if $category.description}
                        <div id="category-description"
                             class="text-muted">{$category.description nofilter}
                        </div>
                        {*if $category.level_depth == 4 && ($category.id_parent == 17 || $category.id_parent == 18 ||$category.id_parent == 19 || $category.id_parent == 20) && $category.description|count_characters > 500}
                            <div class="category-description-see-more text-center">
                                <img alt="more" src="{$urls.img_url}arrow_up.svg">
                            </div>
                        {/if*}
                    {/if}
                </div>
            {/if}


            {if isset($category.image.large.url) && $category.level_depth != 4}

                {if isset($category.level_depth) && ($category.level_depth == 5)}

                    {hook h='coverminiature'}
                {else}
                    <div class="category-cover">
                        <img src="{$category.image.bySize.category_default.url}"
                             alt="{if !empty($category.image.legend)}{$category.image.legend}{else}{$category.name}{/if}">
                    </div>
                {/if}
            {/if}

            {if isset($category.level_depth) && ($category.level_depth == 5)}

                {hook h='homecategories'}
                {block name='category_attachments'}

                    {assign var="video" value=Category::GetVideo($category.id)}
                    {assign var="attachment" value=Category::GetPdf($category.id)}
                    <div class="category-attachments">
                        {if isset($attachment) }
                            <div class="attachment">
                                <a href="{url entity='attachment' params=['id_attachment' => $attachment]}">
                                    {l s='Descargar PDF' d='Shop.Themes.Actions'}
                                    <img src="{$urls.img_url}vector.svg">
                                </a>
                            </div>
                        {/if}

                        {if isset($video) && $video != 'Array'}
                            <div class="video_container">
                                <a href="#video" class="fancybox1 fancyboxbutton1"><span
                                            data-src="{$video}">
                                                           {l s='Video colección'}
                                                            <img src="{$urls.img_url}play.svg">
                                                    </span></a>
                                <div id="video" class="video_fancy ">
                                    <iframe src="{$video}" width="640" height="360" frameborder="0"
                                            allow="autoplay; fullscreen" allowfullscreen></iframe>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/block}
            {/if}
        </div>
    {/if}
</div>