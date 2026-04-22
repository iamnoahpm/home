import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Headphones, Mic, BookOpen, GraduationCap, Home } from 'lucide-react-native';
import { COLORS } from '../../src/utils/colors';

interface TabIconProps {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
}

function TabIcon({ icon, label, focused }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      {icon}
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<Home size={22} color={focused ? COLORS.primary : COLORS.gray400} />}
              label="Trang chủ"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="listening"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<Headphones size={22} color={focused ? COLORS.primary : COLORS.gray400} />}
              label="Nghe"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="speaking"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<Mic size={22} color={focused ? COLORS.primary : COLORS.gray400} />}
              label="Nói"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="vocabulary"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<BookOpen size={22} color={focused ? COLORS.primary : COLORS.gray400} />}
              label="Từ vựng"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="grammar"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={<GraduationCap size={22} color={focused ? COLORS.primary : COLORS.gray400} />}
              label="Ngữ pháp"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.gray400,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: COLORS.primary,
  },
});
