/**
 * @authors     Li Weidong (https://github.com/onvno)
 * @email       leewei2020@gmail.com
 * @contributer Zhou Xiaotian , Lao Geng
 * @company     Deep (www.deeping.cn) 
 * @date        2016-05
 * @version     0.1
 * @commit      This is first time to build some components , just want to get a more easy way for working . Before do this, most time work with jQuery, so i'm a worse JSer , please give us more confidence , more time & suggestions , thx !
 * Released under the MIT license.
 */

function deepValidator ( options ) {

	var defaults = {
		vform : "",
		vsubmit : ""
	};

	var options,vform,vsubmit;

	// change default config
	function inputArguments(source,attribute) {
		var attr;
		for (attr in attribute) {
			if (attribute.hasOwnProperty(attr)) {
				source[attr] = attribute[attr];
			}
		}
		return source;
	}

	// change default
	if(arguments[0] && typeof arguments[0] === 'object') {
		options = inputArguments(defaults,arguments[0]);
	}else if(!arguments[0]){
		options = defaults;
	}

	vform = options.vform;
	vsubmit = options.vsubmit;

	var vuser = vform.querySelectorAll('.de_username')[0];
	var vpass = vform.querySelectorAll('.de_pass')[0];
	var vconfirm = vform.querySelectorAll('.de_confirmpass')[0];
	var vmobile = vform.querySelectorAll('.de_mobile')[0];
	var vdiscuss = vform.querySelectorAll('.de_discuss')[0];
	var vemail = vform.querySelectorAll('.de_email')[0];

	// get default value
	var userDefault = vuser.value || vuser.placeholder;
	var passDefault = vpass.value || vpass.placeholder;
	var confirmDefault = vconfirm.value || vconfirm.placeholder;
	var mobileDefault = vmobile.value || vmobile.placeholder;
	var discussDefault = vdiscuss.value || vdiscuss.placeholder;
	var emailDefault = vemail.value || vemail.placeholder;

	// removeclass
	function removeclass(ele,csName){
		if (ele.classList)
		  ele.classList.remove(csName);
		else
		  ele.className = ele.className.replace(new RegExp('(^|\\b)' + csName.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
	// hasclass
	function hasclass(ele,csName){
		if (ele.classList)
			el.classList.contains(csName);
		else
		  new RegExp('(^| )' + csName + '( |$)', 'gi').test(ele.className);		
	}

	// addclass
	function addclass(ele,csName){
		if (ele.classList)
		 	ele.classList.add(csName);
		else
		 	ele.className += ' ' + csName;
	}

	// get required item & get default value
	function getReqVal(oriList,reqList){
		for(var i=0; i<oriList.length; i++) {
			if(oriList[i].getAttribute('data-need')==="require"){
				oriList[i].setAttribute("data-default" , oriList[i].value || oriList[i].placeholder);
				reqList.push(oriList[i]);
			}
		}

		return reqList;
	}

	// user judge
	var vusers = vform.querySelectorAll('.de_username');
	var vuserAry = [];
	getReqVal(vusers,vuserAry);
	userAll();
	function userAll(){
		for(var i =0 ; i<vuserAry.length; i++){
			vuserAry[i].addEventListener('blur' , userSingle.bind(vuserAry[i]));
		}		
	}
	function userSingle(useri){
		if(useri.nodeType != 1) {
			useri = this;
		}
		var userNow = useri.value;
		var userDefault = useri.getAttribute("data-default");
		if(userNow == "" || userNow == userDefault) {
			useri.className += " alarm";
		} else if(userNow.length < 3) {
			useri.className += " alarm";
			useri.nextElementSibling.style.visibility = "visible";
		} else{
			removeclass(useri,'alarm');
			useri.nextElementSibling.style.visibility = "hidden";
		}		
	}	
	
	// pass judge --实际密码只会输入一组测试，所以省去多重的选择
/*		var vpasss = vform.querySelectorAll('.de_pass');
		var vpasssAry = [];
		getReqVal(vpasss,vpasssAry);
		passAll();
		function passAll(){
			for(var i =0 ; i<vpasssAry.length; i++){
				vpasssAry[i].addEventListener('blur' , passSingle.bind(vpasssAry[i]));
			}	
		}
		function passSingle(passi){
			// 默认不输入参数为event事件
			if(passi.nodeType != 1) {
				passi = this;
			}
			var passNow = passi.value;
			var passDefault = passi.getAttribute("data-default");
			if(passNow == "" || passNow == passDefault) {
				passi.className += " alarm";
			} else if(passNow.length<6){
				passi.className += " alarm";
				passi.nextElementSibling.style.visibility = "visible";
			} else{
				removeclass(passi,'alarm');
				passi.nextElementSibling.style.visibility = "hidden";
			}
		}*/

	vpass.addEventListener('blur' , pass);
	function pass(){
		var passNow = vpass.value;
		if(passNow == "" || passNow == passDefault) {
			vpass.className += " alarm";
		} else if(passNow.length<6){
			vpass.className += " alarm";
			vpass.nextElementSibling.style.visibility = "visible";
		} else{
			removeclass(vpass,'alarm');
			vpass.nextElementSibling.style.visibility = "hidden";
		}
	}

	// pass confirm
	vconfirm.addEventListener('blur' ,passconfirm);
	function passconfirm(){
		var confirmNow = vconfirm.value;
		var passNow = vpass.value;
		if(confirmNow == "" || confirmNow == confirmDefault) {
			vconfirm.className += " alarm";
		} else if(confirmNow != passNow) {
			vconfirm.className += " alarm";
			vconfirm.nextElementSibling.style.visibility = "visible";
		} else{
			removeclass(vconfirm,'alarm');
			vconfirm.nextElementSibling.style.visibility = "hidden";
		}
	}

	// email *
	var vemail = vform.querySelectorAll('.de_email');
	var vemailAry = [];
	getReqVal(vemail,vemailAry);
	emailAll();
	function emailAll(){
		for(var i =0 ; i<vemailAry.length; i++){
			vemailAry[i].addEventListener('blur' , emailSingle.bind(vemailAry[i]));
		}		
	}
	function emailSingle(context){
		if(context.nodeType != 1) {
			context = this;
		}
		var emailNow = context.value;
		var emailDefault = context.getAttribute("data-default");
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(emailNow == "" || emailNow == emailDefault) {
			context.className += " alarm";
		} else if(!filter.test(emailNow)){
			context.className += " alarm";
			context.nextElementSibling.style.visibility = "visible";
		} else{
			removeclass(context,'alarm');
			context.nextElementSibling.style.visibility = "hidden";
		}		
	}	

	// mobile
	var vmobile = vform.querySelectorAll('.de_mobile');
	var vmobileAry = [];
	getReqVal(vmobile,vmobileAry);
	mobileAll();
	function mobileAll(){
		for(var i = 0 ; i < vmobileAry.length; i++){
			vmobileAry[i].addEventListener('blur' , mobileSingle.bind(vmobileAry[i]));
		}		
	}
	function mobileSingle(context){
		if(context.nodeType != 1) {
			context = this;
		}
		var mobileNow = context.value;
		var mobileDefault = context.getAttribute("data-default");
		if(mobileNow == "" || mobileNow == mobileDefault) {
			context.className += " alarm";
		} else if(!mobileNow instanceof Number || mobileNow.length < 11){
			context.className += " alarm";
			context.nextElementSibling.style.visibility = "visible";
		} else {
			removeclass(context,'alarm');
			context.nextElementSibling.style.visibility = "hidden";
		}		
	}

	// discuss
	var vdiscuss = vform.querySelectorAll('.de_discuss');
	var vdiscussAry = [];
	getReqVal(vdiscuss,vdiscussAry);
	discussAll();
	function discussAll(){
		for(var i = 0 ; i < vdiscussAry.length; i++){
			vdiscussAry[i].addEventListener('blur' , discussSingle.bind(vdiscussAry[i]));
		}		
	}
	function discussSingle(context){
		if(context.nodeType != 1) {
			context = this;
		}
		var discussNow = context.value;
		var discussDefault = context.getAttribute("data-default");
		if(discussNow == "" || discussNow == discussDefault) {
			context.className += " alarm";
		} else {
			removeclass(context,'alarm');
		}		
	}

	// discuss
	/*vdiscuss.addEventListener('blur' , discuss);
	function discuss(){
		var discussNow = vdiscuss.value;
		if(discussNow == "" || discussNow == discussDefault) {
			vdiscuss.className += " alarm";
		} else {
			removeclass(vdiscuss,'alarm');
		}		
	}*/

	vsubmit.addEventListener('click' , function(event){
		
		// user
		for(var useri =0 ; useri<vuserAry.length; useri++){
			userSingle(vuserAry[useri]);
		}

		// pass pass只会输入一组确认，故删除此多重判断
		/*for(var passi =0 ; passi<vpasssAry.length; passi++){
			userSingle(vpasssAry[passi]);
		}*/

		pass()
		passconfirm();

		// email
		for(var emaili =0 ; emaili<vemailAry.length; emaili++){
			emailSingle(vemailAry[emaili]);
		}

		// mobile
		for(var mobilei =0 ; mobilei<vmobileAry.length; mobilei++){
			mobileSingle(vmobileAry[mobilei]);
		}

		// discuss
		for(var discussi =0 ; discussi<vdiscussAry.length; discussi++){
			discussSingle(vdiscussAry[discussi]);
		}
		
		var alarmLength = vform.querySelectorAll('.alarm').length;
		if(alarmLength > 0){
			event.preventDefault();
		} else {
			return true;
		}
	});	
}