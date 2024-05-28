import {
    getRandomActivity,
    asyncGetRandomActivity,
    asyncGetRandomActivityChange
} from './activity.js';



/**
 * Асинхронно получает случайный заголовок поста
 * и обновляет элемент с id 'activity'.
 */
const updateActivity = async () => {
    const activity = await asyncGetRandomActivityChange();

    const activityElement = document.getElementById('activity');
    
    activityElement.textContent = activity;
}

getRandomActivity();

// asyncGetRandomActivity();

// setInterval(updateActivity, 100);
