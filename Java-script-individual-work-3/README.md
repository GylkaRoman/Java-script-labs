# Отчет по проекту "JS лабораторная работа №3"

## Инструкции по запуску проекта
1. Скачайте или клонируйте репозиторий с проектом.
2. Откройте файл `index.html` в вашем браузере используя различные сервер по примеру liveServer.

## Описание индивидуальной работы
Данная лабораторная работа представляет собой веб-страницу для работы с транзакциями. Данная веб страница представляет собой форму с помощью которой можно добавлять новые транзакции вводя данные в input поля. А также таблица в которой добавляются новые транзакции сгенерированные через форму.

## Краткая документация к проекту
- **HTML:** Структура веб-страницы, включающая форму и таблицу для отображения транзакций.
- **CSS:** Стилизация страницы, включая оформление таблицы и кнопок.
- **JavaScript:** Логика добавления, удаления и отображения транзакций, а также расчета общей суммы.

## Примеры использования проекта
### Форма для ввода данных
```HTML
<form class="table-form" action="#" method="post">
                <fieldset class="table__fieldset">
                    <legend class="table__legend">Создайте новую транзакцию</legend>
                    <input placeholder="Date" type="date" class="table-form__date" required>
                    <input placeholder="Amount" type="number" class="table-form__amount" required>
                    <input placeholder="Category" type="text" class="table-form__category" required>
                    <input placeholder="Description" type="text" class="table-form__description" required>
                </fieldset>
                <button class="table__submit" type="submit">Submit</button>
            </form>

```
### Таблица для отображения транзакций
```HTML
<table class="table">
                <thead class="table__head">
                    <tr class="table__line table__line-head">
                        <th class="table__id">id</th>
                        <th class="table__date">date</th>
                        <th class="table__amount">amount</th>
                        <th class="table__category">category</th>
                        <th class="table__description">description</th>
                        <th class="table__actions">actions</th>
                    </tr>
                </thead>
                <tbody class="table__body"></tbody>
                <tfoot>
                    <tr>
                        <td>Total Amount:</td>
                        <td colspan="5" class="total">
                            <span class="totalAmount">0</span>
                        </td>
                    </tr>

                </tfoot>
            </table>

```

### Класс транзакция
```javascript
class Transaction {
    static id = 1;

    constructor(date, amount, category, description) {
        this.transactionID = Transaction.id++;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }
}

```

### Удаление транзакции через делегирование событий при нажатии
```javascript

tableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        const row = event.target.closest('.table__line-body');
        const transactionID = parseInt(row.getAttribute("id-row"));
        deleteTransaction(transactionID);
        row.remove();
        calculateTotal();
    } else if (event.target.classList.contains('details-btn')) {
        const row = event.target.closest('.table__line-body');
        const transactionID = parseInt(row.getAttribute("id-row"));
        toggleDescription(transactionID);
    }
});
```

### Добавление новой транзакции в таблицу
```javascript
const addTransaction = () => {
    const date = document.querySelector('.table-form__date').value;
    const amount = document.querySelector('.table-form__amount').value;
    const category = document.querySelector('.table-form__category').value;
    const description = document.querySelector('.table-form__description').value;
    
    const transaction = new Transaction(date, amount, category, description);
    
    transactions.push(transaction);
    
    displayTransaction(transaction);
    
    calculateTotal();

    form.reset();
};
```
## Контрольные вопросы

Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?
- Мы можем получить доступ к элементу на странице использую следующие методы dom окружения:
```javascript
const element=document.querySelectorAll('');
const element=document.querySelector('');
const element=document.getElementById('');
const element=document.getElementsByTagName('');
const element=document.getElementsByClassName('');
const element=document.getElementsByName('');
```
 
Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?
- Делегирование событий это определенные подход при работе с событиями на большом количество одинаковых элементов. 
- Назначение обработчика на родительский элемент а не перебирание всех элементов.
- Использование всплытия событий: Использование события на дочерних элементов всплывая вверх по дереву DOM к родительскому элементу, где и обрабатывается.
- Идентификация целевого элемента: Использование event.target дяя поиска элемента на котором произошло событие.



Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?
```javascript

//Вставка Элементов
Element.before(newElement); //перед
Element.after(newElement); //после
Element.prepend(newElement); //перед в.
Element.append(newElement); // после в.

//Вставка и + теги
textElement.insertAdjacentHTML(
    'afterend',
    '<p>ddddddddddddddddddd<span></span></p>'
);
'afterend' //после
'beforeend' // после в.
'afterbegin' //до в.
'beforebegin'//до
//Вставка текста
textElement.insertAdjacentText(
    'afterend',
    '<p>ddddddddddddddddddd<span></span></p>'
);
//Вставка элемента
textElement.insertAdjacentElement(
    'afterend',
    newElement;
);

```

Как можно добавить новый элемент в DOM дерево с помощью JavaScript?
```javascript
//Создание Элементов и узлов
const element33=document.createElement('div');
const element34=document.createTextNode('textNode');
```
