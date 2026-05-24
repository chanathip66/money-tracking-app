import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TransactionsProvider } from '../hooks/useTransactions';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TransactionsProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </TransactionsProvider>
    </SafeAreaProvider>
  );
}
