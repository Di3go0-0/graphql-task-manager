# CI/CD Pipeline Usage Guide

## 🚀 How does the CI/CD Pipeline work?

### **🔄 Automatic Trigger**
The pipeline runs automatically when:
- You push to the `main` or `develop` branches
- You create a pull request to `main`

---

## 📊 **Pipeline Stages Explained**

### **Stage 1: Code Quality** 🔍
```bash
✅ ESLint - Linting code
✅ TypeScript - Type validation
✅ npm audit - Security vulnerabilities
✅ Prettier - Consistent formatting
```

### **Stage 2: Testing** 🧪
```bash
✅ Unit Tests - Unit testing with Jest
✅ E2E Tests - Integration tests with real DB
✅ Coverage - Code coverage report
```

### **Stage 3: Build & Security** 🐳
```bash
✅ Docker Build - Create Docker image
✅ Security Scan - Vulnerability analysis with Trivy
✅ Push Registry - Upload image to GitHub Container Registry
```

### **Stage 4: Deploy Staging** 🚀
```bash
⚠️ Only for the `develop` branch
✅ Deploy to staging environment
✅ Health checks
```

### **Stage 5: Deploy Production** 🏢
```bash
⚠️ Only for the `main` branch
✅ Deploy to production
✅ Health checks
```

---

## 🎯 **How to use it in your workflow**

### **1. Local Development**
```bash
# 1. Work on a feature branch
git checkout -b feature/new-functionality

# 2. Make your changes
# ... code, tests, etc.

# 3. Before pushing, test locally
npm run lint
npm run test
npm run build

# 4. Commit and push
git add .
git commit -m "feat: add new functionality"
git push origin feature/new-functionality
```

### **2. Create a Pull Request**
```bash
# 1. From GitHub, create PR to main
# 2. CI runs automatically
# 3. Check the results in the "Checks" tab
```

### **3. Automatic Deploy**
```bash
# Merge into develop → Deploy to Staging
git checkout develop
git merge feature/new-functionality
git push origin develop  # 🚀 Auto-deploy to staging

# Merge into main → Deploy to Production
git checkout main
git merge develop
git push origin main    # 🏢 Auto-deploy to production
```

---

## 📱 **How to monitor the pipeline**

### **On GitHub Web:**
1. Go to your repo → **"Actions"**
2. You'll see the running workflows
3. Click on each workflow to see details
4. Check logs for each stage

### **Notifications:**
- ✅ **Green check** - Successful pipeline
- ❌ **Red X** - Pipeline failed
- 🟡 **Yellow** - Pipeline in progress

---

## 🔧 **Required Configuration**

### **1. GitHub Secrets (Configure in repo settings):**
```yaml
# Comes with GITHUB_TOKEN automatically
# You may add others as needed:
# - DATABASE_URL_STAGING
# - DATABASE_URL_PRODUCTION
# - DEPLOY_HOST_STAGING
# - DEPLOY_HOST_PRODUCTION
```

### **2. Environment Protection (Settings → Environments):**
```yaml
Staging:
  - Require reviewers (optional)

Production:
  - Require reviewers (recommended)
  - Wait timer (e.g. 5 minutes)
```

---

## 📸 **Real Usage Example**

### **Scenario: New task feature**

```bash
# 1. Developer creates feature
git checkout -b feature/task-filters
# ... code and tests ...

# 2. Push and create PR
git push origin feature/task-filters
# Create PR in GitHub UI

# 3. CI runs automatically:
#    ✅ Lint passed
#    ✅ Tests passed
#    ✅ Build successful
#    ❌ Security scan found vulnerability

# 4. Developer fixes security
npm audit fix  # or update dependencies
git commit -m "fix: update vulnerable dependencies"
git push

# 5. CI passes completely ✅
# 6. Merge into develop → Automatic deploy to staging

# 7. QA testing in staging
# 8. Merge into main → Automatic deploy to production
```

---

## 🚨 **What to do when it fails**

### **1. Check Logs:**
- In GitHub Actions, click on the failed workflow
- Review the step that failed
- Errors are usually clear

### **2. Local Debug:**
```bash
# Replicate the commands that failed
npm run lint  # if linting failed
npm test      # if tests failed
npm run build # if build failed
```

### **3. Fix and Push:**
```bash
# Fix the issue
# Commit the fix
git commit -m "fix: resolve linting issues"
git push  # CI runs again
```

---

## 🎉 **Benefits Gained**

✅ **Guaranteed quality** - Every change is validated
✅ **Automated tests** - Nothing breaks in production
✅ **Security scanning** - Vulnerabilities detected early
✅ **Automated deploys** - No manual intervention needed
✅ **Easy rollback** - If something fails, revert with git
✅ **Total visibility** - Everything is documented in GitHub

**Your project is now enterprise-ready with automated CI/CD!** 🚀
