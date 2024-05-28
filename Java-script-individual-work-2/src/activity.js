/**
 * Получает 100 постов через fetch
 * и случайным образом выбирает один и обновляет элемент
 * с id 'activity' на заголовок выбранного поста.
 */
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



/**
 * Асинхронно получает 100 постов через fetch
 * и случайным образом выбирает один и обновляет элемент
 * с id 'activity' на заголовок выбранного поста.
 */
const asyncGetRandomActivity = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Сеть не ответила на ваш запрос так как с ней не все в порядке');
        }

        const data = await response.json();

        const randomIndex = Math.floor(Math.random() * data.length);

        const activityElement = document.getElementById('activity');

        activityElement.textContent = data[randomIndex].title;


    } catch (error) {
        console.error('К сожалению, произошла ошибка типа:', error);

        const activityElement = document.getElementById('activity');

        activityElement.textContent = "К сожалению, произошла ошибка";
    }
};

/** 
 * Асинхронно получает получает 100 постов через fetch
 * и случайным образом выбирает один и возвращает его зоголовок 
 * 
 * @returns {Promise<string>}
 */
const asyncGetRandomActivityChange = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Сеть не ответила на ваш запрос так как с ней не все в порядке');
        }

        const data = await response.json();

        const randomIndex = Math.floor(Math.random() * data.length);

        return data[randomIndex].title;

    } catch (error) {
        console.error('К сожалению, произошла ошибка типа:', error);
    }
};

export {
    getRandomActivity,
    asyncGetRandomActivity,
    asyncGetRandomActivityChange
}