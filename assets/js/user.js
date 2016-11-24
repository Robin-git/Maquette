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
        nom: "Ruby",
        pwd: "ruby",
        prénom: "Robin",
        adresse: "5 RUE DES BOUCHETS",
        tél: "07.77.25.45.86",
        mail: "robin.ruby@gmail.com",
        droits: 1300,
        familles: [
            {
                nom: "Jean",
                prénom: "Kévin",
                date_naissance: 1993 - 03 - 15,
                liaison_familiale: "marié",
                droits: 10
            }
        ]
    },
    {
        nom: "Csharp",
        pwd: "csharp",
        prénom: "Antonin",
        adresse: "5 RUE DES BOUCHETS",
        tél: "07.77.25.45.86",
        mail: "csharp.antonin@gmail.com",
        droits: 1000,
        familles: [
            {
                nom: "Jean",
                prénom: "Kévin",
                date_naissance: 1993 - 03 - 15,
                liaison_familiale: "marié",
                droits: 10
            }
        ]
    },
    {
        nom: "Python",
        pwd: "python",
        prénom: "Jean",
        adresse: "5 RUE DES BOUCHETS",
        tél: "07.77.25.45.86",
        mail: "python.jean@gmail.com",
        droits: 0,
        familles: [
            {
                nom: "Jean",
                prénom: "Kévin",
                date_naissance: 1993 - 03 - 15,
                liaison_familiale: "marié",
                droits: 10
            },
            {
                nom: "Jean",
                prénom: "Iyama",
                date_naissance: 1993 - 02 - 02,
                liaison_familiale: "célibataire",
                droits: 10
            }
        ]
    },
]

$(document).ready(function () {
    /* Init button */
    $('#btn-modif-rib-information').prop("disabled", false);
    $('.acte-naissance').find('.btn.btn-info').prop("disabled", false);
    $('.passeports').find('.btn.btn-info').prop("disabled", false);
    $('.factures').find('.btn.btn-info').prop("disabled", false);
    $('.add-colum-tab').prop("disabled", false);

    /* Init du modal BootStrap */
    $("#myModal").modal();

    $("#user-submit-info").click(function (event) {
        user = logUser($('#usrname').val(), $('#psw').val());
        if (user) {
            getUserParams(user);
            printUserInfo(user);
            printUserHaveRight(user);
        }
        else {
            $('.alert-submit-user-info').empty();
            $('.alert-submit-user-info').append('<div class="alert alert-danger">' +
                '  Mot de passe ou nom d\'utilisateurs non trouvé...' +
                '</div>');
            event.preventDefault();
            event.stopImmediatePropagation();
            return false;
        }
    });

    $('.form-modif-user-info').submit(function (event) {
        $('.user-info').empty();
        hiddenFormModifUserInfo();
        setUserParams(user);
        printUserInfo(user);
        event.preventDefault();
    });

    $('#btn-modif-user-info').click(function () {
        hiddenFormModifUserInfo();
    });

    $('#btn-modif-rib-information').click(function () {
        $(this).prop("disabled", true);
        $('.table-rib').animate({
            height: 'toggle'
        });
        $('.form-modif-rib').animate({
            height: 'toggle'
        });
    });

    $('.form-modif-rib').find('form').submit(function (event) {
        let td = $('.table-rib').find('td').toArray();
        let input = $('.form-modif-rib').find('input');
        let i;
        i = 0;
        input.each(function () {
            td[i].innerHTML = $(this).val();
            i++;
        });
        $('#btn-modif-rib-information').prop("disabled", false);
        $('.table-rib').animate({
            height: 'toggle'
        });
        $('.form-modif-rib').animate({
            height: 'toggle'
        });
        event.preventDefault();
    });

    /* FUNCTION TAB HAVE RIGHT */
    var row;
    row = '<tr>' +
        '<td><input type="text" placeholder="Nom" class="form-control"></td>' +
        '<td><input type="text" placeholder="Prénom" class="form-control"></td>' +
        '<td><input type="text" placeholder="Date de naissance" class="form-control"></td>' +
        '<td><input type="text" placeholder="Liaison familiale" class="form-control"></td>' +
        '<td><input type="text" placeholder="Droits" class="form-control"></td>' +
        '</tr>';

    $('.add-colum-tab').click(function () {
        $('.user-have-right > table > tbody').append(row);
        $(this).prop("disabled", true);
        $('.remove-colum-tab').prop("disabled", true);
    });

    $('.remove-colum-tab').click(function () {
        $('.user-have-right > table > tbody > tr:last').remove();
    });

    /* **************************************** */
    $('.confirm-add-colum').click(function () {
        let userRow;
        let i;
        let tbody;
        let tab;
        tbody = $('.user-have-right > table > tbody');
        tab = tbody.find('input');
        //$('.user-have-right > table > tbody').append(row);
        i = 0;
        tab.each(function () {
            userRow[i] = $(this).val();
            i++;
        });
        i = 0;
        while (i != userRow.length) {
            
        }
        $('.add-colum-tab').prop("disabled", false);
        $('.remove-colum-tab').prop("disabled", false);
    });

    /* ANIMATION PROGRESS BAR acte-naissance */
    $('.acte-naissance').find('.btn.btn-info').click(function () {
        $(this).prop("disabled", true);
        $('.acte-naissance').find(".progress.download-act").animate({
            height: 'toggle'
        });
        $('.acte-naissance').find('.progress.download-act').find('.progress-bar')
            .animate({
                width: "100%",
            }, 3000, function () {
                setTimeout(function () {
                    $('.acte-naissance').find('.progress.download-act').animate({
                        height: 'toggle'
                    });
                    $('.acte-naissance').find('.btn.btn-info').prop("disabled", false);
                    $('.acte-naissance').find('.progress.download-act').find('.progress-bar').width("0%");
                }, 2000);
            });
    });

    /* ANIMATION PROGRESS BAR passeports */
    $('.passeports').find('.btn.btn-info').click(function () {
        $(this).prop("disabled", true);
        $('.passeports').find(".progress.download-act").animate({
            height: 'toggle'
        });
        $('.passeports').find('.progress.download-act').find('.progress-bar')
            .animate({
                width: "100%",
            }, 3000, function () {
                setTimeout(function () {
                    $('.passeports').find('.progress.download-act').animate({
                        height: 'toggle'
                    });
                    $('.passeports').find('.btn.btn-info').prop("disabled", false);
                    $('.passeports').find('.progress.download-act').find('.progress-bar').width("0%");
                }, 2000);
            });
    });

    /* ANIMATION PROGRESS BAR factures */
    $('.factures').find('.btn.btn-info').click(function () {
        $(this).prop("disabled", true);
        $('.factures').find(".progress.download-act").animate({
            height: 'toggle'
        });
        $('.factures').find('.progress.download-act').find('.progress-bar')
            .animate({
                width: "100%",
            }, 3000, function () {
                setTimeout(function () {
                    $('.factures').find('.progress.download-act').animate({
                        height: 'toggle'
                    });
                    $('.factures').find('.btn.btn-info').prop("disabled", false);
                    $('.factures').find('.progress.download-act').find('.progress-bar').width("0%");
                }, 2000);
            });
    });
});

getUserParams = function (user) {
    input_name.val(user.nom);
    input_last_name.val(user.prénom);
    input_adress.val(user.adresse);
    input_tel.val(user.tél);
    input_email.val(user.mail);
    input_droits.val(user.droits);
};

setUserParams = function (user) {
    user.nom = input_name.val();
    user.prénom = input_last_name.val();
    user.adresse = input_adress.val();
    user.tél = input_tel.val();
    user.mail = input_email.val();
    user.droits = input_droits.val();
};

printUserInfo = function (user) {
    $('.user-info').append('<li>Nom : ' + user.nom + ' </li>' +
        '<li>Prénom : ' + user.prénom + '</li>' +
        '<li>Adresse : ' + user.adresse + '</li>' +
        '<li>Tél : ' + user.tél + '</li>' +
        '<li>Mail : ' + user.mail + '</li>' +
        '<li>Droits : ' + user.droits + '</li>');
}

printUserHaveRight = function (user) {
    let tr;
    tr = $('.user-have-right').find('tbody');
    $.each(user.familles, function (i, val) {
        tr.append('<tr>' +
            '<td> ' + val.nom + ' </td>' +
            '<td> ' + val.prénom + ' </td>' +
            '<td> ' + val.date_naissance + ' </td>' +
            '<td> ' + val.liaison_familiale + ' </td>' +
            '<td> ' + val.droits + ' </td>' +
            '</tr>');
    });
}

hiddenFormModifUserInfo = function () {
    if ($('.user-info').prop('hidden')) {
        $('.user-info').prop('hidden', false);
        $('.form-modif-user-info').prop('hidden', true);
    }
    else {
        $('.user-info').prop('hidden', true);
        $('.form-modif-user-info').prop('hidden', false);
    }
};

input_name.keyup(function () {
    if (name_reg.test(input_name.val())) {
        $('.form-name-group').addClass("has-success");
        $('.form-name-group').removeClass("has-error");
    }
    else {
        $('.form-name-group').removeClass("has-success");
        $('.form-name-group').addClass("has-error");
    }
});

input_email.keyup(function () {
    if (email_reg.test(input_email.val())) {
        $('.form-email-group').removeClass("has-error");
    }
    else {
        $('.form-email-group').addClass("has-error");
    }
});

logUser = function (name, password) {
    let i;
    i = 0;
    while (i != allUsers.length) {
        if (name == allUsers[i].nom && password == allUsers[i].pwd) {
            return allUsers[i];
        }
        i++;
    }
}