;(function () {
    //$(".step:nth-child(1)").addClass("active")
    const selector = "#contacto"

    $(".step textarea").on("keydown", (ev)=>{
        if(ev.keyCode == 13){
            ev.preventDefault()

            $(ev.target).blur()
            
        }
    })
    

    $(".path_step").on("click", function (ev) {
        let $current_circle = $(ev.target) 
        focus_circle($current_circle)
        const position = $current_circle.index(".path_step")+1;
        let $test = $(".step:nth-child("+position+")")
        enfocar_nuevo_input($test)
    })

    $(selector).find(".input").on("change", function (ev) {
        let $input = $(ev.target)
        let $next_step = $input.parent().next(".step")
        const is_for_valida = Es_Formulario_Valido()


        if(!is_for_valida && $next_step.length > 0){
            enfocar_nuevo_input($next_step)
        }else{
            console.log("hola")
            validar_formulario()
        }
       
       

    })

    function validar_formulario() {
        if(Es_Formulario_Valido()){
            sendForm()

        }else{
            let $field_invalidos = $(selector).find(".input:invalid").first().parent()
            enfocar_nuevo_input($field_invalidos)
        }
        
    }

    function Es_Formulario_Valido() {
        return document.querySelector(selector).checkValidity()
    }

    function enfocar_nuevo_input($next_step) {
        $(".step.active").removeClass("active")
        $next_step.addClass("active")
        $next_step.find(".input").focus()
        
        //$next_step.focus()
        //coridinar circulos
        const position = ($next_step.index(".step"))+1;
        
        const $circle = $(".path_step:nth-child("+position+")").addClass("active")
        focus_circle($circle) 
    }

    function focus_circle($circle) {
        $(".path_step.active").removeClass("active")
        $circle.addClass("active")
    }

    function sendForm() {
        const $form = $(selector)
		$.ajax({
			url: $form.attr("action"),
			method: "POST",
			dataType: "json",
			data: $form.formObject(),
			success: function () {
				$form.slideUp();
                $("#info_contacto").html("Enviamos tu mensaje")
			}
		  });
		
	}

        $("#menu_ordener").on("click", toggleNav)
        //$("#response_nav ul").toggleClass("active")
       // $(this).toggleClass("glyphicon-menu-hamburger")
    
       $(".menu_link").on("click", toggleNav)

       function toggleNav() {
        $("#response_nav ul").toggleClass("active")
        $("#menu_ordener").toggleClass("glyphicon-menu-hamburger")
       }
    
})()