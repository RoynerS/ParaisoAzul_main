!function ($) {
    $(document).on("click", "ul.nav li.parent > a ", function () {
        $(this).find('em').toggleClass("fa-minus");
    });
    $(".sidebar span.icon").find('em:first').addClass("fa-plus");
}

(window.jQuery);
$(window).on('resize', function () {
    if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
})
$(window).on('resize', function () {
    if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
})

$(document).ready(function () {
    $('#rooms').DataTable();
});

// Función para calcular IVA
function calcularIVA(precioBase, tasaIVA = 0.19) {
    precioBase = parseFloat(precioBase);
    if (isNaN(precioBase)) {
        precioBase = 0;
    }

    const valorIVA = precioBase * tasaIVA;
    const precioTotal = precioBase + valorIVA;
    
    return {
        precioBase: precioBase.toFixed(2),
        valorIVA: valorIVA.toFixed(2),
        precioTotal: precioTotal.toFixed(2)
    };
}

// implementation of disabled form fields
var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
var checkin = $('#check_in_date').fdatepicker({
    format: 'dd-mm-yyyy',
    onRender: function (date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function (ev) {
    if (ev.date.valueOf() > checkout.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkout.update(newDate);
    }
    checkin.hide();
    $('#check_out_date')[0].focus();
}).data('datepicker');

var checkout = $('#check_out_date').fdatepicker({
    format: 'dd-mm-yyyy',
    onRender: function (date) {
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function (ev) {
    checkout.hide();
    
    // Cálculo de días
    var totalDays = Math.floor((checkout.date - checkin.date)/86400000);
    var price = document.getElementById('price').innerHTML;
    var total_price = (totalDays+1)*(price);
    
    // Cálculo de IVA
    var calculoIVA = calcularIVA(total_price);
    
    // Actualizar elementos HTML
    $('#staying_day').html(totalDays+1);
    $('#total_price').html(total_price.toFixed(2));
    $('#price_base').html(calculoIVA.precioBase);
    $('#price_iva').html(calculoIVA.valorIVA);
    $('#total_price_iva').html(calculoIVA.precioTotal);
}).data('datepicker');

var joining_date = $('.joining_date').fdatepicker({
    format: 'dd-mm-yyyy',
    onRender: function (date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
    }
}).data('datepicker');