# Отчет по проекту "Activity for Captain Smith"

## Инструкции по запуску проекта
1. Скачайте все файлы проекта в одну директорию.
2. Откройте файл `index.html` в любом современном браузере.

## Описание индивидуальной работы
Проект представляет собой простое веб-приложение, которое предлагает случайную активность для капитана Смита из списка заголовков постов, полученных с помощью API.
Проект состоит из:

- **HTML файл**: Определяет структуру веб-страницы и а также импортирует CSS и JavaScript файлы.
- **CSS файл (index.css)**: Определяет стили для элементов веб-страницы центрируя элементы и задавая отступы.
- **JavaScript файл (index.js)**: Содержит логику для получения случайных постов из API и ее отображения на веб-странице заголовок поста.

## Краткая документация к проекту
Проект использует [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) для получения списка постов. В момент когда страница загружается, она случайным образом выбирает один из заголовков постов и отображает его. Это демонстрирует использование `fetch API` для асинхронных запросов данных с сервера. Таким образом происходит демонстрация работы асинхронных запросов данных с сервера. 

## Примеры использования проекта
```javascript
const getRandomActivity = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            const randomIndexForPosts = Math.floor(Math.random() * data.length);
            const randomPost = data[randomIndexForPosts];

            const activyObject = document.getElementById('activity');
            activyObject.textContent = randomPost.title;
        })
        .catch(typeOfError => {
            console.error('Тип ошибки при получения запроса:', typeOfError);
            const activyObject = document.getElementById('activity');
            activyObject.textContent = "К сожалению, произошла ошибка";
        });
};
```
Отправка HTTP GET-запроса. Преобразование ответа в JSON.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
```
Выбор случайного поста из полученных данных.

```javascript
.then(data => {
    const randomIndexForPosts = Math.floor(Math.random() * data.length);
    const randomPost = data[randomIndexForPosts];

```

Обновление содержимого элемента с id 'activity' заголовком случайного поста.
```javascript
const activyObject = document.getElementById('activity');
    activyObject.textContent = randomPost.title;
})

```

Логирование ошибки и обновление элемента сообщением об ошибке.
```javascript
.catch(typeOfError => {
    console.error('Тип ошибки при получения запроса:', typeOfError);
    const activyObject = document.getElementById('activity');
    activyObject.textContent = "К сожалению, произошла ошибка";
});
```

##
Экспорт из `activity.js`
```javascript
export {
    getRandomActivity,
    asyncGetRandomActivity,
    asyncGetRandomActivityChange
}
```

Импорт в `index.js`
```javascript
import {
    getRandomActivity,
    asyncGetRandomActivity,
    asyncGetRandomActivityChange
} from './activity.js';
```

## Ответы на контрольные вопросы
1. **Какое значение возвращает функция `fetch?`**
   - Функция `fetch` возвращает объект `Promise`.

2. **Что представляет собой `Promise?`**
   - Promise - это объект, который является результатом асинхронной операции. `Promise` может находится в трех состояниях: ожидание (pending), разрешение (fulfilled) и отклонение (rejected). Promise может быть выполнен успешно с данными или отклонен с ошибкой.

3. **Основные методы, доступные для работы с объектом`Promise`, включают:**
   - .then(onFulfilled, onRejected): вызывается после выполнения Promise с обработчиками для успешного(onFulfilled) и неуспешного(onRejected) разрешения.
   - .catch(onRejected): вызывается в случае отклонения Promise для обработки ошибки.
   - .finally(onFinally): вызывается независимо от того, был ли Promise разрешен или отклонен.


4. **Каковы основные различия между использованием `async await` и `Promise?`**
   - Используя объект Promise предполагается использование цепочки методов .then() и .catch() для обработки успешного или неуспешного выполнения. Использование чистого `Promise` может привести к многословному и вложенному коду.
    
   - async/await - это синтаксический сахар над объектами Promise. Его используют для более читаемого и линейного кода работая с асинхронными операциями. Он позволяет писать асинхронный код так, как будто он синхронный. Внутри функции, объявленной с ключевым словом async, можно использовать оператор await, который приостанавливает выполнение функции до тех пор, пока не будет разрешен Promise.    

## Список использованных источников
1. [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) - Для получения списка постов.
