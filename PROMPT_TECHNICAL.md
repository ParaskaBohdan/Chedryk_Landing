# Технічний Промпт (Technical Specification Prompt)

## 1. Стек технологій
- **Frontend**: React (SPA / Vite + React, TypeScript/JavaScript), Tailwind CSS або Vanilla CSS / SCSS.
- **Backend**: PHP (легкий скрипт або міні-фреймворк для обробки POST-запитів форми консультації, надсилання повідомлень на Email / Telegram Bot API).
- **Контейнеризація**: Docker & Docker Compose (контейнер для Frontend, контейнер для PHP Backend / Nginx / Apache).
- **Мережа & Локальний доступ**: Налаштування Docker-контейнерів із прив'язкою до `0.0.0.0` для перегляду сайту в локальній мережі та через VPN-емулятор (Radmin VPN).

## 2. Архітектура та Інфраструктура
### Docker Setup
- `docker-compose.yml` з сервісами:
  - `frontend`: React-додаток (Vite/Nginx), прокинутий порт `80` (або `3000`).
  - `backend`: PHP FastCGI / Nginx для API обробки заявок (`/api/consultation.php`).
- Прив'язка портів до `0.0.0.0`, щоб при підключенні через Radmin VPN інші пристрої в мережі могли отримувати доступ за IP-адресою хоста (наприклад `http://192.168.x.x` або Radmin IP).

### Backend (PHP)
- Ендпоінт `POST /api/consultation.php`:
  - Приймає JSON / FormData (Ім'я, Телефон, Вибрана послуга, Коментар).
  - Валідація та санація вхідних даних.
  - Надсилання сповіщення на Telegram або Email клієнта.
  - Повернення JSON-відповіді `{ "success": true, "message": "..." }`.
  - CORS налаштування для взаємодії з React-фронтендом.

### Frontend (React)
- Модульна структура компонентів та сторінок:
  - `components/` (Header, Footer, ServiceCard, StepGuide, ContactForm, Modal, ScrollAnimationWrapper).
  - `pages/` (HomePage, ContactsPage).
- Анімації: Адаптивні скрол-анімації (Framer Motion, AOS або CSS Intersection Observer API).
- Інтерактивна форма запиту на консультацію з обробкою станів (завантаження, успіх, помилка).

## 3. Вимоги до коду
- Адаптивний та чуйний дизайн (Mobile-first, планшети, десктоп).
- SEO-оптимізація (мета-теги, OpenGraph, семантичний HTML5, швидке завантаження assets).
- Конфігурація через `.env` файли (Telegram token, mail settings, API URL).
