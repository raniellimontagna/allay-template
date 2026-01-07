# 📊 Coverage Analysis

## Status Atual

| Métrica | Cobertura |
|---------|-----------|
| **Statements** | 51.43% |
| **Branches** | 50.00% |
| **Functions** | 47.28% |
| **Lines** | 50.68% |

---

## ✅ Módulos com Boa Cobertura

| Arquivo | Lines | Status |
|---------|-------|--------|
| `utils/storage.ts` | 100% | ✅ Completo |
| `stores/appStore/appStore.ts` | 100% | ✅ Completo |
| `hooks/useLoadFonts.ts` | 100% | ✅ Completo |
| `hooks/useNetwork.ts` | 100% | ✅ Bom |
| `hooks/useHaptics.ts` | 100% | ✅ Bom |
| `services/user/userService.ts` | 100% | ✅ Completo |
| `hooks/useApi/useApi.ts` | 100% | ✅ Completo |
| `components/ui/offlineBanner` | 100% | ✅ Completo |
| `components/ui/loading` | 100% | ✅ Completo |
| `components/ui/animatedScaleButton` | 100% | ✅ Completo |
| `components/ui/bottomSheet/useBottomSheet` | 100% | ✅ Completo |
| `features/settings/settingsItem` | 100% | ✅ Completo |
| `features/settings/settingsGroup` | 100% | ✅ Completo |

---

## 🎯 Gaps de Alta Prioridade

### 1. ~~`services/api/apiClient.ts`~~ - ✅ 100%
- [x] Token management
- [x] Métodos HTTP (get, post, put, patch, delete)
- [x] Interceptors de erro
- [x] 401 handling

### 2. ~~`hooks/useApi/useApi.ts`~~ - ✅ 100%
- [x] useApiQuery, usePaginatedQuery
- [x] useApiMutation, useApiUpdateMutation, useApiDeleteMutation
- [x] useInvalidateQueries

### 3. `services/user/useUser.ts` - 0%
- [ ] useCurrentUser, useUser, useUsers
- [ ] useCreateUser, useUpdateUser, useDeleteUser

---

## 📋 Plano de Ação

### Fase 1: Quick Wins (apiClient)
- [ ] Mock axios
- [ ] Testar métodos HTTP
- [ ] Testar error interceptor

### Fase 2: Infraestrutura React Query
- [ ] QueryClientProvider em test-utils
- [ ] Mock reutilizável do api client

### Fase 3: Hooks React Query
- [ ] useApi hooks
- [ ] useUser hooks

### Fase 4: UI Components (opcional)
- [ ] Snapshots de Loading, Toast, OfflineBanner

---

## 🚫 Excluído do Coverage

Arquivos que não fazem sentido testar (configurado em `jest.config.js`):
- `**/index.ts` - barrel files
- `**/*.types.ts` - apenas tipos
- `**/tamagui.config.ts` - config estática
- `src/app/**` - screens/layouts (expo-router)
- `src/locales/**` - traduções
- `src/providers/**` - wrappers simples
- `src/testing/**` - infraestrutura de teste
