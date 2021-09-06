if(navigator.serviceWorker){
	navigator.serviceWorker.register("sw.js")
}
;(function () {
	let stiky = false
	let currentPosition= 0
	const email = "jeffreybarahona839@gmail.com" 
	const contador = parseInt($("[data-name='contado-imagenes']").attr("content"))
	console.log(contador)

	// $("#contacto").on("submit", function (ev) {
	// 	ev.preventDefault()
	// 	sendForm($(this))
	// 	return false
	// })

	//imputs

	$("#correo").hover(function () {
		$("#correo").css({
			background:"white", color:"black"
		}), function () {
			$("#correo").css({
				background:"black"
			})
		}
	})

	$("#nombre").on({click: function(){
		$("#nombre").css({
			background:"white", color:"black"
		})
		},
		
	})

	console.log($(window).width())
	$("#stickyNavegation").removeClass("hidden")
	$("#stickyNavegation").slideUp(0)
	checkScroll()
	isOpen()

	
	setInterval(()=>{
		if(currentPosition < contador){
			currentPosition++
		}else{
			currentPosition = 0
		}
		$("#gallery .inner").css({
			left: "-"+currentPosition*100+"%"
		})
		
	}, 2000)

	


	$(window).scroll(checkScroll)

	function checkScroll() {
		let isbottom = isInBottom()
		if(isbottom && !stiky){
			//ver la navegacion
			StikiNavegation();
			console.log("cambiar la nevegacin");
			stiky = true;
		}
		if(!isbottom && stiky){
			stiky= false;
			UnStikiNavegation();
			console.log("Regresa la navegacion")
		}
	}

	function StikiNavegation() {
		$("#description").addClass("fixed").removeClass("absoluto");
		$("#navegation").slideUp();
		$("#stickyNavegation").slideDown();
		
	}
	function UnStikiNavegation() {
		$("#description").removeClass("fixed").addClass("absoluto");
		$("#navegation").slideDown("fast");
		$("#stickyNavegation").slideUp("fast");
		
	}

	// function sendForm($form) {
	// 	$.ajax({
	// 		url: $form.attr("action"),
	// 		method: "POST",
	// 		dataType: "json",
	// 		data: $form.formObject(),
	// 		success: function () {
	// 			alert("Todo salio bien")
	// 		}
	// 	  });
		
	// }


	function isInBottom() {
		const $description = $("#description")
		const descriptionHeight = $description.height()

		return $(window).scrollTop() > $(window).height() - (descriptionHeight*2)
		
	}
	
	function isOpen() {
		// relorj de 24 horas
		let date = (new Date())
		const current_hour = date.getHours();
		if(current_hour < 15 || current_hour >23){
			$("#is-open .text").html("Cerrado ahora <br> Abierto de 5:00 pm a 11:00 pm")

		}
	}	
	
})()