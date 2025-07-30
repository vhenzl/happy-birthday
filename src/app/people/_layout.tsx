import { Stack } from 'expo-router';

export default function PeopleLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'People' }} />
    </Stack>
  );
}
