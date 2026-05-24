import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

interface EmptyStateProps {
  onAddIncome: () => void;
  onAddExpense: () => void;
}

export function EmptyState({ onAddIncome, onAddExpense }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.illustration}>
        <View style={styles.bgRing1} />
        <View style={styles.bgRing2} />

        <View style={styles.iconCircle}>
          <Ionicons name="wallet" size={56} color={colors.primary} />
        </View>

        <View style={[styles.floatBadge, styles.badge1]}>
          <Ionicons name="trending-up" size={16} color={colors.income} />
        </View>
        <View style={[styles.floatBadge, styles.badge2]}>
          <Ionicons name="cash" size={16} color={colors.warning} />
        </View>
        <View style={[styles.floatBadge, styles.badge3]}>
          <Ionicons name="card" size={16} color={colors.expense} />
        </View>
      </View>

      <Text style={styles.title}>เริ่มต้นการเงินที่ดี</Text>
      <Text style={styles.subtitle}>
        บันทึกรายการแรกเพื่อเริ่มติดตาม{'\n'}
        รายรับรายจ่ายของคุณ
      </Text>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={onAddIncome}
        >
          <LinearGradient
            colors={colors.primaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.ctaText}>เพิ่มรายการแรก</Text>
          </LinearGradient>
        </Pressable>

        <View style={styles.secondaryRow}>
          <Pressable style={styles.secondary} onPress={onAddIncome}>
            <View
              style={[styles.secondaryIcon, { backgroundColor: colors.incomeLight }]}
            >
              <Ionicons name="arrow-down" size={16} color={colors.income} />
            </View>
            <Text style={styles.secondaryText}>เงินเข้า</Text>
          </Pressable>
          <Pressable style={styles.secondary} onPress={onAddExpense}>
            <View
              style={[styles.secondaryIcon, { backgroundColor: colors.expenseLight }]}
            >
              <Ionicons name="arrow-up" size={16} color={colors.expense} />
            </View>
            <Text style={styles.secondaryText}>เงินออก</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.tipCard}>
        <View style={styles.tipIcon}>
          <Ionicons name="bulb" size={18} color={colors.warning} />
        </View>
        <View style={styles.tipBody}>
          <Text style={styles.tipTitle}>รู้หรือไม่?</Text>
          <Text style={styles.tipText}>
            คนที่บันทึกรายจ่ายสม่ำเสมอ ประหยัดเงินได้มากกว่าคนทั่วไป 23%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: 'center',
  },
  illustration: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  bgRing1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.accentLight,
    opacity: 0.6,
  },
  bgRing2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.accentLight,
    opacity: 1,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  floatBadge: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  badge1: {
    top: 10,
    right: 12,
  },
  badge2: {
    bottom: 28,
    left: 6,
  },
  badge3: {
    bottom: 12,
    right: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  actions: {
    width: '100%',
    marginTop: 28,
    gap: 12,
  },
  cta: {
    borderRadius: 32,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  ctaPressed: {
    opacity: 0.92,
  },
  ctaGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    borderRadius: 32,
  },
  secondaryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 16,
    padding: 14,
    marginTop: 24,
    width: '100%',
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipBody: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  tipText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
