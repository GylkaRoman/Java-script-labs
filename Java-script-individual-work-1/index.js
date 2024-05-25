class Transaction {
    constructor(data) {
        this.transaction_id = data.transaction_id;
        this.transaction_date = data.transaction_date;
        this.transaction_amount = data.transaction_amount.toString();
        this.transaction_type = data.transaction_type;
        this.transaction_description = data.transaction_description;
        this.merchant_name = data.merchant_name;
        this.card_type = data.card_type;
    }

     /**
     * Преобразует объект транзакции в строку JSON.
     * @returns {string}
     */
    string() {
        return JSON.stringify(this);
    }
}

class TransactionAnalyzer {
    constructor(transactions) {
        this.transactions = transactions.map(data => new Transaction(data));
    }

    /**
     * Добавляет новую транзакцию.
     * @param {Object} transaction - Данные транзакции.
     */
    addTransaction(transaction) {
        this.transactions.push(new Transaction(transaction));
    }

    /**
     * Возвращает все транзакции.
     * @returns {Transaction[]} Массив всех транзакций.
     */
    getAllTransaction() {
        return this.transactions;
    }

    /**
     * Возвращает уникальные типы транзакций.
     * @returns {string[]} Массив уникальных типов транзакций.
     */
    getUniqueTransactionType() {
        const SetOfTransactions = new Set();
        this.transactions.forEach(transactionType => {
            SetOfTransactions.add(transactionType.transaction_type);
        });
        return [...SetOfTransactions];
    }

    /**
     * Рассчитывает общую сумму всех транзакций.
     * @returns {number} Общая сумма всех транзакций.
     */
    calculateTotalAmount() {
        let totalSum = 0;
        this.transactions.forEach(transaction => {
            totalSum += parseFloat(transaction.transaction_amount);
        });
        return totalSum;
    }

    /**
     * Рассчитывает общую сумму транзакций за указанную дату.
     * @param {number} [year] - Год для фильтрации.
     * @param {number} [month] - Месяц для фильтрации.
     * @param {number} [day] - День для фильтрации.
     * @returns {number} Общая сумма транзакций за указанную дату.
     */
    calculateTotalAmountByDate(year, month, day) {
        let filteredTransactions = this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);

            if (year !== undefined && transactionDate.getFullYear() !== year) {
                return false;
            }

            if (month !== undefined && transactionDate.getMonth() + 1 !== month) {
                return false;
            }

            if (day !== undefined && transactionDate.getDate() !== day) {
                return false;
            }
            return true;
        });

        let totalSum = 0;
        filteredTransactions.forEach(transaction => {
            totalSum += parseFloat(transaction.transaction_amount);
        });

        return totalSum;
    }

    /**
     * Возвращает транзакции указанного типа.
     * @param {string} type - Тип транзакции.
     * @returns {Transaction[]} Массив транзакций указанного типа.
     */
    getTransactionByType(type) {
        let filteredTransactions = this.transactions.filter(transaction => {
            return transaction.transaction_type === type;
        });

        return filteredTransactions;
    }

    /**
     * Возвращает транзакции в указанном диапазоне дат.
     * @param {string} startDate - Начальная дата в формате YYYY-MM-DD.
     * @param {string} endDate - Конечная дата в формате YYYY-MM-DD.
     * @returns {Transaction[]} Массив транзакций в указанном диапазоне дат.
     */
    getTransactionsInDateRange(startDate, endDate) {

        const start = new Date(startDate);
        const end = new Date(endDate);

        let filteredTransactions = this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= start && transactionDate <= end;
        });

        return filteredTransactions;
    }

    /**
     * Возвращает транзакции по имени продавца.
     * @param {string} merchantName - Имя продавца.
     * @returns {Transaction[]} Массив транзакций указанного продавца.
     */
    getTransactionsByMerchant(merchantName) {
        let filteredTransactions = this.transactions.filter(transaction => {
            return transaction.merchant_name === merchantName;
        });

        return filteredTransactions;
    }

    /**
     * Рассчитывает среднюю сумму транзакций.
     * @returns {number} Средняя сумма транзакций.
     */
    calculateAverageTransactionAmount() {
        let sum = 0;
        let averageSum = 0;
        let count = 0;
        this.transactions.forEach(transaction => {
            sum += parseFloat(transaction.transaction_amount);
            count += 1;
        });
        averageSum = sum / count;
        return parseInt(averageSum);
    }

    /**
     * Возвращает транзакции в указанном диапазоне сумм.
     * @param {number} minAmount - Минимальная сумма.
     * @param {number} maxAmount - Максимальная сумма.
     * @returns {Transaction[]} Массив транзакций в указанном диапазоне сумм.
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        let filteredTransactions = this.transactions.filter(transaction => {
            const amount = parseFloat(transaction.transaction_amount);
            return amount >= minAmount && amount <= maxAmount;
        });

        return filteredTransactions;
    }

    /**
     * Рассчитывает общую сумму дебетовых транзакций.
     * @returns {number} Общая сумма дебетовых транзакций.
     */
    calculateTotalDebitAmount() {
        let totalDebitAmount = 0;

        this.transactions.forEach(transaction => {
            if (transaction.transaction_type === "debit") {
                totalDebitAmount += parseFloat(transaction.transaction_amount);
            }
        });

        return totalDebitAmount;
    }

    /**
     * Находит месяц с наибольшим количеством транзакций.
     * @returns {number} Месяц с наибольшим количеством транзакций (1-12).
     */
    findMostTransactionsMonth() {
        const transactionsByMonth = {};

        this.transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.transaction_date);

            const month = transactionDate.getMonth() + 1;

            if (transactionsByMonth[month]) {
                transactionsByMonth[month]++;
            } else {
                transactionsByMonth[month] = 1;
            }
        });

        let mostTransactionsMonth = 0;
        let maxTransactions = 0;
        for (const month in transactionsByMonth) {
            if (transactionsByMonth[month] > maxTransactions) {
                maxTransactions = transactionsByMonth[month];
                mostTransactionsMonth = month;
            }
        }


        return mostTransactionsMonth;
    }

    /**
     * Находит месяц с наибольшим количеством дебетовых транзакций.
     * @returns {number} Месяц с наибольшим количеством дебетовых транзакций (1-12).
     */
    findMostDebitTransactionMonth() {
        const debitTransactionsByMonth = {};

        this.transactions.forEach(transaction => {
            if (transaction.transaction_type === "debit") {
                const transactionDate = new Date(transaction.transaction_date);
                const month = transactionDate.getMonth() + 1;
                if (debitTransactionsByMonth[month]) {
                    debitTransactionsByMonth[month]++;
                } else {
                    debitTransactionsByMonth[month] = 1;
                }
            }
        });

        let mostDebitTransactionMonth = 0;
        let maxDebitTransactions = 0;

        for (const month in debitTransactionsByMonth) {
            if (debitTransactionsByMonth[month] > maxDebitTransactions) {
                maxDebitTransactions = debitTransactionsByMonth[month];
                mostDebitTransactionMonth = month;
            }
        }

        return mostDebitTransactionMonth;
    }

    /**
     * Определяет, какой тип транзакций чаще всего встречается.
     * @returns {string} 'debit', 'credit' или 'equal' в зависимости от типа транзакций.
     */
    mostTransactionTypes() {
        let debitCount = 0;
        let creditCount = 0;

        this.transactions.forEach(transaction => {
            if (transaction.transaction_type === "debit") {
                debitCount++;
            } else if (transaction.transaction_type === "credit") {
                creditCount++;
            }
        });

        if (debitCount > creditCount) {
            return "debit";
        } else if (creditCount > debitCount) {
            return "credit";
        } else {
            return "equal";
        }
    }

    /**
     * Возвращает транзакции до указанной даты.
     * @param {string} date - Дата в формате YYYY-MM-DD.
     * @returns {Transaction[]} Массив транзакций до указанной даты.
     */
    getTransactionsBeforeDate(date) {
        const dateType = new Date(date);

        const transactionsBeforeDate = this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate < dateType;
        });

        return transactionsBeforeDate;
    }

    /**
     * Находит транзакцию по идентификатору.
     * @param {string} id - Идентификатор транзакции.
     * @returns {Transaction|null} Найденная транзакция или null, если не найдена.
     */
    findTransactionById(id) {

        const foundedTransaction = this.transactions.find(transaction => {
            return transaction.transaction_id === id.toString();
        });

        return foundedTransaction;
    }

    /**
     * Возвращает массив описаний транзакций.
     * @returns {string[]} Массив описаний транзакций.
     */
    mapTransactionDescriptions() {
        const transactionDescriptions = this.transactions.map(transaction => {
            return transaction.transaction_description;
        });

        return transactionDescriptions;
    }
}

const transactions = require('./transactions.json');

const analyzer = new TransactionAnalyzer(transactions);

const transaction = {
    transaction_id: "1",
    transaction_date: "2019-01-01",
    transaction_amount: "100.00",
    transaction_type: "debit",
    transaction_description: "Payment for groceries",
    merchant_name: "SuperMart",
    card_type: "Visa",
}

analyzer.addTransaction(transaction);

console.log('Все транзакции:', analyzer.getAllTransaction());
console.log("----------------------------------------------------------------------------");

console.log('Массив всех типов транзакций:', analyzer.getUniqueTransactionType());
console.log("----------------------------------------------------------------------------");

console.log('Общая сумма всех транзакций:', analyzer.calculateTotalAmount());
console.log("----------------------------------------------------------------------------");

console.log('Общую сумму транзакций за указанный год, месяц и день:', analyzer.calculateTotalAmountByDate(2019, 3, 10));
console.log("----------------------------------------------------------------------------");

console.log('Транзакции указанного типа (debit или credit):', analyzer.getTransactionByType('debit'));
console.log("----------------------------------------------------------------------------");

console.log('Транзакции, в указанном диапазоне дат:', analyzer.getTransactionsInDateRange('2019-04-29', "2019-04-30"));
console.log("----------------------------------------------------------------------------");

console.log('Совершенные с указанным торговым местом или компанией:', analyzer.getTransactionsByMerchant('OfficeSupplyStoreABC'));
console.log("----------------------------------------------------------------------------");

console.log('Среднее значение транзакций:', analyzer.calculateAverageTransactionAmount());
console.log("----------------------------------------------------------------------------");

console.log('Транзакции с суммой в заданном диапазоне:', analyzer.getTransactionsByAmountRange(90, 100));
console.log("----------------------------------------------------------------------------");

console.log('Общая сумма дебетовых транзакций:', analyzer.calculateTotalDebitAmount());
console.log("----------------------------------------------------------------------------");

console.log('Месяц, в котором было больше всего транзакций:', analyzer.findMostTransactionsMonth());
console.log("----------------------------------------------------------------------------");

console.log('Месяц, в котором было больше дебетовых транзакций:', analyzer.findMostDebitTransactionMonth());
console.log("----------------------------------------------------------------------------");

console.log('Возвращает каких транзакций больше всего:', analyzer.mostTransactionTypes());
console.log("----------------------------------------------------------------------------");

console.log('Транзакции, совершенные до указанной даты:', analyzer.getTransactionsBeforeDate("2019-04-10"));
console.log("----------------------------------------------------------------------------");

console.log('Транзакция по ее уникальному идентификатору:', analyzer.findTransactionById(50));
console.log("----------------------------------------------------------------------------");

console.log('Массив, содержащий только описания транзакций:', analyzer.mapTransactionDescriptions());
console.log("----------------------------------------------------------------------------");









