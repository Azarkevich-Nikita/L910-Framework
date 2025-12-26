<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">L910-Framework</h3>

  <p align="center">
    Минималистичный веб-фреймворк для Node.js с поддержкой маршрутизации, middleware и обработки HTTP-запросов
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">О проекте</a>
      <ul>
        <li><a href="#built-with">Технологии</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Как начать использовать</a>
      <ul>
        <li><a href="#prerequisites">Требования</a></li>
        <li><a href="#installation">Установка</a></li>
      </ul>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## О проекте

**L910-Framework** — это минималистичный веб-фреймворк для Node.js, разработанный с нуля без использования готовых решений. Фреймворк предоставляет базовую функциональность для создания серверных приложений, аналогичную Express.js, но реализованную самостоятельно для глубокого понимания работы веб-серверов.

### Для чего предназначен фреймворк

Фреймворк решает следующие задачи:

- **Создание HTTP-серверов** — позволяет легко создавать и запускать веб-серверы на Node.js
- **Маршрутизация запросов** — поддерживает регистрацию обработчиков для различных HTTP-методов (GET, POST, PUT, PATCH, DELETE) и путей с параметрами
- **Обработка запросов** — предоставляет удобные объекты Request и Response для работы с данными запросов и ответов
- **Middleware** — поддерживает цепочки промежуточных обработчиков для логирования, аутентификации и других задач
- **Обработка ошибок** — встроенная система обработки ошибок, предотвращающая падение сервера

### Основные возможности

- ✅ Поддержка всех основных HTTP-методов (GET, POST, PUT, PATCH, DELETE)
- ✅ Параметризованные маршруты (например, `/users/:id`)
- ✅ Парсинг тела запроса (JSON, form-data)
- ✅ Работа с query-параметрами
- ✅ Цепочки middleware
- ✅ Обработка ошибок
- ✅ Удобные методы для формирования ответов (res.send(), res.json(), res.status())

<p align="right">(<a href="#readme-top">наверх</a>)</p>



### Технологии

* Node.js (встроенные модули: http, url, querystring, fs)
* JavaScript (ES6+)

<p align="right">(<a href="#readme-top">наверх</a>)</p>



<!-- GETTING STARTED -->
## Как начать использовать

### Требования

Для работы фреймворка необходим Node.js версии 14 или выше.

### Установка

1. Клонируйте репозиторий
   ```sh
   git clone https://github.com/your_username/L910-Framework.git
   ```
2. Перейдите в директорию проекта
   ```sh
   cd L910-Framework
   ```
3. Установите зависимости (если есть)
   ```sh
   npm install
   ```
4. Запустите сервер
   ```sh
   npm start
   ```

Сервер будет запущен на порту 5050 (по умолчанию). Вы можете изменить порт в файле `index.js`.

<p align="right">(<a href="#readme-top">наверх</a>)</p>
