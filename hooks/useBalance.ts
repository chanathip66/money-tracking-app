import { useMemo } from 'react';
import type { Transaction } from '../types';

export function useBalance(transactions: Transaction[]) {
  return useMemo(() => {
    let income = 0;
    let expense = 0;

    for (const t of transactions) {
      const amount = Number(t.amount);
      if (t.type === 'income') income += amount;
      else expense += amount;
    }

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);
}
