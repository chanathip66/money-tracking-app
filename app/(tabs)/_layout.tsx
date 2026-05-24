import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';

interface TabIconProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  focused: boolean;
}

function TabIcon({ icon, label, focused }: TabIconProps) {
  const color = focused ? colors.primary : colors.textSecondary;
  return (
    <View style={styles.tabItem}>
      <Ionicons name={icon} size={24} color={color} />
      <Text
        numberOfLines={1}
        style={[
          styles.label,
          { color },
          focused && styles.labelFocused,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function CenterTabIcon({ focused }: { focused: boolean }) {
  return (
    <View style={styles.centerWrap}>
      <View style={[styles.centerCircle, focused && styles.centerCircleFocused]}>
        <Ionicons name="home" size={26} color={colors.textOnPrimary} />
      </View>
      <Text
        numberOfLines={1}
        style={[
          styles.label,
          { color: focused ? colors.primary : colors.textSecondary },
          focused && styles.labelFocused,
        ]}
      >
        หน้าหลัก
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="expenses"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="arrow-up-circle-outline" label="เงินออก" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => <CenterTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="income"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="arrow-down-circle-outline" label="เงินเข้า" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    height: 72,
    paddingTop: 8,
    paddingBottom: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  tabBarItem: {
    paddingVertical: 4,
  },
  tabItem: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  labelFocused: {
    fontWeight: '700',
  },
  centerWrap: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
  },
  centerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.background,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  centerCircleFocused: {
    backgroundColor: colors.primaryDark,
  },
});
