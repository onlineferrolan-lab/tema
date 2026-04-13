<div id="ecommaddtocart_nostock_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                {l s='Aviso de stock disponible' mod='ecommaddtocart'}
                <button type="button" class="close" data-dismiss="modal" aria-label="{l s='Close' mod='ecommaddtocart'}">
                    <span aria-hidden="true"><i class="material-icons">close</i></span>
                </button>

            </div>
            <div class="modal-body">
                <div class="content">

                    {if !$customer.is_logged}
                        <div class="header">
                            {l s='Indícanos tu e-mail y te avisaremos cuando este producto vuelva a estar disponible.' mod='ecommaddtocart'}
                        </div>
                        <input type="text" class="form-control email" class="email" placeholder="{l s='E-mail' mod='ecommaddtocart'}">
                    {else}
                        <div class="header">
                            {l s='Pulsa en "Avisarme" y te mandaremos un mail cuando este producto vuelva a estar disponible.' mod='ecommaddtocart'}
                        </div>
                    {/if}


                    {if isset($ecommaddtocart_id_module_psmailalerts) && $ecommaddtocart_id_module_psmailalerts > 0}
                        {hook h='displayGDPRConsent' id_module=$ecommaddtocart_id_module_psmailalerts}
                        <div class="error gdprerror">{l s='Debes aceptar los términos' mod='ecommaddtocart'}</div>
                    {/if}

                    <div class="resultscontent">
                        <div class="error erromail">{l s='Email incorrecto' mod='ecommaddtocart'}</div>
                        <div class="error ajax"></div>
                        <div class="success ajax"></div>
                    </div>

                    <button class="btn btn-primary ajaxcall" id_product="">
                        <span class="material-icons">notifications_active</span>
                        <span>{l s='Avisarme' mod='ecommaddtocart'}</span>
                    </button>
                </div>

            </div>
        </div>
    </div>
</div>