import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import type { Transaction } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { formatThaiDateShort } from '../utils/formatDate';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  const iconName: keyof typeof Ionicons.glyphMap = isIncome
    ? 'arrow-down'
    : 'arrow-up';
  const accent = isIncome ? colors.income : colors.expense;
  const accentLight = isIncome ? colors.incomeLight : colors.expenseLight;
  const sign = isIncome ? '+' : '-';

  return (
    <View style={styles.row}>
      <View style={[styles.iconBox, { backgroundColor: accentLight }]}>
        <Ionicons name={iconName} size={18} color={accent} />
      </View>

      <View style={styles.body}>
        <Text style={styles.description} numberOfLines={1}>
          {transaction.description}
        </Text>
        <Text style={styles.date}>
          {formatThaiDateShort(transaction.date)}
        </Text>
      </View>

      <Text style={[styles.amount, { color: accent }]}>
        {sign} {formatCurrency(Number(transaction.amount))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
    backgroundColor: colors.surface,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  description: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
