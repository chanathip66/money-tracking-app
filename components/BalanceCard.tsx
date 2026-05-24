import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { formatCurrency } from '../utils/formatCurrency';

interface BalanceCardProps {
  name?: string;
  avatarUrl?: string;
  balance: number;
  income: number;
  expense: number;
}

export function BalanceCard({
  name = 'Chanatip Chueycherm',
  avatarUrl,
  balance,
  income,
  expense,
}: BalanceCardProps) {
  const [hidden, setHidden] = useState(false);

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />

        <View style={styles.header}>
          <View style={styles.userInfo}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>
                  {name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View>
              <Text style={styles.greeting}>สวัสดี</Text>
              <Text style={styles.name} numberOfLines={1}>{name}</Text>
            </View>
          </View>

          <Pressable hitSlop={8} style={styles.bell}>
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.balanceBox}>
          <View style={styles.balanceLabelRow}>
            <Text style={styles.balanceLabel}>ยอดเงินคงเหลือ</Text>
            <Pressable hitSlop={10} onPress={() => setHidden((h) => !h)}>
              <Ionicons
                name={hidden ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color="rgba(255,255,255,0.85)"
              />
            </Pressable>
          </View>
          <Text style={styles.balanceValue}>
            {hidden ? '••••••' : `฿ ${formatCurrency(balance)}`}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCol}>
            <View style={styles.summaryHeader}>
              <View style={styles.summaryIcon}>
                <Ionicons name="arrow-down" size={12} color={colors.income} />
              </View>
              <Text style={styles.summaryLabel}>เงินเข้า</Text>
            </View>
            <Text style={styles.summaryValue}>
              {hidden ? '••••' : formatCurrency(income)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryCol}>
            <View style={styles.summaryHeader}>
              <View style={styles.summaryIcon}>
                <Ionicons name="arrow-up" size={12} color={colors.expense} />
              </View>
              <Text style={styles.summaryLabel}>เงินออก</Text>
            </View>
            <Text style={styles.summaryValue}>
              {hidden ? '••••' : formatCurrency(expense)}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  bgCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.08)',
    right: -60,
    top: -60,
  },
  bgCircle2: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.06)',
    left: -40,
    bottom: -40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  greeting: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
  },
  name: {
    color: colors.textOnPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceBox: {
    marginBottom: 20,
  },
  balanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  balanceValue: {
    color: colors.textOnPrimary,
    fontSize: 32,
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 14,
  },
  summaryCol: {
    flex: 1,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '500',
  },
  summaryValue: {
    color: colors.textOnPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 6,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 12,
  },
});
