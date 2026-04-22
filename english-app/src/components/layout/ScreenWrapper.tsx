import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

interface Props {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: object;
}

export function ScreenWrapper({ children, scrollable = true, style }: Props) {
  const content = scrollable ? (
    <ScrollView contentContainerStyle={[styles.scrollContent, style]} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.fill, style]}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.screenBg },
  scrollContent: { paddingBottom: 24, flexGrow: 1 },
  fill: { flex: 1 },
});
