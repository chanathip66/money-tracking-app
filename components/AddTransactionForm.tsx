import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../constants/colors';
import type { TransactionType } from '../types';
import { formatThaiDate } from '../utils/formatDate';

interface AddTransactionFormProps {
  type: TransactionType;
  onSubmit: (data: { description: string; amount: number }) => Promise<void>;
}

export function AddTransactionForm({ type, onSubmit }: AddTransactionFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<{ description?: string; amount?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const isIncome = type === 'income';
  const accent = isIncome ? colors.income : colors.expense;
  const accentLight = isIncome ? colors.incomeLight : colors.expenseLight;
  const headerLabel = isIncome ? 'บันทึกเงินเข้า' : 'บันทึกเงินออก';
  const descLabel = isIncome ? 'รายการเงินเข้า' : 'รายการเงินออก';
  const amountLabel = isIncome ? 'จำนวนเงินเข้า' : 'จำนวนเงินออก';
  const buttonLabel = isIncome ? 'บันทึกเงินเข้า' : 'บันทึกเงินออก';
  const headerIcon: keyof typeof Ionicons.glyphMap = isIncome
    ? 'arrow-down'
    : 'arrow-up';

  function validate(): boolean {
    const next: { description?: string; amount?: string } = {};

    if (!description.trim()) {
      next.description = 'กรุณากรอกรายการ';
    }

    const amountNum = Number(amount);
    if (!amount.trim()) {
      next.amount = 'กรุณากรอกจำนวนเงิน';
    } else if (isNaN(amountNum) || amountNum <= 0) {
      next.amount = 'จำนวนเงินต้องมากกว่า 0';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit({
        description: description.trim(),
        amount: Number(amount),
      });

      setDescription('');
      setAmount('');
      setErrors({});
      Alert.alert('สำเร็จ', `บันทึก${isIncome ? 'เงินเข้า' : 'เงินออก'}เรียบร้อยแล้ว`);
    } catch (e: any) {
      Alert.alert('เกิดข้อผิดพลาด', e?.message ?? 'ไม่สามารถบันทึกข้อมูลได้');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.headerIcon, { backgroundColor: accentLight }]}>
            <Ionicons name={headerIcon} size={20} color={accent} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>{headerLabel}</Text>
            <Text style={styles.headerDate}>{formatThaiDate(new Date())}</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>{descLabel}</Text>
          <View
            style={[
              styles.inputWrap,
              errors.description && styles.inputWrapError,
            ]}
          >
            <Ionicons
              name="document-text-outline"
              size={18}
              color={colors.textMuted}
            />
            <TextInput
              style={styles.input}
              placeholder="เช่น เงินเดือน, ค่าอาหาร"
              placeholderTextColor={colors.textMuted}
              value={description}
              onChangeText={setDescription}
            />
          </View>
          {errors.description && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle" size={12} color={colors.error} />
              <Text style={styles.errorText}>{errors.description}</Text>
            </View>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>{amountLabel}</Text>
          <View
            style={[
              styles.inputWrap,
              errors.amount && styles.inputWrapError,
            ]}
          >
            <Text style={styles.currency}>฿</Text>
            <TextInput
              style={[styles.input, styles.amountInput]}
              placeholder="0.00"
              placeholderTextColor={colors.textMuted}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
          </View>
          {errors.amount && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle" size={12} color={colors.error} />
              <Text style={styles.errorText}>{errors.amount}</Text>
            </View>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            (pressed || submitting) && styles.buttonPressed,
          ]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <LinearGradient
            colors={colors.primaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Ionicons
              name={submitting ? 'hourglass-outline' : 'checkmark-circle'}
              size={18}
              color="#fff"
            />
            <Text style={styles.buttonText}>
              {submitting ? 'กำลังบันทึก...' : buttonLabel}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  headerDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  field: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    backgroundColor: colors.background,
  },
  inputWrapError: {
    borderColor: colors.error,
    backgroundColor: '#FEF2F2',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  amountInput: {
    fontSize: 18,
    fontWeight: '600',
  },
  currency: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    marginLeft: 4,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
  },
  button: {
    borderRadius: 32,
    overflow: 'hidden',
    marginTop: 8,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  buttonPressed: {
    opacity: 0.92,
  },
  buttonGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});
