import { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, Image, ActivityIndicator, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const MODES = [
  { id: "imagem", title: "Gerar imagem", icon: "✦", description: "Crie imagens a partir de um prompt" },
  { id: "video", title: "Gerar vídeo", icon: "▶", description: "Transforme ideias em vídeos" },
  { id: "danca", title: "Recriar dança", icon: "♫", description: "Use um vídeo como referência de movimento" },
  { id: "fundo", title: "Trocar fundo", icon: "▧", description: "Prepare uma imagem ou vídeo para editar" }
] as const;

type Mode = typeof MODES[number]["id"];

export default function HomeScreen() {
  const [mode, setMode] = useState<Mode>("imagem");
  const [prompt, setPrompt] = useState("");
  const [asset, setAsset] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [busy, setBusy] = useState(false);

  async function pickMedia() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled && result.assets.length) setAsset(result.assets[0]);
  }

  async function startGeneration() {
    if (!prompt.trim() && mode !== "fundo") {
      Alert.alert("Adicione uma descrição", "Escreva o que você quer criar antes de continuar.");
      return;
    }
    setBusy(true);
    try {
      // UI scaffold only: connect this action to a secured backend before enabling real generation.
      Alert.alert(
        "Projeto em preparação",
        "A interface Expo está pronta para evoluir. A geração real precisa de um backend conectado à API Higgsfield; as chaves secretas não devem ficar dentro do aplicativo."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <View style={s.header}>
        <View style={s.logo}><Text style={s.logoText}>V</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={s.brand}>VALDIRON <Text style={s.brandAccent}>AI</Text></Text>
          <Text style={s.subBrand}>STUDIO · CRIAÇÃO COM IA</Text>
        </View>
        <View style={s.status}><View style={s.dot}/><Text style={s.statusText}>EXPO</Text></View>
      </View>

      <View style={s.hero}>
        <Text style={s.eyebrow}>SEU ESTÚDIO CRIATIVO</Text>
        <Text style={s.title}>Transforme ideias{"\n"}em <Text style={s.gradientText}>conteúdo.</Text></Text>
        <Text style={s.heroText}>Crie imagens e vídeos, recrie danças e explore novas possibilidades com inteligência artificial.</Text>
      </View>

      <Text style={s.sectionTitle}>O que vamos criar?</Text>
      <View style={s.grid}>
        {MODES.map((item) => {
          const selected = mode === item.id;
          return (
            <Pressable key={item.id} onPress={() => setMode(item.id)} style={[s.modeCard, selected && s.modeCardSelected]}>
              <View style={[s.modeIcon, selected && s.modeIconSelected]}><Text style={s.modeIconText}>{item.icon}</Text></View>
              <Text style={s.modeTitle}>{item.title}</Text>
              <Text style={s.modeDescription}>{item.description}</Text>
              {selected && <Text style={s.selectedLabel}>SELECIONADO ✓</Text>}
            </Pressable>
          );
        })}
      </View>

      <View style={s.panel}>
        <Text style={s.panelTitle}>Descreva sua criação</Text>
        <Text style={s.panelHelp}>Modo: {MODES.find(m => m.id === mode)?.title}</Text>
        <TextInput
          value={prompt}
          onChangeText={setPrompt}
          placeholder={mode === "danca" ? "Ex.: recriar os movimentos mantendo a aparência..." : "Descreva o resultado que você imagina..."}
          placeholderTextColor="#75809A"
          multiline
          style={s.input}
          textAlignVertical="top"
        />
        <Pressable onPress={pickMedia} style={s.upload}>
          {asset?.uri ? (
            <View style={s.assetRow}>
              {asset.type === "image" ? <Image source={{ uri: asset.uri }} style={s.thumb} /> : <View style={s.videoThumb}><Text style={s.modeIconText}>▶</Text></View>}
              <View style={{ flex: 1 }}><Text style={s.uploadTitle}>Arquivo selecionado</Text><Text style={s.uploadHelp} numberOfLines={1}>{asset.fileName ?? asset.uri.split("/").pop()}</Text></View>
              <Text style={s.remove} onPress={() => setAsset(null)}>×</Text>
            </View>
          ) : (
            <>
              <Text style={s.uploadIcon}>＋</Text>
              <Text style={s.uploadTitle}>Adicionar imagem ou vídeo</Text>
              <Text style={s.uploadHelp}>Escolha uma referência no seu dispositivo</Text>
            </>
          )}
        </Pressable>
        <Pressable onPress={startGeneration} disabled={busy} style={[s.primaryButton, busy && { opacity: 0.65 }]}>
          {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={s.primaryButtonText}>✦  Preparar criação</Text>}
        </Pressable>
        <Text style={s.disclaimer}>Versão inicial Expo. A geração real será ativada após conectar o backend e configurar as credenciais com segurança.</Text>
      </View>

      <View style={s.footer}><Text style={s.footerBrand}>VALDIRON AI STUDIO</Text><Text style={s.footerText}>Feito para dar vida à sua criatividade.</Text></View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#090D16" },
  content: { padding: 20, paddingTop: 24, paddingBottom: 48, maxWidth: 680, width: "100%", alignSelf: "center" },
  header: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 34 },
  logo: { width: 46, height: 46, borderRadius: 15, backgroundColor: "#18294A", borderWidth: 1, borderColor: "#3B82F6", alignItems: "center", justifyContent: "center" },
  logoText: { color: "#8AB4FF", fontSize: 27, fontWeight: "900" },
  brand: { color: "#F5F7FF", fontSize: 17, fontWeight: "900", letterSpacing: 1.6 },
  brandAccent: { color: "#8B5CF6" },
  subBrand: { color: "#7F8BA6", fontSize: 9, letterSpacing: 1.5, marginTop: 3 },
  status: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20, backgroundColor: "#121B2C" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#22C55E" },
  statusText: { color: "#A9B6D0", fontSize: 10, fontWeight: "700" },
  hero: { marginBottom: 28 },
  eyebrow: { color: "#8B5CF6", fontSize: 11, fontWeight: "800", letterSpacing: 2, marginBottom: 12 },
  title: { color: "#F8FAFF", fontSize: 36, lineHeight: 42, fontWeight: "900", letterSpacing: -1 },
  gradientText: { color: "#60A5FA" },
  heroText: { color: "#A0ABC2", fontSize: 14, lineHeight: 22, marginTop: 14, maxWidth: 440 },
  sectionTitle: { color: "#F1F5FF", fontSize: 17, fontWeight: "800", marginBottom: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 24 },
  modeCard: { width: "48%", flexGrow: 1, minWidth: 140, padding: 15, borderRadius: 18, backgroundColor: "#101725", borderWidth: 1, borderColor: "#202B40", minHeight: 164 },
  modeCardSelected: { borderColor: "#6D66E8", backgroundColor: "#151B31" },
  modeIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#1B263A", alignItems: "center", justifyContent: "center", marginBottom: 13 },
  modeIconSelected: { backgroundColor: "#2A2A57" },
  modeIconText: { color: "#B8B8FF", fontSize: 20, fontWeight: "700" },
  modeTitle: { color: "#F3F6FF", fontSize: 14, fontWeight: "800", marginBottom: 6 },
  modeDescription: { color: "#8E9AB3", fontSize: 11, lineHeight: 16 },
  selectedLabel: { color: "#A5A4FF", fontSize: 9, fontWeight: "800", marginTop: 10 },
  panel: { borderRadius: 22, padding: 18, backgroundColor: "#101725", borderWidth: 1, borderColor: "#202B40" },
  panelTitle: { color: "#F3F6FF", fontSize: 18, fontWeight: "800" },
  panelHelp: { color: "#8E9AB3", fontSize: 12, marginTop: 5, marginBottom: 16 },
  input: { minHeight: 110, borderRadius: 14, borderWidth: 1, borderColor: "#2A354B", backgroundColor: "#0B111D", color: "#F3F6FF", padding: 14, fontSize: 14, lineHeight: 20 },
  upload: { borderRadius: 14, borderWidth: 1, borderStyle: "dashed", borderColor: "#3A4660", padding: 18, marginTop: 14, alignItems: "center", justifyContent: "center", minHeight: 112 },
  uploadIcon: { color: "#9B8BFF", fontSize: 26, marginBottom: 5 },
  uploadTitle: { color: "#E7ECF8", fontWeight: "700", fontSize: 13 },
  uploadHelp: { color: "#8692AB", fontSize: 11, marginTop: 4 },
  assetRow: { width: "100%", flexDirection: "row", alignItems: "center", gap: 12 },
  thumb: { width: 54, height: 54, borderRadius: 10, backgroundColor: "#202B40" },
  videoThumb: { width: 54, height: 54, borderRadius: 10, backgroundColor: "#202B40", alignItems: "center", justifyContent: "center" },
  remove: { color: "#FCA5A5", fontSize: 25, paddingHorizontal: 5 },
  primaryButton: { backgroundColor: "#4F46E5", borderRadius: 14, minHeight: 52, alignItems: "center", justifyContent: "center", marginTop: 16 },
  primaryButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  disclaimer: { color: "#7E8AA4", fontSize: 10, lineHeight: 15, marginTop: 12, textAlign: "center" },
  footer: { alignItems: "center", marginTop: 30 },
  footerBrand: { color: "#6C7A96", fontSize: 10, fontWeight: "900", letterSpacing: 2 },
  footerText: { color: "#6C7A96", fontSize: 11, marginTop: 5 }
});