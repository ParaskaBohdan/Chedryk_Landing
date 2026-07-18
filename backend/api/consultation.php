<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не підтримується']);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$name = trim($data['name'] ?? '');
$phone = trim($data['phone'] ?? '');
$service = trim($data['service'] ?? 'Не вказано');
$comment = trim($data['comment'] ?? 'Без коментаря');

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => "Будь ласка, вкажіть ваше ім'я та номер телефону."
    ]);
    exit();
}

// Завантаження змінних оточення (якщо є .env)
$botToken = getenv('TELEGRAM_BOT_TOKEN') ?: 'YOUR_TELEGRAM_BOT_TOKEN';
$chatId = getenv('TELEGRAM_CHAT_ID') ?: 'YOUR_TELEGRAM_CHAT_ID';

$textMessage = "⚡ *Нова заявка на консультацію (Chedryk Landing)* ⚡\n\n";
$textMessage .= "👤 *Ім'я:* " . htmlspecialchars($name) . "\n";
$textMessage .= "📞 *Телефон:* " . htmlspecialchars($phone) . "\n";
$textMessage .= "🛠️ *Вибрана послуга:* " . htmlspecialchars($service) . "\n";
$textMessage .= "📝 *Коментар:* " . htmlspecialchars($comment) . "\n";
$textMessage .= "⏰ *Час відправки:* " . date('Y-m-d H:i:s') . "\n";

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
    // Режим розробки / Демо без налаштованих ключів Telegram
    $telegramSent = true;
}

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Дякуємо! Вашу заявку успішно прийнято. Чедрик Іван зв\'яжеться з вами найближчим часом.',
    'telegram_status' => $telegramSent ? 'sent_or_mocked' : $telegramError
]);
