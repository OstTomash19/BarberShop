(function () {
    'use strict'
    $(document).ready(() => {

        $('.masters-carousel').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            responsive: [
                {
                    breakpoint: 1050,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: false,
                        infinite: true
                    }
                },
                {
                    breakpoint: 860,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        infinite: true
                    }
                }
            ]
        });

        let buttonDiscount = $('#btn-discount');
        let buttonOrderSubmit = $('#submit');
        let popupDiscount = $('#popup');
        let buttonCloseDiscount = $('#popup-discount-close');
        let buttonCloseOrder = $('#make-order-close');
        let makeOrder = $('#make-order-popup');
        let makeOrderDone = $('#make-order-form-done');
        let carouselButtons = $('.btn-carousel');
        let makeOrderForm = $('#make-order-form');

        for (let i = 0; i < carouselButtons.length; i++) {
            carouselButtons.eq(i).click(function () {
                makeOrder.show();
                makeOrderForm.show();
            })
        }

        buttonCloseOrder.click(function () {
            makeOrder.hide();
            makeOrderDone.hide();
        });

        makeOrder.click((e) => {
            if (e.target.id === 'make-order-popup') {
                makeOrder.hide();
                makeOrderDone.hide();
            }
        });

        buttonCloseDiscount.click(function () {
            popupDiscount.hide();
        });

        popupDiscount.click((e) => {
            if (e.target.id === 'popup') {
                popupDiscount.hide();
            }
        });

        buttonDiscount.click(function () {
            popupDiscount.show();
        });

        buttonOrderSubmit.click(function () {
            $('.error-input').hide();

            let loader = $('#loader');
            loader.css('display', 'flex');
            let arrayInput = $('.input');
            let hasError = false;

            for (let i = 0; i < arrayInput.length; i++) {
                if (!arrayInput.eq(i).val()) {
                    arrayInput.eq(i).siblings('.error-input').show();
                    arrayInput.eq(i).css('border-color', 'red');
                    hasError = true;
                    loader.hide();
                } else {
                    arrayInput.eq(i).css('border-color', 'rgb(174, 137, 89)');
                }
            }

            if (!hasError) {
                $.ajax({
                    type: 'post',
                    url: 'mail.php',
                    data: 'name=' + arrayInput.eq(0).val()
                        + '&service=' + arrayInput.eq(1).val()
                        + '&date=' + arrayInput.eq(2).val()
                        + '&phone=' + arrayInput.eq(3).val()
                        + '&master=' + arrayInput.eq(4).val()
                        + '&time=' + arrayInput.eq(5).val(),
                    success: () => {
                        loader.hide();
                        makeOrderForm.hide();
                        makeOrderDone.show();
                    },
                    error: () => {
                        loader.hide();
                        makeOrder.hide();
                        makeOrderDone.hide();
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.');
                    }
                })
            }
        });

        document.getElementById('burger').onclick = function () {
            document.getElementById('header-menu').classList.add('open');
        }
        document.querySelectorAll('#header-menu > *').forEach((item) => {
            item.onclick = () => {
                document.getElementById('header-menu').classList.remove('open');
            }
        });
    });
}());
