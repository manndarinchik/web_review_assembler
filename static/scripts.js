let buttons = [
    ["Lorem, ipsum dolor", 0],
    ["sit amet", 1],
    ["consectetur adipisicing elit. Vero asperiores doloribus", 2],
    ["corporis sit deserunt libero", 0],
    ["a deleniti", 1],
    ["enim quod neque", 2],
    ["commodi odio modi dolore", 0],
    ["maiores debitis quasi", 1],
    ["nemo ut eveniet", 2]
]

let button_styles_inactive=[
    "btn-outline-success",
    "btn-outline-primary",
    "btn-outline-danger"
]
let button_styles_active=[
    "btn-success",
    "btn-primary",
    "btn-danger"
]


$(document).ready(function(){

    let used_ids = [];
    let generated_input = "";
    let user_input = "";

    function update_result(){
        generated_input = "";
        console.log(user_input)
        for (let i = 0; i < buttons.length; ++ i) {
            if (used_ids[i]){
                generated_input += buttons[i][0] + " ";
            }
        }
        $("#generated_input").html(generated_input);
    }

    for (let i = 0; i < buttons.length; ++ i) {
        element = buttons[i]
        let btn = $("<button></button>").text(element[0]);
        btn.addClass("btn");
        btn.addClass(button_styles_inactive[element[1]]);
        $("#cards").append(btn);
        btn.attr("review_id", i);
        used_ids.push(false);   
    }

    $("#cards").children().click(function(){
        $("#copy").addClass("copy");
        $("#copy").removeClass("copy_success");

        let scnd_cls = $(this).attr("class").split(/\s+/)[1]
        let review_id = $(this).attr("review_id")

        used_ids[review_id] = (button_styles_inactive[buttons[review_id][1]] === scnd_cls);
        update_result();
    
        $(this).toggleClass(button_styles_inactive[buttons[review_id][1]]);
        $(this).toggleClass(button_styles_active[buttons[review_id][1]]);
    })

    $("#copy,#copy2").each(function(){
        $(this).click(function(){
            if ($("#generated_input").html() != "" || $("#user_input").html() != ""){
                navigator.clipboard.writeText(generated_input + " " + $("#user_input").html());
                $(this).removeClass("copy");
                $(this).addClass("copy_success");
            }
        });
    });

    $(document).click(function(e){
        let res_field = $("#result");
        input_focus = document.elementFromPoint(e.clientX, e.clientY) == res_field[0];
        if (input_focus){
            $("#copy").addClass("copy");
            $("#copy").removeClass("copy_success");
            $("#user_input").focus();
            res_field.addClass("outline");
        } else {
            res_field.removeClass("outline");
        }
    })

    // $(document).click(function(e){
    //     let res_field = $(".form-control");
    //     input_focus = document.elementFromPoint(e.clientX, e.clientY) == res_field[0]
    //     if (input_focus){
    //         res_field.addClass("in_focus");
    //     } else {
    //         res_field.removeClass("in_focus");
    //     }
    // })
    // $(document).keydown(function(e){
    //     if (input_focus){
    //         if (e.key.length == 1){
    //             user_input += e.key;
    //         } else if (e.key == "Enter"){
    //             user_input += "\n";
    //         } else if (e.key == "Backspace"){
    //             user_input = user_input.slice(0, user_input.length - 1)
    //         }
    //         console.log(e.key)
    //         update_result();
    //     }
    // })


});