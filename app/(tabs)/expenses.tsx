import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddTransactionForm } from '../../components/AddTransactionForm';
import { BalanceCard } from '../../components/BalanceCard';
import { colors } from '../../constants/colors';
import { useBalance } from '../../hooks/useBalance';
import { useTransactions } from '../../hooks/useTransactions';

export default function ExpensesScreen() {
  const { data, create } = useTransactions();
  const { balance, income, expense } = useBalance(data);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <BalanceCard balance={balance} income={income} expense={expense} />
        <AddTransactionForm
          type="expense"
          onSubmit={async ({ description, amount }) => {
            await create({ type: 'expense', description, amount });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
