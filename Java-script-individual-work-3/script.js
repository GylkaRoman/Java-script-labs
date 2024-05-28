const transactions = [];

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

const displayTransaction = (transaction) => {
    const tableBody = document.querySelector('.table__body');

    if (tableBody) {
        const firstFourWordsOfDescription = transaction.description.split(' ').slice(0, 4).join(' ');
        const descriptionWordsCount = transaction.description.split(' ');
        const DetailsButton = descriptionWordsCount.length > 4;

        let rowColor;
        if (transaction.amount > 0) {
            rowColor = 'green';
        } else {
            rowColor = 'red';
        }

        const newRowHTML = `
        <tr class="table__line table__line-body ${rowColor}" id-row="${transaction.transactionID}">
            <td class="table__id">${transaction.transactionID}</td>
            <td class="table__date">${transaction.date}</td>
            <td class="table__amount">${transaction.amount}</td>
            <td class="table__category">${transaction.category}</td>
            <td class="table__description" data-full="false">${firstFourWordsOfDescription}</td>
            <td class="table__actions">
                <button class="delete-btn"></button>
                ${DetailsButton ? '<button class="details-btn">Details</button>' : ''}
            </td>
        </tr>`;

        tableBody.insertAdjacentHTML('beforeend', newRowHTML);
    } else {
        console.error('Нету такого элемента с классом "table__body"');
    }
};

const calculateTotal = () => {
    let totalAmount = 0;
    for (let i = 0; i < transactions.length; i++) {
        totalAmount += transactions[i].amount;
    }
    document.querySelector('.totalAmount').innerText = totalAmount;
};

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

const form = document.querySelector(".table-form");

form.addEventListener('submit', function (event) {
    event.preventDefault();
    addTransaction();
});

let tableBody = document.querySelector('.table__body');

const deleteTransaction = (transactionID) => {
    const index = transactions.findIndex(transaction => transaction.transactionID === transactionID);
    if (index !== -1) {
        transactions.splice(index, 1);
    }
};

const toggleDescription = (transactionID) => {
    const row = document.querySelector(`.table__line-body[id-row="${transactionID}"]`);
    const tableDescription = row.querySelector('.table__description');
    
    const transaction = transactions.find(transaction => transaction.transactionID === transactionID);
    const fullDescription = transaction.description;
    const shortDescription = fullDescription.split(' ').slice(0, 4).join(' ');

    const isFullDescriptionDisplayed = tableDescription.innerText === fullDescription;

    if (isFullDescriptionDisplayed) {
        tableDescription.innerText = shortDescription;
    } else {
        tableDescription.innerText = fullDescription;
    }
};

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
