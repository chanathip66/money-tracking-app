export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  created_at: string;
}

export type NewTransaction = Pick<Transaction, 'type' | 'amount' | 'description'> & {
  date?: string;
};
