/*
* 2011-2016 
*
*  @author Jorge Donet Alberola <soporte@alabazweb.com> 
*  V7.0
*/
if(typeof baseDir==="undefined" && typeof prestashop!=="undefined")
	baseDir = prestashop.urls.base_url;
//$.fn.mColorPicker.defaults.imageFolder = baseDir + 'img/admin/';

var tooltipTimeout;
var arrayMPHelp = new Array();
var blockedMPTable = false;
var MegaProduct = jQuery.Class({
	init: function()
	{
		this.quantityInput = $('#quantity_wanted');
		this.backupInput = $("input[type='hidden'][name='submitCustomizedDatas']");
		this.quantityCont = $('#quantity_wanted_p');
		this.attributesCont = $('#attributes');
		this.customizationCont = $('.customization_block');
		this.addCartCont = $('.add_to_cart');
		this.heightInput = $('#id_height');
		this.widthInput = $('#id_width');
		this.longInput = $('#id_long');
		
		this.addCartBtn = $('.add .add-to-cart');
		this.addBtn = $('#btnAddProduct');
		this.saveCustoBtn = $('#customizedDatas .button');
		this.pageInfoCont = $('#buy_block > p');
		this.MPInitialized = false;
		
		this.id_product = 0;
		this.config_product = 0;
		this.height_min = 0;
		this.height_max = 0;
		this.default_height_min = 0;
		this.defaul_height_max = 0;
		this.height_measure = 'm';
		this.height_eval = '';
		this.height_sections = 0;
		this.height_default = 0;
		this.width_min = 0;
		this.width_max = 0;
		this.default_width_min = 0;
		this.default_width_max = 0;
		this.width_measure = 'm';
		this.width_eval = '';
		this.width_sections = 0;
		this.width_default = 0;
		this.long_min = 0;
		this.long_max = 0;
		this.default_long_min = 0;
		this.default_long_max = 0;
		this.long_measure = 'm';
		this.long_eval = '';
		this.long_sections = 0;
		this.long_default = 0;
		this.quantity_min = 0;
		this.quantity_max = 0;
		this.qty_min = 0;
		this.qty_max = 0;
		this.multiple_min = 0;
		this.measureconvert = 0;
		
		
		this.custom_id = 0;
		this.productType = 'M2';
		this.measure = 'mm';
		this.productmeasure = 'm';
		this.before_price = '';
		this.after_price = '';
		this.stock = '';
		this.modal_info = 0;
		this.ajax_price = 0;
		this.eval_math = 0;
		this.range_limit = 0;
		this.attrPrices = new Array();
		this.arrayRanges = new Array();
		this.arrayMeasureAttr = new Array();
		this.arrayLayers = new Array();
		this.arrayGroups = new Array();
		this.arrayLimits = new Array();
		this.arrayLamas = new Array();
		this.arrayChangeDefMeasures = new Array();
		this.arrayChangeLimits = new Array();
		this.weight = 0;
		this.proportion = 0;
		this.applyMinQty = 1;
		this.launchId = '';
		this.initEvents();
		this.globalMeasure = 'm';
		this.loadPage = 0;
		this.urls = 0;
		this.qtysufix = '';
		this.qtydefault = 1;
		this.qty_step = 1;
		
		this.current_height_default = 0;
		this.current_width_default = 0;
		this.current_long_default = 0;
		this.arrayDisableMeasures = new Array();
		this.applyDisableMeasures = false;
		this.applyDisableMeasureRule = true;
		this.arraySelectedOptions = new Array();
		this.arrayRuleOptions = new Array();
		this.applyRuleOptions = true;
	},
	addLayer : function(id,attr, position){
		var valueToPush = new Array();
		valueToPush['id_layer'] = id;
		valueToPush['attributes'] = attr.split(",");
		valueToPush['position'] = position;
		this.arrayLayers.push(valueToPush);
	},
	addAttrMeasure : function(id,measure){
		var valueToPush = new Array();
		valueToPush['id'] = id;
		valueToPush['measure'] = measure;
		valueToPush['selected'] = false;
		this.arrayMeasureAttr.push(valueToPush);
	},
	addAttrLimit : function(id,type,value,attrs){
		var valueToPush = new Array();
		valueToPush['id'] = id;
		valueToPush['type'] = type;
		valueToPush['value'] = value;
		valueToPush['attrs'] = value;
		this.arrayLimits.push(valueToPush);
	},
	addAttrChangeDefMeasure : function(id,type,formula,value,attrs){
		var valueToPush = new Array();
		valueToPush['id'] = id;
		valueToPush['type'] = type;
		valueToPush['formula'] = formula;
		valueToPush['value'] = value;
		valueToPush['attrs'] = attrs;
		this.arrayChangeDefMeasures.push(valueToPush);
	},
	addAttrChangeLimits : function(id,type,formula,value,attrs){
		var valueToPush = new Array();
		valueToPush['id'] = id;
		valueToPush['type'] = type;
		valueToPush['formula'] = formula;
		valueToPush['value'] = value;
		valueToPush['attrs'] = attrs;
		this.arrayChangeLimits.push(valueToPush);
	},
	addAttrPrice : function(id,price,pricebeforedisc,attributes){
		var valueToPush = new Array();
		valueToPush['id'] = id;
		valueToPush['price'] = price;
		valueToPush['pricebeforedisc'] = pricebeforedisc;
		valueToPush['attributes'] = attributes;
		this.attrPrices.push(valueToPush);
	},
	addRange : function(width, height, long, measure,price,id_attribute){
		var valueToPush = new Array();
		valueToPush['id_attribute'] = id_attribute;
		valueToPush['price'] = price;
		valueToPush['width'] = width;
		valueToPush['height'] = height;
		valueToPush['long'] = long;
		valueToPush['measure'] = measure;
		this.arrayRanges.push(valueToPush);
	},
	addLama : function(id,measure){
		var valueToPush = new Array();
		valueToPush['id'] = id;
		valueToPush['measure'] = measure;
		
		this.arrayLamas.push(valueToPush);
	},
	setProductType : function(type){
		this.productType = type;
		this.MPInitialized = true;
		
	},
	setIdProduct : function(idProduct){
		this.id_product = idProduct;
	},
	setConfigProduct : function(configProduct){
		this.config_product = configProduct;
	},
	setHeightMin : function(value){
		this.height_min = value;
		this.default_height_min = value;
	},
	setHeightMax : function(value){
		this.height_max = value;
		this.default_height_max = value;
	},
	setHeightMeasure : function(value){
		this.height_measure = value;
	},
	setHeightEval : function(value){
		this.height_eval = value;
	},
	setHeightSections : function(value){
		this.height_sections = value;
	},
	setHeightDefault : function(value){
		this.height_default = value;
	},
	setWidthMin : function(value){
		this.width_min = value;
		this.default_width_min = value;
	},
	setWidthMax : function(value){
		this.width_max = value;
		this.default_width_max = value;
	},
	setWidthMeasure : function(value){
		this.width_measure = value;
	},
	setWidthEval : function(value){
		this.width_eval = value;
	},
	setWidthSections : function(value){
		this.width_sections = value;
	},
	setWidthDefault : function(value){
		this.width_default = value;
	},
	setLongMin : function(value){
		this.long_min = value;
		this.default_long_min = value;
	},
	setLongMax : function(value){
		this.long_max = value;
		this.default_long_max = value;
	},
	setLongMeasure : function(value){
		this.long_measure = value;
	},
	setLongEval : function(value){
		this.long_eval = value;
	},
	setLongSections : function(value){
		this.long_sections = value;
	},
	setLongDefault : function(value){
		this.long_default = value;
	},
	setQuantityMin : function(value){
		this.quantity_min = value;
	},
	setQuantityMax : function(value){
		this.quantity_max = value;
	},
	setQtyMin : function(value){
		this.qty_min = value;
	},
	setQtyMax : function(value){
		this.qty_max = value;
	},
	setMultipleMin : function(value){
		this.multiple_min = value;
	},
	setCustomId : function(value){
		this.custom_id = value;
	},
	setMeasure : function(value){
		this.measure = value;
	},
	setProductMeasure : function(value){
		this.productmeasure = value;
	},
	setBeforePrice : function(value){
		this.before_price = value;
	},
	setAfterPrice : function(value){
		this.after_price = value;
	},
	setStock : function(value){
		this.stock = value;
	},
	setModalInfo : function(value){
		this.modal_info = value;
	},
	setAjaxPrice : function(value){
		this.ajax_price = value;
	},
	setEvalMath : function(value){
		this.eval_math = value;
	},
	setRangeLimit : function(value){
		this.range_limit = value;
	},
	setWeight : function(value){
		this.weight = value;
	},
	setProportion : function(value){
		this.proportion = value;
	},
	setMeasureConvert : function(value){
		this.measureconvert = value;
	},
	setGlobalMeasure : function(value){
		this.globalMeasure = value;
	},
	setURLS : function(value){
		this.urls = value;
	},
	setQtyDefault : function(value){
		this.qtydefault = value;
	},
	setQtyStep : function(value){
		this.qty_step = value;
	},
	setCurrentHeightDefault : function(value) {
		this.current_height_default = value;
	},
	setCurrentWidthDefault : function(value) {
		this.current_width_default = value;
	},
	setCurrentLongDefault : function(value) {
		this.current_long_default = value;
	},
	initEvents : function(){
				
	},
	hideContainers : function(){
		
		$('.add .add-to-cart').addClass('mpHide');
		//this.addCartCont.addClass('mpHide');
		//this.pageInfoCont.hide();
		$('#availability_label').hide();
		$('#pQuantityAvailable').hide();
		$('#availability_value').hide();
		$('#quantity_wanted_p').show();
		this.changePrice();
		if(!$('#megagroups').length){
			
			showStepResult();
		}
		else{
			$('.product-add-to-cart').hide();
			$('.product-quantity').hide();
		}
		// MODIFICACION ALABAZ
		if($('.mploadnext').length){
			var elements = $('.mploadnext');
			elements = elements.slice(1);
			$(elements).each(function(){
				$(this).addClass('mpNoClick');
			});
		}
			
		
	},
	
	showAlert : function(htmlInfo){
		$('#mpErrorText').html(htmlInfo);
		this.showLimits();
	},
	showLimits : function(){
		
		if(this.loadPage==0)
		return;
		if(this.modal_info==1)
		{
			if($('#megaproducterror').html()!='')
			{	
				$('#megaproducterror').dialog({
			        resizable: false,
			        modal: true,
			        width:'auto',
			        open: function( event, ui ) {$('#megaproducterror').show();}
			   });		
			}		
		}
		else
		{
			$('#megaproducterror').show();
		}
	},
	displayPrice : function(price,widthCurrency){
		var priceshow = parseFloat(price).toFixed(2); 
		
		if(widthCurrency)
			priceshow = priceshow.replace(/\./g,",")+' ' +prestashop.currency.sign;
			//priceshow = formatCurrency(priceshow, currencyFormat, currencySign, currencyBlank);
			
		return priceshow;
	},
	getAttrPrice : function(disc){
		var price = 0;
		var arrayPrices = this.attrPrices;
		if(this.attrPrices.length>0)
		{
			var ids = new Array(); 
			
			$('#attributes select, #attributes input[type=hidden], #attributes input[type=radio]:checked').each(function(){
				ids.push($(this).val());
			});
			$.each(ids, function(index, value) {
				var id = parseInt(value);
				for (var i=0;i<arrayPrices.length;i++)
				{
				  if(arrayPrices[i]['id']==id)
				  {
					  var applyPrice = true;
					  var attributes = arrayPrices[i]['attributes'];
					  if(attributes!='')
					  {
						 arrayAttributesAttr =  attributes.split(',');
						 for(var j =0;j<arrayAttributesAttr.length;j++)
						 {
							 if(!in_array(arrayAttributesAttr[j], ids))
								 applyPrice = false;
						 }
					  }
						  
					  if(applyPrice)
					  {
						  if(disc)
							  price += arrayPrices[i]['price'];
						  else
							  price += arrayPrices[i]['pricebeforedisc'];
					  }
				  }
				}
				
			});
		}
		return price;
	},
	changePrice : function(){
		if(this.ajax_price!=1)
		{
			//var price = this.priceAsFloat($('#our_price_display').html());
			var price = $('#mppricedisc').val();
			var newprice = parseFloat($('#mpprice').val());
			var attrPrice = this.getAttrPrice(true);
			var pricebase = newprice+attrPrice;
			if(pricebase==0)
			{
				$('.our_price_display').hide();	
				return;
			}
			else
			{
				$('.our_price_display').show();
			}
			if($('#pretaxe_price_display').length>0)
			{
				 var pricewt = pricebase/(1+(taxRate/100));
				 $('#pretaxe_price_display').html(_MP.displayPrice(pricewt,true)); 
			}
			var labelshowprice = this.displayPrice(pricebase,true)+this.after_price;
			if(this.before_price!='')
				labelshowprice = this.before_price+ ' '+ labelshowprice;
			$('#our_price_display').html(labelshowprice);
				if($('.mp_total_price').length)
					$('.mp_total_price').html($('#our_price_display').html());
			
			if($('#old_price_display').length>0)
			{
				var pricedisc = this.priceAsFloat($('#old_price_display').html());
				var newpricedisc = parseFloat($('#mppricedisc').val());
				var pricebasedisc = newpricedisc+this.getAttrPrice(false);
				
				var labelshowprice = this.displayPrice(pricebasedisc,true)+this.after_price;
				$('#old_price_display').html(labelshowprice);
				
			}	
		}
	},
	priceAsFloat : function (price){ 
		var arr = price.split(' ');
		if(arr.length>0)
		   return parseFloat(arr[0].replace(/\./g, '').replace(/,/g,'.').replace(/[^\d\.]/g,''), 10);
		return 0;
	},

	extractPrice : function(price){	
		var value = price.replace(prestashop.currency.sign,'');	
	},
	getTotalMeasure : function()
	{
		if(this.eval_math==1)
		{
			var total = getTotalMeasureByAjax();
			return total;
		}
		var width = 1;
		var height = 1;
		var long = 1;
		if($('#id_width').length > 0)
		{
			width=this.changeMeasure(this.width_measure,this.productmeasure, $('#id_width').val());
		}
		if($('#id_height').length > 0)
		{
			height=this.changeMeasure(this.height_measure,this.productmeasure, $('#id_height').val());
		}
		if($('#id_long').length > 0)
		{
			long=this.changeMeasure(this.long_measure,this.productmeasure, $('#id_long').val());
		}
		var total = width*height*long;
		return total;
	},
	changeMeasure : function(megameasure,changemeasure,measure){
		
		var m = measure;
		if(changemeasure=='m'){
			if(megameasure=='dm'){
				m=measure/10;
			}else if(megameasure=='cm'){
				m=measure/100;
			}else if(megameasure=='mm'){
				m=measure/1000;
			}
		}
		else if(changemeasure=='dm'){
			if(megameasure=='m'){
				m=measure*10;
			}else if(megameasure=='cm'){
				m=measure/10;
			}else if(megameasure=='mm'){
				m=measure/100;
			}
		}
		else if(changemeasure=='cm'){
			if(megameasure=='m'){
				m=measure*100;
			}else if(megameasure=='dm'){
				m=measure*10;
			}else if(megameasure=='mm'){
				m=measure/10;
			}	
		}
		else if(changemeasure=='mm'){
			if(megameasure=='m'){
				m=measure*1000;
			}else if(megameasure=='dm'){
				m=measure*100;
			}else if(megameasure=='cm'){
				m=measure*10;
			}	
		}
		return m;
	},
	checkRangeLimits : function(){
		if(this.arrayRanges.length)
		{
			var arrayIds = getSelectedIds();
			this.heightInput = $('#id_height');
			this.widthInput = $('#id_width');
			this.longInput = $('#id_long');
			var width = parseFloat(this.widthInput.val());
			var height = parseFloat(this.heightInput.val());
			var long = parseFloat(this.longInput.val());
			for(var i=0;i<this.arrayRanges.length;i++)
			{
				if(this.arrayRanges[i]['id_attribute']==0 || in_array(this.arrayRanges[i]['id_attribute'],arrayIds))
				{
					if(parseFloat(this.arrayRanges[i]['width'])>= width && parseFloat(this.arrayRanges[i]['height'])>=height)
					{
						return true;
					
					} else if(parseFloat(this.arrayRanges[i]['long'])>= long){
							return true;
					}
				}
			}
			return false;
		}
		return true;
	},
	checkRanges : function(){
			
		//if(_MP.arrayMeasureAttr.length)
			//return true;
		this.heightInput = $('#id_height');
		this.widthInput = $('#id_width');
		this.longInput = $('#id_long');
		this.heightInput.val(function(i, v) { //index, current value
			  return v.replace(",",".");
			});
		this.widthInput.val(function(i, v) { //index, current value
			  return v.replace(",",".");
			});
		this.longInput.val(function(i, v) { //index, current value
			  return v.replace(",",".");
			});
		
		if(this.productType=='M2' || this.productType=='M3'){
			
			if( (!$('#mp-step-height').length && !$('#mp-height').hasClass('mpHide')) || ($('#mp-step-height').length && !$('#mp-step-height').hasClass('mpHide')) && $(this.heightInput).parents('.hideMegaField').length==0)
			{
				
				if(this.height_min!=-1)
				if(this.heightInput.val()==0 || this.heightInput.val() == ''){
					this.showAlert(errorInfo0);
					return false;
				}
				if(this.height_max!=0 && this.heightInput.val()>this.height_max){
					this.showLimits();
					return false;
				}
				if(this.height_min!=0 && this.heightInput.val()<this.height_min){
					this.showLimits();
					return false;
				}
				if(this.height_sections!=0)
				{  
					var heightvalue = parseFloat(this.heightInput.val())*100-parseFloat(this.height_min)*100;
					if((heightvalue.toFixed(4)%(parseFloat(this.height_sections)*100))!=0){
						this.showLimits();
						return false;
					}
				}
			
			}
			if( (!$('#mp-step-width').length && !$('#mp-width').hasClass('mpHide')) || ($('#mp-step-width').length && !$('#mp-step-width').hasClass('mpHide')) && $(this.widthInput).parents('.hideMegaField').length==0 )
			{
				if(this.width_min!=-1)
				if(this.widthInput.val()=='' || this.widthInput.val()==0){
					this.showAlert(errorInfo0);
					return false;
				}
				if(this.width_max!=0 && this.widthInput.val()>this.width_max){
					this.showLimits();
					return false;
				}
				if(this.width_min!=0 && this.widthInput.val()<this.width_min){
					this.showLimits();
					return false;
				}
				if(this.width_sections!=0)
				{  
					var widthvalue = parseFloat(this.widthInput.val())*100-parseFloat(this.width_min)*100;
					if((widthvalue.toFixed(4)%(parseFloat(this.width_sections)*100))!=0){
						this.showLimits();
						return false;
					}
				}
			}
			if(this.range_limit==1)
			{
				if(!this.checkRangeLimits())
				{
					$('#btnRanges').click();
					return;
				}
			}
		}
		if(this.productType=='M3' || this.productType=='D'){
			
			if( (!$('#mp-step-long').length && !$('#mp-long').hasClass('mpHide')) || ($('#mp-step-long').length && !$('#mp-step-long').hasClass('mpHide')) )
			{
				if(this.long_min!=-1)
				if(this.longInput.val()==0 || this.longInput.val() == ''){
					this.showAlert(errorInfo0);
					return false;
				}
				if(this.long_max!=0 && this.longInput.val()>this.long_max){
					this.showLimits();
					return false;
				}
				if(this.long_min!=0 && this.longInput.val()<this.long_min){
					this.showLimits();
					return false;
				}
				if(this.long_sections!=0)
				{  
					var longvalue = parseFloat(this.longInput.val())*100-parseFloat(this.long_min)*100;
					if((longvalue.toFixed(4)%(parseFloat(this.long_sections)*100))!=0){
					this.showLimits();
					return false;
					}
				}
			}
		}
		if(this.getTotalMeasure()<this.quantity_min || (this.getTotalMeasure()>this.quantity_max && this.quantity_max>0))
		{
			this.showLimits();
			return false;
		}
		if(!checkLimitMinQuantity(true))
			return false;
		if(this.long_eval!='' || this.width_eval!='' || this.height_eval!=''){
			if(!checkEvalMeasures()){
				this.showLimits();
				return false;
			}
		}
		
		if(this.stock!='')
		{
			var qty = parseInt($('#quantity_wanted').val());
			var totalmeasure = this.getTotalMeasure();
			var total = qty*totalmeasure;
			if(total>parseFloat(this.stock))
			{
				this.showAlert(errorInfo1);
				return false;
			}
		}
		return true;
	}
});



function calculeprice(idProduct, idCombination, addedFromProductPage, callerElement, quantity, whishlist, width, height,long, print){
	

	if(typeof mpOnlaunch!='undefined')
		mpOnlaunch = 1;
	
	if(typeof mpAddProduct!='undefined' && mpAddProduct==2)
	{
		quantity = 1;
	}
	var sendgroups = getSendGroups(quantity);
	if(!sendgroups)
		return;
	
	
	if(print)
		sendgroups +='&print=1';
	
	if($('#measure-use').length)
		sendgroups += '&measureconvert='+$('#measure-use').val();
	
	
	$.ajax({
		type: 'POST',
		url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct',
		async: false,
		cache: false,
		dataType : "html",
		data: 'width='+getMeasure('width')+'&height='+getMeasure('height')+'&long='+getMeasure('long')+sendgroups+'&qty=' + ((quantity && quantity != null) ? quantity : '1') + '&id_product=' + idProduct + '&token=' + static_token + ( (parseInt(idCombination) && idCombination != null) ? '&ipa=' + parseInt(idCombination): ''),
		success: function(jsonData,textStatus,jqXHR)
		{
			if(jsonData)
			{
					if($('#calculePrice').length)
						$('#calculePrice').remove();
			
				if(_MP.modal_info==1)
				{
					$('#megaproduct').append(jsonData);
						
					if($('#mpinfo-image').length && $('#bigpic').length)
					{
						$('#mpinfo-image').attr('src', $('#bigpic').attr('src'));
					}
					if($('#extraInfoProducts').length>0)
					{
						$('#extraInfoProducts').append(getInfoExtraProduct());
					}
					$('#our_price_display').html($('#mp-total').html());
					$('.our_price_display').show();
					if($('#mp-total-price').length)
					{
						var price = parseFloat($('#mp-total-price').val());
						if($('#old_price_display').length>0 && $('#reduction_percent_display').lenght>0)
						{
				 				var discount = $('#reduction_percent_display').html();
							 discount = discount.replace("%", "");
							 discount = discount.replace("-", "");
							 discount = _MP.priceAsFloat(discount)/100;
							 var pricedisc = price/(1-discount);
							 $('#old_price_display').html(_MP.displayPrice(pricedisc,true));
							 if($('#price_reduction_display').length)
								 $('#price_reduction_display').html(_MP.displayPrice(price-pricedisc,true));
					 	} 
					 	if($('#pretaxe_price_display').length>0)
						{
							 var pricewt = price/(1+(taxRate/100));
							 $('#pretaxe_price_display').html(_MP.displayPrice(pricewt,true)); 
						}
					}
					
					$('#calculePrice').hide();
					
					if (false && !!$.prototype.fancybox)
					    $.fancybox.open([
					        {
					            type: 'inline',
					            autoScale: true,
					            minHeight: 30,
					            content: $('#calculePriceData')
					        }
					    ], {
					        padding: 0
					    });
					else
						$('#calculePriceData').dialog({
							autoOpen: true,
					        modal: true,
					        width:'auto'});
					
					
					
				}
				else
				{
					if($('#megagroups').length)
						$('#megagroups').append(jsonData).fadeIn(1000);
					else
						$('.product-additional-info').append(jsonData).fadeIn(2000);
					goToByScroll('calculePrice');
				}
			}
		}
	});

	
};
function goToId(id)
{
	var idEle = '#megagroup'+id;
	if($(idEle).length)
	{
		if($(idEle).parents('.accordion-section:first').length)
		{
			$(idEle).parents('.accordion-section:first').find('.accordion-section-title').click();
		}
		goToByScroll('megagroup'+id);
	}
	
}
function showDialogAlert(alert,id)
{
	if (!!$.prototype.fancybox)
		    $.fancybox.open([
		        {
		            type: 'inline',
		            autoScale: true,
		            minHeight: 30,
		            content: '<div style="margin:20px;" class="alert alert-info">' + alert + '<div style="margin-top:10px;display:block;"><button onclick="$.fancybox.close();" class="btn btn-primary">Aceptar</button><button onclick="goToId(\''+id+'\');$.fancybox.close();" style="float:right" class="btn btn-danger">Revisar</button></div></div>'
		        }
		    ], {
		        padding: 0
		    });
		else
			alert(alerta);
}
function showErrorAlert(alerta)
{
	mpOnlaunch = 0;
	if($('.mp-result-error').length)
		$('.mp-result-error').html(alerta);
	else
		alert(alerta);
}
function getSendGroups(quantity){
	var sendgroups = '';
	var resultAttrs = listAttrIds();
	
	if(resultAttrs[0]==1)
	{
		showErrorAlert(resultAttrs[1]);
		return false;
	}
	else
	{	
		sendgroups +=resultAttrs[1];
	}
	
	
	var resultProducts = listProductIds(quantity);
	
	if(resultProducts[0]==1)
	{
		showErrorAlert(resultProducts[1]);
		
		return false;
	}
	else
	{	
		sendgroups +=resultProducts[1];
		sendgroups +=resultProducts[2];
		
	}
	var resultQuantities = listQuantityIds();
	if(resultQuantities[0]==1)
	{
		showErrorAlert(resultQuantities[1]);
		
		return false;
	}
	else
	{	
		sendgroups +=resultQuantities[1];
	}
	//sendgroups += listCombinationIds();
	var resultPersonalization = listPersonalization();
	if(resultPersonalization[0]==1)
	{
		showErrorAlert(resultPersonalization[1]);
	
		return false;
	}
	else
	{	
		sendgroups +=resultPersonalization[1];
	}	
	sendgroups += '&config_product='+_MP.config_product;
	return sendgroups;
	
}
function showTableQuantityPrice(sendgroups)
{
	if(blockedMPTable)
		return;
	$.ajax({
		type: 'POST',
		url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct',
		async: true,
		cache: false,
		dataType : "html",
		data: 'type=showquantityprices'+sendgroups,
		success: function(jsonData,textStatus,jqXHR)
		{
			if(jsonData)
			{
				$('#mp-quantity-prices').html(jsonData);
				$('.mp-tableqty-price').click(function(){
					blockedMPTable = true;
					var qty = $(this).data('qty');
					$('#quantity_wanted').val(qty);
					if($('#id_step_quantity').length)
						$('#id_step_quantity').val(qty);
					var attr = $(this).data('attr');
					$('#mptableattr').val(attr);
					$(this).parents('table:first').find('.mp-tableqty-price').removeClass('mpTableRowSelect');
					$(this).addClass('mpTableRowSelect');
					showprice(getIdProduct(), getIdCombination(), true, null, $('#quantity_wanted').val(), null);
					setTimeout(function(){ blockedMPTable = false; }, 1500);
					
					
				});
			}
		}
	});
}
function showprice(idProduct, idCombination, addedFromProductPage, callerElement, quantity, whishlist){
	
	if($('.mp-result-error').length)
		$('.mp-result-error').html('');
	
	if((_MP.productType=='M2' || _MP.productType=='M3') && !_MP.arrayMeasureAttr.length && _MP.height_min!=-1 && _MP.width_min!=-1)
	{
		if($('#id_width').parents('.hideMegaField').length==0 && ($('#id_width').val()==0 || $('#id_width').val()==''))
			return;
		if($('#id_height').parents('.hideMegaField').length==0 && ($('#id_height').val()==0 || $('#id_height').val()==''))
			return;
	}
	if((_MP.productType=='M3' || _MP.productType=='D') && !_MP.arrayMeasureAttr.length && _MP.long_min!=-1)
	{
		if($('#id_long').val()==0 || $('#id_long').val()=='')
			return;
	}
	//send the ajax request to the server
	/*var width = getMeasure('width');
	if(width==0 && _MP.width_min!=-1)
		width = 1;
	var height = getMeasure('height');
	if(height==0 && _MP.height_min!=-1)
		height=1;
	var long = getMeasure('long');
	if(long==0 && _MP.long_min!=-1)
		long=1;*/
	
	if(typeof mpAddProduct!='undefined' && mpAddProduct==2)
	{
		quantity = 1;
	}
	
	var sendgroups = getSendGroups(quantity);
	
	if(!sendgroups)
		return;
	var measures = getSendMeasures()
	measures += '&id_product='+idProduct;
	measures += '&token='+static_token;
	
	if($('.countPagesHeight').length && $('.mp-personalization .hiddenFileUpload').length){
		var countFiles = '';
		$('.mp-personalization .hiddenFileUpload').each(function(){
			if(countFiles!='')
				countFiles+='|';
			countFiles+= $(this).val();
		});
		measures += '&mpuploadfile='+countFiles;
	}
	
	sendgroups += measures+'&qty=' + ((quantity && quantity != null) ? quantity : '1') + '&id_product=' + getIdProduct() + '&token=' + static_token + ( (parseInt(idCombination) && idCombination != null) ? '&ipa=' + parseInt(idCombination): '');
	if(this.stock!=''){
		sendgroups += '&getstock=1'
	}
	$.ajax({
		type: 'POST',
		url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct',
		async: true,
		cache: false,
		dataType : "json",
		data: 'type=showprice'+sendgroups,
		success: function(jsonData,textStatus,jqXHR)
		{
			if(jsonData)
			{
				
				var price = jsonData['price'];
				var unitprice = jsonData['unitprice'];
				//var stringtotal = unitprice + '<br/><span class="mp_our_price">(Total '+price+')</span>';
				var stringtotal = price;
				if($('.current-price .current-price-value').length)
					$('.current-price .current-price-value').html(stringtotal);
				else
					$('.current-price span:first').html(stringtotal);
				if($('.mp_total_price').length)
					$('.mp_total_price').html(price);
				/*if($('.mp_unit_price').length){	
					$('.mp_unit_price').html(unitprice);
				}*/
				$('.product-prices .product-discount').remove();
				if(typeof jsonData['pricewtr']!='undefined' && jsonData['pricewtr']!=stringtotal){	
					$('.product-prices').prepend($('<div class="product-discount"><span class="regular-price">'+jsonData['pricewtr']+'</span></div>'));
				}
				if(typeof jsonData['pages']!='undefined' && jsonData['pages']!=0){
					$('.countPagesHeight #id_height').val(jsonData['pages']);
				}
					//$('#old_price_display').html(jsonData['pricewtr']);
				if(typeof jsonData['discount']!='undefined'){
					$('#reduction_amount_display').html(jsonData['discount']);
					$('#reduction_amount').show();
				} 	else{
					$('#reduction_amount').hide();
				}
				if(typeof jsonData['total_weight']!='undefined' && $('span.mp_total_weight').length)
					$('span.mp_total_weight').html(jsonData['total_weight']);
				if(typeof jsonData['product_days']!='undefined' && $('#megaproductdays_value').length)
					$('#megaproductdays_value').html(jsonData['product_days']);
				// Replace eval fields personalizations
				if(typeof jsonData['evalfields']!='undefined'){
					$.each(jsonData['evalfields'], function(key, value){
						if($("#megafield_"+key).length>0){
							$("#megafield_"+key).val(value);
							$("#megafield_text_"+key).html(value);
						}
					});
				}
				// If exist table quantity prices reload data
				if($('#mp-quantity-prices').length)
				{
					showTableQuantityPrice(sendgroups);
				}
				// showStepResult();
				//if(typeof jsonData['reference']!='undefined' && jsonData['reference']!=''){
					$('.product-reference span').html(getLayerRefereces());
				//}
				if(typeof jsonData['stock']!='undefined'){
					_MP.setStock(jsonData['stock']);
					if($('#stockvalue').length)
					$('#stockvalue').html(jsonData['stock']);
				}
			}
		}
	});
	return true;
	
};
function getTotalMeasureByAjax()
{
	//send the ajax request to the server
	var width = $('#id_width').val();
	if(width==0)
		width = 1;
	var height = $('#id_height').val();
	if(height==0)
		height=1;
	var long = $('#id_long').val();
	if(long==0)
		long=1;
	var idProduct = getIdProduct();
	var total = 0;
	$.ajax({
		type: 'POST',
		url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct',
		async: true,
		cache: false,
		dataType : "json",
		data: 'type=totalmeasure&width='+width+'&height='+height+'&long='+long+'&id_product=' + idProduct,
		success: function(jsonData,textStatus,jqXHR)
		{
			if(jsonData)
			{
				total = parseFloat(jsonData);
				
			}
		}
	});
	return total;
};
function checkEvalMeasures()
{
	//send the ajax request to the server
	var width = $('#id_width').val();
	if(width==0)
		width = 1;
	var height = $('#id_height').val();
	if(height==0)
		height=1;
	var long = $('#id_long').val();
	if(long==0)
		long=1;
	var idProduct = getIdProduct();
	var total = 0;
	var success = true;
	$.ajax({
		type: 'POST',
		url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct',
		async: false,
		cache: false,
		dataType : "json",
		data: 'type=checkEvalMeasures&width='+width+'&height='+height+'&long='+long+'&id_product=' + idProduct,
		success: function(jsonData,textStatus,jqXHR)
		{
			if(jsonData['success'])
			{
				success = true;
				
			} else {
				success =  false;
			}
		}
		
	});
	return success;
	
};

function goToByScroll(id){
 
    // Scroll
 if($("#"+id).length)
  $('html,body').animate({
      scrollTop: $("#"+id).offset().top},
      'slow');
};
function valueInArray(arrayValues,item)
{
	for (i = 0; i < arrayValues.length; i++)
	{
		if(arrayValues[i]==item)
			return true;
	}

	return false;
};
function listAttrIds()
{
	var sendgroups = '';
	var resultgroups= new Array();
	resultgroups[0]=0;
	var totalselect = 0;
	var grouplamas = null;
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		var ids = 0;
		for (i=0; i<megaGroups.length; i++)
		{
			var totalselect = 0;
			if(typeof megaGroups[i]!='undefined')
			{	
				var id_group = megaGroups[i]['id_addgroup'];
				var mpgroup = megaGroups[i];
				if(mpgroup['type']=='0' && mpgroup['show']!='3' && applyGroupValue(mpgroup['id_addgroup']) && mpgroup['action']!=1)
				{
					// Not apply to lamas
					if(mpgroup['cssclass']=='lamas'){
						grouplamas = mpgroup;
						continue;
					}
					if(mpgroup['multiselect']!=0)
					{
						mpgroup['selections'] = getMultiSelectGroup(id_group,true);
						totalselect = mpgroup['selections'].length;
										
						for (var j = 0; j < mpgroup['selections'].length; j++) 
						{
							if(sendgroups=='')
								sendgroups+='&attrIds=';
							if(ids>0)
								sendgroups+='-';
							
							sendgroups+=mpgroup['selections'][j];
							ids++;
						}
					}
					else if(mpgroup['selected']!=0)
					{
						if($('#megagroup'+megaGroups[i]['id_addgroup']).length && applyGroupValue(mpgroup['id_addgroup']))
						{
							if(typeof mpgroup['selected']!='undefined' && mpgroup['selected']!='')
							{
								totalselect = 1;
								if(mpgroup['dep']=='1')
								{
									if(sendgroups=='')
										sendgroups+='&attrIds=';
									if(ids>0)
										sendgroups+='-';
									
									sendgroups+=mpgroup['selected'];
									ids++;
								}
							}
						}
					}
					if($('#megalabel_'+id_group+' .mega_title').length>0 && mpgroup['multiselectmin']!=0 && totalselect<mpgroup['multiselectmin'] && mpOnlaunch==1 && applyGroupValue(mpgroup['id_addgroup']))
					{
						resultgroups[0]=1;
						resultgroups[1]= minselectiontext + ' ' +$('#megalabel_'+id_group+' .mega_title').html()+' '+mpgroup['multiselectmin'];
						return resultgroups;
					}
					if($('#megalabel_'+id_group+' .mega_title').length>0 && mpgroup['multiselectmax']!=0 && totalselect>mpgroup['multiselectmax'] && mpOnlaunch==1 && applyGroupValue(mpgroup['id_addgroup']))
					{
						resultgroups[0]=1;
						resultgroups[1]= maxselectiontext + ' ' +$('#megalabel_'+id_group+' .mega_title').html()+' '+mpgroup['multiselectmax'];
						return resultgroups;
					}
					
				}
				
			}
		}
	
	}
	// codigo para añadir el id del atributos de las tablas
	if($('#mptableattr').length && $('#mptableattr').val()!=0){
		
		
		if(sendgroups==''){
			sendgroups+='&attrIds='+$('#mptableattr').val();
		} else {
			sendgroups+='-'+$('#mptableattr').val();
		}	
	} else if($('#mptableattr').length && $('#mptableattr').val()==0 && mpOnlaunch){
		resultgroups[0]=1;
		resultgroups[1]= mpTableSelection;
		return resultgroups;
		
	}
	// codigo para recoger las lamas
	if(grouplamas!=null && typeof mpOnlaunch!='undefined' && mpOnlaunch){
		var lamasUrl = listAttrLamas();
		if(!lamasUrl){
			resultgroups[0]=1;
			resultgroups[1]= errorLamas;
			goToByScroll('mp-ul-lamas');
			return resultgroups;
		}
		sendgroups +=lamasUrl;
	}
	resultgroups[1] = sendgroups;
	return resultgroups;
};

function getAttrSelectedId(id_group)
{
	var idname = 'group['+id_group+']';
	if($('.input-color[name="group['+id_group+']"]:checked').length)
	{
		return $('.input-color[name="group['+id_group+']"]:checked').val();
	}
	else if($('[name="'+idname+'"]').length>0)
	{
		return $('[name="'+idname+'"]').val();
	}
	else if($('#group_'+id_group).length>0)
	{
		return $('#group_'+id_group).val();
	}
	else if($('#color_pick_hidden[name="group_'+id_group+'"]').length>0)
	{
		return $('#color_pick_hidden[name="group_'+id_group+'"]').val();
	}
	else if($('.color_pick_hidden[name="group_'+id_group+'"]').length>0)
	{
		return $('.color_pick_hidden[name="group_'+id_group+'"]').val();
	}

	return 0;
};
function getFisrtAttrSelectedId(id_group)
{
	var idAttr = 0;
	if($('#megagroup'+id_group+' li:first').length>0)
	{
		idAttr = $('#megagroup'+id_group+' li:first').attr('alt');
	}
	else if($('#megafield_'+id_group+' option:not([disabled])').length>0)
	{
		idAttr = $('#megafield_'+id_group+' option:not([disabled])').first().attr('value');
	}
	else if($('#megafield_'+id_group).length>0)
	{
		idAttr = $('#megafield_'+id_group).val();
	}
	if(typeof idAttr=="undefined" && $('#megafield_'+id_group).length>0){
	idAttr = $('#megafield_'+id_group).val();
	}
	
	
	return idAttr;
}
function checkActionQuantities()
{
	if(typeof megaGroups!='undefined' && megaGroups.length>0 )
	{
		var totalqty = 0;
		var changeQty = false;
		for (k=0; k<megaGroups.length; k++)
		{
			if(typeof megaGroups[k]!='undefined'  && $('#megagroup'+megaGroups[k]['id_addgroup']).length &&  applyGroupValue(megaGroups[k]['id_addgroup']))
			{
				var mpgroup = megaGroups[k];
				var id_addgroup = megaGroups[k]['id_addgroup'];
				if((mpgroup['show']=='3' || mpgroup['show']=='6')  && (mpgroup['action']=='2' || mpgroup['action']=='4'))
				{
					var qty = 0;
					$('#megagroup'+id_addgroup+' .mega-qty-list').each(function(){
						if($(this).val()!='')
							qty += parseInt($(this).val());
					});
					$('#megagroup'+id_addgroup+' .mega-comb-qty-table').each(function(){
						if($(this).val()!='')
							qty += parseInt($(this).val());
					});
					totalqty +=qty;
					changeQty = true;
						
				}
			}
		}
		if(changeQty)
		{
			if(totalqty==0)
				totalqty=1;
			addMPQuantity(totalqty);
			/*$('#quantity_wanted').val(totalqty);
			if($('#id_step_quantity').length)
				$('#id_step_quantity').val(totalqty);*/
		}
	}
}

function listQuantityIds()
{
	var sendgroups='';
	var resultgroups= new Array();
	var separateIds = '';
	resultgroups[0]=0;
	resultgroups[1]='';
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		var ids = 0;
		var idsep = 0;
		var separateIds = '';
		var activeMulti = false;
		var totalGroups = 0;
		var maxlimit = 0;
		var minlimit = 0;
		for (i=0; i<megaGroups.length; i++)
		{
			var id_group = megaGroups[i]['id_addgroup'];
			var mpgroup = megaGroups[i];
			if(mpgroup!=null)
			{		
				if(mpgroup['type']=='0' && mpgroup['show']==3 && applyGroupValue(id_group))
				{
					var totalqty = 0;
					$('#megagroup'+mpgroup['id_addgroup']+' .mega-qty-list').each(function(){
						var id = $(this).attr('data-attr');
						var qty = $(this).val();
						var comb = $(this).data('comb');
						if(typeof comb=="undefined")
							comb=0;
						
						if(qty!=0)
						{
							totalqty += parseInt(qty);
							if(mpgroup['limit']==1)
							{
								if($('#qty-label-'+id).length>0 && mpgroup['multiselectmin']!=0 && qty<mpgroup['multiselectmin'] && mpOnlaunch==1)
								{
									resultgroups[0]=1;
									resultgroups[1]= minselectiontext + ' ' +$('#qty-label-'+id).html()+' '+mpgroup['multiselectmin'];			
								}
								if($('#qty-label-'+id).length>0 && mpgroup['multiselectmax']!=0 && qty>mpgroup['multiselectmax'] && mpOnlaunch==1)
								{
									resultgroups[0]=1;
									resultgroups[1]= maxselectiontext + ' ' +$('#qty-label-'+id).html()+' '+mpgroup['multiselectmax'];	
								}
							}
							if(mpgroup['action']==4)
							{
								if(separateIds=='')
									separateIds+='&separateIds=';
								if(idsep>0)
									separateIds+='-';
								separateIds+=id+'|'+qty;
								idsep++;
							}
							else
							{
								if(ids==0 && sendgroups=='')
									sendgroups+='&quantityIds=';
										
								if(ids>0)
									sendgroups+='-';
								sendgroups+=id+'|'+qty+'|'+comb;
								ids++;
							}
							// Check quantity stock 
							if($(this).data('stock')!=undefined && qty>$(this).data('stock'))
							{
								resultgroups[0]=1;
								resultgroups[1]= maxselectiontext + ' ' +$('#qty-label-'+id).html()+' '+$(this).data('stock');
							}
						}
							
						
					});
					if(mpgroup['action']==3 && mpOnlaunch==1)
					{
						var qtycart = parseInt($('#quantity_wanted').val());
						if(totalqty!=qtycart)
						{
							resultgroups[0]=1;
							resultgroups[1]= samequantitytext + ' ' +$('#megalabel_'+id_group+' .mega_title').html();
						}	
					}
					if(mpgroup['limit']==0)
					{
						if($('#megagroup'+mpgroup['id_addgroup']+' .mega_title').length>0 && mpgroup['multiselectmin']!=0 && totalqty<mpgroup['multiselectmin'] && mpOnlaunch==1)
						{
							resultgroups[0]=1;
							resultgroups[1]= minselectiontext + ' ' +$('#megagroup'+mpgroup['id_addgroup']+' .mega_title').html()+' '+mpgroup['multiselectmin'];			
						}
						if($('#megagroup'+mpgroup['id_addgroup']+' .mega_title').length>0 && mpgroup['multiselectmax']!=0 && totalqty>mpgroup['multiselectmax'] && mpOnlaunch==1)
						{
							resultgroups[0]=1;
							resultgroups[1]= maxselectiontext + ' ' +$('#megagroup'+mpgroup['id_addgroup']+' .mega_title').html()+' '+mpgroup['multiselectmax'];	
						}
					}
					if(mpgroup['limit']==2)
					{
						totalGroups += totalqty;
						activeMulti = true;
						maxlimit = mpgroup['multiselectmax'];
						minlimit = mpgroup['multiselectmin'];
					}
				}
			}
		}
		if(activeMulti)
		{
			if(minlimit!=0 && totalGroups<minlimit && mpOnlaunch==1)
			{
				resultgroups[0]=1;
				resultgroups[1]= minselectiontext + ' '+minlimit;			
			}
			if(maxlimit!=0 && totalGroups>maxlimit && mpOnlaunch==1)
			{
				resultgroups[0]=1;
				resultgroups[1]= maxselectiontext +' '+maxlimit;	
			}
		}
	}
	if(resultgroups[1]=='')
		resultgroups[1] = sendgroups+separateIds;
	return resultgroups;
};
function listCombinationIds()
{
	var sendgroups='';
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		var ids = 0;
		for (i=0; i<megaGroups.length; i++)
		{
			var id_group = megaGroups[i]['id_group'];
			var mpgroup = megaGroups[i];
			if(mpgroup!=null)
			{		
				if(mpgroup['type']=='0' && mpgroup['show']==3)
				{		
					$('#mp-attrqty-'+id_group+' input').each(function(){
						var id = $(this).attr('id').substring(7);
						var choice = new Array();
						if($(this).val()!=0)
						{
							
							for (j=0; j<megaGroups.length; j++)
							{
								var idGroup = megaGroups[j]['id_group'];
								if(idGroup!=id_group)
									choice.push(getAttrSelectedId(idGroup));
								else
									choice.push(id);
							}
							var idCombination = findMPCombination(choice,$(this).val());
							if(idCombination!=0)
							{
								if(ids==0 && sendgroups=='')
									sendgroups+='&combinationIds=';
								
								if(ids>0)
									sendgroups+='-';
								sendgroups+=idCombination+'|'+$(this).val();
								ids++;
							}
						}
					});
				}
			}
		}
	}
	return sendgroups;
};
function findMPCombination(choice,quantity)
{
	
	
	//testing every combination to find the conbination's attributes' case of the user
	for (var combination = 0; combination < combinations.length; ++combination)
	{
		//verify if this combinaison is the same that the user's choice
		var combinationMatchForm = true;
		$.each(combinations[combination]['idsAttributes'], function(key, value)
		{
			if (!in_array(value, choice))
			{
				combinationMatchForm = false;
			}
		});
		if (combinationMatchForm)
		{
			
			var idCombinationQty = combinations[combination]['quantity'];
			if(idCombinationQty>quantity)
				return combinations[combination]['idCombination'];

		//	var idCustomization = combinations[combination]['idCombination'];
			//get the data of product with these attributes
			
		}
	}
	return 0;
}
function getInfoExtraProduct()
{
	var textInfo='';
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		var ids = 0;
		for (i=0; i<megaGroups.length; i++)
		{
			
			var id_group = megaGroups[i]['id_addgroup'];
			var mpgroup = megaGroups[i];
			if(mpgroup!=null &&  !$('#megagroup'+mpgroup['id_addgroup']).hasClass('hideMegaField'))
			{		
				if(mpgroup['type']=='1' && $('#megalabel_'+id_group).length>0)
				{
					if($('#megalabel_'+id_group).find('.megaattr_name').length && $('#megalabel_'+id_group).find('.megaattr_name').html()!='')
					{
						var html =$('#megalabel_'+id_group).html();
						//$html.remove(".divmegazoom");
						textInfo +=  html +'<br/>';
					}
				}
			}
		}
	}
	return textInfo;
}
function listPersonalization()
{
	var sendgroups = '';
	var resultgroups= new Array();
	resultgroups[0]=0;
	resultgroups[1]='';
	

	var customgroups= new Array();
	
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		for (i=0; i<megaGroups.length; i++)
		{
			
			var id_group = megaGroups[i]['id_addgroup'];
			var mpgroup = megaGroups[i];
			if(mpgroup!=null)
			{		
				if(mpgroup['type']=='3' && applyGroupValue(id_group))
				{
					customgroups.push(mpgroup['id_addgroup']);
					if(mpgroup['id_group']=='3')
					{
						var customvalue = $('#megafield_'+mpgroup['id_addgroup']).val();
						customvalue = customvalue.replace(',','.');
						customgroups.push(parseFloat(customvalue));
					}
					else
					{
						var data = $('#megafield_'+mpgroup['id_addgroup']).val();
						customgroups.push(encodePersonalization(data));	
					}
					if(mpOnlaunch==1)
					{
						var text = $('#megafield_'+megaGroups[i]['id_addgroup']).val();
						var grouptitle = $('#megalabel_'+id_group+' .mega_title').html();
						if(mpgroup['required']==1 && $('#megafield_'+megaGroups[i]['id_addgroup']).val()=='')
						{
							resultgroups[0]=1;
							resultgroups[1]= requiredfieldtext + ' ' +grouptitle;
							return resultgroups;
						}
						if(mpgroup['id_group']==0 || mpgroup['id_group']==1)
						{
							if(mpgroup['multiselectmin']!=0 && text.length<mpgroup['multiselectmin'])
							{
								resultgroups[0]=1;
								resultgroups[1]= mintexttext + ' ' +grouptitle+' '+mpgroup['multiselectmin'];
								return resultgroups;
							}
							if(mpgroup['multiselectmax']!=0 && text.length>mpgroup['multiselectmax'])
							{
								resultgroups[0]=1;
								resultgroups[1]= maxtexttext + ' ' +grouptitle+' '+mpgroup['multiselectmax'];
								return resultgroups;
							}
						}
					}
				}	
			}
		}
	
	}
	if(customgroups.length)
	{
		sendgroups = '&personalization='+encodeURIComponent(JSON.stringify(customgroups));
	}
	resultgroups[1] = sendgroups;
	return resultgroups;
}
function encodePersonalization(strVal)
{

    if (strVal.indexOf('&') > -1)
    {
        var searchStr = "&";
        var replaceStr = "%26";
        var re = new RegExp(searchStr, "g");
        var result = strVal.replace(re, replaceStr);
    }else{
        var result = strVal;
    }
   // result = result.replace('\"', '');
    var searchStr = "\n";
    var replaceStr = "\\n";
    var re = new RegExp(searchStr, "g");
    result = result.replace(re, replaceStr);
    
 	var searchStr = "\"";
	var replaceStr = "";
	var re = new RegExp(searchStr, "g");
	result = result.replace(re, replaceStr);

    return result;
}
function listProductIds(quantity)
{
	var sendgroups = '';
	var productattrs = '';
	var resultgroups= new Array();
	resultgroups[0]=0;
	resultgroups[1]='';
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		var activeMulti = false;
		var totalGroups = 0;
		var maxlimit = 0;
		var minlimit = 0;
		
		
		for (i=0; i<megaGroups.length; i++)
		{
			var totalqty = 0;
			var id_group = megaGroups[i]['id_addgroup'];
			var mpgroup = megaGroups[i];
			if(mpgroup!=null)
			{		
				if((mpgroup['type']=='1' || mpgroup['type']=='7')  && applyGroupValue(id_group) && mpgroup['show']!='100')
				{	
					if(mpgroup['show']!=3 && mpgroup['show']!=6)
					{
						var totalselect = 0;
						if(typeof mpgroup['selected']!='undefined' && mpgroup['selected']!=0 && mpgroup['selected']!='' && mpgroup['multiselect']==0)
						{
							if(mpgroup['type']=='1')
							{
								if(sendgroups!='')
									sendgroups+='-';
								
								sendgroups+=mpgroup['selected']+'|1';
								if(typeof mpgroup['id_addattr'])
								{
									sendgroups+='|'+mpgroup['id_addattr'];
									sendgroups+='|0|'+mpgroup['id_addgroup'];
								} else{
									sendgroups+='|0|0|'+mpgroup['id_addgroup'];
								}

								
							}	
							else if(mpgroup['type']=='7')
							{
								if(productattrs!='')
									productattrs+='-';
								//productattrs+=mpgroup['selected']+'|1';
								productattrs+=mpgroup['selected']+'|1|0|0|'+mpgroup['id_addgroup'];
							}	
							totalselect = 1;
						}
						if(mpgroup['multiselect']!=0)
						{
							mpgroup['selections'] = getMultiSelectGroup(id_group,true);
							totalselect = mpgroup['selections'].length;
							
							for (var j = 0; j < mpgroup['selections'].length; j++) 
							{
								if(mpgroup['type']=='1')
								{
									if(sendgroups!='')
										sendgroups+='-';
									
									sendgroups+=mpgroup['selections'][j]+'|1|0|0|'+mpgroup['id_addgroup'];
									
								}
								else if(mpgroup['type']=='7')
								{
									if(productattrs!='')
										productattrs+='-';
									
									productattrs+=mpgroup['selections'][j]+'|1|0|0'+mpgroup['id_addgroup'];
								}
							
							}
						}
						if($('#megalabel_'+id_group+' .mega_title').length>0 && mpgroup['multiselectmin']!=0 && totalselect<mpgroup['multiselectmin'] && mpOnlaunch==1)
						{
							resultgroups[0]=1;
							resultgroups[1]= minselectiontext + ' ' +$('#megalabel_'+id_group+' .mega_title').html()+' '+mpgroup['multiselectmin'];
							return resultgroups;
						}
						if($('#megalabel_'+id_group+' .mega_title').length>0 && mpgroup['multiselectmax']!=0 && totalselect>mpgroup['multiselectmax'] && mpOnlaunch==1)
						{
							resultgroups[0]=1;
							resultgroups[1]= maxselectiontext + ' ' +$('#megalabel_'+id_group+' .mega_title').html()+' '+mpgroup['multiselectmax'];
							return resultgroups;
						}
						
					}
					else if (mpgroup['show']==6)
					{
						totalselect = 0;
						$('#megafield_'+mpgroup['id_addgroup']+' .mpclistproduct').each(function(){
							var input = $(this).find('.mega-comb-qty-list');
							var id = $(this).data('product');
							var combination = parseInt($(this).attr('data-combination'));
							if(combination==0 && $(this).find('.mega-comb-select-list').length)
								combination = parseInt($(this).find('.mega-comb-select-list').val());
							// only one quantity by product
							if($(input).length && $(input).parents('.hideMegaField').length==0)
							{
								if(($(input).val()!=0 && $(input).val()!='') || $(input).prop("checked") == true)
								{
									var inputvalue = parseFloat($(input).val());
									if($(input).prop("checked") == true)
										inputvalue = 1;
									totalselect += parseInt(inputvalue);
									if(mpgroup['type']=='1')
									{
										if(sendgroups!='')
											sendgroups+='-';
										sendgroups+=id+'|'+inputvalue;
										if($(this).data('addattr'))
										{
											sendgroups+='|'+$(this).data('addattr');
										}
										else{
											sendgroups+='|0';
										}
										if(combination!=0)
										{
											sendgroups+='|'+combination;
										}
										sendgroups+='|'+mpgroup['id_addgroup']
									}
									else if(mpgroup['type']=='7')
									{
										if(productattrs!='')
											productattrs+='-';
										productattrs+=id+'|'+inputvalue;
										if(combination!=0)
										{
											productattrs+='|0|'+combination+'|'+mpgroup['id_addgroup'];
										} else{
											productattrs+='|0|0|'+mpgroup['id_addgroup'];
										}
									}	
								}
							}
							else if($(this).find('.mega-comb-qty-table').length)
							{
								$(this).find('.mega-comb-qty-table').each(function(){
									if($(this).val()!=0 && $(this).val()!='' && $(this).parents('.hideMegaField').length==0)
									{
										var inputvalue = parseFloat($(this).val());
										var combination = parseInt($(this).attr('data-combination'));
										if(mpgroup['type']=='1')
										{
											if(sendgroups!='')
												sendgroups+='-';
											sendgroups+=id+'|'+inputvalue;
											if($(this).data('product'))
											{
												sendgroups+='|'+$(this).data('product');
											}
											else{
												sendgroups+='|0';
											}
											if(combination!=0)
											{
												sendgroups+='|'+combination;
											} else {
												sendgroups+='|0';
											}
											sendgroups+='|'+mpgroup['id_addgroup'];
										}
										else if(mpgroup['type']=='7')
										{
											if(productattrs!='')
												productattrs+='-';
											productattrs+=id+'|'+inputvalue;
											if(combination!=0)
											{
												productattrs+='|0|'+combination;
											} else {
												productattrs+='|0|0';
											}
											productattrs+='|'+mpgroup['id_addgroup'];
										}	
									}
								});
							}
						});		
						if($('#megalabel_'+id_group+' .mega_title').length>0 && mpgroup['multiselectmin']!=0 && totalselect<mpgroup['multiselectmin'] && mpOnlaunch==1)
						{
							selectMPTab(id_group);
							resultgroups[0]=1;
							resultgroups[1]= minselectiontext + ' ' +$('#megalabel_'+id_group+' .mega_title').html()+' '+mpgroup['multiselectmin'];
							return resultgroups;
						}
						if($('#megalabel_'+id_group+' .mega_title').length>0 && mpgroup['multiselectmax']!=0 && totalselect>mpgroup['multiselectmax'] && mpOnlaunch==1)
						{
							selectMPTab(id_group);
							resultgroups[0]=1;
							resultgroups[1]= maxselectiontext + ' ' +$('#megalabel_'+id_group+' .mega_title').html()+' '+mpgroup['multiselectmax'];
							return resultgroups;
						}
					}
					else
					{
						$('#megafield_'+mpgroup['id_addgroup']+' input').each(function(){
							var id = $(this).attr('id').substring(12);
							
							var qty = $(this).val();
							
							if(qty!=0 && qty!='' && !$(this).parents('.hideMegaField').length)
							{
								totalqty += parseInt(qty);
								var inputvalue = parseFloat($(this).val());
								if(mpgroup['type']=='1')
								{
									if(sendgroups!='')
										sendgroups+='-';
									sendgroups+=id+'|'+inputvalue;
									if($(this).data('addattr'))
									{
										sendgroups+='|'+$(this).data('addattr');
									} else {
										sendgroups+='|0';
									}
									sendgroups+='|'+mpgroup['id_addgroup'];
								}
								else if(mpgroup['type']=='7')
								{
									if(productattrs!='')
										productattrs+='-';
									productattrs+=id+'|'+inputvalue;
									sendgroups+='|0|0|'+mpgroup['id_addgroup'];
								}
								
								
							
							}
						});
						if($('#megalabel_'+id_group+' .mega_title').length>0 && mpgroup['multiselectmin']!=0 && totalqty<mpgroup['multiselectmin'] && mpOnlaunch==1)
						{
							resultgroups[0]=1;
							resultgroups[1]= minselectiontext + ' ' +$('#megalabel_'+id_group+' .mega_title').html()+' '+mpgroup['multiselectmin'];
							return resultgroups;
						}
						if($('#megalabel_'+id_group+' .mega_title').length>0 && mpgroup['multiselectmax']!=0 && totalqty>mpgroup['multiselectmax'] && mpOnlaunch==1)
						{
							resultgroups[0]=1;
							resultgroups[1]= maxselectiontext + ' ' +$('#megalabel_'+id_group+' .mega_title').html()+' '+mpgroup['multiselectmax'];
							return resultgroups;
						}	
					}
					if(mpgroup['limit']==2)
					{
						totalGroups += totalqty;
						activeMulti = true;
						maxlimit = mpgroup['multiselectmax'];
						minlimit = mpgroup['multiselectmin'];
					}
					if($('#productIds'+id_group).length && $('#productIds'+id_group).val()!=''){
						if(sendgroups!='')
							sendgroups+='-';
						
						sendgroups+=$('#productIds'+id_group).val();
					}
				}	
			}
		}
		if(activeMulti)
		{
			if(minlimit!=0 && totalGroups<minlimit && mpOnlaunch==1)
			{
				resultgroups[0]=1;
				resultgroups[1]= minselectiontext + ' '+minlimit;			
			}
			if(maxlimit!=0 && totalGroups>maxlimit && mpOnlaunch==1)
			{
				resultgroups[0]=1;
				resultgroups[1]= maxselectiontext +' '+maxlimit;	
			}
		}
	
	}
	if(sendgroups!='')
		sendgroups='&productIds='+sendgroups;
	
	if(productattrs!='')
		productattrs='&productAttrIds='+productattrs;

	if(resultgroups[1]=='')
		resultgroups[1] = sendgroups;
	resultgroups[2] = productattrs;
	return resultgroups;
};
function showTooltipHelp(id_group,id)
{
	mpgroup = getMPGroupById(id_group);
	
	if(id==0)
		id = mpgroup['selected'];
	var description = '';
	
	if(id!='')
	{
		
		if(typeof arrayMPHelp[id_group]=='undefined')
		{
			arrayMPHelp[id_group] = new Array();
		}
		id = parseInt(id);
		if(typeof arrayMPHelp[id_group]['options']=='undefined')
		{
			arrayMPHelp[id_group]['options'] = new Array();
		}
		
		
		if(typeof arrayMPHelp[id_group]['options'][id]=='undefined')
		{
			$.ajax({
				type: 'POST',
				url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct',
				async: false,
				cache: false,
				dataType : "html",
				data: 'action=getHelpOption&id_addgroup=' + id_group + '&id_option=' + id,
				success: function(html,textStatus,jqXHR)
				{
					arrayMPHelp[id_group]['options'][id]=html;
					if(html!='')
					{	
						description = html;
					}
				}
			});
		}
		else
			description = arrayMPHelp[id_group]['options'][id];
	}
	//if(description!='')
		return description;
	
	//if($('#megadescriptionlong_'+id_group).length)
		//return $('#megadescriptionlong_'+id_group).html();	
	
};
function updateHelpAttr(id_group){
	mpgroup = getMPGroupById(id_group);
	var descAttr = '';
	if(typeof mpgroup['selected']!='undefined')
		descAttr = showTooltipHelp(id_group,mpgroup['selected']);
	else if(typeof mpgroup['selections']!='undefined' && mpgroup['selections'].length){
		for(var i=0;i<mpgroup['selections'].length;i++){
			descAttr += showTooltipHelp(id_group,mpgroup['selections'][i]);
		}
	}	
	if(descAttr){
		if(!$('#megadescriptionlong_'+id_group+ ' .mpAttrHelp').length)
		{
			$('#megadescriptionlong_'+id_group).append('<div class="mpAttrHelp"></div>');
		}
		$('#megadescriptionlong_'+id_group+ ' .mpAttrHelp').html(descAttr);
	}
	else {
			if($('#megadescriptionlong_'+id_group+ ' .mpAttrHelp').length)
				$('#megadescriptionlong_'+id_group+ ' .mpAttrHelp').remove();			
	}
}
function showMegaHelp(id_group, type)
{
	if(type==0)
	{
		updateHelpAttr(id_group);
	$('#megadescriptionlong_'+id_group).animate(0, 1000, function() {
        $(this).toggle();
     });
	}
	else
	{
		var contentHelp = '';
		var title = '';
		if($('#megalabel_'+id_group+' .mega_title').length)
			title = $('#megalabel_'+id_group+' .mega_title').html();
		
		contentHelp = showTooltipHelp(id_group,0);
		
		if(contentHelp=='')
		{
			if($('#megadescriptionlong_'+id_group).length)
				contentHelp = $('#megadescriptionlong_'+id_group).html();	
		}
				
		$('#helpmegaproduct').html(contentHelp);
		$('#helpmegaproduct').attr('title',title);
		if(contentHelp!='')
		{
			$('#helpmegaproduct').dialog({
		        resizable: false,
		        modal: true,
		        width:'auto'});	
			$('#helpmegaproduct').dialog('option', 'title', title);	
		}	
	}
	return false;	
};
function showMegaAttrHelp(id_addattr,id_addgroup)
{
	
		var contentHelp = '';
		var title = '';
		if($('#megadescattr_'+id_addattr).length)
		{
			contentHelp += $('#megadescattr_'+id_addattr).html()+'<br/>';
			title = $('#megadescattr_'+id_addattr).attr('title');
		}
		
		var id = '#megaattrhelp_'+id_addattr;
		if(id_addgroup!=0)
		{
			id = '#megaattrhelp_'+id_addgroup;
		}
		if(contentHelp=='')
			return false;

		$('#helpmegaproduct').html(contentHelp);
		$('#helpmegaproduct').attr('title',title);
		if(contentHelp!='')
		{
			$('#helpmegaproduct').dialog({
		        resizable: false,
		        modal: true,
		        width:'auto'});
			$('#helpmegaproduct').dialog('option', 'title', title);
		
		}
		
	
	
	 return false;
	
};
function zoomMegaImage(id_group)
{
	var id = '#megaImageList_'+id_group+' .selectAttr';
	$('#megazoom_'+id_group).attr('href',$(id).attr('alt'));
	
		$('#megazoom_'+id_group).fancybox({
		'autoSize' : false,
		'helpers': {
        'title'  : { type : 'inside' },
		'overlay': {
          'locked': false
        }
      },
		'width' : 600,
		'height' : 'auto',
		'hideOnContentClick': true
		}); 
	$('#megazoom_'+id_group).trigger('click');
	return false;
	
}
function zoomMegaAttrImage(id_group,id)
{
	id = '#megafield_'+id_group+'_'+id;
	var idAttr = $(id).data('attr')
	//$('#megazoom_'+id_group).attr('href',$(id).attr('alt'));
	
		$('.megazoomopen'+id_group).fancybox({
		'autoSize' : false,
		'width' : 600,
		'height' : 'auto',
		'hideOnContentClick': true,
		'helpers': {
			
			'title'  : { type : 'inside' },
			'overlay': {
				'locked': false
			}
		},
		'afterLoad' : function() {
			
		    this.title = (this.title ? '' + this.title + '<br />' : '')+'<a class="btn btn-primary" onclick="updateMegaAttrSelectFancy('+this.element.data('group')+','+this.element.data('attr')+');">Seleccionar</a>';/* + 'Image ' + (this.index + 1) + ' of ' + this.group.length;*/
		   } 
		}); 
	$('#megazoom_'+id_group+'_'+idAttr).trigger('click');
	return false;
	
}

function changeMPSelectCategory(id_group,id_category)
{
	var id= id_group+'-'+id_category;
	$('.megagroup'+id_group).addClass('hideMegaFieldCategory');
	$('#megagroup'+id).removeClass('hideMegaFieldCategory');
	updateMegaProduct(id_group,id_category);
	//loadMPFilterMeasures(id_group,id_category);
	
	/*setTimeout(function(){
		showStepResult();		
		}, 500);*/
}
function applyFilterPriceMinAndMax(){
	if($('.mp-search-price')){
		$('.mp-search-price').each(function(){
			// Apply jquery slider
			
			var id = $(this).data('group');
			if($('#megaImageList_'+id+' li').length)
			{
				var minprice = $('#megaImageList_'+id+' li:first').data('price');
				var maxprice = $('#megaImageList_'+id+' li:last').data('price');
			}
			$(this).attr('min',minprice);
			$(this).attr('max',maxprice);
			$(this).val('max',maxprice);
			$('#megagroup'+id+' .mp-search-price-min').html(minprice);
			$('#megagroup'+id+' .mp-search-price-max').html(maxprice);
			
			$('#megagroup'+id+'  .mp-range-amount').html(minprice + " " + prestashop.currency.sign + "  -  " + maxprice + " " + prestashop.currency.sign);
			$(this).slider({
			      range: true,
			      min: minprice,
			      max: maxprice,
			      values: [ minprice, maxprice ],
			      slide: function( event, ui ) {
			        $('#megagroup'+id+' .mp-range-amount').html(ui.values[0] + " " + prestashop.currency.sign + "  -  " + ui.values[1] + " " + prestashop.currency.sign);
			        filterMPProductByPricesSlider(id,ui.values[0],ui.values[1]);
			      }
			 });
			
		});
	}
}
function filterMPProductByPricesSlider(id,min,max)
{
	if($('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a, #megaImageList_'+id+' li').length)
	{
		$('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a, #megaImageList_'+id+' li').each(function(){
			$(this).show();
		});
		var price = parseFloat($('#megagroup'+id+' #id_search_price').val());
		if(min!='')
		{
			// Update tooltip
			$('#megagroup'+id+' .mp-range-tooltip').html(min+' <-> '+ price);
			//var min = price-10;
			//var max = price+10;
			var changeSelected = false;
			$('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a, #megaImageList_'+id+' li').each(function(){
				var value = $(this).data('price');			
				if(value<min || value>max){
					if($(this).find('a').hasClass('selectAttr'))
						changeSelected = true;
					$(this).hide();
				}		
			});
			if(changeSelected){
				if($('#megafield_'+id+' option:visible:first').length){
					$('#megafield_'+id+' option:visible:first').click();
				}
				else if($('#megagroup'+id+' .megabuttons_list a:visible:first').length){
					$('#megagroup'+id+' .megabuttons_list a:visible:first').click();
				}
				else if($('#megagroup'+id+' #megaImageList_'+id+' li:visible:first a').length){
					$('#megagroup'+id+' #megaImageList_'+id+' li:visible:first a').click();
				} 
			}
		}
	}
}

function filterMPProductByPrices(id)
{
	if($('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a, #megaImageList_'+id+' li').length)
	{
		$('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a, #megaImageList_'+id+' li').each(function(){
			$(this).show();
		});
		var price = parseFloat($('#megagroup'+id+' #id_search_price').val());
		var min = parseFloat($('#megagroup'+id+' #id_search_price').attr('min'));
		if(price!='')
		{
			// Update tooltip
			$('#megagroup'+id+' .mp-range-tooltip').html(min+' <-> '+ price);
			//var min = price-10;
			//var max = price+10;
			var changeSelected = false;
			$('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a, #megaImageList_'+id+' li').each(function(){
				var value = $(this).data('price');			
				//if(value<min || value>max){
				if(value>price){
					if($(this).hasClass('selectAttr'))
						changeSelected = true;
					$(this).hide();
				}		
			});
			if(changeSelected){
				if($('#megafield_'+id+' option:visible:first').length){
					$('#megafield_'+id+' option:visible:first').click();
				}
				else if($('#megagroup'+id+' .megabuttons_list a:visible:first').length){
					$('#megagroup'+id+' .megabuttons_list a:visible:first').click();
				}
				else if($('#megagroup'+id+' #megaImageList_'+id+' li:visible:first').length){
					$('#megagroup'+id+' #megaImageList_'+id+' li:visible:first').click();
				}
			}
		}
	}
}
function saveMPQuantityProducts(id_addgroup){
	
}
function filterMPProducts(id_addgroup){
	
	
	// Save selected quantites
	var arrayValues = [];
	var parentType = 'li';
	if($('#megafield_'+id_addgroup).hasClass('megaquantity_table'))
		parentType = 'tr';
	if($('#megafield_'+id_addgroup).length){
		$('#megafield_'+id_addgroup+' .mega-qty-list').each(function(){
			if($(this).val()!=0){
				arrayValues.push($(this).parents(parentType+':first')); 
			}
		});
	}
	
	
	
	var id_manufacturer = $('#mpFilterManufacturer'+id_addgroup).val();
	var text = $('#mpFilterText'+id_addgroup).val();
	var filterorder = $('#mpFilterOrder'+id_addgroup).val();
	var params = '&launchFilter=1&id_manufacturer='+id_manufacturer+'&text='+text+'&filterorder='+filterorder;
	$.ajax({
        type: 'POST',
        url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct&action=loadMegagroup&id_addgroup='+id_addgroup+'&id_product='+getIdProduct()+params,
        async: true,
        cache: false,
        dataType: "html",
   
    	success: function (jsonData) {
        	if(jsonData!=''){
        		$('#megagroup'+id_addgroup+' .megainputcontent').html(jsonData);
        		$('#megagroup'+id_addgroup).removeClass('hidden');	
        		
        		// Recover selected quantities
        		if(arrayValues.length){
        			if($('#megafield_'+id_addgroup).length){
        				$(arrayValues).each(function(){
        					var id = $(this).attr('id');
        					$(this).addClass('filterSelectQty');
        					$('#'+id).remove();
        				});
        				if(parentType=='tr')
        					$('#megafield_'+id_addgroup+' tbody').prepend(arrayValues);	
        				else
        					$('#megafield_'+id_addgroup).prepend(arrayValues);
        			}		
        		}
        		
        		$('#megagroup'+id_addgroup+' .mega-qty-list').unbind().bind('keyup mouseup', function () {
        			changeQuantityListTitleSelected($(this).data('group'));
        			showStepResult();
        		});
        		
        		if($('#productIds'+id_addgroup).length){
        			$('#productIds'+id_addgroup).val('');
        		}
        		var id_tab = $('#megagroup'+id_addgroup).data('tab');
        		if($('#mp-tab'+id_tab+' .verticalTabSelect').length){
        			$('#mp-tab'+id_tab+' .verticalTabSelect').html('');
        		} 
        		quantityMPListEvents();
        		showStepResult();
        		
        	}
  		}
	});	
}
function filterMPProductByMeasures(type)
{
	var id = $('#mpFilterCategoryGroup').val();
	var filterMeasures = ['width','height','long'];
	
	if($('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a').length)
	{
		$('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a').each(function(){
			$(this).show();
		});
		for (var key in filterMeasures) {
			measure = filterMeasures[key];
			if($('#id_search_'+measure).length)
			{
				var selected = $('#id_search_'+measure).val();
				if(selected!='')
				{
					var changeSelected = false;
					$('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a').each(function(){
						var value = $(this).data(measure);			
						if(value!=selected){
							if($(this).hasClass('selectAttr'))
								changeSelected = true;
							$(this).hide();
						}		
					});
					if(changeSelected){
						if($('#megafield_'+id+' option:visible:first').length){
							$('#megafield_'+id+' option:visible:first').click();
						}
						else if($('#megagroup'+id+' .megabuttons_list a:visible:first').length){
							$('#megagroup'+id+' .megabuttons_list a:visible:first').click();
						}
							
					}
				}
			}
		}
	}
}
function loadMPFilterMeasures(id_group,id_category)
{
	
	var arrayMeasures = new Array();
	var id= id_group+'-'+id_category; 
	var filterMeasures = ['width','height','long'];
	
	if($('#mpFilterMeasures').length)
	{
		$('#mpFilterCategoryGroup').val(id);
		$('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a').each(function(){
			$(this).show();
		});
		// Combos get measures
		if($('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a').length)
		{	
			$('#megafield_'+id+' option, #megagroup'+id+' .megabuttons_list a').each(function(){
				
				for (var key in filterMeasures) {
					measure = filterMeasures[key];
					var checkdata = $(this).data(measure);
					if(typeof arrayMeasures[measure]=='undefined')
						arrayMeasures[measure] = new Array();
					if(!arrayMeasures[measure].includes(checkdata)){
						arrayMeasures[measure].push(checkdata);
					}
					
				}
				
			});		
		}
		for (var key in filterMeasures) {
			measure = filterMeasures[key];
			if(typeof arrayMeasures[measure]!='undefined' && arrayMeasures[measure].length>0  && $('#id_search_'+measure).length){
				arrayMeasures[measure].sort();
				$('#id_search_'+measure+' option').remove();
				$('#id_search_'+measure).append('<option value="">---</option>');
				for (var key in arrayMeasures[measure]) {
					var meas = arrayMeasures[measure][key];
					$('#id_search_'+measure).append('<option value="'+meas+'">'+meas+'</option>');
				}
			}
		}
	
		
		
	}
}
function updateCheckoutProduct(el){
	$(el).parents('li:first').find('.mpcheckbox').click();
}
function updateMegaProduct(id_group,id_product)
{
	mpgroup = getMegaGroupById(id_group);
	if(mpgroup!=null)
	{
		
		var megafield =  getMegaField(mpgroup,id_group,id_product);

		if(mpgroup['selected']==id_product)
		{
			removeMegaSelect(mpgroup,id_product);
			showStepResult();
			
			
			return true;
		}
		// ALABAZWEB CAMBIO
		if($('#megagroup'+id_group+' .megabuttons_list li').length){
					$('#megagroup'+id_group+' .megabuttons_list li').each(function(){
						var idp = $(this).attr('alt');
						$('#mpProductFeatures #mpFeatures'+idp).remove();					
						$('#mpProductDescriptions #mpDescription'+idp).remove();	
					});	
						
					var id = $('#megagroup'+id_group).nextAll('.mpstep').first().attr('id');	
					$('#'+id).removeClass('mpNoClick');	
					
					
					 if($('#'+id).length)
					  $('html,body').animate({
					      scrollTop: $('#'+id).offset().top-100},
					      'slow');
					
						
			}
			// FIN
		changeOptionSelected(megafield);
		var arrayAttr = new Array();
		if($.isArray(id_product))
		{
			arrayAttr = id_product;
		}
		else
		{
			arrayAttr[0]=id_product;
		}
	
		changeTitleSelected(mpgroup,id_group,arrayAttr);
		changeImageSelected(mpgroup,id_group,id_product);
		mpgroup['selected']=id_product;
		
		// Load data features
		if($('#megagroup'+id_group).length && $('#megagroup'+id_group).hasClass('mploadfeatures')){
			loadMPDataFeatures(id_group,id_product);
		}
		updateImageProduct(id_group,id_product);
		//disableMegaFields();
	}
	showStepResult();
}
function updateImageProduct(id_group,id_product)
{
	// Image group
	if($('#megagroup'+id_group).length && $('#megagroup'+id_group).hasClass('mpimageproduct') && typeof mpImageProduct != 'mpImageProduct' && mpImageProduct=="group" && typeof mpImageProductUrl != 'mpImageProduct'){
		if($('#megafield_'+id_group+' option:selected').length)
			mpImageProductUrl = $('#megafield_'+id_group+' option:selected').attr('alt');
		else{
			mpImageProductUrl = $('#megaImageList_'+id_group+' .selectAttr img').attr('src');
		}
		mpImageProductId = id_product;
	}
}
function updateMegaProductSelect(id_group)
{
	mpgroup = getMegaGroupById(id_group);
	if(mpgroup!=null)
	{
		var id_attribute = $('#megafield_'+id_group).val();
		if(typeof id_attribute=="undefined"){
			id_attribute = $('[name="megafield_'+id_group+'"]').val();
		}
		var id_addattr = 0; 
		if(id_attribute.length>1)
		{
			mpgroup['selections']=id_attribute;
			//$('#megaName_'+id_group).html('');
			$('#imageDivGroup_'+id_group).hide();
			//return;
		}
		// ALABAZWEB CAMBIO
		if($('#megagroup'+id_group+' .megaradiolist input').length){
					$('#megagroup'+id_group+' .megaradiolist input').each(function(){
						var idp = $(this).val();
						$('#mpProductFeatures #mpFeatures'+idp).remove();
						$('#mpProductDescriptions #mpDescription'+idp).remove();						
					});	
						
					var id = $('#megagroup'+id_group).nextAll('.mpstep').first().attr('id');	
					$('#'+id).removeClass('mpNoClick');	
					
					
					 if($('#'+id).length)
					  $('html,body').animate({
					      scrollTop: $('#'+id).offset().top-100},
					      'slow');
					
						
			}
			// FIN
		
		if(mpgroup['show']=='4')
		{
			id_attribute = $('#megagroups input:radio[name=megafield_'+id_group+']:checked').val();
		}
		if(mpgroup['show']=='0')
		{
			id_addattr = $('#megafield_'+id_group+' option[value='+id_attribute+']').data('addattr');
		}
		
		var arrayAttr = new Array();
		if($.isArray(id_attribute))
		{
			arrayAttr = id_attribute;
		}
		else
		{
			arrayAttr[0]=id_attribute;
		}
		changeTitleSelected(mpgroup,id_group,arrayAttr);
		changeImageSelected(mpgroup,id_group,id_attribute);
		
		
		mpgroup['selected']=id_attribute;
		mpgroup['id_addattr']=id_addattr;

		// Load data features
		if($('#megagroup'+id_group).length && $('#megagroup'+id_group).hasClass('mploadfeatures')){
			loadMPDataFeatures(id_group,id_attribute);
		}
		// Image group
		updateImageProduct(id_group,id_attribute);


		//disableMegaFields();
	}
	showStepResult();	
}
function getMegaField(mpgroup,id_group,id_attribute)
{
	var megafield = null;
	if(mpgroup['show']=='0')
	{
		megafield = $('#megafield_'+id_group+' option:selected');
	}	
	/*else if(mpgroup['show']=='4')
	{
		megafield = $('#megagroups input:radio[name=megafield_'+id_group+']');
	}*/
	else
	{
		megafield = $('#megagroups #megafield_'+id_group+'_'+id_attribute);
	}
	if(mpgroup['multiselect']=='1' && $('[name=mpcheckbox_'+id_group+'_'+id_attribute+']').length){
		megafield = $('[name=mpcheckbox_'+id_group+'_'+id_attribute+']');
	}
	
	return megafield;
}

function changeImageSelected(mpgroup,id_group, id_attribute)
{
	if(typeof changeAdvancedChar!='undefined' && typeof mpCharsColor!='undefined')
	{
		
		if(id_group==mpCharsColor)
			mpCharsIdColor = id_attribute;
		if(id_group==mpCharsFonts)
			mpCharsIdFont = id_attribute;
		
		changeAdvancedChar();
	}
	if(id_attribute!=null && id_attribute.constructor === Array)
	{
		$('#imageDivGroup_'+id_group).hide();
		return;
	}
		
	$('#imageDivGroup_'+id_group).show();
	var megafield = getMegaField(mpgroup,id_group,id_attribute);
	if(mpgroup['show']=='0')
	{
		if($('#megafield_'+id_group+' option:selected').length>0 && $('#imageGroup_'+id_group).length>0)
		{
			$('#imageGroup_'+id_group).attr('src',$(megafield).attr('alt'));
			$('#imageGroupLink_'+id_group).attr('href',$(megafield).attr('alt'));
		}
	}
	else
	{
		if($('#imageGroup_'+id_group).length>0)
		{
			$('#imageGroup_'+id_group).attr('src',$(megafield).attr('alt'));
			$('#imageGroupLink_'+id_group).attr('href',$(megafield).attr('alt'));
		}
	}
	if(id_attribute==0)
	{
		$('#imageDivGroup_'+id_group).hide();
	}
	
}
function changeOptionSelected(megafield)
{
	$(megafield).parents('ul:first').find('a').each(function(){
		$(this).removeClass('selectAttr');
	});
	$(megafield).addClass('selectAttr');
}
function changeQuantityListTitleSelected(id_group)
{
	var title= '';
	var title2= '';
	$('#megagroup'+id_group+' .mega-qty-list').each(function(){
		var qty = parseInt($(this).val());
		if(qty>0){
			if(title!=''){
				title += ' ,';
				title2 += ' <br/>';
			}
				
			title += qty+' x '+$(this).data('title');
			title2 += qty+' x '+$(this).data('title');
		}	
	});
	
	if($('#megagroup'+id_group).length){
		var id_tab = $('#megagroup'+id_group).data('tab');
		if($('#mp-tab'+id_tab+' .verticalTabSelect').length){
			$('#mp-tab'+id_tab+' .verticalTabSelect').html(title2);
		} else {
			$('#megaName_'+id_group).html(title);
		}
	}
	
}
function changeTitleSelected(mpgroup,id_group,attributes)
{
	var megatitle = '';
	
	var megaweight = 0;
	
	if(attributes==null)
		return;
	
	for(var k=0;k<attributes.length;k++)
	{
		if(megatitle!='')
			megatitle += ' - ';
	
		if(mpgroup['show']=='0')
		{
			megatitle += $('#megagroups #megafield_'+id_group+' option[value="' + attributes[k] + '"]').html();
			megaweight += parseFloat($('#megagroups #megafield_'+id_group+' option[value="' + attributes[k] + '"]').attr('data-weight'));
		}
		else if(mpgroup['show']=='4' && mpgroup['multiselect']=='0')
		{
			megatitle += $('#megagroups input:radio[name=megafield_'+id_group+']:checked').attr('title');
			
		}
		else if(mpgroup['show']=='4' && mpgroup['multiselect']=='1')
		{
			megatitle += $('[for=mpcheckbox_'+id_group+'_'+attributes[k]+']').text();	
		}
		else
		{
			var megafield = getMegaField(mpgroup,id_group,attributes[k]);
			if($(megafield).length)
			{
				if ($(megafield).attr('title') != "undefined" && $(megafield).attr('title')!='') 
					megatitle += $(megafield).attr('title');
				else if($(megafield).attr('data-title') != "undefined" && $(megafield).attr('data-title')!='')
					megatitle += $(megafield).attr('data-title');
				else if($(megafield).html()!='')
					megatitle += $(megafield).html();
			}
		
			megaweight += parseFloat($(megafield).attr('data-weight'));
			
			if($('#mpToggle'+id_group).length){
				var color = $(megafield).data('color');
				if(color!=''){
					$('#mpToggle'+id_group).css('background',color);
				}
			}
			
		}
		
	}
	mpgroup['weight'] = megaweight;
	
	if(typeof megatitle!='undefined' && megatitle!='undefined')
	{
		$('#megaName_'+id_group).html(megatitle);
				mpgroup['selectedname'] = megatitle;
	}
	else
	{
		$('#megaName_'+id_group).html('');
		mpgroup['selectedname'] = '';
	}
	//showStepResult();
};
function getMegaGroupById(id_group)
{
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		for (i=0; i< megaGroups.length; i++)
		{
			if(megaGroups[i]['id_addgroup']==id_group)
				return megaGroups[i];
		}
	}
	return null;
}

function updateMPProductSelect(id_group)
{
	mpgroup = getMegaGroupById(id_group);
	if(mpgroup!=null)
	{
		var id_attribute = $('#megafield_'+id_group).val();
		if(mpgroup['show']=='4')
		{
			id_attribute = $('#megagroups input:radio[name=megafield_'+id_group+']:checked').val();
		}
		
		changeTitleSelected(mpgroup,id_group,id_attribute);
		changeImageSelected(mpgroup,id_group,id_attribute);
		
		mpgroup['selected']=id_attribute;
		showStepResult();
	}
}
function findMegaCombination(id_group)
{
	//_MP.changePrice();
	id_attribute = $('#megagroup_'+id_group).val();
	updateMegaAttrSelect(id_group,id_attribute);
};
function findMegaCombo(id_group)
{
	id_attribute = $('#megafield_'+id_group).val();
	$('#group_'+id_group).val(id_attribute);
	//$('#group_'+id_group).change();
	updateMegaAttrSelect(id_group,id_attribute);
};

function getMPGroupById(id_group)
{
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		for (i=0; i< megaGroups.length; i++)
		{
			if(megaGroups[i]['id_addgroup']==id_group)
				return megaGroups[i];
		}
	}
	return null;
}
function removeMegaSelect(mpgroup,id_attribute)
{
	var id_addgroup = mpgroup['id_addgroup']; 
	$('#megafield_'+id_addgroup+'_'+id_attribute).removeClass('selectAttr');
	if ($('#megafield_'+id_addgroup+'_'+id_attribute).is(':radio')) {
		$('#megafield_'+id_addgroup+'_'+id_attribute).attr('checked', false);
		$('#megafield_'+id_addgroup+'_'+id_attribute).parent().removeClass('checked');
	}
	

	$('#megaName_'+id_addgroup).html('');
	mpgroup['selected'] = '';
	mpgroup['weight'] = 0;
	
}
function updateRadioImageSelect(el,id_group,id_attribute){
	$(el).parents('ul:first').find('.mp_color_pick').removeClass('selectAttr');
	updateMegaAttrSelect(id_group,id_attribute);
	$(el).parents('li:first').find('.mp_color_pick').addClass('selectAttr');
}
function selectRadioButtonImage(el,id_group,id_attribute)
{
	$(el).parents('ul:first').find('.mp_color_pick').removeClass('selectAttr');
	
	if($('#megafield_'+id_group+'_'+id_attribute).length)
		$('#megafield_'+id_group+'_'+id_attribute).attr('checked','checked').click();
	$(el).addClass('selectAttr');
}
function selectMegaAttrCheckbox(id_group,id_attribute)
{
	if($('[name="mpcheckbox_'+id_group+'_'+id_attribute+'"]').length)
	$('[name="mpcheckbox_'+id_group+'_'+id_attribute+'"]').click();
}
function updateMegaAttrSelectFancy(id_group,id_attribute){
	parent.$.fancybox.close();
	updateMegaAttrSelect(id_group,id_attribute);
}
function updateMegaAttrSelect(id_group,id_attribute)
{
		
	if(typeof _MP !='undefined')
		_MP.launchId = id_group+'-'+id_attribute;
	mpgroup = getMegaGroupById(id_group);
	
	if(mpgroup==null)
	 return true;
	
	if(mpgroup['selected']==id_attribute && mpgroup['dep']==1)
	{
		if(mpgroup['multiselectmin']>0)
			return;
		removeMegaSelect(mpgroup,id_attribute);
		showStepResult();
		return true;
	}
	
	var id_megagroup = $('#id_megagroup'+id_group).val();
	
	var megafield =  getMegaField(mpgroup,id_group,id_attribute);
	
	
	if($(megafield).find('img').length>0)
	{
		$('#megazoomimg_'+id_group).show();
	}
	else
	{
		$('#megazoomimg_'+id_group).hide();
	}
	changeOptionSelected(megafield);
	
	var arrayAttr = new Array();	
	arrayAttr[0] = id_attribute;
	changeTitleSelected(mpgroup,id_group,arrayAttr);
	changeImageSelected(mpgroup,id_group,id_attribute);
	
	
	if(mpgroup['dep']=='0')
	{
	
		setAttrSelectedId(id_megagroup,id_attribute);
		if($('.product-variants'.length))
		{
			if($('.input-color[value="'+id_attribute+'"]').length)
				$('.input-color[value="'+id_attribute+'"]').attr('checked','checked').change();
			if($('#group_'+id_megagroup).length>0)
			{
				$('#group_'+id_megagroup).change();
			}
			else if($('#color_'+id_attribute).length>0)
			{
				$('#color_'+id_attribute).click();
				setAttrSelectedId(id_megagroup,id_attribute);
			}
		}
	}
	
	mpgroup['selected'] = id_attribute;
	updateHelpAttr(id_group);
	
	checkChangeDefMeasures(false);
	showStepResult();
	
	
};
function setAttrSelectedId(id_group,value)
{
	if($('#group_'+id_group).length>0)
	{
		$('#group_'+id_group).val(value);
	}
	else if($('#color_pick_hidden[name="group_'+id_group+'"]').length>0)
	{
		$('#color_pick_hidden[name="group_'+id_group+'"]').val(value);
	}
	else if($('.color_pick_hidden[name="group_'+id_group+'"]').length>0)
	{
		$('.color_pick_hidden[name="group_'+id_group+'"]').val(value);
	}
	
	return 0;
}
function stepCalculeMegaGroups(id_step)
{
	if($('#id_step_quantity').length>0)
		$('#quantity_wanted').val($('#id_step_quantity').val());
	if($('#btnCalculePrice').length>0)
	{
		$('#btnCalculePrice').click();
	}
	if($('#btnAddProduct').length>0)
	{
		$('#btnAddProduct').click();
	}
};
function stepNextMegaGroups()
{
	var id = parseInt(mpIdStep)+1;
	mpIdStep = id;
	stepMegaGroups(id);
};
function stepPreviousMegaGroups()
{
	var id = parseInt(mpIdStep)-1;
	mpIdStep = id;
	stepMegaGroups(id);
};

function stepMegaGroups(id_step)
{
	if(id_step>mpSteps)
	{
		mpIdStep = 1;
		id_step=1;
	}
	
	$('.mpstep').hide();
	$('.megacombo_step').hide();
	$('.step'+id_step).show();
	//$('#mp-step-result').hide();
	$('#mpStepPrevious').hide();
	//$('#mpStepNext').hide();
	if(id_step==1)
	{
		$('#mpStepNext').show();
	}
	else
	{
		$('#mpStepNext').show();
		$('#mpStepPrevious').show();
	}
	if(id_step==mpSteps)
	{
		$('#mpStepNext').hide();
		$('#mp-step-result').show();
		showStepResult();
	}
	//$('#quantity_wanted').parent().hide();
}
function addProductGroups()
{
	var arrayGroups = new Array();
	if(typeof attributesCombinations!='undefined' && attributesCombinations.length)
	{
		for(var i=0;i<attributesCombinations.length;i++)
		{
			if(typeof attributesCombinations[i]['id_attribute_group']!='undefined')
			{
				var id_group = attributesCombinations[i]['id_attribute_group'];
				if($.inArray(id_group,arrayGroups)<0)
					arrayGroups.push(id_group);
			}
		}
	}
	else
	{
		if($('#attributes .attribute_label').length)
		{
			$('#attributes .attribute_label').each(function(){
				if($(this).attr('id'))
				{
					var id_group = $(this).attr('for').substring(6);
					groupsMA.push(id_group);
					optionswitch(id_group);
				}
			});
		}
		else
		{
			$('#attributes .color_pick_hidden').each(function(){
				
					var id_group = $(this).attr('name').substring(6);
					groupsMA.push(id_group);
					optionswitch(id_group);
				
			});
			$('#attributes select').each(function(){
				var id_group = $(this).attr('id').substring(6);
				groupsMA.push(id_group);
				optionswitch(id_group);
			});
		}
	}
	if(typeof _MP!='undefined')
		_MP.arrayGroups = arrayGroups; 
	return arrayGroups;

}
function getSelectedIds()
{
	var arrayIds = new Array();
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		for (k=0; k<megaGroups.length; k++)
		{
			
			if(typeof megaGroups[k]!='undefined' && !$('#megagroup'+megaGroups[k]['id_addgroup']).hasClass('hideMegafield'))
			{
				if($.inArray(megaGroups[k]['selected'],arrayIds)<0)
					arrayIds.push(parseInt(megaGroups[k]['selected']));
			}
		}
	}
	else if(typeof _MP!='undefined')
	{
		if(!_MP.arrayGroups.length)
			addProductGroups();
		
		for (k=0; k<_MP.arrayGroups.length; k++)
		{
			var id_group = _MP.arrayGroups[k];
			var attrId = parseInt(getAttrSelectedId(id_group));
			if($.inArray(attrId,arrayIds)<0)
				arrayIds.push(parseInt(attrId));
		}
	}
	return arrayIds;
}
function getLayerRefereces(){
	var references = '';
	$('#mpimages select option:selected').each(function(){
		var ref = $(this).attr('reference');
		if(typeof ref!='undefined'){
			if(references!='')
				references+='-';
			references+=ref;		
		}	
	});
	$('#mpimages .megabuttons_list a.selectAttr').each(function(){
		var ref = $(this).attr('reference');
		if(typeof ref!='undefined'){
			if(references!='')
				references+='-';
			references+=ref;		
		}	
	});
	return references;
}
function showMegaLayers()
{
	if(typeof mpImageProduct != 'undefined' && mpImageProduct=="group" && typeof mpImageProductUrl != 'undefined' && mpImageProductUrl!=''){
		file = mpImageProductUrl;
		if($('#product-images-large .slick-active img').length)
			$('#product-images-large .slick-active img').attr('src',file);
		else if($('.product-images-ecommzoom .cover-image-ecommzoom img').length)
			$('.product-images-ecommzoom .cover-image-ecommzoom img').attr('src',file);
		else if($('#product-images-large .slick-active img').length)
			$('#product-images-large .slick-active img').attr('src',file);

		else if($('#view_full_size img').length)
			$('#view_full_size img').attr('src',file);
		else if($('#bigpic').length)
			$('#bigpic').attr('src',file);
		else if($('.js-qv-product-cover').length)
			$('.js-qv-product-cover').attr('src',file);
		if($('#view_full_size	.jqzoom').length)
			$('#view_full_size	.jqzoom').attr('href',file);

	}
	if(typeof _MP != 'undefined' && $('.mploadfeatures').length)
	{
		if($('#bigpic').length || $('.product-images-ecommzoom .cover-image-ecommzoom img').length || $('#product-images-large .slick-active img').length || $('#product-images-large .slick-active img').length || $('#view_full_size img').length || $('.js-qv-product-cover').length)
		{
			sendgroups = '&id_product='+getIdProduct();
			var resultAttrs = listAttrIds();
			var attr = '';
			if(resultAttrs[0]==0)
			{	
				sendgroups +=resultAttrs[1];
				attr=resultAttrs[1];
			}
			// Add ids if exist combination
			if($('#product-details').length){
				var dataproduct = $('#product-details').data('product');
				var attributes = dataproduct.attributes;
				if(typeof attributes!='undefined' && Object.keys(attributes).length){
					for (key in attributes) {
						if(attr!='')
							attr+='-';
						attr+= attributes[key].id_attribute;
					}
				}
			}
			var group_image = 0;
			var ids = '0';
			if(attr!='')
				ids = attr.replace('&attrIds=','');
			references = getLayerRefereces();
			//var file = baseDir +'index.php?fc=module&controller=imagelayer&module=megaproduct'+sendgroups;
			var file = baseDir + 'module/megaproduct/imagelayer/'+getIdProduct()+'/'+ references;
			datafile = '?';
			if($('.mp-chars-input').length){
				datafile += 'text='+$('.mp-chars-input').val();
				if(typeof mpCharsColor!='undefined')
				{
					if($('#megafield_'+mpCharsColor+'_'+mpCharsIdColor).length){
						var color = $('#megafield_'+mpCharsColor+'_'+mpCharsIdColor).data('color');
						color = color.replace('#','');
						datafile += '&color='+color;
					}
					if($('#megafield_'+mpCharsFonts+' option[value="' + mpCharsIdFont + '"]').length){
						var font = $('#megafield_'+mpCharsFonts+' option[value="' + mpCharsIdFont + '"]').text();
						font = font.replace(/\s/g,'');
						font = font.toLowerCase();
						datafile += '&font='+font;
					}
				}
			}
			if($('.mp-imagetext').length){
				$('.mp-imagetext .mp-personalization input').each(function(){
					var id = $(this).attr('alt'); 
					if($(this).val())
						datafile += '&text'+id+'='+$(this).val();
				})
			}
			if($('.mp-imagecolor').length){
				$('.mp-imagecolor .megacolor_list a.selectAttr').each(function(){
					var id = $(this).attr('data-addgroup'); 
					var color = $(this).attr('data-color');
					color = color.replace('#', '');
					datafile += '&color'+id+'='+color;
				})
			}
			if($('.mp-backgroundcolor').length){
				$('.mp-backgroundcolor .mp-personalization input').each(function(){
					var id = $(this).attr('data-group'); 
					if($(this).val()){
						var color = $(this).val();
						color = color.replace('#', '');
						datafile += '&background'+id+'='+color;
					}
						
				})
			}
			file+=datafile;
			
			
			if($('#product-images-large .slick-active img').length)
				$('#product-images-large .slick-active img').attr('src',file);
			else if($('.product-images-ecommzoom .cover-image-ecommzoom img').length)
				$('.product-images-ecommzoom .cover-image-ecommzoom img').attr('src',file);
			else if($('#product-images-large .slick-active img').length)
				$('#product-images-large .slick-active img').attr('src',file);
				
			else if($('#view_full_size img').length)
				$('#view_full_size img').attr('src',file);
			else if($('#bigpic').length)
				$('#bigpic').attr('src',file);
			else if($('.js-qv-product-cover').length)
				$('.js-qv-product-cover').attr('src',file);			
			if($('#view_full_size	.jqzoom').length)
				$('#view_full_size	.jqzoom').attr('href',file);
			
				/* PLATILLAS CON EASYZOOM
				var i = $("#product-images-large .slick-current img").first().data("image-large-src");	
			 if ($(".js-modal-product-cover-easyzoom").first().attr("href", i), $(".js-modal-product-cover").first().attr("src", i), "inner" == iqitTheme.pp_zoom || "modalzoom" == iqitTheme.pp_zoom) {
                var o = $(".easyzoom-product").easyZoom();
                var api = o.data('easyZoom');
                api.swap(file,file);		
        } */ 
			
			if($('.mp-group-image').length){
				$('.mp-group-image').each(function(){
					image_group = $(this).data('group');
					file = baseDir + 'module/megaproduct/imagelayer/'+getIdProduct()+'/'+ attr.replace('&attrIds=','')+'/'+image_group;
					$(this).attr('src',file+datafile);
				});
			}
			
			
			
		
		}
				
		return;
	}
}
function getMeasure(measure)
{
	var me = $('#id_'+measure).val();
	if(typeof me!='undefined')
	{
		me = me.replace(",",".");
	}
	return me;
}
function showStepResult()
{
	if(typeof _MP=='undefined')
		return;
	$('#megaproducterror').hide();
	checkChangeLimits(false);	
	// Designer resize 
	if(typeof resizeStageByMeasures=='function')
		resizeStageByMeasures();
	
	
	disableMegaFields();
	checkActionQuantities();
	showMegaLayers();
	calculeMPBorders();
	applyLamasByMeasures();
	if(typeof applyAttributesElements!='undefined')
		applyAttributesElements();
	
	if(typeof showElementsByAttributes=='function')
		showElementsByAttributes()
	
	if($.uniform)
		$.uniform.update();

	if($('#id_step_quantity').length>0)
		$('#quantity_wanted').val($('#id_step_quantity').val());
	if(_MP.ajax_price==1)
	{
		showprice( getIdProduct(), getIdCombination(), true, null, $('#quantity_wanted').val(), null);
	}
	
	if(typeof megaGroups!='undefined' && megaGroups.length>0 && $('#mp-step-result').length)
	{
		$('#mp-step-result').html('');
		var images = $('<p>');
		
		var addmeasures = true;
		if($('.mpgroupmeasures.hideMegaField').length)
			addmeasures = false;
			
		if(addmeasures)
		{	
		var measures = '<div class="mp-result-data">';
		if($('#id_width').length)
		{
			measures +='<span class="mp-result-width mp-result-measure"><span class="mp-result-measure-label">'+$('label[for="id_width"]').html()+'</span> '+$('#id_width').val()+'</span><br/>';
		}
		if($('#id_height').length)
		{
			measures +='<span class="mp-result-height mp-result-measure"><span class="mp-result-measure-label">'+$('label[for="id_height"]').html()+'</span> '+$('#id_height').val()+'</span><br/>';
		}
		if($('#id_long').length)
		{
			measures +='<span class="mp-result-long mp-result-measure"><span class="mp-result-measure-label">'+$('label[for="id_long"]').html()+'</span> '+$('#id_long').val()+'</span><br/>';
		}
		
		measures += '</div>';
			images.append(measures);
		}
		
		var weight = 0;
		for (k=0; k<megaGroups.length; k++)
		{
			
			if(typeof megaGroups[k]!='undefined')
			{
			//	if(!isNaN(megaGroups[k]['weight']))
				//	weight += megaGroups[k]['weight'];
				var id_group = megaGroups[k]['id_group'];
				var id_addgroup = megaGroups[k]['id_addgroup'];
				var mpgroup = megaGroups[k];
				var labelvalue = '';
				var labeltitle = '';
				if(!isNaN(megaGroups[k]['weight']) && applyGroupValue(id_addgroup))
					weight += parseFloat(megaGroups[k]['weight']);
					
				if($('#megalabel_'+id_addgroup+' .mega_title').length && applyGroupValue(id_addgroup)  && mpgroup['action']!=1)
				{
					var id_attr = 0;
					if(typeof mpgroup['attrs']!='undefined' && typeof mpgroup['attrs'][0]!='undefined'){
						id_attr = mpgroup['attrs'][0];
					}
					labeltitle = '<span class="mp-label-result">'+$('#megalabel_'+id_addgroup+' .mega_title').html()+'</span>';
					//images.append();
					if(mpgroup['type']=='1' && mpgroup['show']=='6')
					{
						labelvalue = '';
						$('#megafield_'+id_addgroup+' .mega-comb-qty-list').each(function(){
							var value = parseInt($(this).val());
							if(value!=0)
							{
								var name = $(this).parents('.mpclistproduct:first').find('.megaproduct_name:first').html();
								labelvalue += '<br/><span class="mp-data-result">'+value+'x '+name+'</span><br/>';
							}			
						});			
					}
					else if(mpgroup['type']!='3' && mpgroup['show']!='3')
					{
						if($('#megalabel_'+id_addgroup+' .megaattr_name').length && $('#megalabel_'+id_addgroup+' .megaattr_name').html()!='')
						labelvalue = '<br/><span class="mp-data-result">'+$('#megalabel_'+id_addgroup+' .megaattr_name').html()+'</span><span id="mp-data-price'+id_attr+'" class="mp-data-price"></span><br/>';
						//images.append();
					}
					else if(mpgroup['show']!='3')
					{
						//if(mpgroup['id_group']!='3')
							//images.append('<br/>');
						if($('#megafield_'+id_addgroup).length && $('#megafield_'+id_addgroup).val()!='')
							labelvalue = '<br/><span class="mp-data-result">'+$('#megafield_'+id_addgroup).val()+'</span><br/>';
						//images.append();
					}
					if(mpgroup['show']=='3')
					{
						$('#megagroup'+id_addgroup+' .mega-qty-list').each(function(){
							var qty = $(this).val();
							if(qty!=0)
							{
								var attrId = $(this).data('attr');
								var labelQty  = $('#qty-label-'+attrId).html(); 
								var labelPrice = '';
								if($('#qty-price-'+attrId).length)
									labelPrice  = $('#qty-price-'+attrId).html();
							if(typeof labelPrice=='undefined')
									labelPrice  = '';
								if(typeof labelQty=='undefined' || labelQty=='')
									labelQty  = $(this).data('title');
								
								
								labelvalue+= '<br/><span class="mp-data-result">'+qty+_MP.qtysufix+'x '+labelQty+' '+labelPrice+'</span><span id="mp-data-price'+attrId+'" class="mp-data-price"></span>';				
							}
						});
						if(labelvalue!='')
							labelvalue+='<br/>';
					}
					if(labelvalue!='')
					{
						images.append(labeltitle);		
						images.append(labelvalue);
					}
				}
							
				if(mpgroup['type']=='0')
				{	
					if(mpgroup['show']!='3')
					{
						var idattr = 0;
						if(mpgroup['dep']=='0')
						{
							idattr =  $('#group_'+id_group).val();
						}
						else if(mpgroup['dep']=='1')
						{
							idattr = $('#megagroup_'+id_group).val();
						}
						$('#mp-step-result').append($('#mpattrlabel_'+id_group).clone());
						if(mpgroup['show']=='1')
						{
							images.append($('#mpattr_'+idattr).clone());
						}
					}		
				}
				if(mpgroup['type']=='1' || mpgroup['type']=='7')
				{
					var idproduct = 0;
					idproduct =  $('#mp-cat-'+id_group).val();
					
					if(mpgroup['show']=='3')
					{
						var cont = $('#mpcategorylabel_'+id_group).clone();
						$('#mp-qty-'+id_group+' input').each(function(){
							var id = $(this).attr('id').substring(10);
							if($(this).val()!=0)
							{
								cont.append('<br/>');
								cont.append($('#productName_'+id).clone());		
							}
						});
						$('#mp-step-result').append(cont);
					}
					else if(mpgroup['show']=='6' && mpgroup['type']=='7' && applyGroupValue(id_addgroup))
					{
						labeltitle = '<br/><span class="mp-label-result">'+$('#megalabel_'+id_addgroup+' .mega_title').html()+'</span>';
						var cont = '';
						$('#megagroup'+id_addgroup+' .mega-comb-qty-list').each(function(){
							var id = $(this).data('attr');
							if($(this).prop('checked'))
							{
								cont+='<br/>';
								cont+=$('#productName_'+id).html();
								if($(this).parents('.mpclistproduct:first').find('.mp_attribute_list select').length){
									cont+=' '+$(this).parents('.mpclistproduct:first').find('.mp_attribute_list select:first  option:selected').text();
								}		
							}
						});
						if(cont!='')
						$('#mp-step-result').append(labeltitle+cont);
					}
					else
					{
						$('#mp-step-result').append($('#mpcategorylabel_'+id_group).clone());
					}
						
					if(mpgroup['show']=='1')
					{
						images.append($('#mpproduct_'+idproduct).clone());
					}
				}
			}
		}
		images.append('<br/>');
		if($('#id_step_quantity').length)
		{
			measures ='<br/><span class="mp-result-days">'+$('label[for="id_step_quantity"]').html()+' '+$('#id_step_quantity').val()+'</span>';
		}
		images.append(measures);
		$('#mp-step-result').append(images);
		$('.mp-product-name').html($('h1').html());
				
		if(_MP.weight!=0)
		{
			var totalmeasure = _MP.getTotalMeasure();
			weight += totalmeasure*_MP.weight;
		}
		weight = parseFloat(weight);
		
		$('.mp-result-weigth').hide();
		if(!isNaN(weight))
		{
			weight = parseFloat(weight);
			
			$('.mp_total_weight').html(weight.toFixed(3));
			if(weight!=0)
				$('.mp-result-weigth').show();
		}
		else
		{
			$('.mp_total_weight').html('0');
		}
	
	}
	
	if(_MP.ajax_price==1)
	{
		showprice( getIdProduct(), getIdCombination(), true, null, $('#quantity_wanted').val(), null);
	}
	// Change Urls Status
	changeFilterMPUrlStatus();
	
	checkLimitMinQuantity(false);
}
function hideStepMegaGroups()
{
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		$('#megaproduct').hide();
		$('#quantity_wanted_p').addClass('mpHide');
		if($('#btnRanges').length>0)
		{
			$('#id_step_prices').show();
			$('#id_step_prices').click(function(){
				$('#btnRanges').click();
			});
			
		}
	}
		
	
}
function showButtonMegaproductStep(type)
{
	
	var steps = $('.mp-tab-steps .progressbar li').length;
	if(type=='before')
	{
		if($('.mp-tab-steps .progressbar li.active').length==1){
			return;
		}
		$('.mp-tab-steps .progressbar li.active:last').prev().click();
		$('.mp-tab-steps .progressbar li.active').last().removeClass('active');
		
		
	}
	else if(type=='next')
	{
		if($('.mp-tab-steps .progressbar li.active').length==steps){
			return;
		}
		
		
		$('.mp-tab-steps .progressbar li.active:last').next().click();
		
	}	
}
function showButtonMegaproductTab(type)
{
	
	//var selected = $('.mp-tab .selected').attr('data-tab');
	if(type=='before')
	{
		var before = $('#mp-ul-tabs .selected').prevAll().not('.hideMegaField').first();
		if($(before).length && $(before).attr('id')!='mp-tab-before')
		{
			$('.showTab').hide();
			
			$('.mp-tab').removeClass('selected');
			var id = $(before).attr('data-tab');
			$(before).addClass('selected');
			$('.showTab'+id).show();	
		}
	}
	else if(type=='next')
	{
		
		var next = $('#mp-ul-tabs .selected').nextAll().not('.hideMegaField').first();
		if($(next).length && $(next).attr('id')!='mp-tab-next')
		{
			$('.showTab').hide();
			
			$('.mp-tab').removeClass('selected');
			var id = $(next).attr('data-tab');
			$(next).addClass('selected');
			$('.showTab'+id).show();
		}
	}	
}
function showMegaproductTab(id)
{
	$('.showTab').hide();
	$('.showTab'+id).show();
	$('.mp-tab').removeClass('selected');
	$('#mp-tab'+id).addClass('selected');
	loadMegaproductTab(id);
}
function showMegaproductStep(id)
{
	$('.showTab').hide();
	$('.showTab'+id).show();
	//$('.mp-step-tab').removeClass('active');
	$('#mp-step-tab'+id).addClass('active');
	
}
function loadMegaproductGroup(id_addgroup){
	if($('#megagroup'+id_addgroup+' .megainputcontent').attr('data-load')==0){
		$.ajax({
			type: 'POST',
			url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct&action=loadMegagroup&id_addgroup='+id_addgroup+'&id_product='+$('#product_page_product_id').val(),
			async: true,
			cache: false,
			dataType: "html",
			
			success: function (jsonData) {
				if(jsonData!=''){
					$('#megagroup'+id_addgroup+' .megainputcontent').html(jsonData);
					$('#megagroup'+id_addgroup).removeClass('hidden');	
					$('#megagroup'+id_addgroup+' .megainputcontent').attr('data-load',1);
					if($('#megagroup'+id_addgroup+'.showTab').length){
						var id_tab = $('#megagroup'+id_addgroup+'.showTab').data('tab');
						if($('#mp-tab'+id_tab+' .verticalTabImage').length && $('#mp-tab'+id_tab+' .verticalTabImage').html()==''){
							$('#mp-tab'+id_tab+' .verticalTabImage').html($('#megagroup'+id_addgroup+'.showTab li img:first').clone());
						}
					}
					$('#megagroup'+id_addgroup+' .mega-qty-list').unbind().bind('keyup mouseup', function () {
						changeQuantityListTitleSelected($(this).data('group'));
						showStepResult();
					});
					
					if($('#productIds'+id_addgroup).length){
						$('#productIds'+id_addgroup).val('');
					}
					
					quantityMPListEvents();
					
				}
				}
		});	
	} else{
			$('#megagroup'+id_addgroup).removeClass('hidden');	
	}

}
function loadMegaproductTab(id_tab){
	$('div.showTab'+id_tab).each(function(){
		id_addgroup = $(this).data('group');
		loadMegaproductGroup(id_addgroup);
	});    
}
function loadMegaproductAccordeon(id){
	$('#mp-accordion-'+id+' .showAccordion').each(function(){
		id_addgroup = $(this).data('group');
		loadMegaproductGroup(id_addgroup);
	});    
}

function disableAttrMeasures()
{
	if(typeof _MP!='undefined' && typeof _MP.arrayMeasureAttr!='undefined' && _MP.arrayMeasureAttr.length)
	{
		var attrs = _MP.arrayMeasureAttr;
		for(var l=0;l<attrs.length;l++)
		{
			attrs[l]['selected']=false;
		}
		if(typeof megaGroups!='undefined' && megaGroups.length)
		{
			for (var j=0; j<megaGroups.length; j++)
			{
				for(var k=0;k<attrs.length;k++)
				{
					if(attrs[k]['id']==megaGroups[j]['selected'])
						attrs[k]['selected'] = true;
				}
			}
		}
		else
		{
			$('.product-variants select').each(function(){
				var value = $(this).val();
				for(var k=0;k<attrs.length;k++)
				{
					if(attrs[k]['id']==value)
						attrs[k]['selected'] = true;
				}
			});
		}
		for(var k=0;k<attrs.length;k++)
		{
			if(attrs[k]['selected']==true)
			{
				if($('#id_'+attrs[k]['measure']+'_select').length){
					if($('#id_'+attrs[k]['measure']).hasClass('mpHide')){
						$('#id_'+attrs[k]['measure']).val($('#id_'+attrs[k]['measure']+'_select').val());
					}
				}
				else if($('#id_'+attrs[k]['measure']).val()=='')
					$('#id_'+attrs[k]['measure']).val('1');
				if($('#id_step_'+attrs[k]['measure']).length && $('#id_step_'+attrs[k]['measure']).val()=='')
					$('#id_step_'+attrs[k]['measure']).val('1');
					
				$('#mp-'+attrs[k]['measure']).removeClass('mpHide');
				if($('#mp-step-'+attrs[k]['measure']).length)
					$('#mp-step-'+attrs[k]['measure']).removeClass('mpHide');
					
				$('#mp-'+attrs[k]['measure']).change();
			}
			else
			{
				$('#mp-'+attrs[k]['measure']).addClass('mpHide');
				if($('#id_'+attrs[k]['measure']).val()!='')
					$('#id_'+attrs[k]['measure']).val('');
				if($('#mp-step-'+attrs[k]['measure']).length)
					$('#mp-step-'+attrs[k]['measure']).addClass('mpHide');
			}
		}
	}
}
function replaceAllData(string, search, replace) {
	  return string.split(search).join(replace);
	}
function sendFormule(formule){
	var width = $('#id_width').val();
	var height = $('#id_height').val();
	var long = $('#id_long').val();
	var totalmeasure = _MP.getTotalMeasure();
	var quantity = $('#quantity_wanted').val();
	formule = replaceAllData(formule,'W',width);
	formule = replaceAllData(formule,'H',height);
	formule = replaceAllData(formule,'L',long);
	formule = replaceAllData(formule,'Q',quantity);
	var dataajax = 'action=getFormule&formule='+encodeURIComponent(formule);
	
	var result = false;
	$.ajax({
			type: 'POST',
			url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct',
			async: false,
			cache: false,
			dataType : "html",
			data: dataajax,
			success: function(jsonData)
			{
				if(jsonData=='1')
				{
					result =  true;
				}
				
				
			}
	});
	return result;

	
}
function disableMegaFields()
{
	disableAttrMeasures();
	if(typeof megaGroups=='undefined')
		return
	
	$('.hideMegaField').each(function(){
		$(this).prop("disabled", false);	
	});	
	$('.hideMegaField').removeClass('hideMegaField');	
	
	var width = $('#id_width').val();
	var height = $('#id_height').val();
	var long = $('#id_long').val();
	var totalmeasure = _MP.getTotalMeasure();
	var quantity = $('#quantity_wanted').val();
	var arrayIdGroups = new Array();
	var arrayIdBoolGroups = new Array();
	if(rulesArray.length>0)
	{
		/*if(_MP.arrayRuleOptions.length && _MP.applyRuleOptions)	
		{
			for (var j=0; j<megaGroups.length; j++)
			{
				var idAddGroup = megaGroups[j]['id_addgroup'];
				if(typeof _MP.arrayRuleOptions[idAddGroup]!='undefined'){
					var idSelected = $('#megafield_'+idAddGroup).val();
					$('#megafield_'+idAddGroup+' option').remove();
					$('#megafield_'+idAddGroup).append(_MP.arrayRuleOptions[idAddGroup]);
					
					_MP.applyRuleOptions = false;
					$('#megafield_'+idAddGroup).val(idSelected);
					$('#megafield_'+idAddGroup).change();
					_MP.applyRuleOptions = true;
				}
			}	
		}*/
		// Save option measures
		var arrayMeasures = new Array('width','height','long');
		for(var i=0;i<arrayMeasures.length;i++)
		{
			var m = arrayMeasures[i];
			if($('#id_'+m+'_select').length && _MP.applyDisableMeasureRule){
				_MP.arraySelectedOptions[m] = $('#id_'+m+'_select').val();
				if(typeof _MP.arrayDisableMeasures[m]=='undefined'){			
					_MP.arrayDisableMeasures[m] = $('#id_'+m+'_select option');
				} else {
					if(_MP.applyDisableMeasures){
						$('#id_'+m+'_select option').remove();
						$('#id_'+m+'_select').append(_MP.arrayDisableMeasures[m]);
					}					
				}
				if($('#id_'+m+'_select').val()!=_MP.arraySelectedOptions[m]){					
					$('#id_'+m+'_select').val(_MP.arraySelectedOptions[m]);
					_MP.applyDisableMeasureRule = false;
					$('#id_'+m+'_select').change();
					_MP.applyDisableMeasureRule = true;
				}
			} 
				
			
		}
		
		for (var i=0; i<rulesArray.length; i++)
		{
			var selected_fields = new Array();
			if(rulesArray[i]['selected_fields']!='')
				selected_fields = rulesArray[i]['selected_fields'].split("|");
			
			var disabled_fields = rulesArray[i]['disabled_fields'].split("|");
			var applyRule = true;
			var type = parseInt(rulesArray[i]['rule']);
			var logical = rulesArray[i]['logical'];
			var groupId = parseInt(rulesArray[i]['groupId']);
			var message = rulesArray[i]['message'];
			var numberSelects = 0;
			
			if(true)
			{
				var existAttr = false;
				for(var m=0; m<selected_fields.length; m++)
				{
					$arraySelect = selected_fields[m].split('-');
					if(type==0 || type==3 || type==1)
						var selectedRule = false;
					else
						var selectedRule = true;
					if($arraySelect.length==2)
					{
						var hasAttrId = false;
						for (var j=0; j<megaGroups.length; j++)
						{
							if(!hasAttrId)
							{
							if(megaGroups[j]['multiselect']==1)
							{
								var selectAttr = getMultiSelectGroup(megaGroups[j]['id_addgroup'],false);
								if($.inArray($arraySelect[1],selectAttr)>=0)
								{ 
										numberSelects++;
										existAttr = true
										hasAttrId = true;
									if(type==0 || type==3)
									{
										if(type==3)
										{
											launchId = megaGroups[j]['id_addgroup']+'-'+$arraySelect[1];
											if(_MP.launchId==launchId)
												selectedRule = true;
										}
										else
											selectedRule = true;
									}
									else
										selectedRule = false;
								}
							}
							else if(((megaGroups[j]['type']==1 || megaGroups[j]['type']==7) && $arraySelect[0]=='p') || (megaGroups[j]['type']==0 && $arraySelect[0]=='a'))
							{
								if(typeof megaGroups[j]['selected']!='undefined' && megaGroups[j]['selected']==$arraySelect[1])
								{
										existAttr = true;
										numberSelects++;
										hasAttrId = true;
									if(type==0 || type==3 || type==1)
									{
										if(type==3)
										{
											launchId = megaGroups[j]['id_addgroup']+'-'+$arraySelect[1];
											if(_MP.launchId==launchId)
												selectedRule = true;
										}	
										else
											selectedRule = true;
									}
										//else if(type==2)
											//selectedRule = false;
								}
							}		
							}
						}
					}
					if(logical=='and' && !selectedRule)
							applyRule = false;
					
					
					
				}
				if(!existAttr && type!=2)
					applyRule = false;
				if(selected_fields.length==0)
					applyRule = true;
			}
			if(rulesArray[i]['rule']==1 && applyRule)
			{
				option_measure = rulesArray[i]['option_measure'];
				
				applyRuleMeasure = true;
				
				checkNextRule = true;
				if(rulesArray[i]['formule']!="" && checkNextRule)
				{
					applyRuleMeasure = sendFormule(rulesArray[i]['formule']);
					if((logical=='and' && !applyRuleMeasure) || (logical=='or' && applyRuleMeasure))
						checkNextRule = false;
				}
				if(rulesArray[i]['width']!=0 && checkNextRule)
				{
					applyRuleMeasure = ruleMeasure(rulesArray[i]['width'],width,option_measure);
					if((logical=='and' && !applyRuleMeasure) || (logical=='or' && applyRuleMeasure))
						checkNextRule = false;
				}
				if(rulesArray[i]['height']!=0 && checkNextRule)
				{
					applyRuleMeasure = ruleMeasure(rulesArray[i]['height'],height,option_measure);
					if((logical=='and' && !applyRuleMeasure) || (logical=='or' && applyRuleMeasure))
						checkNextRule = false;
				}
				if(rulesArray[i]['long']!=0 && checkNextRule)
				{
					applyRuleMeasure = ruleMeasure(rulesArray[i]['long'],long,option_measure);
					if((logical=='and' && !applyRuleMeasure) || (logical=='or' && applyRuleMeasure))
						checkNextRule = false;
				}
				if(rulesArray[i]['total']!=0 && checkNextRule)
				{
					applyRuleMeasure = ruleMeasure(rulesArray[i]['total'],totalmeasure,option_measure);
					if((logical=='and' && !applyRuleMeasure) || (logical=='or' && applyRuleMeasure))
						checkNextRule = false;
				}
				if(rulesArray[i]['quantity']!=0 && checkNextRule)
				{
					applyRuleMeasure = ruleMeasure(rulesArray[i]['quantity'],quantity,option_measure);
					if((logical=='and' && !applyRuleMeasure) || (logical=='or' && applyRuleMeasure))
						checkNextRule = false;
				}
				if(rulesArray[i]["partial"] != 0 && checkNextRule) {
	                 var totalwh = parseFloat(width) + parseFloat(height);
	                 applyRuleMeasure = ruleMeasure(rulesArray[i]["partial"], totalwh, option_measure);
	                 if((logical=='and' && !applyRuleMeasure) || (logical=='or' && applyRuleMeasure))
							checkNextRule = false;
	            }
				if(!applyRuleMeasure){
					applyRule = false;
				}
					
		
			}
			if(groupId!=0)
			{
				if(typeof arrayIdGroups[groupId]=='undefined')
				{					
					arrayIdBoolGroups[groupId] = true;
					arrayIdGroups[groupId] = new Array();
				}				
				if(applyRule && arrayIdBoolGroups[groupId])
				{
					var ruleOptions = {type:type,megaGroups:megaGroups,disabled_fields:disabled_fields};
					arrayIdGroups[groupId].push(ruleOptions);
				}
				if(!applyRule){
					arrayIdBoolGroups[groupId] = false;
				}				
			}
			if(type==2)
			{
				if(logical=='and' && numberSelects!=selected_fields.length){
					launchDisableFields(type,megaGroups, disabled_fields,message);
				} else if(logical=='or' && numberSelects==0){
					launchDisableFields(type,megaGroups, disabled_fields,message);
				}
			}
			else if(applyRule && groupId==0)
			{
				launchDisableFields(type,megaGroups, disabled_fields,message);
			}	
			else if(applyRule && groupId==0)
			{
				launchDisableFields(type,megaGroups, disabled_fields,message);
				if(rulesArray[i]['disabled_measures']!='' && _MP.applyDisableMeasureRule){
					disableDefaultMeasures(rulesArray[i]['disabled_measures']);
				}
			}	
		}
		if(arrayIdBoolGroups.length)
		{
			for(var m=0;m<arrayIdBoolGroups.length;m++)
			{
				if(arrayIdBoolGroups[m])
				{
					var rulesGroupLaunch = arrayIdGroups[m]; 
					for(var ja=0;ja<rulesGroupLaunch.length;ja++)
					{
						launchDisableFields(rulesGroupLaunch[ja]['type'],rulesGroupLaunch[ja]['megaGroups'], rulesGroupLaunch[ja]['disabled_fields'],message);
					}
				}
			}
		}
	}
	
}
function disableDefaultMeasures(measures){
	
	
	
	var arrayAllMeasures = measures.split('|');
	for(var j=0; j<arrayAllMeasures.length; j++)
	{
		var arrayMeasures = arrayAllMeasures[j].split(':');
		if(arrayMeasures.length==2){
			var type = arrayMeasures[0];
			var sType = 'width';
			if(type=='H'){
				sType = 'height';
			}
			if(type=='L'){
				sType = 'long';
			}
			if($('#id_'+sType+'_select').length){
				var valueMeasures = arrayMeasures[1];
				var arrayValueMeasures = valueMeasures.split(',');
				for(var k=0; k<arrayValueMeasures.length; k++)
				{
					if($('#id_'+sType+'_select option[value="'+arrayValueMeasures[k]+'"]').length){
						$('#id_'+sType+'_select option[value="'+arrayValueMeasures[k]+'"]').remove();
						_MP.applyDisableMeasures = 1;
					}
				}
				if(_MP.applyDisableMeasures && typeof _MP.arraySelectedOptions[sType]!='undefined' ){
					if($('#id_'+sType+'_select').val()!=_MP.arraySelectedOptions[sType]){
						
						if($('#id_'+sType+'_select option[value="'+_MP.arraySelectedOptions[sType]+'"]').length)
							$('#id_'+sType+'_select').val(_MP.arraySelectedOptions[sType]);
						else
							$('#id_'+sType+'_select').val($('#id_'+sType+'_select option:first').val());
						_MP.applyDisableMeasureRule = false;
						$('#id_'+sType+'_select').change();
						_MP.applyDisableMeasureRule = true;
					}
				}
			}
		}
	}
}
function launchDisableFields(type,megaGroups, disabled_fields,message)
{
	for(var j=0; j<disabled_fields.length; j++)
	{
		$arrayDisabled = disabled_fields[j].split('-');
		if($arrayDisabled.length==2)
		{
			if(type==3)
			{
				idAttr = $arrayDisabled[1];
				
				// if selected fields
				for (var k=0; k<megaGroups.length; k++)
				{
					if($('#megafield_'+megaGroups[k]['id_addgroup']+'_'+idAttr).length>0 || $('#megafield_'+megaGroups[k]['id_addgroup']+' option[value="'+idAttr+'"]').length>0)
					{
							var hasSelected = checkDisableSelected(megaGroups[k],idAttr);
							if(!hasSelected && message!='')
								showDialogAlert(message,megaGroups[k]['id_addgroup']);
		
						selectRuleOptions(megaGroups[k],idAttr);
						break;
					}
				}
			}		
			else
			{
				// If disable rule
				if($arrayDisabled[0]=='g')
				{
					if ($('#mp-tab' + $arrayDisabled[1]).length)
						$('#mp-tab' + $arrayDisabled[1] + ', .mp-tab' + $arrayDisabled[1]).addClass('hideMegaField');
					else if ($('#mp-accordion' + $arrayDisabled[1]).length)
						$('#mp-accordion' + $arrayDisabled[1] + ', .mp-tab' + $arrayDisabled[1]).addClass('hideMegaField');
					else
						$("#megagroup"+$arrayDisabled[1]).addClass('hideMegaField');
					
					// Check disable group colors chars
					if(typeof disableAdvancedColor!='undefined')
						disableAdvancedColor($arrayDisabled[1]);
				}
				else
				{
					for (var k=0; k<megaGroups.length; k++)
					{
						if(((megaGroups[k]['type']==1 || megaGroups[k]['type']==7) && $arrayDisabled[0]=='p') || (megaGroups[k]['type']==0 && $arrayDisabled[0]=='a'))
						{
							hideRuleField($arrayDisabled[0],$arrayDisabled[1],megaGroups[k]['id_addgroup'],message);
						}
					}
				}
			}
		}
	}
}
function selectRuleOptions(megagroup,idattr)
{
	if(typeof megagroup=='undefined' || megagroup==null)
		return;
	id_group = megagroup['id_group'];
	id_addgroup = megagroup['id_addgroup'];
	var megafield =  getMegaField(megagroup,id_addgroup,idattr);
	
	megagroup['selected'] = idattr;
	changeOptionSelected(megafield);
	if(idattr!=0 && megagroup['show']!='3')
	{
		if(megagroup['show']=='4')
		{
			$(megafield).prop("checked", true);
		}
		if(megagroup['show']=='0')
		{
			$(megafield).parent('select').val(idattr);
		}
		var arrayAttr = new Array();
		arrayAttr.push(idattr);
		changeTitleSelected(megagroup,id_addgroup,arrayAttr);

		changeImageSelected(megagroup,id_addgroup,idattr);
		
		if(megagroup['dep']=='0')
		{
			setAttrSelectedId(id_group,idattr);
			if(typeof productHasAttributes!='undefined' && productHasAttributes)
			{
				if($('#group_'+id_group).length>0)
				{
					$('#group_'+id_group).change();
				}
				else if($('#color_'+idattr).length>0)
				{
					$('#color_'+idattr).click();
					setAttrSelectedId(id_group,idattr);
				}
			}
		}
	
		megagroup['selected'] = idattr;
	
	}
}
function ruleMeasure(rule,measure,option)
{
	rule = parseFloat(rule);
	measure = parseFloat(measure);
	
	if((rule>measure && option==0) || (rule<measure && option==1) || (rule==measure && option==2))
		return true;
	else
		return false;
}
function checkDisableSelected(id_group,id)
{
	var hasSelect = false;
	for (n=0; n<megaGroups.length; n++)
	{
		if(megaGroups[n]['id_addgroup']==id_group)
		{
			if(megaGroups[n]['selected']==id || in_array(id, megaGroups[n]['selections']))
			{
				if(megaGroups[n]['selected']==id)
				{
					megaGroups[n]['selected']='';
					hasSelect = true;
				}
				else if (in_array(id, megaGroups[n]['selections']))
				{
					var index =  megaGroups[n]['selections'].indexOf(id);
					if (index > -1)
					{
						megaGroups[n]['selections'].splice(index, 1);
						hasSelect = true;
					}
				}
				removeMegaSelect(megaGroups[n],id);
			}
		}
	}
	return hasSelect;
}
function hideRuleField(type,id, id_group,message)
{
	if(type=='a' || type=='p')
	{
		var hasSelected = checkDisableSelected(id_group,id);
		var changeSelected = false;
		if($('#megafield_'+id_group+'_'+id).length>0)
		{
			if($('#megafield_'+id_group+'_'+id).parents('li').length>0)
			{
				$('#megafield_'+id_group+'_'+id).parents('li').first().addClass('hideMegaField');
				if(hasSelected)
				{
					$('#megafield_'+id_group+'_'+id).parents('li').first().parent().find('li').each(function(){
						if(!changeSelected && !$(this).hasClass('hideMegaField'))
						{
							changeSelected = true;
							id = $(this).attr('alt');
							if($('#megafield_'+id_group+'_'+id).is(':radio')){
								$('#megafield_'+id_group+'_'+id).prop('checked',true);
								updateMegaAttrSelect(id_group,id);
							}
							else if($('#megafield_'+id_group+'_'+id).length)
								$('#megafield_'+id_group+'_'+id).click();
							if(message!='')
							showDialogAlert(message,id_group);
						}	
					});
				}
			}
			else
			{
				$('#megafield_'+id_group+'_'+id).addClass('hideMegaField');
				if(hasSelected)
				{
					$('#megafield_'+id_group+'_'+id).parent().find('li').each(function(){
						if(!changeSelected && !$(this).hasClass('hideMegaField'))
						{
							changeSelected = true;
							if(message!='')
								showDialogAlert(message,id_group);
							id = $(this).attr('alt');
							$('#megafield_'+id_group+'_'+id).click();
						}	
					});
				}
			}
				
		}
		else if($('[name="mpcheckbox_'+id_group+'_'+id+'"]').parents('li').length>0)
		{
				$('[name="mpcheckbox_'+id_group+'_'+id+'"]').parents('li').first().addClass('hideMegaField');
				if(hasSelected)
				{
					$('[name="mpcheckbox_'+id_group+'_'+id+'"]').parents('li').first().parent().find('li').each(function(){
						if(!changeSelected && !$(this).hasClass('hideMegaField'))
						{
							changeSelected = true;
							id = $(this).attr('alt');
							if($('[name="mpcheckbox_'+id_group+'_'+id+'"]').length)
								$('[name="mpcheckbox_'+id_group+'_'+id+'"]').click();
						}	
					});
				}
		}
		else if($('#megafield_'+id_group+' option[value="'+id+'"]').length>0)
		{
		/*	if(typeof _MP.arrayRuleOptions[id_group]=='undefined')	
					_MP.arrayRuleOptions[id_group] = $('#megafield_'+id_group+' option');
			_MP.applyRuleOptions = true;		
			$('#megafield_'+id_group+' option[value="'+id+'"]').remove();
			$('#megafield_'+id_group+' option[value="'+id+'"]').hide();*/
			$('#megafield_'+id_group+' option[value="'+id+'"]').addClass('hideMegaField').prop( "disabled", true);
			if(hasSelected)
			{
				$('#megafield_'+id_group+' option').each(function(){
					if(!changeSelected && !$(this).hasClass('hideMegaField'))
					{
						changeSelected = true;
						if(message!='')
							showDialogAlert(message,id_group);
						$('#megafield_'+id_group).val($(this).val());
						$('#megafield_'+id_group).change();
						
					}	
				});
			}
		}
	}
	else if(type=='g')
	{
		$("#megagroup"+id_group).addClass('hideMegaField');
	}
}
function hideMegaAttributeGroups()
{
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		for (i=0; i<megaGroups.length; i++)
		{
			if(typeof megaGroups[i]!='undefined')
			{
				megaGroups[i]['weight'] = 0;
				var id_megagroup = megaGroups[i]['id_group'];
				var id_group = megaGroups[i]['id_addgroup'];
				var megagroup = megaGroups[i];
				if(megagroup['hide']==1)
				{
					if(megagroup['dep']=='0')
					{
						if($('#group_'+id_megagroup).length>0)
						{
							$('#group_'+id_megagroup).parents('.product-variants-item').hide();
						}
						else if($('[name="group_'+id_megagroup+'"]').length>0)
						{
							$('[name="group_'+id_megagroup+'"]').parents('.attribute_fieldset').hide();
						}
						else if($('label[for="group_'+id_megagroup+'"]').length)
						{
							$('label[for="group_'+id_megagroup+'"]').parents('.attribute_fieldset').hide();
						}
						else if($('.color_pick_hidden[name="group_'+id_megagroup+'"]').length)
						{
							$('.color_pick_hidden[name="group_'+id_megagroup+'"]').parents('.attribute_fieldset').hide();
						}
						else if($('#color_to_pick_list').length>0)
						{
							$('#color_to_pick_list').parents('.attribute_fieldset').hide();
						}
					}
					else if(megagroup['dep']=='1')
					{
						$('#mpgroup_'+id_megagroup).parent().hide();
					}
				}
				if((megagroup['multiselect']=='0' && megagroup['multiselectmin']!='0' && megagroup['selectstart']!='1') || megagroup['default_id']!='')
				{
					var idattr = 0;
					if(megagroup['default_id']!='')
					{
						idattr = parseInt(megagroup['default_id']);
					}
					else if(megagroup['dep']=='0' && megagroup['type']=='0')
					{
						idattr = getAttrSelectedId(id_megagroup);
					}
					else
					{
						idattr = getFisrtAttrSelectedId(id_group);
					}
					if($('#megagroup'+id_group).hasClass('mploadnext')){
						idattr = 0;
					}
						
					var megafield =  getMegaField(megagroup,id_group,idattr);
					
					if(idattr!='')
					megagroup['selected'] = idattr;
					changeOptionSelected(megafield);
					if(idattr!=0 && megagroup['show']!='3')
					{
						if(megagroup['show']=='4')
						{
							$(megafield).prop("checked", true);
							if($(megafield).parents('li:first').find('.mp_color_pick').length)
								$(megafield).parents('li:first').find('.mp_color_pick').addClass('selectAttr');
						}
						else if(megagroup['multiselect']=='1' && megagroup['show']=='1')
						{
							$(megafield).prop("checked", true);
						}
						else if(megagroup['show']=='0')
						{
							$(megafield).parent('select').val(idattr);
						}
						var arrayAttr = new Array();
						arrayAttr.push(idattr);
						changeTitleSelected(megagroup,id_group,arrayAttr);
				
						changeImageSelected(megagroup,id_group,idattr);

						// Load data features
						if($('#megagroup'+id_group).length && $('#megagroup'+id_group).hasClass('mploadfeatures')){
							loadMPDataFeatures(id_group,idattr);
						}
						updateImageProduct(id_group,idattr);
					}
					if(megagroup['show']=='3')
						changeQuantityListTitleSelected(id_group);
				}
				if($('#megagroup'+id_group+'.showTab').length){
					var id_tab = $('#megagroup'+id_group+'.showTab').data('tab');
					if($('#mp-tab'+id_tab+' .verticalTabImage').length){
						$('#mp-tab'+id_tab+' .verticalTabImage').html($('#megagroup'+id_group+'.showTab  img:first').clone());
					}
					if($('#mp-tab'+id_tab+' .verticalTabSelect').length && $('#productIdsName'+id_group).length){
	        			
	        			$('#mp-tab'+id_tab+' .verticalTabSelect').html($('#productIdsName'+id_group).val());
	        		}
					if($('#mp-tab'+id_tab+' .verticalTabImage').length && $('#productIdsImg'+id_group).length){
	        			
	        			$('#mp-tab'+id_tab+' .verticalTabImage').html('<img  src="'+$('#productIdsImg'+id_group).val()+'" />');
	        		}
	        		
				}
			}
			if(megagroup['dep']=='0' && megagroup['type']=='0')
				disableByCombinationStocks(megagroup);
		}
		$('.mp-step-measures .mp-measure, #id_step_quantity').unbind('blur').blur(function() {
			$(this).removeClass("mpMeasureAlert");
            if ($(this).val() != "") {
                var mpValue = parseFloat($(this).val());
                if ($(this).attr("min") != 0 && mpValue < parseFloat($(this).attr("min"))) {
                    $(this).addClass("mpMeasureAlert");
                }
                if ($(this).attr("max") != 0 && mpValue > parseFloat($(this).attr("max"))) {
                    $(this).addClass("mpMeasureAlert");
                }
            }
			measureProportional(this);
			showStepResult();	
		});
		if(typeof megaGroups!='undefined' && megaGroups.length>0){
			checkChangeDefMeasures(true);
			showStepResult();
		}
	
	}
	
	if(typeof mpAddProduct!='undefined' && mpAddProduct==0)
	{
		$('#mp-step-quantity').hide();
	}
	
	
	showStepResult();
};
function disableByCombinationStocks(megagroup)
{
	if($('.attribute_fieldset').length!=1)
		return;
	var id_group =	megagroup['id_group'];
	var id_addgroup =	megagroup['id_addgroup'];
	if(megagroup['show']=='3')
	{
		$('#megafield_'+id_addgroup+' input').each(function(){
			var attr = $(this).data('attr');
			
			for (x=0;x<combinations.length;x++)
			{
				var id_attribute_combination = combinations[x]['idsAttributes'][0];
				if(attr==id_attribute_combination && (!allowBuyWhenOutOfStock && combinations[x]['quantity'] < 1))
				{
					$(this).parent('li:first').remove();
					
				}
				else if(attr==id_attribute_combination)
				{
					$(this).attr('data-stock',combinations[x]['quantity']);
				}
			}
			/*if(!$('#color_'+attr).length)
			{
				$(this).parent('li:first').remove();
			}*/
		});
	}
	
}
function getSendMeasures()
{
	var arrayMeasures = new Array('width','height','long');
	var measures = '';
	for(var i=0;i<arrayMeasures.length;i++)
	{
		var m = arrayMeasures[i];
		if($('#id_'+m).length)
		{
			if($('#id_'+m).parents('.mpgroupmeasures').length)
			{
				if(!$('#id_'+m).parents('.hideMegaField').length){
					measures += '&'+m+'='+getMeasure(m);
				}
			}
			else
			{
				measures += '&'+m+'='+getMeasure(m);
			}
		} 
	}

	return measures;
}
function addMegaProduct (idProduct, idCombination, addedFromProductPage, callerElement, quantity, whishlist){
	
	if($('.mp-result-error').length)
		$('.mp-result-error').html('');
	
	if(typeof mpOnlaunch!='undefined')
		mpOnlaunch = 1;


	//disabled the button when adding to not double add if user double click
	if (addedFromProductPage)
	{
		$('.add_to_cart button').prop('disabled', 'disabled').addClass('disabled');
		$('.filled').removeClass('filled');

	}
	else
		$(callerElement).prop('disabled', 'disabled');

	if(typeof mpAddProduct!='undefined' && mpAddProduct==2)
	{
		quantity = 1;
	}
	if(typeof _MP!='undefined' && _MP.stock!='')
	{
		_MP.setStock(parseFloat(_MP.stock)-_MP.getTotalMeasure());
		$('#stockvalue').html(_MP.stock.toFixed(2));
	}
	var sendgroups = getSendGroups(quantity);
	if(!sendgroups)
		return;
	
	if(typeof mpAddProduct!='undefined' && mpAddProduct==0)
	{
		sendgroups+='&addproduct=false';
	}
	if($('#id_megacart').length)
	{
		sendgroups+='&updateMegacart=1&id_megacart='+$('#id_megacart').val();
	}
	if($('#measure-use').length)
		sendgroups += '&measureconvert='+$('#measure-use').val();

	// Image group
	if(typeof mpImageProductId!="undefined" && mpImageProductId!=0)
		sendgroups += '&id_product_image='+mpImageProductId;
	
	// If use megadesigner 
	if(typeof productDesigner!='undefined'){
		var view = JSON.stringify(productDesigner.getProduct(false,true));
		sendgroups += '&views='+ view; 
		if($('#md-loading').length)
			$('#md-loading').show();
	}
		
	
	/*var addmeasures = true;
	if($('.mpgroupmeasures.hideMegaField').length)
		addmeasures = false;
	var measures = '';
	if(addmeasures)	
		measures = '&width='+getMeasure('width')+'&height='+getMeasure('height')+'&long='+getMeasure('long');*/
	var measures = getSendMeasures()
	measures += '&id_product='+idProduct;
	measures += '&token='+static_token;
	//send the ajax request to the server
	// Prestashop 1.7
	var $productActions = $('.product-actions');
	    
	var formSerialized = $productActions.find('form:first').serialize();
	
	$('#btnAddProduct').addClass('mpDisable');   
	    
	$.ajax({
		type: 'POST',
		url: prestashop.urls.pages.cart,//prestashop.urls.base_url,
		async: true,
		cache: false,
		dataType : "json",
		data: 'ajax=1&action=update&add=1&addmegaproduct=1'+sendgroups+measures+'&qty=' + ((quantity && quantity != null) ? quantity : '1') +'&'+formSerialized,
		success: function(jsonData,textStatus,jqXHR)
		{
			$('#btnAddProduct').removeClass('mpDisable');   
			if($('#mpEditAdmin').length){
				var url = parent.location.href;
				var urlparams = 'saveOrder=1&id_megacart='+$('#id_megacart').val();
				if (url.indexOf('?') > -1){
					url += '&'+urlparams;
				}else{
					url += '?'+urlparams
				}
				parent.location.href = url;
				//parent.location.reload();
				return;
			}

			if(typeof jsonData.hasError=='undefined')
			{
					if(typeof jsonData.quantity!='undefined' && jsonData.quantity==null){
						showErrorAlert(errorInfo1)
						return;
				}
				if(_MP.modal_info==1 && $(".ui-dialog-content").length)
				$(".ui-dialog-content").dialog("close");
					
				if(typeof productDesigner!='undefined'){
					$('#md-loading').hide();
				}
				prestashop.emit('updateCart', {
	            reason: {
	              idProduct: jsonData.id_product,
	              idProductAttribute: jsonData.id_product_attribute,
	              linkAction: 'add-to-cart',
	              cart: jsonData.cart
	            },
	            resp: jsonData
	          });  
				//setTimeout(function(){document.location.href = "index.php?controller=order"},500);
			
				
				
						goToByScroll('shopping_cart');
			
			}
			else
			{
					alert(jsonData.errors);
			}
				
			$('#btnAddCalculeService').removeProp('disabled').removeClass('disabled');
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		{
			$('#btnAddProduct').removeClass('mpDisable');   
			//setTimeout(function(){document.location.href = cartURL+"?action=show"},500);
			//return;
			alert("TECHNICAL ERROR: unable to add the product.\n\nDetails:\nError thrown: " + XMLHttpRequest + "\n" + 'Text status: ' + textStatus);
			//reactive the button when adding has finished
			if (addedFromProductPage)
				$('body#product p#add_to_cart input').removeAttr('disabled').addClass('exclusive').removeClass('exclusive_disabled');
			else
				$(callerElement).removeAttr('disabled');
		}
	});
};
function clearFileUploads()
{
	$('.hiddenFileUpload').each(function(){
		$(this).val('');
	});
	$('.mpUploadFile').each(function(){
		$(this).remove();
		});
}
function createTableRanges(ranges,type){
	if(ranges.length)
	{
		var widthRanges = new Array();
		var heightRanges = new Array();
		var longRanges = new Array();
		var measureRanges = new Array();
		$.each(ranges, function(index, value) {
			if(value['width']!=0 && jQuery.inArray(value['width'],widthRanges)==-1)
				widthRanges.push(value['width']); 
			if(value['height']!=0 && jQuery.inArray(value['height'],heightRanges)==-1)
				heightRanges.push(value['height']); 
			if(value['long']!=0 && jQuery.inArray(value['long'],longRanges)==-1)
				longRanges.push(value['long']); 
			if(value['measure']!=0 && jQuery.inArray(value['measure'],widthRanges)==-1)
				measureRanges.push(value['measure']); 
		});
		widthRanges = widthRanges.sort(function(a,b){
	        return a-b;
	    });
		heightRanges = heightRanges.sort(function(a,b){
	        return a-b;
	    });
		longRanges = longRanges.sort(function(a,b){
	        return a-b;
	    });
		measureRanges = measureRanges.sort(function(a,b){
	        return a-b;
	    });
		if(type=='M2')
		{
			var content = '';
			var widthText = $('#mp-width .typemeasure').html();

			var heightText = $('#mp-height .typemeasure').html();
			// Para que no salga undefined en la etiqueta de las medidas de los rangos, comprobamos que existe el elemento que contiene la unidad de medida, tanto de alto como de ancho
			if( (!$('#mp-step-height').length && !$('#mp-height').hasClass('mpHide')) || ($('#mp-step-height').length && !$('#mp-step-height').hasClass('mpHide')) )
				heightText = $('#mp-step-height .typemeasure').html();
			if( (!$('#mp-step-width').length && !$('#mp-width').hasClass('mpHide')) || ($('#mp-step-width').length && !$('#mp-step-width').hasClass('mpHide')) )
				widthText = $('#mp-step-width .typemeasure').html();			content += '<thead><tr><th></th>';
			$.each(heightRanges, function(index, value){
					content += '<th>' + value + ' ' + heightText +'</th>';
				
			});
			$.each(widthRanges, function(index, value){
				
					content += '<tr><th>' + value + ' ' + widthText + '</th>';
					$.each(heightRanges, function(index2, value2){
						var addValue = false;
						$.each(ranges, function(index3, value3){
							if(value3['width']==value && value3['height']==value2)
							{
								content += '<td>'+value3['price']+'</td>';
								addValue = true;
							}
						});
						if(!addValue)
							content += '<td></td>';
					});
					content += '</tr>';
				
			});
			return content;
		}	
	}
}


function deleteMegaProductFromSummary(id)
{
	var customizationId = 0;
	var productId = 0;
	var productAttributeId = 0;
	var id_address_delivery = 0;
	var ids = 0;
	var id_megacart=0;
	ids = id.split('_');
	productId = parseInt(ids[0]);
	if (typeof(ids[1]) != 'undefined')
		productAttributeId = parseInt(ids[1]);
	if (typeof(ids[4]) != 'undefined')
		id_megacart = parseInt(ids[4]);
	$.ajax({
       type: 'GET',
       url: baseDir + 'index.php',
       async: true,
       cache: false,
       dataType: 'json',
       data: 'controller=cart&ajax=true&delete&summary&id_product='+productId+'&ipa='+productAttributeId+'&id_megacart='+id_megacart+ ( (customizationId != 0) ? '&id_customization='+customizationId : '') + '&token=' + static_token ,
       success: function(jsonData)
       {
       		if (jsonData.hasError)
    		{
    			var errors = '';
    			for(error in jsonData.errors)
    				//IE6 bug fix
    				if(error != 'indexOf')
    					errors += jsonData.errors[error] + "\n";
    		}
    		else
    		{
    			location.reload();
    			return;
				//if (jsonData.refresh)
					
				if (parseInt(jsonData.summary.products.length) === 0)
				{
					if (typeof(orderProcess) === 'undefined' || orderProcess !== 'order-opc')
						document.location.href = document.location.href; // redirection
					else
					{
						$('#center_column').children().each(function() {
							if ($(this).attr('id') !== 'emptyCartWarning' && $(this).attr('class') !== 'breadcrumb' && $(this).attr('id') !== 'cart_title')
							{
								$(this).fadeOut('slow', function () {
									$(this).remove();
								});
							}
						});
						$('#summary_products_label').remove();
						$('#emptyCartWarning').fadeIn('slow');
					}
				}
				else
				{
					$('#product_'+ id).fadeOut('slow', function() {
						$(this).remove();
						cleanSelectAddressDelivery();
						if (!customizationId)
							refreshOddRow();
					});
					$('#megaproduct_'+ id).remove();
					$('#mp_cart_'+id_megacart).remove();

					var exist = false;
					for (i=0;i<jsonData.summary.products.length;i++)
						if (jsonData.summary.products[i].id_product === productId
							&& jsonData.summary.products[i].id_product_attribute === productAttributeId
							&& jsonData.summary.products[i].id_address_delivery === id_address_delivery)
							exist = true;

					// if all customization removed => delete product line
					if (!exist && customizationId)
						$('#product_' + productId + '_' + productAttributeId + '_0_' + id_address_delivery).fadeOut('slow', function() {
							$(this).remove();
							refreshOddRow();
						});
				}
				updateCartSummary(jsonData.summary);
				updateCustomizedDatas(jsonData.customizedDatas);
				updateHookShoppingCart(jsonData.HOOK_SHOPPING_CART);
				updateHookShoppingCartExtra(jsonData.HOOK_SHOPPING_CART_EXTRA);
				if (typeof(getCarrierListAndUpdate) !== 'undefined')
					getCarrierListAndUpdate();
			
				if (jsonData.carriers != null)
					updateCarrierList(jsonData);

    		}
       	},
       error: function(XMLHttpRequest, textStatus, errorThrown) {alert("TECHNICAL ERROR: unable to save update quantity \n\nDetails:\nError thrown: " + XMLHttpRequest + "\n" + 'Text status: ' + textStatus);}
   });
}
function getMultiSelectGroup(id_group,rule)
{
	var mpgroup = getMPGroupById(id_group);
	var selections = new Array();
	if(mpgroup['show']=='0')
	{
		selections = $('#megafield_'+id_group).val();
	}
	else if(mpgroup['show']=='2' || mpgroup['multisect']==1)
	{
		
		$('#megagroup'+id_group+ ' .selectAttr').each(function(item){
			selections.push($(this).data('attr'));
		});
	}
	else if(mpgroup['show']=='1' || mpgroup['show']=='4')
	{
		
		$('#megagroup'+id_group+ ' .mpcheckbox:checked').each(function(item){
			if(rule && $(this).parents('li:first').length && !$(this).parents('li:first').hasClass('hideMegaField'))
				selections.push($(this).val());
			else if(!rule)
				selections.push($(this).val());
		});
	}
	else
	{
		if(typeof mpgroup['selection']!='undefined')
		selections.push(mpgroup['selection']);
	}
	if(selections==null)
		selections = new Array();
		
	return selections;
	
}
function addMultiselectValues(id_group, value)
{
	mpgroup = getMPGroupById(id_group);
	if(mpgroup!=null)
	{
		if(typeof mpgroup['selections']=='undefined')
		{
			mpgroup['selections']= new Array();
		}
		
	}
	if (!in_array(value, mpgroup['selections']))
	{
		mpgroup['selections'].push(value);
	}
}
function deleteMultiselectValues(id_group, value)
{
	mpgroup = getMPGroupById(id_group);
	if(mpgroup!=null)
	{
		if(typeof mpgroup['selections']=='undefined')
		{
			return;
		}
		
	}
	if (in_array(value, mpgroup['selections']))
	{
		var index =  mpgroup['selections'].indexOf(value);
		if (index > -1) {
			mpgroup['selections'].splice(index, 1);
		}
	}
}
function loadMPEvents(){
	if(typeof _MP!='undefined')
	{
		if($('.fileupload').length)
			loadSingleFileUpload();
		if(_MP.qtydefault!=1)
		{
			addMPQuantity(_MP.qtydefault);
			/*$('#quantity_wanted').val(_MP.qtydefault);
			if($('#id_step_quantity').length)
				$('#id_step_quantity').val(_MP.qtydefault);*/
		}
		//resetAttributesBySample();
		// SELECT ID GROUPS BY URL
		if(typeof urlcodeparams!='undefined' && urlcodeparams!='')
		{
			resetGroupsByUrl(urlcodeparams);

			if($.uniform) $.uniform.update();
			changeFilterMPUrlStatus();
			showStepResult();
		}
		assignMinQuantity();
		applyLimitMinQuantity();

		if(_MP.ajax_price==1)
			showprice( getIdProduct(), getIdCombination(), true, null, $('#quantity_wanted').val(), null, $('#id_width').val(), $('#id_height').val(), $('#id_long').val());

		showMegaLayers();

		_MP.loadPage = 1;
	}
}
$(window).load(function(){

	if($('#mpEditAdmin').length){

		setTimeout(function(){urlcodeparams = getParameterByName('mpurl');loadMPEvents();},2000);
	} else {
		loadMPEvents();
	}

});

/**********************************
 *  INCHES, METERS FUNCTIONS CHANGES
 ******************************************/
function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
function validamedidas(med){
	if (med==''){
		med=0;
	}
	med=parseFloat(med);
	return med;
}
function convertInchesToMeter(feet, inches,measure) 
{
	inches = inches + (feet * 12);
	totalmeters =  inches / 39.3700787;
	type =getTypeMetersByMeasure(measure);
	totalmeters = _MP.changeMeasure(_MP.productmeasure,type, totalmeters);
	return totalmeters;
}
function getTypeMetersByMeasure(measure)
{
	type = _MP.width_measure;
	if(measure=='height')
		type = _MP.width_measure;
	else if(measure=='long')
		type = _MP.long_measure;
	
	return type;
}
function convertMeterToInches(meters,measure) 
{
	type = getTypeMetersByMeasure(measure);
	
	totalmeters = _MP.changeMeasure(type,'m', meters);
	totalinches =  parseFloat(totalmeters * 39.3701);
	
	return totalinches;
} 

function addInputInchMeasures(measure)
{
	var id = '#id_step_'+measure;
	if(!$(id).length)
		id = '#id_'+measure;
	if(!$(id).length)
		return;
	
	$(id).hide();
	div = $('<div class="measure-inches" />');
	$inputft = $('<input type="number"  id="id_'+measure+'_ft"  value="0" class="mp_ft" />');
	$inputinc = $('<input type="number" max="11" id="id_'+measure+'_inc" value="0" class="mp_inch" />');
	
	div.append($inputft);
	div.append($('<span class="mp_ft_span">ft</span>'));
	
	div.append($inputinc);
	div.append($('<span class="mp_inch_span">inch</span>'));
	
	div.insertAfter($(id));
	
	$('#id_'+measure).change(function() {
		addInchesMeasures(measure,id);
	});
	
	
	
	$('#id_'+measure+'_inc').keyup(function() {
		changeInputFeetMeasure(measure,id)
	});
	$('#id_'+measure+'_inc').change(function() {
		changeInputFeetMeasure(measure,id)
	});
	$('#id_'+measure+'_ft').change(function() {
		changeInputFeetMeasure(measure,id)
	});
	$('#id_'+measure+'_ft').keyup(function() {
		changeInputFeetMeasure(measure,id)
	});
}
function addInputMetersMeasures(measure)
{
	var id = '#id_step_'+measure;
	if(!$(id).length)
		id = '#id_'+measure;
	if(!$(id).length)
		return;
	
	$(id).hide();
	$inputmeters = $('<input type="text"  id="id_'+measure+'_meters"  value="0" class="mp_meters" />');
	$inputmeters.insertAfter($(id));
	
	$('#id_'+measure+'_meters').change(function() {
		changeInputMetersMeasure(measure,id)
	});
	$('#id_'+measure+'_meters').keyup(function() {
		changeInputMetersMeasure(measure,id)
	});
	
}
function changeInputMetersMeasure(measure,id)
{
	var total = validamedidas($('#id_'+measure+'_meters').val());
	if(_MP.globalMeasure=='ft')
	{
		total = convertMeterToInches(total,measure) 
	}	
	$(id).val(total).blur();
}
function addInchesMeasures(measure,id)
{
	var meters = validamedidas($('#id_'+measure).val());
	meters = meters*100;
	var realFeet = ((meters*0.393700) / 12);
	var feet = Math.floor(realFeet);
  var inches = Math.round((realFeet - feet) * 12);
  $('#id_'+measure+'_ft').val(feet);
	$('#id_'+measure+'_inc').val(inches);
}
function changeInputFeetMeasure(measure,id)
{
	var inches = validamedidas($('#id_'+measure+'_inc').val());
	var feet = validamedidas($('#id_'+measure+'_ft').val());
	if(inches>11)
	{
		var div = parseInt(inches/12);
		$('#id_'+measure+'_ft').val(feet+div);
		var rest = inches % 12;
		$('#id_'+measure+'_inc').val(rest);
	}
	if(_MP.globalMeasure=='m')
	{
		total = convertInchesToMeter(feet, inches,measure)
		total = Number((total).toFixed(6)); 
	}
	else
	{	
		total = (parseInt(feet)*12)+parseInt(inches);
	}
	$(id).val(total).blur();
}
function showInchMeasures(use)
{
	var arrayMeasures = new Array('width','height','long');
	
	if(use==1)
		$('.measure-inches').hide();
	else
		$('.measure-inches').show();
	
	if(_MP.globalMeasure=='ft' && use==2)
	{
		$('.mp_meters').hide();
	}
	else
	{
		$('.mp_meters').show();
	}
	for(var i=0;i<arrayMeasures.length;i++)
	{
		measure = arrayMeasures[i];
		var id = '#id_step_'+measure;
		if(!$(id).length)
			id = '#id_'+measure;
		if(_MP.globalMeasure=='m')
		{
			if(use==1)
			{
				$(id).parent().find('.typemeasure').show();
				$(id).show();
			}
			else
			{
				$(id).parent().find('.typemeasure').hide();
				$(id).hide();
			}
		}
		else if(_MP.globalMeasure=='ft')
		{
			if(use==1)
			{
				$(id).parent().find('.typemeasure').show();
			}
			else
			{
				$(id).parent().find('.typemeasure').hide();
			}
			$(id).hide();
		}
	}
}
function applyInputMeasures()
{
	
	if(_MP.globalMeasure=='m' && _MP.measureconvert=='1')
		return;
	
	if(_MP.globalMeasure=='ft' && _MP.measureconvert=='2')
		return;
	
	var arrayMeasures = new Array('width','height','long');
	
	for(var i=0;i<arrayMeasures.length;i++)
	{
		measure = arrayMeasures[i];
		if((_MP.globalMeasure=='m' && _MP.measureconvert!='1'))
			addInputInchMeasures(measure);
		if(_MP.globalMeasure=='ft')
		{
			addInputInchMeasures(measure);
			addInputMetersMeasures(measure);
			if($.uniform)
				$.uniform.update();
		}
	}
	
	if($('#measure-use').length)
	{
		showInchMeasures($('#measure-use').val());
		$('#measure-use').change(function(){
			showInchMeasures($(this).val());
		});
		if($('#megagroups'.length))
		{
			$('#megagroups').prepend($('#select-measure-type'));
		}
	}
}
/********************************
 * END INCH, METERS FUNCTIONS
 */


var urlcodeparams = getParameterByName('mpurl');
function reloadMPTabs(){
	 $('#mp-ul-tabs').show();
     if($('#mp-ul-tabs li').length>2){
		$('#mp-ul-tabs').show();
		$('#mp-ul-tabs li.mp-tab:first').click();
	} 
	else {
	    	$('#mp-ul-tabs').hide();
	}
    
    if($('#mp-accordion .accordion-section').length>2){			
			$('#mp-accordion .accordion-section:first').click();
    }
		
}
function reloadMegaproduct(){
	if(typeof _MP!="undefined"){
		  if(typeof hideMPElements!='undefined'){
		      	$(hideMPElements).addClass('mpHide');
		    }
		     if(typeof hideMegaAttributeGroups!='undefined'){
		       setTimeout(function(){loadMegaproduct(); hideMegaAttributeGroups();},100);
		     	goToByScroll('mp-accordion');
			} 
		     reloadMPTabs();
		   //  setTimeout(function(){ $('.product-quantity .add').hide(); }, 50);
		     
		   
	  }
}
$(window).resize(function(){
	if($('#mp-ul-lamas').length){
		applyStartLamas();
	}
});
$(document).ready(function() {
	loadMegaproduct();
	loadMegaproductEvents();
	if($('#mp-ul-lamas').length){
		applyStartLamas();
		
		
	}
	
});
function loadMegaproductEvents(){
	if(typeof(_MP)!="undefined")
	{
		applyFilterPriceMinAndMax();
		
		if($('.mpColorPicker').length){
			$('.mpColorPicker').mColorPicker({imageFolder: baseDir + '/img/admin/'});
			$('.mpColorPicker').bind('colorpicked', function(){
				showStepResult();
			});
		}
		if($('.fancyboxMP').length){
			$('.fancyboxMP').fancybox({
				'autoSize' : false,
				'width' : 600,
				'height' : 'auto',
				'hideOnContentClick': true
				}); 
		}
		if($('#mpimages .owl-carousel').length){
			$('#mpimages .owl-carousel').each(function(){
				$(this).css('max-width',$(this).parent().width());
			});
			$('#mpimages .owl-carousel').owlCarousel({
				//itemElement: 'LI',
				//stageElement: 'UL',
			//	nav: true,
				//autoHeight : true,
				loop:false,
			//	responsiveClass: !0,
				autoWidth: !0,
				margin: 5,
				//navContainer:true,

				//	responsiveClass:true,

				responsive: {
					0: {
						items: 3,
						nav: !1,
						loop: !1
					},
					600: {
						items: 3,
						nav: !1,
						loop: !1
					},
					1000: {
						items: 3,
						nav: !1,
						loop: !1
					}
				},

			});
		}

		$('.mp-border-measure').blur(function(){
			changeMPBorders();
		});
		$('#color_to_pick_list a').unbind('click').bind('click', function(event) {
			var objeto = this;
			$('.our_price_display').css('visibility','hidden');

			colorPickerClick($(objeto));
			//findCombination();
			showStepResult();
			setTimeout(function(){
				$('.our_price_display').css('visibility','visible');
			}, 500);
		});		
	
		$('#btnAddProduct').unbind('click').click(function(e)
		{
				if(_MP.checkRanges()){
				if($('#product_page_product_id').length)
				{
					var id_product = $('#product_page_product_id').val(); 
				} else 
				{
						var data = $('#product-details').data('product');
					var id_product = data.id_product; 
				
				}
				addMegaProduct( id_product, getIdCombination(), true, null, $('#quantity_wanted').val(), null, getMeasure('width'), getMeasure('height'), getMeasure('long'));
			}	
		});
		$(document).off("click", "#btnAddCalculePrice");
	    $(document).on("click","#btnAddCalculePrice",function(e) {
	        e.preventDefault();
	        if(_MP.checkRanges())
				addMegaProduct( $('#product_page_product_id').val(),  getIdCombination(), true, null, $('#quantity_wanted').val(), null, getMeasure('width'), getMeasure('height'), getMeasure('long'));
	       });
		
		$('#quantity_wanted,.mp-measure, .mp-step-measures input[type=text], #id_step_quantity').unbind('keyup change').on('keyup change',function(e) {
			updateSlider($(this).val());
            measureProportional(this);
            _MP.applyMinQty = 0;
            showStepResult();  
            _MP.applyMinQty = 1;  
            e.preventDefault();
        });
		if(typeof _MP!='undefined' && _MP.multiple_min==1 && $('#id_step_quantity').length==0)
        {
			$('#quantity_wanted').on('change',function(e) {
        			changeMultipleMinQuantity('qty','',0);
			});
        } else if (typeof _MP!='undefined' && _MP.multiple_min==1){
        	$('#id_step_quantity').on('change',function(e) {
    			changeMultipleMinQuantity('id_step_quantity','',0);
		});
        }
	
		
		$('#btnCalculePrice').click(function(){
			$('#calculePrice').remove();
			$('#megaproducterror').hide();
			
			if(_MP.checkRanges())
				calculeprice( $('#product_page_product_id').val(), getIdCombination(), true, null, $('#quantity_wanted').val(), null, getMeasure('width'), getMeasure('height'), getMeasure('long'),false);
			
		});
		$('#btnPrint').click(function(){
				calculeprice( $('#product_page_product_id').val(), getIdCombination(), true, null, $('#quantity_wanted').val(), null, getMeasure('width'), getMeasure('height'), getMeasure('long'),true);
			
		});
		// Solve plusand minus buttons templates
    $("#quantity_wanted_p a.btn").bind('click',function(e){
         setTimeout(showStepResult,50);
    });
    $('#btnRanges').click(function(){
		$('#mpranges').dialog({
	        resizable: false,
	        modal: true,
	        width:'auto'});
		
		});
		// Add class to hide button
		if($('.product-actions').length){
			$('.product-actions').addClass('mpBtnContainer');	
		}
	
	}
}
function loadMegaproduct()
{
	
	if(typeof(_MP)!="undefined")
	{
		moveContainerGroups();
		// ALABAZ INCH
		applyInputMeasures();
		// ALABAZ RANGE SLIDER
		loadRangeInputs();
		
		if($('.mp-tab-steps').length)
		{
			var count_li = $('.mp-tab-steps > .progressbar > li').length;
			$('.mp-tab-steps li').width((100 / count_li) + '%');
			
		}
		
		if($('#mp-ul-tabs.mpHorizontalTab li').length>2){
			$('#mp-ul-tabs').show();
				$('#mp-ul-tabs li.mp-tab:first').click();
		}
		else if($('#mp-ul-tabs.mpVerticalTab li').length>0){
			$('#mp-ul-tabs li.mp-tab:first').click();
		} else if($('.mp-tab-steps .progressbar li').length){
			$('.mp-tab-steps .progressbar li:first').click();
		} 
		else {
			$('#mp-ul-tabs').hide();
		}
		$('.mega-custom-input').each(function()
		{	
			if($(this).attr('maxLength')!== undefined)
			{
				$(this).keyup(function(){
					var limit = parseInt($(this).attr('maxLength'));
					var intro = $(this).val().length;
					var rest = limit-intro;
					if(rest!=0)
						$(this).parent('.mp-personalization').find('.mega-limit').html(charactersleft+' '+rest);
					else
						$(this).parent('.mp-personalization').find('.mega-limit').html('');
				});
			}
		});
		set_tooltip();
				
		$('.mp-measure').keypress(function(e)
		{
			if( e.which!=8 && e.which!=0 && ((e.which<48 && e.which!=46 && e.which!=44) || e.which>57)) {
				return false;
			}
			
		});
		
		$('#attributes select').each(function(){
			$(this).attr('onchange','');
			$(this).unbind();
		});
		$('#attributes select').bind('change', function(event) {
	//		findCombination();
			//getProductAttribute();
			$('#wrapResetImages').show('slow');;
			showStepResult();		
		});	
		
		
		$('#color_to_pick_list a').each(function(){
					$(this).attr('onclick','');		
			});
	
       

	$('#megaproduct .mp-measure').change(function(){$('#calculePrice').hide();});
	
	$('#mpranges').css('width','500px');
	
	
	
	}

		if($('#attributes').length>0)
		{
			
			$('#attributes').append($('#megaattributes').html());
			$('#megaattributes').html('');
		}
		else
		{
			$('#megaattributes').hide();
		}
		$(".customization_block").appendTo("#mpgroupcustomize");
		// If block cart isn't used, we don't bind the handle actions
		//if (window.ajaxCart !== undefined)
		//{
			$('.megacartitem .cart_quantity_input').unbind();
			if($('.megacartitem .cart_quantity_input').length)
			$('.megacartitem .cart_quantity_input').typeWatch({
				highlight: true, wait: 600, captureLength: 0, callback: function(val){
					updateMegaQty(val, true, this.el);
				}
			});
	//	}
		
	if($('#megaproduct').length && !$('#megagroups').length){
		$('#quantity_wanted').unbind('blur').blur(function(){	
			showStepResult();
		});
	}
	$('.mp-personalization input,.mp-personalization textarea,.mp-personalization select').blur(function(){	
		showStepResult();
	});
	$('.mp-personalization select').change(function(){	
		showStepResult();
	});
   	$(".mega-qty-list").bind('keyup mouseup', function () {
		changeQuantityListTitleSelected($(this).data('group'));
		showStepResult();
	});
	//Multiselect button
	$('.mpbtncheckbox').click(function() {
    	
    		id_group = $(this).data('group');
    		fieldvalue = $(this).data('attr');
    		mpgroup = getMPGroupById(id_group);
    	
    		field = '#megafield_'+id_group+'_'+ fieldvalue;
    		
    	
    	
        if(!$(this).hasClass("selectAttr")) 
        {
        	$(this).addClass('selectAttr');
        	addMultiselectValues(id_group,fieldvalue);
        }
        else
        {
        	$(this).removeClass('selectAttr');
        	deleteMultiselectValues(id_group,fieldvalue);
        }
        var attributes = getMultiSelectGroup(id_group,false);
        changeTitleSelected(mpgroup,id_group,attributes);
        showStepResult();
             
    });
   
		// Multiselect checkbox	
    $('.mpcheckbox').change(function() {
    	var fieldvalue = $(this).val();
    	var id = $(this).attr('name');
    	var field = '#megafield_'+ fieldvalue;
    	var arraySelect = fieldvalue.split('_');
    	var arrayIds = id.split('_');
    	
    	mpgroup = null;
    	
    		
    		id_group = arrayIds[1];
    		mpgroup = getMPGroupById(id_group);
    	
    		field = '#megafield_'+id_group+'_'+ fieldvalue;
    		
    	
    	
        if($(this).is(":checked")) 
        {
        	$(field).addClass('selectAttr');
        	
        	if(arraySelect.length==2)
        		addMultiselectValues(arraySelect[0],arraySelect[1]);
        	//$(field).click();
        }
        else
        {
        	$(field).removeClass('selectAttr');
        	if(arraySelect.length==2)
        		deleteMultiselectValues(arraySelect[0],arraySelect[1]);
        }
        var attributes = getMultiSelectGroup(id_group,false);
        changeTitleSelected(mpgroup,id_group,attributes);
        showStepResult();
         updateHelpAttr(id_group);	
       
             
    });
    $(".resultFloat").draggable({
    	cursor: 'move',    
    });
    
    
    
    
    /*$(".tooltip-image").hover(function(e){
    	var image = $(this);
    	tooltipTimeout = setTimeout(showImageTooltip(image,e), 2000)}, 
        hideImageTooltip
    ); */ 
    
    $('.mpToggle').click(function() {
    	var id_group = $(this).data('group');
		$(".filterBox_"+id_group).toggle("slow");
		
		if($(this).hasClass("closed")){
			$(".filterBox_"+id_group).mouseleave(function() {
				var id = $(this).data('group');
				$("#mpToggle"+id).removeClass("open").addClass("closed");
				$(".filterBox_"+id).hide("slow");
				$(this).unbind('mouseleave');
			});
			// Close all open other combos
			$(".mpToggle").each(function(){
				var id = $(this).data('group');
				if(id!=id_group && !$(this).hasClass("closed")){
					$(this).removeClass("open").addClass("closed");
					$(".filterBox_"+id).toggle("slow");
				}
					
					
			});
			$(this).removeClass("closed").addClass("open");
		}else{
			$(this).removeClass("open").addClass("closed");
		}
	});
   
    // ACcordion 
    if($('#mp-accordion').length)
    {
    	addMPAccordion();
    }
    // File Upload
   
    
   // if($('.fileUploadMultiple').length)
    //	loadMultipleFileUpload();
    // Add event combinations product groups
    addQtyCombinationEvents();
}
function goToNextAccordion(id_addgroup)
{
	if($('#accordion-'+id_addgroup).length)
	{
		var applyNext = false;
		$(".accordion-section").each(function( index ) {
  			if($(this).attr('id')=='mp-accordion'+id_addgroup){
  				applyNext = true;
  			}
  			if(applyNext){
  					if($(this).next())
						{
							var nextAccordion = $(this).next();
							if(!$(nextAccordion).hasClass('hideMegaField'))
							{
									if($(nextAccordion).find('.accordion-section-title').length)
									$(nextAccordion).find('.accordion-section-title').click();
									applyNext = false;		
							}
						
						}
  			}
		});	
	}
}
function close_accordion_section() {
	$('.accordion .accordion-section-title').removeClass('active');
	$('.accordion .accordion-section-content').slideUp(300).removeClass('open');
}
function addMPAccordion()
{
	if($('.showAccordion').length==0)
		return false;

	$('.showAccordion').each(function(){
		var idAccordion = $(this).data('accordion');
		$(this).appendTo($('#mp-accordion-'+idAccordion));
	});
	
	$('.accordion-section:last .mp-accordion-buttons').hide();
	

	$('.accordion-section-title').unbind().click(function(e) {
		// Grab current anchor value
		var currentAttrValue = $(this).attr('href');

		if($(e.target).is('.active')) {
			close_accordion_section();
		}else {
			close_accordion_section();

			// Add active class to section title
			$(this).addClass('active');
			// Open up the hidden content panel
			$('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 

		}

		e.preventDefault();
	});
	$('.accordion-section-title:first').click();

}
function deleteUploadFile(el)
{
	var name = $(el).data('name');
	var group = $(el).data('group');
	$.ajax({
        url: $(el).data('url') ,
        type: 'DELETE',
        dataType: 'json',
        success: function(jsonData)
		{
        	$(el).parents('.mpUploadFile:first').remove();
        	var fields = $('#megafield_'+group).val();
        	var arrayFields = fields.split('|');
        	fields = '';
        	for(var i=0;i<arrayFields.length;i++)
        	{
        		if(arrayFields[i]!=name){
        			if(fields!='')
        				fields +='|';
        			fields+=arrayFields[i];
        		}
        			
        	}
    		$('#megafield_'+group).val(fields);
    		if($('.countPagesHeight #id_height').length){
    			if($('.mp-personalization .hiddenFileUpload').length==1 && $('.mp-personalization .hiddenFileUpload').val()=='')
    				$('.countPagesHeight #id_height').val(1); 
    			showStepResult();
				setTimeout(function(){showStepResult()},1200);
            }	
        
		}
    });
}
function loadSingleFileUpload()
{
	 var urlfileupload = baseDir + 'modules/megaproduct/upload/';
	
	    $('.fileupload').fileupload({
	        url: urlfileupload,
	       // acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
	        dataType: 'json', 
	        add: function(e, data) {
	        	var group = $(this).attr('data-group');
	            var uploadErrors = [];
	            /*var acceptFileTypes = /(\.|\/)(gif|jpe?g|png)$/i;
	            if(mpUploadTypes!='')
	            	acceptFileTypes = /\.('+mpUploadTypes+')$/i;*/
	            if(mpUploadTypes!='') 
	            {
	            	var type = data.originalFiles[0]['name'].split('.').pop();
	            	var arrayTypes = mpUploadTypes.split('|');
	            	var existType = false;
	            	for(var k=0;k<arrayTypes.length;k++)
	            	{
	            		if(arrayTypes[k]==type)
	            			existType = true;
	            	}
	            	if(!existType)
	            		uploadErrors.push(mpFileTypeError);
	            }
	            if(typeof mpUploadLimit!='undefined' && mpUploadLimit!=0 && typeof data.originalFiles[0]['size']!='undefined' && data.originalFiles[0]['size'] > mpUploadLimit) {
	                uploadErrors.push(mpFileSizeError);
	            }
	            if(uploadErrors.length > 0) {
	            	$('#megafieldfiles_'+group+' .mpFileUploadError').html('');
            		$('#megafieldfiles_'+group+' .mpFileUploadError').show();
            		
            		$('<p/>').text(uploadErrors).appendTo($('#megafieldfiles_'+group+' .mpFileUploadError'));
	            } else {
	                data.submit();
	            }
	        },
	        done: function (e, data) {
	        	var group = $(this).attr('data-group');
	        	$('#megafieldfiles_'+group+' .mpFileUploadError').hide();
	        	$('#progress'+group+' .progress-bar').css(
		                'width',
		                '0%'
		            );
	        	 $('#progress'+group+' .progress-bar').html('');
	        	$('#megafield_'+group).html('');
	            $.each(data.result.files, function (index, file) {
	            	//$('#megafieldfiles_'+group).html('');
	            	var fileExtension = file['name'].replace(/^.*\./, '');
	            	if(typeof file['error']!='undefined' && file['error']!='')
	            	{
	            		$('#megafieldfiles_'+group+' .mpFileUploadError').html('');
	            		$('#megafieldfiles_'+group+' .mpFileUploadError').show();
	            		
	            		$('<p/>').text(file['error']).appendTo($('#megafieldfiles_'+group+' .mpFileUploadError'));
	            	}
	            	else
	            	{
	            		var boxcontent = $('<div class="mpUploadFile box">');
	            		if(file['type'].indexOf("image") > -1)
		            	{
			            	var img = $('<img>'); //Equivalent: $(document.createElement('img'))
			            	img.attr('src', baseDir + 'modules/megaproduct/upload/files/thumbnail/'+file.name);
			            	img.appendTo($(boxcontent));
			                $('<p/>').text(file.name).appendTo($(boxcontent));
		            	}
		            	else
		            	{
		            		var a = $('<a>');
		            		a.attr('href', baseDir + 'modules/megaproduct/upload/files/'+file.name);
		            		a.attr('title', file.name);
		            		var img = $('<img width="64">');
			            	img.attr('src', baseDir + 'modules/megaproduct/img/format/'+fileExtension+'.png');
			            	img.appendTo(a);
			            	a.appendTo($(boxcontent));
			                $('<p/>').text(file.name).appendTo($(boxcontent));
		            	}
	            		$('<button onclick="deleteUploadFile(this);return false;" class="btn btn-danger delete" data-group="'+group+'" data-name="'+file.name+'" data-type="'+file.deleteType+'" data-url="'+file.deleteUrl+'"><i class="glyphicon glyphicon-trash"></i><span>'+mpFileUploadDelete+'</span></button>').appendTo($(boxcontent));
	            		// $('<button class="btn btn-danger" value="delete" data>Delete</button>').appendTo($(boxcontent));
	            		$(boxcontent).appendTo('#megafieldfiles_'+group);
	            		var fields = $('#megafield_'+group).val();
	            		if(fields!='')
	            			fields += '|'+file.name;
	            		else
	            			fields = file.name;
		            	$('#megafield_'+group).val(fields);
		            	
	            	}
	            	
	            	showStepResult();
	            });
	        },
	        progressall: function (e, data) {
	            var progress = parseInt(data.loaded / data.total * 100, 10)-10;
	            if(progress<0)
	            	progress = 0;
	            var group = $(this).attr('data-group');
	            $('#progress'+group+' .progress-bar').css(
	                'width',
	                progress + '%'
	            );
	            $('#progress'+group+' .progress-bar').html( progress + '% '+mpLoading );
	        }
	    }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');

}

function moveContainerGroups(){
	if($('.mpmovecontainer').length){
		$('.mpmovecontainer').each(function(){
			var id_group = $(this).data('container');
			$(this).appendTo($('#mpcontainer'+id_group));
		});
	}
	if($('#show-result-container.resultFloat').length)
	{
		$('#show-result-container.resultFloat').append($('#megaproducterror'));
	}
	else if($('#mpimages').length)
	{
		$('#mpimages').append($('#megaproducterror'));
	}
	if($('#mpQtySlider').length)
	{
		$('#quantity_wanted_p').addClass('mpHide');
		$('#quantity_wanted_p').parent().append($('#mpQtySlider'));
		
	}
	
}

var tooltipposition;
    
function set_tooltip()
{
	 var wi = $(window).width();   
     if (wi <= 600){   
   
        tooltipposition = {my: "left+5 top", at: "center top" };
     } else {
       
    
    	 tooltipposition = {my: "left+15 center", at: "right center" };
     }
     // protegemos por si la plantilla usa bootstrap
     $.widget.bridge('uitooltip', $.ui.tooltip);
 	
	$('.mp-tooltip').uitooltip({
		items: "select, .megabuttons_list .megabutton,.megacolor_list .mp_color_pick, .mpradiotooltip, .mp-measure, .megaquantity_list span, .mega_title",
		
		position: { my: "center top", at: "center bottom" },
		content: function() {
			var id_group = $(this).parents('.mp-tooltip').attr('id').substring(9);
			if($(this).attr('title')!='undefined' && $(this).attr('title')!='')
			{
					$(this).attr('data-title',$(this).attr('title'));
			}
			var id = 0;
			if($(this).hasClass('mega_title'))
			{
				if($('#megadescriptionlong_'+id_group).length)
					return $('#megadescriptionlong_'+id_group).html();	
				else
					return '';
			}
			if($(this).is('select'))
				id = $(this).val();
		
			if($(this).is('option'))
				id = $(this).attr('value');
			
			if($(this).hasClass('mp_color_pick'))
				id = $(this).data('attr');
			
			var attr = $(this).attr('data-attr');

			if (typeof attr !== typeof undefined && attr !== false)
				id = $(this).attr('data-attr');
			
			if($(this).hasClass('megabutton') || $(this).hasClass('mp_color_pick') || $(this).hasClass('mpradiotooltip'))
				id = $(this).attr('data-attr');
			
			
			if(id==0)
			{
				if($('#megadescriptionlong_'+id_group).length)
					return $('#megadescriptionlong_'+id_group).html();	
			}
			
			return showTooltipHelp(id_group,id);
			
		}
	});

}
function measureProportional(el)
{
	if(_MP.proportion!=0 && $(el).hasClass('mp-measure'))
	{	
		var measureId = $(el).attr('id');
		var measure = $(el).val();
		$('.mp-measure').each(function(){
			if($(this).attr('id').length)
			{
				var id = $(this).attr('id');
			//	var measure = $(this).val();
				if(id!=measureId)
				{
					if(id.indexOf("width") >= 0)
					{
						if(_MP.current_height_default!=0 && _MP.current_width_default!=0)
							var width = _MP.current_width_default*measure/_MP.current_height_default;
						else
							var width = _MP.width_default*measure/_MP.height_default;
						width = Math.round(width * 100) / 100;

						$('#id_width').val(width);
					}
					if(id.indexOf("height") >= 0)
					{
						if(_MP.current_height_default!=0 && _MP.current_width_default!=0)
							var height = _MP.current_height_default*measure/_MP.current_width_default;
						else
							var height = _MP.height_default*measure/_MP.width_default;
						height = Math.round(height * 100) / 100;

						$('#id_height').val(height);
						
					}
					if(id.indexOf("long") >= 0)
					{
						var long = _MP.long_default*measure/_MP.width_default;
						long = Math.round(long * 100) / 100;

						$('#id_long').val(long);
						
					}
				}
			}
		});
	}
}
function showImageTooltip(image,e)
{
	$("#megazoom").css("top",(e.pageY-400)+"px")
    .css("left",(e.pageX-500)+"px")                  
    .html("<img  src="+ image.attr("alt") +"  />")
    .fadeIn("slow");
	$('#megazoom').mouseout(function(){
		$(this).fadeOut("fast");
	});
}

function hideImageTooltip()
{
	clearTimeout(tooltipTimeout);
	// $("#megazoom").fadeOut("fast");
}
function openEditor()
{

}
function clone(src) {
	function mixin(dest, source, copyFunc) {
		var name, s, i, empty = {};
		for(name in source){
			// the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
			// inherited from Object.prototype.	 For example, if dest has a custom toString() method,
			// don't overwrite it with the toString() method that source inherited from Object.prototype
			s = source[name];
			if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
				dest[name] = copyFunc ? copyFunc(s) : s;
			}
		}
		return dest;
	}

	if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
		// null, undefined, any non-object, or function
		return src;	// anything
	}
	if(src.nodeType && "cloneNode" in src){
		// DOM Node
		return src.cloneNode(true); // Node
	}
	if(src instanceof Date){
		// Date
		return new Date(src.getTime());	// Date
	}
	if(src instanceof RegExp){
		// RegExp
		return new RegExp(src);   // RegExp
	}
	var r, i, l;
	if(src instanceof Array){
		// array
		r = [];
		for(i = 0, l = src.length; i < l; ++i){
			if(i in src){
				r.push(clone(src[i]));
			}
		}
		// we don't clone functions for performance reasons
		//		}else if(d.isFunction(src)){
		//			// function
		//			r = function(){ return src.apply(this, arguments); };
	}else{
		// generic objects
		r = src.constructor ? new src.constructor() : {};
	}
	return mixin(r, src, clone);

}
function changeSelectMeasure(type)
{
	_MP.applyDisableMeasureRule = false;
	if( $('#id_'+type+'_select').length)
	{
		var value = $('#id_'+type+'_select').val();
		if(value!=0)
		{
			
			$('#id_'+type).addClass('mpHide');
			$('#id_'+type).val(value);
			$('#id_'+type).change();
		}
		else
		{
			$('#id_'+type).val('1');
			$('#id_'+type).removeClass('mpHide');
			$('#id_'+type).change();
			
		}
	}
	_MP.applyDisableMeasureRule = true;
}
// LIMIT MIN QUANTITY
function checkLimitMinQuantity(alert)
{
	var qty = parseInt($('#quantity_wanted').val());
	var applyQty = false;
	if(typeof _MP!='undefined' && _MP.arrayLimits.length)
	{
		var ids = getSelectedIds();
		var applyLimit = false;
		for(var i=0;i<_MP.arrayLimits.length;i++)
		{
			var limit = _MP.arrayLimits[i];
			
			if(in_array(limit['id'], ids))
			{
				applyQty = true;					
				var limitvalue = limit['value']; 
				
				if(limit['type']=='minqty')
				{
					$('#mpQtyMinValue').html(limitvalue);
					$('#mpquantitymin').val(limitvalue);
					if(qty<limitvalue)
						applyLimit = true;
				}
				if(limit['type']=='maxqty')
				{
					$('#mpQtyMaxValue').html(limitvalue);
					if(qty>limitvalue)
						applyLimit = true;	
				}
			}
		}
		if(applyLimit && alert)
		{
			_MP.showLimits();
			return false;
		}
	}
	if(!applyQty)
	{
		$('#mpquantitymin').val(_MP.qty_min);
		if((_MP.qty_min>0 && qty<_MP.qty_min) || (qty>_MP.qty_max && _MP.qty_max>0))
		{
			$('#mpQtyMinValue').html(_MP.qty_min);
			$('#mpQtyMaxValue').html(_MP.qty_max);
		
			_MP.showLimits();
			return false;
		}
	}
	if(!alert)
		assignMinQuantity();
	return true;
}
function checkChangeLimits(applydefault) {
	var ids = getSelectedIds();

	if (typeof _MP != 'undefined' && _MP.arrayChangeLimits.length) {
		
		var applyLimit = false;
		for (var i = 0; i < _MP.arrayChangeLimits.length; i++) {
			var defaultMeasure = _MP.arrayChangeLimits[i];
			
			if (in_array(defaultMeasure['id'], ids) && !applyLimit) {
				
				var defaultLimits = defaultMeasure['formula'].split('|');
				
				if(defaultLimits.length==2)
				{
					var defaultMeasureValue = defaultLimits[0].split(new RegExp('[Xx]'));
					_MP.width_min  = parseFloat(defaultMeasureValue[0]);
					$('.td-min-width').html(defaultMeasureValue[0]);
					_MP.height_min = parseFloat(defaultMeasureValue[1]);
					$('.td-min-height').html(defaultMeasureValue[1]);
					_MP.long_min = parseFloat(defaultMeasureValue[2]);
					$('.td-min-long').html(defaultMeasureValue[2]);
					
					var defaultMeasureValue = defaultLimits[1].split(new RegExp('[Xx]'));
					_MP.width_max  = parseFloat(defaultMeasureValue[0]);
					$('.td-max-width').html(defaultMeasureValue[0]);
					_MP.height_max = parseFloat(defaultMeasureValue[1]);
					$('.td-max-height').html(defaultMeasureValue[1]);
					_MP.long_max = parseFloat(defaultMeasureValue[2]);
					$('.td-max-long').html(defaultMeasureValue[2]);
					
					applyLimit = true;
				}
				
			}
		}
		if(!applyLimit){
			_MP.width_min = _MP.default_width_min;
			_MP.height_min = _MP.default_height_min;
			_MP.long_min = _MP.default_long_min;
			
			_MP.width_max = _MP.default_width_max;
			_MP.height_max = _MP.default_height_max;
			_MP.long_max = _MP.default_long_max;
		}
		
		$('.td-min-width').html(_MP.width_min);		
		$('.td-min-height').html(_MP.height_min);
		$('.td-min-long').html(_MP.long_min);
				
		$('.td-max-width').html(_MP.width_max);
		$('.td-max-height').html(_MP.height_max);
		$('.td-max-long').html(_MP.long_max);
	}
	

}

function checkChangeDefMeasures(applydefault) {
	var ids = getSelectedIds();

	if (typeof _MP != 'undefined' && _MP.arrayChangeDefMeasures.length) {
		
	
		var width  = _MP.width_default;
		var height = _MP.height_default;
		var depth = _MP.long_default;
		var qty = 0;
	
	
		var applyAttrMeasure = false;
		
		for (var i = 0; i < _MP.arrayChangeDefMeasures.length; i++) {
			var defaultMeasure = _MP.arrayChangeDefMeasures[i];
			
			if (in_array(defaultMeasure['id'], ids)) {
				var defaultMeasureValue = defaultMeasure['formula'].split(new RegExp('[Xx]'));

				width  = defaultMeasureValue[0];
				height = defaultMeasureValue[1];
				if(typeof defaultMeasureValue[2]!='undefined')
					depth = defaultMeasureValue[2];
				if(typeof defaultMeasureValue[3]!='undefined')
					qty = defaultMeasureValue[3];
				applyAttrMeasure = true;
				
			}
		}
		
		if(applydefault || applyAttrMeasure)
		{
			if($('#id_width').length)
				$('#id_width').val(width);
			if($('#id_height').length)
				$('#id_height').val(height);
			if($('#id_long').length)
				$('#id_long').val(depth);
				
			if($('#id_width_select').length)	
				$('#id_width_select').val(width);
			if($('#id_height_select').length)	
				$('#id_height_select').val(height);
			if($('#id_long_select').length)	
				$('#id_long_select').val(depth);
			
			if(qty!=0){
				if($('#id_step_quantity').length){
					$('#id_step_quantity').val(qty);
				}
				if($('#quantity_wanted').length){
					var valqty = $('#quantity_wanted').val();
					if(valqty!=qty)
					$('#quantity_wanted').val(qty);
					//_MP.applyMinQty=0;	
					//showStepResult();
					//_MP.applyMinQty=1;
					
				}
			}
			

			_MP.setCurrentWidthDefault(width);
			_MP.setCurrentHeightDefault(height);
			_MP.setCurrentLongDefault(depth);
		}
		
	}
}

function assignMinQuantity()
{
	
	if(_MP.applyMinQty==0)
		return;
	//_MP.applyMinQty=0;
	var minqty = parseInt($('#mpquantitymin').val());
	if(minqty==0 && typeof minimalQuantity!='undefined')
		minqty = minimalQuantity;
	var nan= isNaN(minqty);
	if(nan!=true){
		if(minqty>1){
			if($('#id_step_quantity').length){
				var valqty = $('#id_step_quantity').val();
				if(valqty<minqty)
					$('#id_step_quantity').val(minqty);
			}
			if($('#quantity_wanted').length){
				var valqty = $('#quantity_wanted').val();
				if(valqty<minqty){
				$('#quantity_wanted').val(minqty);
				_MP.applyMinQty=0;	
				showStepResult();
				_MP.applyMinQty=1;
				}
			}
		}
	}
}
function changeMultipleMinQuantity(fieldName,applyValue,defaultValue)
{
	var minqty = parseInt($('#mpquantitymin').val());
		var qty = 1;
		if(typeof _MP!='undefined' && _MP.multiple_min==1)
		{	
			if(minqty!=0)
				qty = parseInt($('#mpquantitymin').val());
		}
		var currentVal = parseInt($('input[name='+fieldName+']').val());
		quantityAvailableT = 100000000;
		if($('#product-details').length)
		
			
		if (!isNaN(currentVal) && currentVal < quantityAvailableT){
			newval = currentVal;
			if(applyValue=='up')
				newval = currentVal + qty;
			else if(applyValue=='down')
				newval = currentVal - qty;
			else{
				
				if(currentVal%qty!=0){
					newval =  Math.ceil(currentVal/qty)*qty;
				}
			}
			$('input[name='+fieldName+']').val(newval).trigger('keyup');
		}
			
		else
			$('input[name='+fieldName+']').val(quantityAvailableT);

		if(fieldName=='id_step_quantity')
			$('#quantity_wanted').val($('input[name='+fieldName+']').val());
		_MP.applyMinQty=0;
		showStepResult();
		_MP.applyMinQty=1;
}
function changeMeasureQuantity(fieldName,applyValue,defaultValue)
{
		var minqty = parseFloat($('#'+fieldName).attr('min'));
		var maxqty = parseFloat($('#'+fieldName).attr('max'));
		if(minqty==0)
			return;
		qty = minqty;	
		currentVal	= parseFloat($('#'+fieldName).val());
		quantityAvailableT = 10000000;	
		if(!isNaN(maxqty) && maxqty!=0)
			quantityAvailableT = maxqty;
		if (!isNaN(currentVal) && currentVal < quantityAvailableT){
			newval = currentVal;
			if(applyValue=='up')
				newval = currentVal + qty;
			else if(applyValue=='down')
				newval = currentVal - qty;
			else{
				
				if(currentVal%qty!=0){
					newval =  Math.ceil(currentVal/qty)*qty;
				}
			}
			if(newval<minqty)
				newval = minqty;
				
			$('#'+fieldName).val(newval).trigger('keyup');
		}
			
		else
			$('#'+fieldName).val(quantityAvailableT);

		_MP.applyMinQty=0;
		showStepResult();
		_MP.applyMinQty=1;
}
function changeListProductQuantity(fieldName,applyValue){
	var value = $('#'+fieldName).val();
	if(applyValue=='down'){
		if(value==0)
			return;
		else{
			value--;
			if(value==0){
				$('#'+fieldName).parents('.filterSelectQty').removeClass('filterSelectQty');
			}
		}
			
	} else {
		value++;
		id_addgroup = $('#'+fieldName).data('group');
		if($('#megagroup'+id_addgroup+'.showTab').length){
			var id_tab = $('#megagroup'+id_addgroup+'.showTab').data('tab');
			if($('#mp-tab'+id_tab+' .verticalTabImage').length && $('#'+fieldName).parents('li:first,tr:first').find('img:first')){
				$('#mp-tab'+id_tab+' .verticalTabImage').html($('#'+fieldName).parents('li:first,tr:first').find('img:first').clone());
			}
		}
	}
	$('#'+fieldName).val(value).keyup();
}
function quantityMPListEvents(){
	 // The button to decrement the product value
	$('.mp_listquantity_down').unbind().click(function(e){
		e.preventDefault();
	   fieldName = $(this).data('field-qty');
	   changeListProductQuantity(fieldName,'down');
	});
	$('.mp_listquantity_up').unbind().click(function(e){
		 e.preventDefault();
	   fieldName = $(this).data('field-qty');
	   changeListProductQuantity(fieldName,'up');
	});
	addQtyCombinationEvents();
	
}
function applyLimitMinQuantity()
{
	checkChangeDefMeasures(true);	
	checkLimitMinQuantity(false);
	quantityMPListEvents();
	
	// The button to increment the product value
	$(document).on('click', '.mp_quantity_up', function(e){
		e.preventDefault();
		fieldName = $(this).data('field-qty');
		changeMultipleMinQuantity(fieldName,'up',0);
		
	});
	 // The button to decrement the product value
	$(document).on('click', '.mp_quantity_down', function(e){
		 e.preventDefault();
	   fieldName = $(this).data('field-qty');
	   changeMultipleMinQuantity(fieldName,'down',0);
	});
	$(document).on('click', '.mp_measure_up', function(e){
		e.preventDefault();
		fieldName = $(this).data('field-qty');
		changeMeasureQuantity(fieldName,'up',0);
		
	});
	 // The button to decrement the product value
	$(document).on('click', '.mp_measure_down', function(e){
		 e.preventDefault();
	   fieldName = $(this).data('field-qty');
	   changeMeasureQuantity(fieldName,'down',0);
	});

}
// FILTER URL
function getMPTitleById(mpgroup,id)
{
	var id_addgroup = mpgroup['id_addgroup'];
	var title = '';
	if(mpgroup['show']=='0')
	{
		title = $('#megagroups #megafield_'+id_addgroup+' option[value="' + id + '"]').html();
	}
	else if(mpgroup['show']=='4' && mpgroup['multiselect']=='0')
	{
		title = $('#megagroups input:radio[name=megafield_'+id_addgroup+']:checked').attr('title');
		
	}
	else if(mpgroup['show']=='4' && mpgroup['multiselect']=='1')
	{
		title = $('[for=mpcheckbox_'+id_addgroup+'_'+id+']').text();	
	}
	else
	{
		var megafield = getMegaField(mpgroup,id_addgroup,id);
		if ($(megafield).attr('title') != "undefined" && $(megafield).attr('title')!='') 
			title = $(megafield).attr('title');
		else if($(megafield).attr('data-title') != "undefined" && $(megafield).attr('data-title')!='')
			title =  $(megafield).attr('data-title');
		else if($(megafield).html()!='')
			title = $(megafield).html();
	}
	if(typeof title=='undefined')
		title = '';
	return title;
}
function resetGroupsByUrl(urlcode)
{
	if(urlcode=='')
		urlcode = getParameterByName('mpurl');
	if(typeof urlcode!='undefined' && urlcode!='')
	{
		var arrayGroups = urlcode.split('/');
		if(arrayGroups.length>1)
		{
			for(var i=1;i<arrayGroups.length;i++)
			{
				id_addgroup = 0;
				var group = arrayGroups[i].split('-');
				if(group.length>0)
				{
					id_addgroup = parseInt(group[0]);			
				}
				if(group.length>2)
				{
					for(var j=2;j<group.length;j=j+2)
					{
						var hasListQty = group[j].indexOf('_') > -1;
						if(hasListQty){
							var arrayListQty = group[j].split('_');
							if(arrayListQty.length==2){
								if($('#megafield_'+id_addgroup+' #megaproduct_'+arrayListQty[0]).length){
									$('#megafield_'+id_addgroup+' #megaproduct_'+arrayListQty[0]).val(arrayListQty[1]);
								}
							}
							
						} else {
							id = parseInt(group[j]);
							var megagroup = getMPGroupById(id_addgroup);
							if(typeof megagroup!='undefined') {
								if (typeof id != 'undefined' && !isNaN(id)) {
									selectRuleOptions(megagroup, id);
								} else if ($('#megafield_' + id_addgroup).length && megagroup['type'] == 3) {
									$('#megafield_' + id_addgroup).val(group[j]);
								}
							}
						}
						
					}
				}
			}
		}
		//findCombination();
	}
	resetUrlMeasures();
}
function resetUrlMeasures()
{
	var width = getParameterByName('width');
	if(typeof width!='undefined' && width!='')
	{
		if($('#id_step_width').length)
			$('#id_step_width').val(width);
		if($('#id_width_select').length)
			$('#id_width_select').val(width);
			
		$('#id_width').val(width);
	}
	var height = getParameterByName('height');
	if(typeof height!='undefined' && height!='')
	{
		if($('#id_step_height').length)
			$('#id_step_height').val(height);
		if($('#id_height_select').length)
			$('#id_height_select').val(height);
		
		$('#id_height').val(height);
	}
	var long = getParameterByName('long');
	if(typeof long!='undefined' && long!='')
	{
		if($('#id_step_long').length)
			$('#id_step_long').val(long);
		if($('#id_long_select').length)
			$('#id_long_select').val(long);
		
		$('#id_long').val(long);
	}
	var mpquantity = getParameterByName('mpquantity');
	if(typeof mpquantity!='undefined' && mpquantity!='')
	{
		addMPQuantity(mpquantity);
		/*if($('#id_step_quantity').length)
			$('#id_step_quantity').val(mpquantity);
		$('#quantity_wanted').val(mpquantity);*/
	}
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);

	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function updateQueryStringParam(key, value)
{
	  baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
	  urlQueryString = document.location.search;
	  var newParam = key + '=' + value,
	  params = '?' + newParam;

	  // If the "search" string exists, then build params from it
	  if (urlQueryString) {
	    keyRegex = new RegExp('([\?&])' + key + '[^&]*');
	    // If param exists already, update it
	    if (urlQueryString.match(keyRegex) !== null) {
	      params = urlQueryString.replace(keyRegex, "$1" + newParam);
	    } else { // Otherwise, add it to end of query string
	      params = urlQueryString + '&' + newParam;
	    }
	  }
	  window.history.replaceState({}, "", baseUrl + params);
}
function changeFilterMPUrlStatus()
{
	if(typeof _MP!='undefined' && _MP.urls==0)
		return;
	var arrayUrl='';
	var arrayValues = '';
	if(typeof megaGroups!='undefined' && megaGroups.length>0)
	{
		for (i=0; i<megaGroups.length; i++)
		{
			if(typeof megaGroups[i]!='undefined')
			{
				var group = megaGroups[i];
				var id_addgroup = group['id_addgroup']; 
				arrayUrl += '/'+id_addgroup;
				var searchStr = "-";
				var replaceStr = "";
				var re = new RegExp(searchStr, "g");
        		
				if($('#megagroup' + id_addgroup).find('.mega_title').length)
				{
					var gt = $('#megagroup'+id_addgroup).find('.mega_title').html();
					gt = gt.replace(':','');
					gt = gt.replace(' ','_');
					gt = gt.replace('-', '_');
					arrayUrl += '-' + encodeURI(gt.toLowerCase());
				}	
				if($('#megafield_' + id_addgroup).hasClass('megaquantity_list')){
					
					$('#megafield_' + id_addgroup+' input').each(function(){
						var idInput = $(this).data('attr');
						var valueInput = $(this).val();
						if(valueInput!='' && valueInput!='0'){
							arrayUrl += '-'+idInput+'_'+valueInput+'-'+'prod';
						}
					});		
				}
				else if(typeof group['selections']!='undefined' && group['selections'].length)
				{
					for (var j = 0; j < mpgroup['selections'].length; j++) 
					{
						var id = mpgroup['selections'][j];
						var selectTitle = getMPTitleById(group,id);
						selectTitle = selectTitle.toLowerCase();
						selectTitle = selectTitle.replace(' ','_');
						selectTitle = selectTitle.replace(re, replaceStr);
						//selectTitle = selectTitle.replace('-','');
					//	arrayUrl += '-'+group['selected']+'-'+encodeURIComponent(selectTitle);
						arrayUrl += '-'+id+'-'+encodeURIComponent(selectTitle);
					}				
				}
				else if(typeof group['selected']!='undefined' && group['selected']>0)
				{
					var id = group['selected'];
					var selectTitle = getMPTitleById(group,id);
					if(typeof selectTitle=='undefined')
						selectTitle = '';
					if(selectTitle!='')
					{
						selectTitle = selectTitle.trim().toLowerCase();
						selectTitle = selectTitle.replace('\n','');
						selectTitle = selectTitle.replace(' ','_');
						selectTitle = selectTitle.replace(re, replaceStr);
					}
					arrayUrl += '-'+group['selected']+'-'+encodeURIComponent(selectTitle);	
				}			
			}
		}
	}
	// Measures
	if(arrayUrl.length)
	{
		updateQueryStringParam('mpurl',arrayUrl);
	}
	// Measures Url
	if($('#id_width').length && $('#id_width').val()!='')
	{
		updateQueryStringParam('width',$('#id_width').val());
	}
	if($('#id_height').length && $('#id_height').val()!='')
	{
		updateQueryStringParam('height',$('#id_height').val());
	}
	if($('#id_long').length && $('#id_long').val()!='')
	{
		updateQueryStringParam('long',$('#id_long').val());
	}
	if($('#quantity_wanted').length && $('#quantity_wanted').val()!='')
	{
		updateQueryStringParam('mpquantity',$('#quantity_wanted').val());
	}
	
}
function loadRangeInputs()
{
/*	$('input[type="range"]').on('input', function() {

		  var control = $(this),
		    controlMin = control.attr('min'),
		    controlMax = control.attr('max'),
		    controlVal = control.val();
		  var  contolThumbWidth = control.data('thumbwidth');

		  var range = controlMax - controlMin;
		  
		  var position = ((controlVal - controlMin) / range) * 100;
		  var positionOffset = Math.round(contolThumbWidth * position / 100) - (contolThumbWidth / 2);
		  var output = control.next('output');
		  
		  output.css('left', 'calc(' + position + '% - ' + positionOffset + 'px)').text(controlVal);

		});
*/
	if($('.mpslider').length){
		$('.mpslider').slider({
			 value: $('#quantity_wanted').val(),
		      min:_MP.qty_min,
		      max: _MP.qty_max,
		      step: _MP.qty_step,
		      stop: function( event, ui ) {
		    	  addMPQuantity(ui.value);
		    	  showStepResult();
		      }
		});/*.slider("pips",{
			 rest: "label",
			    step: (_MP.qty_max-_MP.qty_min)/10
	    });*/
	}
		
}
function addMPQuantity(qty)
{
	if($('#id_step_quantity').length)
		$('#id_step_quantity').val(qty);
	if($('#id_step_quantity_range').length)
		$('#id_step_quantity_range').html(qty);
	$('#quantity_wanted').val(qty);
	updateSlider(qty);
}
function updateSlider(qty)
{
	if($('.mpslider').length)
		$(".mpslider").slider('value', qty);
}
/*  COMBINATION GROUPS  */
function addQtyCombinationEvents()
{
	$('.megacomplement_list .mega-comb-qty-list,.megacomplement_list .mega-comb-select-list, .megacomplement_list .mega-comb-qty-table, .mp-comb-table .mega-comb-qty-table ').change(function(){
		var baseEle = $(this).parents('.mpclistproduct:first');
		getMPCombination(baseEle);
		
	});
}
function selectMegaproductListColor(el)
{
	$(el).parent('ul').find('li').removeClass('selected');
	$(el).addClass('selected');
	var baseEle = $(el).parents('.mpclistproduct:first');
	getMPCombination(baseEle);
}

function getMegaroductListPrice(el)
{
	var baseEle = $(el).parents('.mpclistproduct:first');
	getMPCombination(baseEle);
}
function getMPCombination(baseEle)
{
	var selector = $(baseEle).find('.mega-comb-select-list');
	if($(selector).length && $(selector).val()!=''){
				$(baseEle).attr('data-combination',$(selector).val());
				return;
	}
	var attrs = new Array();
	var groups = $(baseEle).find('.mp-attributes').find('.mp-fieldset select, .mp-fieldset .selected');
	$.each(groups,function(i,option){
		if($(this).val()!='')
			attrs.push(parseInt($(this).val()));
		else if($(this).hasClass('selected'))
		{
			attrs.push(parseInt($(this).attr('data-attr')));	
		}
	});
	
	var id_product = $(baseEle).data('product');
	var qtysend = 0;
	if($(baseEle).find('.mega-comb-qty-list').length)
		qtysend = $(baseEle).find('.mega-comb-qty-list').val();
	
	var dataajax = 'action=getCombination&qty='+qtysend+'&id_product='+id_product;
	if(attrs.length)
	{
		dataajax +='&attrs='+attrs.toString();
	}
	else
		dataajax +='&attrs=';
	$.ajax({
			type: 'POST',
			url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct',
			async: true,
			cache: false,
			dataType : "json",
			data: dataajax,
			success: function(jsonData)
			{
				if(jsonData)
				{
					if(typeof jsonData.quantity!='undefined')
					{
						if($(baseEle).find('.mp-product-stock').length)
						{
							$(baseEle).find('.mp-product-stock').html(jsonData.quantity);
						}
					}
					if(jsonData.id_product_attribute && qtysend>0)
					{
						$(baseEle).attr('data-combination',jsonData.id_product_attribute);
					}
					if(jsonData.pricetext)
					{
						$(baseEle).find('.mega-product-price').html(jsonData.pricetext);
						
					}
				}
				
				showStepResult();
			}
	});
	
	
	return false;
	
}
function openUrlProduct(el)
{
	var url = $(el).prev().find('option:selected').data('url');
	if(typeof url!='undefined' && url!='')
	window.open(url, '_blank');
}


function in_array(id,ids)
{ 
  if(typeof ids!='object')
		return false;
   var length = ids.length;
    for(var i = 0; i < length; i++) {
        if(ids[i] == id) return true;
    }
    return false;
}
/* CHECKOUT UPDATE CART MEASURES */
function changeUpdateCartMeasure(){
	if($('.js-cart-line-megaproduct-measure').length)
	$('.js-cart-line-megaproduct-measure').blur(function(){
		var id_megacart = $(this).data('mega-id');
		var measure = $(this).data('measure');
		var boxes = parseInt($(this).data('boxes'));	
		var value = $(this).val();
		if(boxes){
			var defaultValue = parseFloat($(this).data('value'));
			var boxMeasure = defaultValue/boxes; 
			var newBoxes = Math.ceil(value/boxMeasure);
			value = newBoxes*boxMeasure;
			boxes = newBoxes;
			
		}
		changeCheckoutMeasure(this,id_megacart,measure,value,boxes);
	});
}
$(document).ready(function(){
	changeUpdateCartMeasure();
	if(typeof prestashop!=="undefined" && typeof prestashop!=="undefined")
                prestashop.on(
                  'updateCart',function(){
                  	setTimeout(function(){ changeUpdateCartMeasure(); }, 1500);
                  	});
	
});
function applyGroupValue(id_addgroup)
{
	if($('#megagroup'+id_addgroup).hasClass('hideMegaField'))
		return false;
	if($('#megagroup'+id_addgroup).hasClass('hideMegaFieldCategory'))
		return false;
	if($('#megagroup'+id_addgroup).parents('.showTab').hasClass('hideMegaField'))
		return false;	
	return true;
	
}

function changeCheckoutMeasure(el,id_megacart,measure,value,boxes)
{
	$('.mp-checkout-error').remove();
	//send the ajax request to the server
	$.ajax({
		type: 'POST',
		url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct',
		async: false,
		cache: false,
		dataType : "json",
		data: 'action=changemeasures&id_megacart=' + id_megacart+'&boxes='+boxes+'&'+measure+'='+value,
		success: function(jsonData,textStatus,jqXHR)
		{
			if(jsonData.success==1)
				prestashop.emit('updateCart', { 
					 reason: {
			              idProduct: jsonData.id_product,
			              idProductAttribute: jsonData.id_product_attribute,
			             
			            /*  cart: jsonData.cart*/
			            },
			            resp: jsonData 
				});
			else if(typeof jsonData.error!='undefined' && jsonData.error!='')
				$('<div style="padding:2px;margin-left:-5px" class="alert alert-danger mp-checkout-error">'+jsonData.error+'</div>').insertBefore($(el));
			//location.insertBefore();
		}
	});
	
};
function getIdCombination(){
	if($('#idCombination').length)
		return parseInt($('#idCombination').val());
	var data = 	$('#product-details').data('product');
	if(typeof data!="undefined")
		return data.id_product_attribute; 
	return 0;	
}
function getIdProduct(){
	var id_product = 0;
	if($('#product_page_product_id').length){
		 id_product = $('#product_page_product_id').val();
	}
	else if($('[name="id_product"]').length){
		 id_product = $('[name="id_product"]').val(); 
	
	} else if($('#product-details').length) {
		var data = $('#product-details').data('product');
		id_product = data.id_product; 
	} else{
		id_product = $('#main').data('id_product');
	} 
	return id_product;	
}

function goMPToSample(){
	var url = $('#btnMPSample').data('url');
	var id_product = 0;
	id_product = getIdProduct();

	sendgroups = '';
	$('.megacolor_list  li').each(function(){
		var item = $(this).attr('alt');
		if(sendgroups=='')
		{
			sendgroups = '&attrIds='+item;
		}	
		else
		{
			sendgroups += '-'+item;
		}
	});
	/*var resultAttrs = listAttrIds();
	if(resultAttrs[0]==0)
	{
		sendgroups +=resultAttrs[1];
	}*/
	location.href = url + '?sampleproduct='+id_product+sendgroups;	
}
function resetAttributesBySample()
{
	urlreset = getParameterByName('sampleproduct');
	if(urlreset!=''){
		var sampleproduct = parseInt(urlreset);
		var attributes = getParameterByName('attrIds');
		if($('.customproduct').length){
			$('.customproduct').find('input').val(sampleproduct);
		}
		if(attributes && attributes!=''){
			
			var arrayAttributes = attributes.split('-');
			var idSelected = 0;
			$('.megacolor_list li').each(function(){
				var id = $(this).attr('alt');
				if(!in_array(id, arrayAttributes))
					$(this).remove();
				else
					idSelected = id;
			});
			if(idSelected!=0)
			$('.mp_color_pick:first').click();		
		}
	}		
}
function calculeMPBorders(){
	if(!$('#mp-panel-border').length)
		return;
	var borderMeasures = ['width','height','long'];
	for (var key in borderMeasures) {
		measure = borderMeasures[key];
		if($('#mp_border_'+measure).length)
		{
			if($('#id_'+measure+'_select').length && $('#id_'+measure+'_select').val()!=0){
				$('#mp_border_'+measure).prop("disabled", true)
			} 
			else {
				$('#mp_border_'+measure).prop("disabled", false);
			}
			var border = parseFloat($('#mp_border_'+measure).data('border'));
			var totalmeasure = parseFloat(getMeasure(measure));
			if(!isNaN(totalmeasure) && totalmeasure>=0){
				totalmeasure += border;
				$('#mp_border_'+measure).val(totalmeasure);
			}				
		}
	}
}
function changeMPBorders(){
	if(!$('#mp-panel-border').length)
		return;
	var borderMeasures = ['width','height','long'];
	for (var key in borderMeasures) {
		measure = borderMeasures[key];
		if($('#mp_border_'+measure).length)
		{
			var border = parseFloat($('#mp_border_'+measure).data('border'));
			var totalmeasure = parseFloat($('#mp_border_'+measure).val());
			
			if( totalmeasure!=0){
				totalmeasure -= border;
				if(totalmeasure>=0)
				$('#id_'+measure).val(totalmeasure);
				else
					$('#id_'+measure).val(0);
			}
		}
	}
}
/* CODE LAMAS */
var oldLamas = 0;
var lamasWidthPx = 30;
var factorLamasPx = 0.3;
function applyLamasByMeasures(){
	var lamas = 6;
	if(typeof _MP.arrayLamas!='undefined' && _MP.arrayLamas.length){
		var ids = getSelectedIds();
		for(var i=0;i<_MP.arrayLamas.length;i++){
			if(in_array(_MP.arrayLamas[i]['id'],ids)){
				widthLamas = _MP.arrayLamas[i]['measure'];
				lamasWidthPx = widthLamas/factorLamasPx;
			}
					
		}
	}
	if(typeof widthLamas!='undefined' && widthLamas!=0)
		lamas = parseInt(getMeasure('width')/widthLamas);
	else
		return;
	
	if(oldLamas!=lamas)
		oldLamas = lamas;
	else
		return;
	$('#mp-ul-lamas').html('');
	for(var i=0;i<lamas;i++){
		var j=i+1;
		$('#mp-ul-lamas').append('<li data-attr="0"><span class="lamas-number">'+j+'</span><span class="lamas-click">Click Aqui</span></li');
	}
	var withDiv = lamas*(lamasWidthPx+5);
	
	$('#mp-ul-lamas').css('width',withDiv+'px');
	$('#mp-ul-lamas li').css('width',lamasWidthPx+'px');	
	applyEventLamas();
	
}
function applyStartLamas(){
	var witdLamas  = $("#megagroups").width();
	witdLamas-=100;
	$('#mp-lamas-container').css('width',witdLamas);
	applyEventLamas();
}
function applyEventLamas(){
	$('.lamas-click').click(function(){
		$(this).parent().click();
	});
	$('#mp-ul-lamas li').click(function(){
		var color = $(this).parents('.mpstep:first').find('.selectAttr').data('color');
		$(this).css('background',color);
		$(this).attr('data-color',color);
		if($(this).parents('.mpstep:first').find('.selectAttr img').length){
			var imgUrl = $(this).parents('.mpstep:first').find('.selectAttr img').attr('src');
			imgUrl = imgUrl.replace('-thumb','');
			imgUrl = "url('"+imgUrl+"')";
			$(this).css('background-image', imgUrl);
			$(this).css('background-size', 'cover');
		}
		var attr = $(this).parents('.mpstep:first').find('.selectAttr').data('attr');
		
		$(this).attr('data-attr',attr);
		
	});
	$('.mp-lamas-previous').click(function(){
		 var leftPos = $('#mp-lamas-container').scrollLeft();       
		 $("#mp-lamas-container").animate({
		      scrollLeft: leftPos - 200
		 }, 40);
	});
	$('.mp-lamas-next').click(function(){
		 var leftPos = $('#mp-lamas-container').scrollLeft();       
		 $("#mp-lamas-container").animate({
		      scrollLeft: leftPos + 200
		 }, 40);
	});
}
function cleanLamas(){
	$('#mp-ul-lamas li').css('background','none');
	$('#mp-ul-lamas li').attr('data-attr',0);
}
function listAttrLamas(){
	var datalamas = '';
	var i = 1;
	var hasError = false;
	$('#mp-ul-lamas li').each(function(){
		if($(this).attr('data-attr')==0){
			hasError = true;
		} else {
			if(datalamas!='')
				datalamas += '|';
			datalamas += i +'-'+$(this).attr('data-attr')+'-'+$(this).attr('data-color');
		}
		i++;
	});
	if(hasError)
		return false;
	return '&extracontent='+$('#mp-ul-lamas').attr('data-group')+'|'+datalamas;
}
/* END CODE LAMAS */
function selectMPTab(id_addgrooup){
	if($('#megagroup'+id_addgrooup).length && $('#megagroup'+id_addgrooup).data('tab')){
		$('#mp-step-tab'+$('#megagroup'+id_addgrooup).data('tab')).click();
	}
}
function loadMPDataFeatures(id_group,id_product){
	$('#megagroup'+id_group+' .product-features').remove();

	$.ajax({
		type: 'POST',
		url: baseDir + 'index.php?fc=module&module=megaproduct&controller=ajaxmegaproduct',
		async: false,
		cache: false,
		dataType : "json",
		data: 'action=loaddatafeatures&idp=' + id_product,
		success: function(jsonData,textStatus,jqXHR)
		{
			if(jsonData.success==1 && jsonData.features && jsonData.features.length)
			{
				// ALABAZWEB MODIFICACIONES
				var productName = $('#megafield_'+id_group+'_'+id_product).text(); 
				var html = '<section id="mpFeatures'+id_product+'" class="mpProductFeatures product-features"><p class="h6">Ficha técnica <b>"'+ productName +'"</b></p>';
				for(let feature of jsonData.features){
					html += '<dl class="data-sheet mpFeature'+feature.id_feature+'"><dt class="name">'+feature.name+'</dt><dd class="value">'+feature.value+'</dd></dl>';
				}
				html += '</section>';
				if($('#mpProductFeatures').length){
					$('#mpProductFeatures').append(html);
				}
				else if($('#megadescriptionlong_'+id_group).length){
					$('#megadescriptionlong_'+id_group).after(html);
				} else {
					$('#megagroup'+id_group+' .megainputcontent').after(html);
				}
			}
			if(jsonData.success==1 && jsonData.description && jsonData.description!='')
			{
				// ALABAZWEB MODIFICACIONES
				var productName = $('#megafield_'+id_group+'_'+id_product).text();
				var html = '<section id="mpDescription'+id_product+'" class="mpProductDescriptions product-descriptions"><h5><b>Información de '+ productName +'</b></h5>';
					html += '<p>'+jsonData.description+'</p>';
				
				html += '</section>';
				if($('#mpProductDescriptions').length){
					$('#mpProductDescriptions').append(html);
				}
				else if($('#megadescriptionlong_'+id_group).length){
					$('#megadescriptionlong_'+id_group).after(html);
				} else {
					$('#megagroup'+id_group+' .megainputcontent').after(html);
				}
			}
		}
	});
}

