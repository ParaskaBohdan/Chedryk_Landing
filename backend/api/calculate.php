<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Базові приклади розрахунків СЕС
$examples = [
    '20kw_deye' => [
        'title' => 'Мережева / Гібридна СЕС 20 кВт (Зелений Тариф)',
        'power_kw' => 20,
        'currency' => '$',
        'items' => [
            ['id' => 1, 'name' => 'Інвертор Deye 20 кВт', 'unit_price' => '2250 €', 'qty' => '1 шт', 'total_usd' => 2573.55],
            ['id' => 2, 'name' => 'Акумулятор Deye 5,2 кВт', 'unit_price' => '770 €', 'qty' => '3 шт', 'total_usd' => 2642.18],
            ['id' => 3, 'name' => 'Сонячні панелі TRINA 450 Вт', 'unit_price' => '85.00 $', 'qty' => '60 шт', 'total_usd' => 5100.00],
            ['id' => 4, 'name' => 'Профіль нержавіючий', 'unit_price' => '110 грн', 'qty' => '170 м', 'total_usd' => 419.52],
            ['id' => 5, 'name' => 'Міжпанельні та кінцеві притиски', 'unit_price' => '60 грн', 'qty' => '140 шт', 'total_usd' => 188.45],
            ['id' => 6, 'name' => 'Кабель PV solar 6,0 мм²', 'unit_price' => '58 грн', 'qty' => '300 м', 'total_usd' => 390.35],
            ['id' => 7, 'name' => 'Шпильки оцинковані', 'unit_price' => '60 грн', 'qty' => '172.5 шт', 'total_usd' => 232.19],
            ['id' => 8, 'name' => 'З\'єднувачі, болти', 'unit_price' => '90 грн', 'qty' => '28.33 шт', 'total_usd' => 57.21],
            ['id' => 9, 'name' => 'Доставка профілю', 'unit_price' => '1000 грн', 'qty' => '1 послуга', 'total_usd' => 22.43],
            ['id' => 10, 'name' => 'Кабель силовий', 'unit_price' => '330 грн', 'qty' => '8 м', 'total_usd' => 59.23],
            ['id' => 11, 'name' => 'Щит розподільний', 'unit_price' => '1000 грн', 'qty' => '1 шт', 'total_usd' => 22.43],
            ['id' => 12, 'name' => 'Короб, автоматичні вимикачі', 'unit_price' => '3000 грн', 'qty' => '1 комплект', 'total_usd' => 67.30],
            ['id' => 13, 'name' => 'Монтаж сонячних панелей', 'unit_price' => '1500.00 $', 'qty' => '1 комплект', 'total_usd' => 1500.00],
            ['id' => 14, 'name' => 'Монтаж та налагодження системи', 'unit_price' => '400.00 $', 'qty' => '1 послуга', 'total_usd' => 400.00]
        ],
        'total_usd' => 13674.85
    ]
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'examples' => $examples
    ]);
    exit();
}

// Запит POST на відправку розрахунку в Telegram
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;

$name = trim($data['name'] ?? '');
$phone = trim($data['phone'] ?? '');
$calcType = trim($data['calc_type'] ?? '20kw_deye');
$totalSum = trim($data['total_sum'] ?? '13674.85 $');

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => "Будь ласка, вкажіть ваше ім'я та номер телефону."
    ]);
    exit();
}

$botToken = getenv('TELEGRAM_BOT_TOKEN') ?: 'YOUR_TELEGRAM_BOT_TOKEN';
$chatId = getenv('TELEGRAM_CHAT_ID') ?: 'YOUR_TELEGRAM_CHAT_ID';

$textMessage = "📊 *Запит на кошторис СЕС (Chedryk Landing)* 📊\n\n";
$textMessage .= "👤 *Ім'я:* " . htmlspecialchars($name) . "\n";
$textMessage .= "📞 *Телефон:* " . htmlspecialchars($phone) . "\n";
$textMessage .= "⚡ *Тип станції:* " . htmlspecialchars($examples[$calcType]['title'] ?? $calcType) . "\n";
$textMessage .= "💰 *Ориєнтовна сума:* " . htmlspecialchars($totalSum) . "\n";
$textMessage .= "\n_🕒 Відправлено: " . date('d.m.Y H:i') . "_";

$telegramSent = false;
$telegramError = null;

if ($botToken !== 'YOUR_TELEGRAM_BOT_TOKEN' && $chatId !== 'YOUR_TELEGRAM_CHAT_ID') {
    $url = "https://api.telegram.org/bot{$botToken}/sendMessage";
    $postFields = [
        'chat_id' => $chatId,
        'text' => $textMessage,
        'parse_mode' => 'Markdown'
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postFields));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        $telegramSent = true;
    } else {
        $telegramError = "Помилка відправки в Telegram HTTP {$httpCode}";
    }
} else {
    $telegramSent = true;
}

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Дякуємо! Вашу заявку на розрахунок кошторису успішно прийнято. Чедрик Іван зв\'яжеться з вами.',
    'telegram_status' => $telegramSent ? 'sent_or_mocked' : $telegramError
]);
