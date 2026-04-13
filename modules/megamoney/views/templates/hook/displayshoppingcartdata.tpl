{if $allproducts == 1 && $arrayMoneys}
    <div class="card megamoney">
        <p class="label" style="margin-right: 38px;margin-top: 15px;margin-bottom: 15px;">{l s='If you want you can generate a discount on the cart using the money you have in mind, simply enter the amount you want to use and click the button to add money to Cart' mod='megamoney'}</p>
        <hr class="separator">
        <table class="table table-bordered" id="megamoney_summary">
            <thead>
            <tr>
                <th>{l s='Product Name' mod='megamoney'}</th>
                <th>{l s='Total' mod='megamoney'}</th>
                <th>{l s='Max Money Pay' mod='megamoney'}</th>
            </tr>
            </thead>
            <tbody>
            {foreach from=$arrayMoneys item=product}
                <tr>
                    <td>{$product.name}</td>
                    <td>{$product.total}</td>
                    <td>{$product.max}</td>
                </tr>


            {/foreach}
            </tbody>

            <tfoot>
            <tr>
                <td>
                    <strong>
                        {l s='Money in your account' mod='megamoney'}:  {Tools::displayPrice($megamoney_money)}
                    </strong>
                </td>
                <td>
                    <form  method="{$megamoney_type}" action="" class="form-horizontal" id="cartmoney">
                        <input type="number" size="8" id="moneycart" name="moneycart" step="0.01" max="{$megamoney_limit}" value="0" />
                        <button style="margin-top:10px;" type="submit" class="btn btn-primary" id="submitMoneyCart" name="submitMoneyCart" >{l s='Add Money To Cart' mod='megamoney'}</button>
                    </form>
                </td>
                <td><strong class="sumTotal">{$megamoney_sumtotal}</strong></td>
            </tr>
            </tfoot>

        </table>
    </div>
{/if}

{if $allproducts == 0}
    <div class="card-block cart-element products shoppingMegamoney">
        <div class="title">
            <span>
                {l s='Money in your account' mod='megamoney'} {Tools::displayPrice($megamoney_money)}
            </span>
        </div>
        <div id="shoppingMegamoneyContent">

        <div class="panel card box">


            <form  method="{$megamoney_type}" action="" class="form-horizontal" id="cartmoney">
                <span class="labeltotalapply">
                    {l s='Import to apply' mod='megamoney'} <span class="sumTotal">
                ({l s='Max.' mod='megamoney'} {Tools::displayPrice($megamoney_limit)})
            </span>

                </span>
                <div class="moneyapplycontrols">
                <input type="number" size="8" id="moneycart" name="moneycart" step="0.01" min="0" max="{$megamoney_limit}" value="0" />
                <span class="symbol">{Context::getContext()->currency->symbol}</span>
                <button type="submit" class="btn btn-primary btn-moneycart" name="submitMoneyCart" >{l s='Add Money To Cart' mod='megamoney'}</button>
{*                <button style="margin-top:10px;" type="submit" class="btn btn-primary" name="submitAllMoneyCart" >{l s='Add All Total Cart' mod='megamoney'}</button>*}
                </div>
            </form></div>
        </div>
    </div>
{/if}