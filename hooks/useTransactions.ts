import { useCallback, useEffect, useState } from 'react';
import { addTransaction, getTransactions } from '../services/supabase';
import type { NewTransaction, Transaction } from '../types';

export function useTransactions() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
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
    fetch();
  }, [fetch]);

  const create = useCallback(
    async (input: NewTransaction) => {
      const row = await addTransaction(input);
      setData((prev) => [row, ...prev]);
      return row;
    },
    []
  );

  return { data, loading, error, refetch: fetch, create };
}
