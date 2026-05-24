import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../constants/colors';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Money Tracking</Text>
        <Text style={styles.subtitle}>รายรับรายจ่ายของฉัน</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.credit}>Created by Chanatip Chueycherm</Text>
        <Text style={styles.credit}>6852D10005</Text>
        <Text style={styles.creditSmall}>- SAU -</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 64,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textOnPrimary,
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textOnPrimary,
    fontSize: 16,
    marginTop: 8,
    opacity: 0.95,
  },
  footer: {
    alignItems: 'center',
  },
  credit: {
    color: '#FFEB3B',
    fontSize: 14,
    fontWeight: '600',
  },
  creditSmall: {
    color: '#FFEB3B',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    opacity: 0.85,
  },
});
