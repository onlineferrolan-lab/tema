{*
* 2007-2017 IQIT-COMMERCE.COM
*
* NOTICE OF LICENSE
*
*  @author    IQIT-COMMERCE.COM <support@iqit-commerce.com>
*  @copyright 2007-2017 IQIT-COMMERCE.COM
*  @license   GNU General Public License version 2
*
* You can not resell or redistribute this software.
*
*}

{function name="mobile_links" nodes=[] first=false nameparent=false type=type}
	{strip}
		{if $nodes|count}
			{if !$first}<ul>{/if}
			{if $nameparent != false}<li class="goparent"><span>{$nameparent}</span> <i class="material-icons d-inline">arrow_back_ios</i></li>{/if}
			{foreach from=$nodes key=key item=node}
				{if isset($node.title)}
					<li class="{$type} item{$key} {if $node.href == "#"}{/if}">{if isset($node.children)}<div class="responsiveInykator"><i class="material-icons d-inline">arrow_forward_ios</i></div>{/if}<a href="{$node.href}" title="{$node.title}">{$node.title}</a>
						{if isset($node.children)}
							{mobile_links nodes=$node.children first=false nameparent=$node.title type=$type}
						{/if}
					</li>
				{/if}
			{/foreach}
			{if !$first}</ul>{/if}
		{/if}
	{/strip}
{/function}


{if isset($menu)}
	{mobile_links nodes=$menu first=true nameparent=false type=$type}
{/if}