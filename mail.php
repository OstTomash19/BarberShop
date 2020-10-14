<?php
// Проверяем тип запроса, обрабатываем только POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Получаем параметры, посланные с javascript
    $name = $_POST['name'];
    $service = $_POST['service'];
    $date = $_POST['date'];
    $phone = $_POST['phone'];
    $master = $_POST['master'];
    $time = $_POST['time'];


    // создаем переменную с содержанием письма
    $content = $name . ' оставил заявку на услугу ' . $service . ' на ' . $date . ' у Барбера ' . $master . ' на ' . $time . ' часов. Его телефон: ' . $phone;

    // Первый параметр - кому отправляем письмо, второй - тема письма, третий - содержание
    $success = mail("admin@barbershop.com ", 'Запрос на услуги барбера', $content);

    if ($success) {
        // Отдаем 200 код ответа на http запрос
        http_response_code(200);
        echo "Письмо отправлено";
    } else {
        // Отдаем ошибку с кодом 500 (internal server error).
        http_response_code(500);
        echo "Письмо не отправлено";
    }

} else {
    // Если это не POST запрос - возвращаем код 403 (действие запрещено)
    http_response_code(403);
    echo "Данный метод запроса не поддерживается сервером";
}