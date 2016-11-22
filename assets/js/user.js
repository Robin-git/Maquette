var confirmForm;
var allInput;
var input_name;
var input_tel;
var input_email;
var input_submit;
var email_reg;
var allUsers;

confirmForm = false;
allInput = $('input[name]');
input_name = $('input[type=text][name=name]');
input_tel = $('input[type=text][name=tel]');
input_email = $('input[type=email][name=email]');
input_submit = $('button[type=submit]');
/* RegEx pour un input de type : email */
email_reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
allUsers = [
    {
        nom : "Ruby",
        prénom : "Robin",
        adresse : "5 RUE DES BOUCHETS",
        tél : "07.77.25.45.86",
        mail : "robin.ruby@gmail.com",
        droits : 1300
    }, 
    {
        nom : "Csharp",
        prénom : "Antonin",
        adresse : "5 RUE DES BOUCHETS",
        tél : "07.77.25.45.86",
        mail : "csharp.antonin@gmail.com",
        droits : 1000
    },
    {
        nom : "Python",
        prénom : "Jean",
        adresse : "5 RUE DES BOUCHETS",
        tél : "07.77.25.45.86",
        mail : "python.jean@gmail.com",
        droits : 0
    },
]

$(document).ready(function () {

    $("#myModal").modal();

    /* jQuery navigation */
    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    })
    $('.nav-tabs a').on('shown.bs.tab', function (event) {
        var x = $(event.target).text();         // active tab
        var y = $(event.relatedTarget).text();  // previous tab
        $(".act span").text(x);
        $(".prev span").text(y);
    });

    /* Convertie directement en uppercase les entrÃ©es de l'utilisateur */
    input_name.keyup(function () {
        this.value = this.value.toUpperCase();
    });

    input_tel.keyup(function () {
        if ($.isNumeric(input_tel.val()) === false) {
            input_tel.addClass("error");
        }
        else {
            input_tel.removeClass("error");
        }
    });

    input_email.keyup(function () {
        if (email_reg.test(input_email.val())) {
            input_email.removeClass("error");
        }
        else {
            input_email.addClass("error");
        }
    });

    $("form").submit(function (event) {
        if (confirmForm === false) {
            firstSubmit();
            event.preventDefault();
        }
    });

    firstSubmit = function () {
        let verif;
        let tab;
        verif = 0;
        tab = '';
        allInput.each(function () {
            if ($(this).val().replace(/ /g, '').length <= 3) {
                ++verif;
            }
            tab += $(this).prev().text() + " " + $(this).val() + '\n';
        });
        if (verif > 0) {
            alert("vous avez " + verif + " erreur dans votre formulaire.");
        }
        else {
            confirmForm = true;
            alert(tab);
            validationFormFunction(tab);
        }
    }

    validationFormFunction = function (tab) {
        allInput.each(function () {
            $(this).prop("disabled", true);
        });
        $('form > div:last').after("<fieldset>" +
            "<legend>Validation</legend>" +
            tab +
            "</fieldset>");
        input_submit.text('Validation');
    }
});