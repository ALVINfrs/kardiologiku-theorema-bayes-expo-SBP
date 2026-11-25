import { Tabs } from 'expo-router';
import {
  Activity,
  BookOpen,
  HeartPulse,
  House,
  User,
} from 'lucide-react-native';
import { useTema } from '../../src/ui/useTema';

// Ikon tab DESIGN §11, ukuran 24, stroke 1.75.
export default function TabLayout() {
  const warna = useTema();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: warna.trace,
        tabBarInactiveTintColor: warna.inkMuted,
        tabBarLabelStyle: {
          fontFamily: 'InstrumentSans_500Medium',
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: warna.surface,
          borderTopColor: warna.line,
          borderTopWidth: 1.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => (
            <House size={24} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="simulasi"
        options={{
          title: 'Simulasi',
          tabBarIcon: ({ color }) => (
            <Activity size={24} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="deteksi"
        options={{
          title: 'Deteksi',
          tabBarIcon: ({ color }) => (
            <HeartPulse size={24} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="edukasi"
        options={{
          title: 'Edukasi',
          tabBarIcon: ({ color }) => (
            <BookOpen size={24} color={color} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <User size={24} color={color} strokeWidth={1.75} />
          ),
        }}
      />
    </Tabs>
  );
}
