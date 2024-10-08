import TopBar from "@/components/TopBar";
import { Slot, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LayoutTeam() {
  return (
    <SafeAreaView>
      <TopBar title="Crear un equipo" />
      <Slot />
    </SafeAreaView>
  );
}
