# 🚗 RentalCar — Сервіс оренди автомобілів

**RentalCar** — це сучасний веб-додаток для компанії, що займається наданням послуг з оренди автомобілів. Проєкт дозволяє користувачам переглядати каталог авто, фільтрувати їх за технічними характеристиками, додавати в "Обране" та бронювати онлайн.

---

## 🌟 Основні функції

- **Каталог автомобілів:** Перегляд списку доступних авто з пагінацією (Load More).
- **Детальна сторінка:** Повна інформація про кожен автомобіль (технічні характеристики, аксесуари, умови оренди).
- **Фільтрація (Backend-based):** Пошук за брендом, ціною та пробігом.
- **Система "Обране":** Можливість зберігати автомобілі. Список зберігається навіть після оновлення сторінки (Persistence).
- **Форма бронювання:** Моментальне бронювання авто з миттєвим повідомленням про успіх (Notifications).
- **Адаптивний дизайн:** Чиста верстка згідно з макетом у Figma.

---

## 🛠 Технологічний стек

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (з використанням `persist` для LocalStorage)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **API Client:** [Axios](https://axios-http.com/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

---

## 🚀 Інструкція з установку та запуску

1.  **Клонуйте репозиторій:**

    ```bash
    git clone [https://github.com/your-username/rental-car-project.git](https://github.com/your-username/rental-car-project.git)
    ```

2.  **Перейдіть у директорію проєкту:**

    ```bash
    cd rental-car-project
    ```

3.  **Встановіть залежності:**

    ```bash
    npm install
    ```

4.  **Запустіть проєкт у режимі розробки:**

    ```bash
    npm run dev
    ```

    Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

5.  **Збірка для деплою (Production build):**
    ```bash
    npm run build
    ```

---

## 📁 Структура проєкту (коротко)

- `src/app` — маршрутизація та сторінки (Домашня, Каталог, Деталі).
- `src/components` — перевикористовувані UI-компоненти (CarCard, FilterBar, BookingForm).
- `src/store` — глобальний стан Zustand.
- `src/services` — логіка запитів до API (Axios).

---

## 👤 Автор

**Анна** \* [GitHub](https://github.com/ann-ovcharenko)

- [LinkedIn](https://www.linkedin.com/in/anna-ovcharenko/)

---

## 🔗 Посилання на проєкт

- **Live Demo:** [Посиланя*на_Vercel*тут](https://your-project.vercel.app)
- **API Documentation:** [Swagger UI](https://car-rental-api.goit.global/api-docs/)
