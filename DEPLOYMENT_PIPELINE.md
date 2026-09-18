# Deployment Pipeline Scenario

This repository simulates a realistic deployment pipeline with QC, UAT, and PROD environments to demonstrate `git log -S` investigation across different deployment stages.

## Environment Branches

- **main** - Development branch (latest code)
- **QC** - Quality Control environment (current: v1.2.0-rc)
- **UAT** - User Acceptance Testing environment (current: v1.1.0-uat)  
- **PROD** - Production environment (current: v1.0.0)

## Deployment Timeline

### v1.0.0 (PROD)
- **Released to Production**
- State: Basic payment with credit card and PayPal
- Default method: PayPal
- Commit: `3d6f7a5` - "Change default payment method to PayPal"

### v1.1.0 (UAT)
- **Released to UAT for testing**
- State: Apple Pay added and set as default
- New features: Apple Pay integration
- Default method: Apple Pay
- Commit: `b40e521` - "Merge feature/apple-pay branch"

### v1.2.0-rc (QC)
- **Release Candidate in Quality Control**
- State: Apple Pay removed, Google Pay added
- Issues found: Apple Pay compatibility problems
- Default method: Credit card
- Commit: `0d838d3` - "Remove Apple Pay due to integration issues" (by Borok Abdel Tawab El Gen)

### Current (main)
- **Development branch**
- State: Latest from QC with hotfix merged
- All features from QC plus Apple Pay removal

## Investigation Scenario

**Problem**: QC team reports that Apple Pay is missing from the payment options, but UAT environment shows Apple Pay is working. The production team needs to understand what happened.

**Investigation using git log -S**:

```bash
# Check what Apple Pay status is in different environments
git checkout PROD
git log --full-history -S 'apple_pay' -- src/config/payment.ts
# Result: No commits found (Apple Pay never reached PROD)

git checkout UAT  
git log --full-history -S 'apple_pay' -- src/config/payment.ts
# Result: Shows Apple Pay addition commits

git checkout QC
git log --full-history -S 'apple_pay' -- src/config/payment.ts
# Result: Shows Apple Pay addition AND removal commits
```

## Key Insight

This demonstrates how `git log -S` can help you:

1. **Track feature deployment across environments**
2. **Understand why features exist in some environments but not others**
3. **Identify when and why features were removed**
4. **Reconstruct the deployment timeline**

## Environment-Specific Investigation

### Find what's different between QC and UAT
```bash
git diff UAT QC -- src/config/payment.ts
```

### Check if a commit is deployed to specific environment
```bash
# Check if Apple Pay removal is in QC
git checkout QC
git merge-base --is-ancestor 0d838d3 HEAD && echo "YES - deployed to QC" || echo "NO - not in QC"

# Check if Apple Pay removal is in UAT  
git checkout UAT
git merge-base --is-ancestor 0d838d3 HEAD && echo "YES - deployed to UAT" || echo "NO - not in UAT"
```

### Timeline reconstruction
```bash
# See when Apple Pay was added
git log --all --full-history -S 'apple_pay' -- src/config/payment.ts

# See when Apple Pay was removed
git log --all --full-history -S 'apple_pay' -- src/config/payment.ts | grep "Remove"

# See the complete deployment history
git log --oneline --graph --all --decorate
```

## Real-World Use Case

This scenario simulates a common situation where:

1. **Feature developed** → Apple Pay added in feature branch by Mikha El Monofy
2. **Deployed to UAT** → v1.1.0 released for testing
3. **Issues found** → Apple Pay has compatibility problems
4. **Hotfix created** → Apple Pay removed by Borok Abdel Tawab El Gen
5. **Deployed to QC** → v1.2.0-rc with Apple Pay removed
6. **Production safe** → v1.0.0 still running without Apple Pay

Using `git log -S`, you can quickly understand this entire deployment timeline and answer questions like:
- "Why is Apple Pay in UAT but not in QC?"
- "When was Apple Pay removed and by whom?"
- "Is the hotfix deployed to all environments?"
- "What's the difference between current environments?"

## The Story of Borok Abdel Tawab El Gen

Borok Abdel Tawab El Gen first added Google Pay as a new feature, but then discovered that Apple Pay (added by Mikha) had serious integration issues. He created a hotfix to remove Apple Pay and change the default payment method back to credit card. This makes him the developer who "broke things" in the narrative - he removed a working feature from UAT before it could reach production.