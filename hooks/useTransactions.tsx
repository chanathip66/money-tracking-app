import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { addTransaction, getTransactions } from '../services/supabase';
import type { NewTransaction, Transaction } from '../types';

interface TransactionsContextValue {
  data: Transaction[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (input: NewTransaction) => Promise<Transaction>;
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setError(null);
      const rows = await getTransactions();
      setData(rows);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const create = useCallback(async (input: NewTransaction) => {
    const row = await addTransaction(input);
    setData((prev) => [row, ...prev]);
    return row;
  }, []);

  return (
    <TransactionsContext.Provider value={{ data, loading, error, refetch, create }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error('useTransactions must be used within TransactionsProvider');
  }
  return ctx;
}
