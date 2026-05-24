import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BalanceCard } from '../../components/BalanceCard';
import { EmptyState } from '../../components/EmptyState';
import { TransactionItem } from '../../components/TransactionItem';
import { colors } from '../../constants/colors';
import { useBalance } from '../../hooks/useBalance';
import { useTransactions } from '../../hooks/useTransactions';

interface QuickActionProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
}

function QuickAction({ icon, label, color, onPress }: QuickActionProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
      onPress={onPress}
    >
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={22} color="#fff" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { data, loading, error, refetch } = useTransactions();
  const { balance, income, expense } = useBalance(data);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <>
            <BalanceCard balance={balance} income={income} expense={expense} />

            <View style={styles.actionsRow}>
              <QuickAction
                icon="arrow-down"
                label="เงินเข้า"
                color={colors.income}
                onPress={() => router.push('/income')}
              />
              <QuickAction
                icon="arrow-up"
                label="เงินออก"
                color={colors.expense}
                onPress={() => router.push('/expenses')}
              />
              <QuickAction
                icon="stats-chart"
                label="สถิติ"
                color={colors.warning}
                onPress={() => {}}
              />
              <QuickAction
                icon="ellipsis-horizontal"
                label="เพิ่มเติม"
                color={colors.textSecondary}
                onPress={() => {}}
              />
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>รายการล่าสุด</Text>
              <Pressable hitSlop={8}>
                <Text style={styles.sectionLink}>ดูทั้งหมด</Text>
              </Pressable>
            </View>
          </>
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.empty}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : error ? (
            <View style={styles.empty}>
              <Ionicons name="alert-circle-outline" size={40} color={colors.error} />
              <Text style={styles.errorText}>เกิดข้อผิดพลาด</Text>
              <Text style={styles.errorDetail}>{error}</Text>
            </View>
          ) : (
            <EmptyState
              onAddIncome={() => router.push('/income')}
              onAddExpense={() => router.push('/expenses')}
            />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        contentContainerStyle={[
          styles.listContent,
          data.length === 0 && styles.flexFill,
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 24,
  },
  flexFill: {
    flexGrow: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 18,
    borderRadius: 20,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  action: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  actionPressed: {
    opacity: 0.7,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  sectionLink: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 8,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  emptyHint: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  errorDetail: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
});
