{*
*  @author    Amazzing <mail@mirindevo.com>
*  @copyright Amazzing
*  @license   https://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*}

{if isset($category.id) && $category.id == 11699}
	{assign var=closedfilter value=false}
{else}
	{assign var=closedfilter value=true}
{/if}


{$mark_no_matches = $hidden_inputs.hide_zero_matches || $hidden_inputs.dim_zero_matches}
{$is_horizontal = $af_layout_type == 'horizontal'}

{*** main layout is coming after functions ***}
{function renderBoxes type = 'checkbox' label_type = 'checkbox' color_display = 0 values = [] root = true}
	{if $values|count}

	<ul class="{if !$root}child-categories{elseif $color_display == 1}af-inline-colors{/if} {$label_type}">
	{$before_cut = count($values)}{if !empty($filter.cut_off) && !$is_horizontal}{$before_cut = $filter.cut_off}{/if}
	{foreach $values as $v}
		{$count = 0}{if !empty($count_data[$filter.first_char][$v.id])}{$count = $count_data[$filter.first_char][$v.id]}{/if}
		{$children = []}{if $check_for_children && !empty($filter.values[$v.id])}{$children = $filter.values[$v.id]}{/if}
		{$is_customer_filter = !empty($applied_customer_filters[$k][$v.id])}

		{assign var="hiddenoption" value=""}
		{if $v.identifier == "f-1617" || $v.identifier == "f-28965" || $v.identifier == "f-28962"}
			{assign var="hiddenoption" value="hidden"}
		{/if}


		<li class="{$hiddenoption} item-{$v.identifier|escape:'html':'UTF-8'}{if !empty($v.selected)} active{/if}{if !empty($children)} af-parent-category{/if}{if $mark_no_matches && !$count} no-matches{/if}{if $is_customer_filter} has-customer-filter{/if}{if !$before_cut} cut{/if}">
			<label for="{$v.identifier|escape:'html':'UTF-8'}" class="af-{$label_type|escape:'html':'UTF-8'}-label{if $is_customer_filter} customer-filter-label" data-id="{$v.identifier|escape:'html':'UTF-8'}{/if}"{if $color_display == 1} title="{$v.name|escape:'html':'UTF-8'}"{/if}>
				{if !empty($v.color_style)}<a class="af-color-box{if !empty($v.bright)} bright{/if}" style="{$v.color_style|escape:'html':'UTF-8'}">{/if}
				{if !$is_customer_filter}
					{if $label_type == "textbox"}
					{assign var='criterion_color' value=Product::getFeatureValueColor($v.id)}
						{if $criterion_color|strpos:'#' === 0}
							<span class="blockcolor" style='background:{$criterion_color};'></span>
						{/if}
					{/if}
						<input type="{$type|escape:'html':'UTF-8'}" id="{$v.identifier|escape:'html':'UTF-8'}" class="af {$type|escape:'html':'UTF-8'}" name="{$filter.submit_name|escape:'html':'UTF-8'}" value="{$v.id|escape:'html':'UTF-8'}" data-url="{$v.link|escape:'html':'UTF-8'}"{if !empty($v.selected)} checked{/if}>

				{else}
					<a href="#" class="{$af_classes['icon-lock']|escape:'html':'UTF-8'}"></a><input type="hidden" id="{$v.identifier|escape:'html':'UTF-8'}" class="af {$type|escape:'html':'UTF-8'} customer-filter" name="{$filter.submit_name|escape:'html':'UTF-8'}" value="{$v.id|escape:'html':'UTF-8'}" data-name="{$filter.submit_name|escape:'html':'UTF-8'}" data-url="{$v.link|escape:'html':'UTF-8'}">
				{/if}
				{if !empty($v.color_style)}</span>{/if}



				<span class="name">
					{if $v.identifier == "f-1616"}
						Sí
					{else}
						{$v.name|escape:'html':'UTF-8'}
					{/if}

					{if !empty($children)}{*no space!*}<a href="#" class="af-toggle-child"></a>{/if}</span>
				{if $hidden_inputs.count_data}<span class="count">{$count|intval}</span>{/if}
			</label>
			{if $before_cut && $root && (!$hidden_inputs.hide_zero_matches || $count)}{$before_cut = $before_cut - 1}{/if}
			{if !empty($children)}
				{renderBoxes type = $type label_type = $label_type color_display = $color_display values = $children root = false}
			{/if}
		</li>
	{/foreach}
	</ul>
	{/if}
{/function}

{function renderFeatureImage type = 'checkbox' label_type = 'checkbox' values = []}
	{if $values|count}
		<ul class="{$label_type}">
			{$before_cut = count($values)}{if !empty($filter.cut_off) && !$is_horizontal}{$before_cut = $filter.cut_off}{/if}
			{foreach $values as $v}
				{$count = 0}{if !empty($count_data[$filter.first_char][$v.id])}{$count = $count_data[$filter.first_char][$v.id]}{/if}
				{$is_customer_filter = !empty($applied_customer_filters[$k][$v.id])}
				<li class="item-{$v.identifier|escape:'html':'UTF-8'}{if !empty($v.selected)} active{/if}{if $mark_no_matches && !$count} no-matches{/if}{if $is_customer_filter} has-customer-filter{/if}{if !$before_cut} cut{/if}">
					<label for="{$v.identifier|escape:'html':'UTF-8'}" class="af-{$label_type|escape:'html':'UTF-8'}-label{if $is_customer_filter} customer-filter-label" data-id="{$v.identifier|escape:'html':'UTF-8'}{/if}">
						{if !$is_customer_filter}
							{if $label_type == "textbox"}
								<img src="{$urls.base_url}img/fv/{$v.id}.jpg" alt="{$v.name|escape:'html':'UTF-8'}">
							{/if}
							<input type="checkbox" id="{$v.identifier|escape:'html':'UTF-8'}" class="af checkbox" name="{$filter.submit_name|escape:'html':'UTF-8'}" value="{$v.id|escape:'html':'UTF-8'}" data-url="{$v.link|escape:'html':'UTF-8'}"{if !empty($v.selected)} checked{/if}>
						{else}
							<a href="#" class="{$af_classes['icon-lock']|escape:'html':'UTF-8'}"></a><input type="hidden" id="{$v.identifier|escape:'html':'UTF-8'}" class="af {$type|escape:'html':'UTF-8'} customer-filter" name="{$filter.submit_name|escape:'html':'UTF-8'}" value="{$v.id|escape:'html':'UTF-8'}" data-name="{$filter.submit_name|escape:'html':'UTF-8'}" data-url="{$v.link|escape:'html':'UTF-8'}">
						{/if}
						<span class="name">{$v.name|escape:'html':'UTF-8'}{if !empty($children)}{*no space!*}<a href="#" class="af-toggle-child"></a>{/if}</span>
						{if $hidden_inputs.count_data}<span class="count">{$count|intval}</span>{/if}
					</label>
				</li>
			{/foreach}
		</ul>
	{/if}
{/function}

{function renderOptions values = [] nesting_prefix = ''}
	{foreach $values as $v}
		{$count = 0}{if !empty($count_data[$filter.first_char][$v.id])}{$count = $count_data[$filter.first_char][$v.id]}{/if}
		{$is_customer_filter = !empty($applied_customer_filters[$k][$v.id])}
		{if $count || !empty($v.selected) || $is_customer_filter || !$hidden_inputs.hide_zero_matches}
			<option id="{$v.identifier|escape:'html':'UTF-8'}" value="{$v.id|escape:'html':'UTF-8'}" class="{if $is_customer_filter}customer-filter{/if}{if $mark_no_matches && !$count} no-matches{/if}" data-url="{$v.link|escape:'html':'UTF-8'}" data-text="{$v.name|escape:'html':'UTF-8'}"{if !empty($v.selected)} selected{/if}{if !$count && $hidden_inputs.dim_zero_matches} disabled{/if}>
				{if $nesting_prefix}{$nesting_prefix|escape:'html':'UTF-8'}{/if}
				{$v.name|escape:'html':'UTF-8'}
				{if $hidden_inputs.count_data}({$count|intval}){/if}
			</option>
			{if $check_for_children && !empty($filter.values[$v.id])}
				{renderOptions values = $filter.values[$v.id] nesting_prefix = $nesting_prefix|cat:'-'}
			{/if}
		{/if}
	{/foreach}
{/function}

{function renderAvailableSelectOptions values = [] nesting_prefix = ''}
	{foreach $values as $v}
		<span class="{if !empty($applied_customer_filters[$k][$v.id])}customer-filter{/if}" data-value="{$v.id|escape:'html':'UTF-8'}" data-url="{$v.link|escape:'html':'UTF-8'}" data-prefix="{if $nesting_prefix}{$nesting_prefix|escape:'html':'UTF-8'} {/if}" data-text="{$v.name|escape:'html':'UTF-8'}" data-id="{$v.identifier|escape:'html':'UTF-8'}"></span>
		{if $check_for_children && !empty($filter.values[$v.id])}
			{renderAvailableSelectOptions values = $filter.values[$v.id] nesting_prefix = $nesting_prefix|cat:'-'}
		{/if}
	{/foreach}
{/function}

<div id="amazzing_filter" class="af block {$af_layout_type|escape:'html':'UTF-8'}-layout {$hook_name|escape:'html':'UTF-8'}{if !$hidden_inputs.count_data} hide-counters{/if}{if $hidden_inputs.hide_zero_matches} hide-zero-matches{/if}{if $hidden_inputs.dim_zero_matches} dim-zero-matches{/if}{if $hidden_inputs.compact_offset == 1} compact-offset-left{/if}{if !empty($is_iphone)} is-iphone{/if}"{if !$filters && empty($hidden_filters)} style="display:none"{/if}>
	<div class="title_block">
		{if $hidden_inputs.current_controller == 'index'}{l s='Instant filter' mod='amazzingfilter'}{else}{l s='Productos' mod='amazzingfilter'}{/if}
	</div>
	<div class="block_content">
		{if !empty($cf_top)}
			{if $is_horizontal}{$w_class = 'h-el top'}{else}{$w_class = 'top'}{/if}
			{hook h='displayCustomerFilters' mod='amazzingfilter' wrapper_class=$w_class}
		{/if}
		<div class="selectedFilters clearfix hidden{if $is_horizontal} inline{/if}">
			{if $hidden_inputs.sf_position == 1}<span class="selected-filters-label">{l s='Filters:' mod='amazzingfilter'}</span>{/if}
			<div class="clearAll">
				<a href="#" class="all">
					<span class="txt">{l s='BORRAR FILTROS' mod='amazzingfilter'}</span>
{*					<i class="{$af_classes['icon-eraser']|escape:'html':'UTF-8'}"></i>*}
				</a>
			</div>
		</div>
		<form id="af_form" class="af-form" autocomplete="off">
			<span class="hidden_inputs">
				{foreach $hidden_inputs as $name => $value}
					<input type="hidden" id="af_{$name|escape:'html':'UTF-8'}" name="{$name|escape:'html':'UTF-8'}" value="{$value|escape:'html':'UTF-8'}">
				{/foreach}
				{foreach $extra_hidden_inputs as $k => $inputs}
					{foreach $inputs as $key => $grouped_options}
						{foreach $grouped_options as $id_group => $options}
							<input type="hidden" name="{$k|escape:'html':'UTF-8'}[{$key|escape:'html':'UTF-8'}][{$id_group|escape:'html':'UTF-8'}]" value="{implode(',', $options)|escape:'html':'UTF-8'}">
						{/foreach}
					{/foreach}
				{/foreach}
				{if !empty($hidden_filters)}
					{foreach $hidden_filters as $hf}
						{foreach $hf.forced_values as $v}
							<input type="hidden" name="{$hf.submit_name|escape:'html':'UTF-8'}" value="{$v.id|escape:'html':'UTF-8'}" class="{$v.class|escape:'html':'UTF-8'}" data-name="{$v.name|escape:'html':'UTF-8'}" data-url="{$v.link|escape:'html':'UTF-8'}" data-group="{$hf.link|escape:'html':'UTF-8'}">
						{/foreach}
					{/foreach}
				{/if}
			</span>
			{if $hidden_inputs.more_f && $hidden_inputs.more_f < count($filters)}
				{$more_f = ['before' => $hidden_inputs.more_f, 'counter' => 0]}
			{/if}
			{assign var="Ncolumn" value=1}
			{assign var="Ncolumncount" value=0}
			{assign var="Ncolumncountaux" value=0}

			{foreach $filters as $k => $filter}
{*				{$filter|dump}*}
			{if !empty($filter.values)}
			{$check_for_children = !empty($filter.id_parent) && !empty($filter.values[$filter.id_parent])}
			{if !empty($more_f)}
				{if !isset($filter.classes['no-available-items']) || !$hidden_inputs.hide_zero_matches}{$more_f.counter = $more_f.counter + 1}{/if}
				{if $more_f.counter > $more_f.before && empty($filter.has_selection)}{$filter.classes['more-f'] = 1}{/if}
			{/if}

			{if $Ncolumn == 1}
				{assign var="Ncolumn" value=0}
				<div class="column">
			{/if}

			<div class="af_filter{if $is_horizontal} h-el{/if}
						{foreach $filter.classes as $class => $value}
							{if $class == "closed"}
								 {if $closedfilter == true}
									{$class}
								{/if}
							{else}
								{$class}
							{/if}
						{/foreach}
{*						{implode(' ', array_keys($filter.classes))|escape:'html':'UTF-8'} *}
						{if $closedfilter == true}closed{/if} {if isset($filter.minimized)}isminimized{/if}" data-key="{$filter.first_char|escape:'html':'UTF-8'}" data-url="{$filter.link|escape:'html':'UTF-8'}" data-type="{$filter.type|intval}">
				<div class="af_subtitle toggle-content{if !empty($filter.special)} hidden{/if}">
					<span>{$filter.name|escape:'html':'UTF-8'}</span>
					{if $filter.id_group == 579}
						<div class="af-filter-info">
							<img src="{$urls.img_url}info.svg" alt="info" class="af-info-image">
							<div class="af-info-text">
								{l s='La superficie indicada para calefacción es aproximada, basada en una altura estándar y un cálculo térmico estimado de 100 W/m². Para el uso de calentar toallas, la demanda térmica es inferior.' d='Modules.Amazzingfilter.Shop'}
							</div>
						</div>
					{/if}
				</div>
				<div class="af_filter_content">
				{if !empty($filter.quick_search)}
					<div class="af-quick-search">
						<input type="text" class="qsInput" data-notrigger="1"{if $check_for_children} data-tree="1"{/if}>
						<div class="alert-warning qs-no-matches hidden">{l s='no matches' mod='amazzingfilter'}</div>
					</div>
				{/if}
				{if $filter.type == 1 || $filter.type == 2}
					{$values = $filter.values}
					{if $check_for_children}{$values = $filter.values[$filter.id_parent]}{/if}
					{$type = 'checkbox'}{if $filter.type == 2}{$type = 'radio'}{/if}
					{$label_type = $type}{if !empty($filter.textbox)}{$label_type='textbox'}{/if}
					{$color_display = 0}{if !empty($filter.color_display)}{$color_display = $filter.color_display}{$label_type='color'}{/if}
					{renderBoxes type = $type label_type = $label_type color_display = $color_display values = $values}
				{elseif $filter.type == 3}
					{$values = $filter.values}
					{if $check_for_children}{$values = $filter.values[$filter.id_parent]}{/if}
					{if !empty($applied_customer_filters[$k])}
						{$customer_filter_id = current(array_keys($applied_customer_filters[$k]))}
						{$customer_filter_name = $values[$customer_filter_id]['name']}
						<label class="customer-filter-label for-select" data-id="{$filter.first_char|escape:'html':'UTF-8'}-{$customer_filter_id|escape:'html':'UTF-8'}">
							<a href="#" class="{$af_classes['icon-lock']|escape:'html':'UTF-8'}"></a>
							<span class="name">{$customer_filter_name|escape:'html':'UTF-8'}</span>
						</label>
						<div class="selector-with-customer-filter hidden">
					{/if}
					<select id="selector-{$k|escape:'html':'UTF-8'}" class="af-select form-control form-control-select" name="{$filter.submit_name|escape:'html':'UTF-8'}">
						<option value="" class="first">{if !empty($filter.first_option)}{$filter.first_option|escape:'html':'UTF-8'}{else}--{/if}</option>
						{renderOptions values = $values}
					</select>
					<div class="dynamic-select-options hidden">
						{renderAvailableSelectOptions values = $values}
					</div>
					{if !empty($applied_customer_filters[$k])}</div>{/if}
				{elseif $filter.type == 4}
					<div class="{$k|escape:'html':'UTF-8'}_slider af-slider" data-url="{$filter.link|escape:'html':'UTF-8'}" data-type="{$k|escape:'html':'UTF-8'}">
						<div class="slider-bar" data-step="{$filter.slider_step|floatval}">{* filled dynamically *}</div>
						<div class="slider-values">
							<span class="from_display slider_value">
								<span class="prefix">{$filter.prefix|escape:'html':'UTF-8'}</span><span class="value"></span><span class="suffix">{$filter.suffix|escape:'html':'UTF-8'}</span>
								<input type="text" id="{$k|escape:'html':'UTF-8'}_from" class="input-text" name="{$filter.submit_name|escape:'html':'UTF-8'}[from]" value="{$filter.values.from|floatval}" >
								<input type="hidden" id="{$k|escape:'html':'UTF-8'}_min" name="{$filter.submit_name|escape:'html':'UTF-8'}[min]" value="{$filter.values.min|floatval}" >
							</span>
							<span class="to_display slider_value">
								<span class="prefix">{$filter.prefix|escape:'html':'UTF-8'}</span><span class="value"></span><span class="suffix">{$filter.suffix|escape:'html':'UTF-8'}</span>
								<input type="text" id="{$k|escape:'html':'UTF-8'}_to" class="input-text" name="{$filter.submit_name|escape:'html':'UTF-8'}[to]" value="{$filter.values.to|floatval}">
								<input type="hidden" id="{$k|escape:'html':'UTF-8'}_max" name="{$filter.submit_name|escape:'html':'UTF-8'}[max]" value="{$filter.values.max|floatval}">
							</span>
						</div>
					</div>
				{elseif $filter.type == 6}
					{$values = $filter.values}
					{$type = 'feature_image'}
					{$label_type='textbox'}
					{renderFeatureImage type = $type label_type = $label_type values = $values}
				{/if}
				{if !empty($filter.cut_off)}
					<a href="#" class="toggle-cut-off" data-cut="{$filter.cut_off|intval}">
						<span class="more">{l s='more...' mod='amazzingfilter'}</span>
						<span class="less">{l s='less' mod='amazzingfilter'}</span>
					</a>
				{/if}
				</div>
			</div>
			{/if}


					{if $Ncolumncount == 30 && $Ncolumncountaux < 150 }
						{assign var="Ncolumn" value=1}
						{assign var="Ncolumncount" value=0}
						</div>

					{else}
						{assign var="Ncolumncount" value=$Ncolumncount + 1}
					{/if}
				{assign var="Ncolumncountaux" value=$Ncolumncountaux + 1}


			{/foreach}
			<div>

         <div class="showfilter af_filter isminimized">
             <div class="af_subtitle">
                 <span class="material-icons">tune</span>
                 <span class="txt">{l s='Filtro' d='Shop.Theme.Actions'}</span>
             </div>
         </div>
            </div>

			{*if !empty($more_f)}
				<div class="text-center{if $is_horizontal} h-el{/if}{if $more_f.counter <= $more_f.before} hidden{/if}">
					<button type="button" class="btn toggleMoreFilters" data-num="{$more_f.before|intval}">
						<span class="more-txt"><i class="icon-plus"></i> {l s='More filters' mod='amazzingfilter'}</span>
						<span class="less-txt"><i class="icon-minus"></i> {l s='Less filters' mod='amazzingfilter'}</span>
					</button>
				</div>
			{/if*}
		</form>
		<div class="btn-holder hidden{if $is_horizontal} h-el{/if}">
			<a href="#" class="btn btn-primary full-width viewFilteredProducts{if $hidden_inputs.reload_action != 2} hidden{/if}">
				{l s='View products' mod='amazzingfilter'} <span class="af-total-count">{$total_products|intval}</span>
			</a>
		</div>
		{if !empty($cf_bottom)}
			{if $is_horizontal}{$w_class = 'h-el bottom'}{else}{$w_class = 'bottom'}{/if}
			{hook h='displayCustomerFilters' mod='amazzingfilter' wrapper_class=$w_class}
		{/if}
	</div>
	<a href="#" class="btn-primary compact-toggle type-{$hidden_inputs.compact_btn|intval}">
		<span class="{$af_classes['icon-filter']|escape:'html':'UTF-8'} compact-toggle-icon"></span>
		<span class="compact-toggle-text">{l s='Filter' mod='amazzingfilter'}</span>
	</a>
</div>
<div class="af-compact-overlay"></div>
{* since 3.2.6 *}
