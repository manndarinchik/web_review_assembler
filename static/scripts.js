let buttons = [
    ["Быстрый шиномонтаж.", 2],
    ["Оперативное обслуживание.", 2],
    ["Бесплатный кофе в зоне ожидания.", 2],
    ["Большой центр, много постов.", 2],
    ["Приветливый персонал.", 2],
    ["Много услуг автосервиса.", 2],
    ["Класс!", 0],
    ["Молодцы!", 0],
    ["Спасибо!", 0]
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

    function update_result(){
        generated_input = "";
        for (let i = 0; i < buttons.length; ++ i) {
            if (used_ids[i]){
                generated_input += buttons[i][0] + " ";
            }
        }
        $("#generated_input").html(generated_input);
    }
    function set_copy_buttons_state(is_success){
        $("#copy,#copy2").each(function(){
            if (is_success){
                $(this).removeClass("copy");
                $(this).addClass("copy_success");
            } else {
                $(this).addClass("copy");
                $(this).removeClass("copy_success");
            }
        });
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
        set_copy_buttons_state(false);

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
                set_copy_buttons_state(true);
            }
        });
    });

    $(document).click(function(e){
        let res_field = $("#result");
        input_focus = document.elementFromPoint(e.clientX, e.clientY) == res_field[0];
        if (input_focus){
            set_copy_buttons_state(false);
            $("#user_input").focus();
            res_field.addClass("outline");
        } else {
            res_field.removeClass("outline");
        }
    })
});