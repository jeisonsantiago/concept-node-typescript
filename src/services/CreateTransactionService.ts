import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// SERVICES CHECK THE BUSINESS RULES!!!

interface Request{
  title:string;
  value:number;
  type:'income'|'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}:Request): Transaction {
    
    // if it's outcome, check if we have enough funds    
    if(type == 'outcome'){
      if(this.transactionsRepository.getBalance().total < value){
        throw Error('Not sufficient funds.');
      }
    }

    const transaction = this.transactionsRepository.create({title:title,value:value,type:type});
    return transaction;
  }
}

export default CreateTransactionService;
