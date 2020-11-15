import Transaction from '../models/Transaction';


interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];
  //private balance: Balance;

  constructor() {
    this.transactions = [];
    //this.balance = { income: 0, outcome: 0, total: 0 };
  }


  public getBalance(): Balance {
    
    const balance: Balance = { income: 0, outcome: 0, total: 0 };

    this.transactions.forEach((transaction)=>{
      balance.income += (transaction.type === 'income')?transaction.value:0;
      balance.outcome += (transaction.type === 'outcome')?transaction.value:0;
      balance.total = (balance.income - balance.outcome);
    })

    return balance;

  }

  public all(): Transaction[] {
    return this.transactions;
  }


  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title: title, value: value, type: type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
