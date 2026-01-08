# CI/CD Pipeline Usage Guide

## 🚀 ¿Cómo funciona el CI/CD Pipeline?

### **🔄 Trigger Automático**
El pipeline se ejecuta automáticamente cuando:
- Haces `push` a las ramas `main` o `develop`
- Creas un `pull request` a `main`

---

## 📊 **Pipeline Stages Explained**

### **Stage 1: Code Quality** 🔍
```bash
✅ ESLint - Linting del código
✅ TypeScript - Validación de tipos  
✅ npm audit - Vulnerabilidades de seguridad
✅ Prettier - Formato consistente
```

### **Stage 2: Testing** 🧪
```bash
✅ Unit Tests - Pruebas unitarias con Jest
✅ E2E Tests - Pruebas de integración con DB real
✅ Coverage - Reporte de cobertura de código
```

### **Stage 3: Build & Security** 🐳
```bash
✅ Docker Build - Creación de imagen Docker
✅ Security Scan - Análisis de vulnerabilidades con Trivy
✅ Push Registry - Sube imagen a GitHub Container Registry
```

### **Stage 4: Deploy Staging** 🚀
```bash
⚠️ Solo para la rama `develop`
✅ Deploy a ambiente de staging
✅ Health checks
```

### **Stage 5: Deploy Production** 🏢
```bash
⚠️ Solo para la rama `main`
✅ Deploy a producción
✅ Health checks
```

---

## 🎯 **Cómo usarlo en tu workflow**

### **1. Desarrollo Local**
```bash
# 1. Trabaja en una feature branch
git checkout -b feature/nueva-funcionalidad

# 2. Hace tus cambios
# ... código, tests, etc.

# 3. Antes de push, prueba localmente
npm run lint
npm run test
npm run build

# 4. Commitea y hace push
git add .
git commit -m "feat: add new functionality"
git push origin feature/nueva-funcionalidad
```

### **2. Crear Pull Request**
```bash
# 1. Desde GitHub, crea PR a main
# 2. El CI se ejecuta automáticamente
# 3. Revisa los resultados en la pestaña "Checks"
```

### **3. Deploy Automático**
```bash
# Merge a develop → Deploy a Staging
git checkout develop
git merge feature/nueva-funcionalidad
git push origin develop  # 🚀 Auto-deploy a staging

# Merge a main → Deploy a Producción  
git checkout main
git merge develop
git push origin main    # 🏢 Auto-deploy a producción
```

---

## 📱 **Cómo monitorear el pipeline**

### **En GitHub Web:**
1. Ve a tu repo → **"Actions"**
2. Verás los workflows en ejecución
3. Click en cada workflow para ver detalles
4. Revisa logs de cada etapa

### **Notificaciones:**
- ✅ **Green check** - Pipeline exitoso
- ❌ **Red X** - Pipeline falló
- 🟡 **Yellow** - Pipeline en progreso

---

## 🔧 **Configuración Requerida**

### **1. GitHub Secrets (Configurar en repo settings):**
```yaml
# Ya viene con GITHUB_TOKEN automático
# Puede agregar otros según necesites:
# - DATABASE_URL_STAGING
# - DATABASE_URL_PRODUCTION  
# - DEPLOY_HOST_STAGING
# - DEPLOY_HOST_PRODUCTION
```

### **2. Environment Protection (Settings → Environments):**
```yaml
Staging: 
  - Require reviewers (opcional)
  
Production:
  - Require reviewers (recomendado) 
  - Wait timer (ej. 5 minutos)
```

---

## 📸 **Ejemplo Real de Uso**

### **Escenario: Nueva feature de tasks**

```bash
# 1. Developer crea feature
git checkout -b feature/task-filters
# ... código y tests ...

# 2. Push y crea PR
git push origin feature/task-filters
# Crea PR en GitHub UI

# 3. CI se ejecuta (automático):
#    ✅ Lint pasa
#    ✅ Tests pasan  
#    ✅ Build exitoso
#    ❌ Security scan encuentra vulnerabilidad

# 4. Developer arregla seguridad
npm audit fix  # o actualiza dependencias
git commit -m "fix: update vulnerable dependencies"
git push

# 5. CI pasa completo ✅
# 6. Merge a develop → Deploy automático a staging

# 7. QA testing en staging
# 8. Merge a main → Deploy automático a producción
```

---

## 🚨 **Qué hacer cuando falla**

### **1. Ver Logs:**
- En GitHub Actions, click en el workflow fallido
- Revisa el step que falló
- Los errores suelen ser claros

### **2. Debug Local:**
```bash
# Replica los comandos que fallaron
npm run lint  # si falló linting
npm test      # si fallaron tests
npm run build # si falló build
```

### **3. Fix y Push:**
```bash
# Arregla el problema
# Haz commit del fix
git commit -m "fix: resolve linting issues"
git push  # CI se ejecuta de nuevo
```

---

## 🎉 **Beneficios Obtenidos**

✅ **Calidad garantizada** - Cada cambio es validado  
✅ **Tests automáticos** - No se rompe nada en producción  
✅ **Security scanning** - Vulnerabilidades detectadas temprano  
✅ **Deploys automatizados** - Sin intervención manual  
✅ **Rollback fácil** - Si algo falla, revertir con git  
✅ **Visibilidad total** - Todo está documentado en GitHub  

**¡Tu proyecto ahora es enterprise-ready con CI/CD automatizado!** 🚀