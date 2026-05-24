import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

interface FeatureItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  color: string;
}

function FeatureItem({ icon, text, color }: FeatureItemProps) {
  return (
    <View style={styles.feature}>
      <View style={[styles.featureIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={[colors.primaryLight + '30', colors.background]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.heroWrap, { paddingTop: insets.top }]}>
        <View style={styles.heroIconStack}>
          <View style={[styles.coin, styles.coin1]}>
            <Ionicons name="logo-bitcoin" size={26} color="#F59E0B" />
          </View>
          <View style={[styles.coin, styles.coin2]}>
            <Text style={styles.coinText}>$</Text>
          </View>
          <View style={styles.heroCircle}>
            <Ionicons name="wallet" size={84} color={colors.primary} />
          </View>
        </View>
      </View>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.title}>บันทึกรายรับรายจ่าย</Text>
        <Text style={styles.subtitle}>
          จัดการเงินของคุณให้เป็นระเบียบ ในแอพเดียว
        </Text>

        <View style={styles.features}>
          <FeatureItem
            icon="trending-up"
            text="ติดตามรายรับรายจ่าย"
            color={colors.income}
          />
          <FeatureItem
            icon="bar-chart"
            text="ดูสถิติย้อนหลัง"
            color={colors.warning}
          />
          <FeatureItem
            icon="shield-checkmark"
            text="ข้อมูลปลอดภัย"
            color={colors.primary}
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => router.replace('/home')}
        >
          <LinearGradient
            colors={colors.primaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>เริ่มใช้งานแอพพลิเคชัน</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconStack: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  coin: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 2,
  },
  coin1: {
    top: 10,
    right: 0,
  },
  coin2: {
    bottom: 30,
    left: 5,
    backgroundColor: colors.income,
  },
  coinText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  bottom: {
    paddingHorizontal: 28,
    paddingTop: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  features: {
    gap: 12,
    marginBottom: 28,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  button: {
    borderRadius: 32,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  buttonPressed: {
    opacity: 0.92,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
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
