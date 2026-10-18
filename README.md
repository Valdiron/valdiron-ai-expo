# Valdiron AI Studio — Expo

Aplicativo Android em React Native/Expo para o Valdiron AI Studio.

## Estado atual
- Interface inicial em português.
- Modos visuais: gerar imagem, gerar vídeo, recriar dança e trocar fundo.
- Seleção de imagem/vídeo do dispositivo.
- Configuração de build APK pelo Expo Application Services (EAS).

**Importante:** esta versão é uma base inicial. Os botões de criação ainda não geram mídia real. A integração Higgsfield e/ou outro provedor deve acontecer por um backend seguro. Nunca inclua chaves privadas em arquivos do aplicativo ou no GitHub.

## Requisitos
- Node.js LTS e npm
- Conta Expo para usar o EAS Build

## Rodar localmente
```bash
npm install
npx expo-doctor
npx expo start
```

## Criar APK Android
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

O perfil `preview` em `eas.json` está configurado para gerar um APK instalável. O EAS Build exige autenticação da conta Expo.

## Arquitetura e próximos passos
O projeto original no Lovable é uma aplicação web e não foi importado automaticamente. Esta pasta contém uma adaptação inicial da interface para React Native. Para completar o produto, será necessário migrar as telas e conectar um backend autenticado, com armazenamento seguro das credenciais e acompanhamento do estado das gerações.
