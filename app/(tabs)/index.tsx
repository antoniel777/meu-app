import Clima from "@/components/clima";
import EventoLista from "@/components/evento-lista";
import Eventoitem from "@/components/evento-item";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native"; 
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  
  const onPress = () => {
    router.navigate("/modal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Clima />
      <Text style={styles.titulo}>Próximos eventos</Text>
      <EventoLista /> 
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    marginTop: 40,
    fontSize: 32,
    fontWeight: "700",
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 1,
    backgroundColor: "#007AFF",
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});