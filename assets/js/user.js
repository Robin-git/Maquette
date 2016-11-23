var user;
var confirmForm;
var allInput;
var input_name;
var input_last_name;
var input_adress;
var input_tel;
var input_email;
var input_droits;
var input_submit;
var email_reg;
var name_reg;
var allUsers;

confirmForm = false;
allInput = $('input[class=form-control]');
input_name = $('#input-user-name');
input_last_name = $('#input-user-last-name');
input_adress = $('#input-user-adresse');
input_tel = $('#input-user-phone');
input_email = $('#input-user-email');
input_droits = $('#input-user-droits');
input_submit = $('#btn-submit-user-info');
/* RegEx pour un input de type : email */
email_reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
name_reg = /(^[A-Z])([a-zA-Z]+)/i;
allUsers = [
    {
        nom : "Ruby",
        pwd : "ruby",
        prénom : "Robin",
        adresse : "5 RUE DES BOUCHETS",
        tél : "07.77.25.45.86",
        mail : "robin.ruby@gmail.com",
        droits : 1300,
        familles : [
            {
                nom : "Jean",
                prénom : "Kévin",
                date_naissance : 1993-03-15,
                liaison_familiale : "marié",
                droits : 10 
            }
        ]
    }, 
    {
        nom : "Csharp",
        pwd : "csharp",
        prénom : "Antonin",
        adresse : "5 RUE DES BOUCHETS",
        tél : "07.77.25.45.86",
        mail : "csharp.antonin@gmail.com",
        droits : 1000,
        familles : [
            {
                nom : "Jean",
                prénom : "Kévin",
                date_naissance : 1993-03-15,
                liaison_familiale : "marié",
                droits : 10 
            }
        ]
    },
    {
        nom : "Python",
        pwd : "python",
        prénom : "Jean",
        adresse : "5 RUE DES BOUCHETS",
        tél : "07.77.25.45.86",
        mail : "python.jean@gmail.com",
        droits : 0,
        familles : [
            {
                nom : "Jean",
                prénom : "Kévin",
                date_naissance : 1993-03-15,
                liaison_familiale : "marié",
                droits : 10 
            },
            {
                nom : "Jean",
                prénom : "Iyama",
                date_naissance : 1993-02-02,
                liaison_familiale : "célibataire",
                droits : 10 
            }
        ]
    },
]

$(document).ready(function () {
    /* Init du modal BootStrap */
    $("#myModal").modal();

    $("#user-submit-info").click(function(event){
        user = logUser($('#usrname').val(), $('#psw').val());
        console.log(user);
        if (user === undefined)
        {
            $('#user-submit-info').after('Error');
            event.preventDefault();
        }
        else 
        {
            getUserParams(user);
            printUserInfo(user);
        }
    });

    $('.form-modif-user-info').submit(function(event){
        $('.user-info').empty();
        hiddenFormModifUserInfo();
        setUserParams(user);
        printUserInfo(user);
        event.preventDefault();
    });

    $('#btn-modif-user-info').click(function(){
        hiddenFormModifUserInfo();
    });

    getUserParams = function(user){
        input_name.val(user.nom);
        input_last_name.val(user.prénom);
        input_adress.val(user.adresse);
        input_tel.val(user.tél);
        input_email.val(user.mail);
        input_droits.val(user.droits);
    };

    setUserParams = function(user){
        user.nom = input_name.val();
        user.prénom = input_last_name.val();
        user.adresse = input_adress.val();
        user.tél = input_tel.val();
        user.mail = input_email.val();
        user.droits = input_droits.val();
    };

    printUserInfo = function(user){
        $('.user-info').append( '<li>Nom : '+ user.nom +' </li>' +
                                '<li>Prénom : '+ user.prénom +'</li>' +
                                '<li>Adresse : '+ user.adresse +'</li>' +
                                '<li>Tél : '+ user.tél +'</li>' +
                                '<li>Mail : '+ user.mail +'</li>' +
                                '<li>Droits : '+ user.droits +'</li>');
    }

    hiddenFormModifUserInfo = function(){
        if ($('.user-info').prop( 'hidden' ))
        {
            $('.user-info').prop('hidden', false);
            $('.form-modif-user-info').prop('hidden', true);
        }
        else
        {
            $('.user-info').prop('hidden', true);
            $('.form-modif-user-info').prop('hidden', false);
        }
    };

    input_name.keyup(function () {
        if (name_reg.test(input_name.val()))
        {
            $('.form-name-group').addClass("has-success");
            $('.form-name-group').removeClass("has-error");
        }
        else 
        {
            $('.form-name-group').removeClass("has-success");
            $('.form-name-group').addClass("has-error");
        }
    });

    input_email.keyup(function () {
        if (email_reg.test(input_email.val())) 
        {
            $('.form-email-group').removeClass("has-error");
        }
        else 
        {
            $('.form-email-group').addClass("has-error");
        }
    });

    logUser = function (name, password) {
        let i;
        i = 0;
        while (i != allUsers.length)
        {
            if (name == allUsers[i].nom && password == allUsers[i].pwd)
            {   
                return allUsers[i];
            } 
            i++;
        }
    }
});