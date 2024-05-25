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

    string() {
        return JSON.stringify(this);
    }
}

class TransactionAnalyzer {
    constructor(transactions) {
        this.transactions = transactions.map(data => new Transaction(data));
    }

    addTransaction(transaction) {
        this.transactions.push(new Transaction(transaction));
    }

    getAllTransaction() {
        return this.transactions;
    }
    getUniqueTransactionType() {
        const SetOfTransactions = new Set();
        this.transactions.forEach(transactionType => {
            SetOfTransactions.add(transactionType.transaction_type);
        });
        return [...SetOfTransactions];
    }

    calculateTotalAmount() {
        let totalSum = 0;
        this.transactions.forEach(transaction => {
            totalSum += parseFloat(transaction.transaction_amount);
        });
        return totalSum;
    }

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

    getTransactionByType(type) {
        let filteredTransactions = this.transactions.filter(transaction => {
            return transaction.transaction_type === type;
        });

        return filteredTransactions;
    }
    getTransactionsInDateRange(startDate, endDate) {

        const start = new Date(startDate);
        const end = new Date(endDate);

        let filteredTransactions = this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= start && transactionDate <= end;
        });

        return filteredTransactions;
    }

    getTransactionsByMerchant(merchantName) {
        let filteredTransactions = this.transactions.filter(transaction => {
            return transaction.merchant_name === merchantName;
        });

        return filteredTransactions;
    }

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
    getTransactionsByAmountRange(minAmount, maxAmount) {
        let filteredTransactions = this.transactions.filter(transaction => {
            const amount = parseFloat(transaction.transaction_amount);
            return amount >= minAmount && amount <= maxAmount;
        });

        return filteredTransactions;
    }
    calculateTotalDebitAmount() {
        let totalDebitAmount = 0;

        this.transactions.forEach(transaction => {
            if (transaction.transaction_type === "debit") {
                totalDebitAmount += parseFloat(transaction.transaction_amount);
            }
        });

        return totalDebitAmount;
    }
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

        // Сравниваем количество дебетовых и кредитовых транзакций
        if (debitCount > creditCount) {
            return "debit";
        } else if (creditCount > debitCount) {
            return "credit";
        } else {
            return "equal";
        }
    }
    getTransactionsBeforeDate(date) {
        const dateType = new Date(date);

        const transactionsBeforeDate = this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate < dateType;
        });

        return transactionsBeforeDate;
    }

    findTransactionById(id) {

        const foundedTransaction = this.transactions.find(transaction => {
            return transaction.transaction_id === id.toString();
        });

        return foundedTransaction;
    }
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

// console.log('Все транзакции:', analyzer.getAllTransaction());
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









