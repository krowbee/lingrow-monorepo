# Lingrow LMS

**Lingrow** — це платформа для вивчення англійської мови. Система дозволяє адміністраторам створювати курси, уроки, теорію з TipTap Editor та завдання з тестами, а користувачам проходити уроки та відстежувати свій прогрес. Реалізована авторизація через **access token** та **refresh token** у cookies з підтримкою рефрешу токенів.

---

## Технології

### Frontend
- [Next.js](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [shadcn/ui](https://shadcn-ui.com)
- [TipTap Editor](https://tiptap.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)

### Backend
- [NestJS](https://nestjs.com)
- [Prisma ORM](https://www.prisma.io/)
- PostgreSQL
- [Swagger API](https://swagger.io/)
- Класова валідація та трансформація
- DTO для всіх об'єктів
- Guards для Адміна та Авторизованих користувачів
- Декоратори для отримання `CurrentUser` у контролерах

---

## Docker

Весь проєкт піднятий через Docker. Для запуску потрібно:

1. Створити `.env` файл у `backend` з прикладом змінних:

```env
ACCESS_SECRET=example_access_secret
REFRESH_SECRET=example_refresh_secret

POSTGRES_USER=example_user
POSTGRES_PASSWORD=example_password
POSTGRES_DB=example_db
DATABASE_URL="postgresql://example_user:example_password@db:5432/example_db?schema=public"
```
## Запустити Docker Compose
```bash
docker-compose up --build
```
- Бекенд: http://localhost:3003
- Фронтенд: http://localhost:3000
- PostgreSQL: порт 5433

### API ROUTES

# Authorization
- | Метод | Шлях           | Опис                       |
| ----- | -------------- | -------------------------- |
| POST  | /auth/login    | Вхід у систему             |
| POST  | /auth/register | Реєстрація                 |
| POST  | /auth/refresh  | Оновлення токена           |
| GET   | /auth/me       | Дані поточного користувача |
| POST  | /auth/logout   | Вихід із системи           |

# Course
| Метод  | Шлях                         | Опис                        |
| ------ | ---------------------------- | --------------------------- |
| GET    | /course                      | Список усіх курсів          |
| POST   | /course                      | Створити новий курс (адмін) |
| GET    | /course/{courseSlug}/lessons | Уроки курсу за slug         |
| PATCH  | /course/{courseId}           | Редагувати курс (адмін)     |
| DELETE | /course/{courseId}           | Видалити курс (адмін)       |

# Lesson
| Метод  | Шлях                  | Опис                  |
| ------ | --------------------- | --------------------- |
| GET    | /lessons/{lessonSlug} | Отримати урок за slug |
| POST   | /lessons              | Створити урок (адмін) |
| PATCH  | /lessons/{lessonId}   | Оновити урок (адмін)  |
| DELETE | /lessons/{lessonId}   | Видалити урок (адмін) |

# Task
| Метод  | Шлях                              | Опис                                     |
| ------ | --------------------------------- | ---------------------------------------- |
| POST   | /task                             | Створити завдання та варіанти відповідей |
| PATCH  | /task/{taskId}                    | Редагувати завдання та відповіді         |
| DELETE | /task/{taskId}                    | Видалити завдання                        |

# User Progress
| Метод  | Шлях                          | Опис                     |
| ------ | ----------------------------- | ------------------------ |
| GET    | /progress/course/{courseSlug} | Прогрес по курсу         |
| GET    | /progress/lesson/{lessonSlug} | Прогрес по уроку         |
| POST   | /progress                     | Створити запис прогресу  |
| PATCH  | /progress/{taskId}            | Оновити прогрес завдання |
| DELETE | /progress/lesson/{lessonId}   | Скинути прогрес по уроку |

- Авторизація через access & refresh токени у cookies
- Адмін панель для створення курсів та уроків з TipTap Editor
- Відстеження прогресу користувачів по уроках та курсах
- Завдання з варіантами відповідей та перевіркою
