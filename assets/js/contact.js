$(document).ready(function () {
    /* Init button */
    $('input, textarea').prop('disabled', false);

    $('#contact-form').submit(function (event) {
        $('.alert').empty();
        $('.alert').addClass('alert-success').append('<strong>Success!</strong> Votre formulaire a bien était transmis, veillez patienter quelque instant...');
        $('.alert').animate({
            height: 'toggle'
        });
        $('input, textarea').prop('disabled', true);
        setTimeout(function () {
            $('.alert').animate({
                height: 'toggle'
            });
            $('input, textarea').prop('disabled', false);
            $('input.form-control, textarea').val('');
        }, 3000);
        event.preventDefault();
    });
});