# Investigation Guide for YouTube Episode

## Quick Setup for Recording

1. **Start on main branch:**
   ```bash
   git checkout main
   ```

2. **Show the painful git history:**
   ```bash
   git log --oneline
   # "48+ commits to scroll through - this is painful!"
   ```

3. **Demonstrate the problem scenario:**
   - "QC team reports Apple Pay is missing"
   - "UAT shows Apple Pay working"
   - "PROD never had Apple Pay"
   - "Who deleted it and when?"

## Investigation Flow

### Step 1: Check PROD (Production)
```bash
git checkout PROD
git log --full-history -S 'apple_pay' -- src/config/payment.ts
# Result: Empty (Apple Pay never reached production)
```

### Step 2: Check UAT (User Acceptance Testing)
```bash
git checkout UAT
git log --full-history -S 'apple_pay' -- src/config/payment.ts
# Result: Shows Apple Pay addition commits (2 commits)
```

### Step 3: Check QC (Quality Control)
```bash
git checkout QC
git log --full-history -S 'apple_pay' -- src/config/payment.ts
# Result: Shows Apple Pay addition AND removal (3 commits)
```

### Step 4: Verify deployment status
```bash
# Check if removal commit is in QC
git checkout QC
git merge-base --is-ancestor 0d838d3 HEAD && echo "YES - deployed to QC" || echo "NO - not in QC"
# Result: YES - deployed to QC

# Check if removal commit is in UAT
git checkout UAT
git merge-base --is-ancestor 0d838d3 HEAD && echo "YES - deployed to UAT" || echo "NO - not in UAT"
# Result: NO - not in UAT

# Check if removal commit is in PROD
git checkout PROD
git merge-base --is-ancestor 0d838d3 HEAD && echo "YES - deployed to PROD" || echo "NO - not in PROD"
# Result: NO - not in PROD
```

### Step 5: Show the actual changes
```bash
git show 0d838d3 -- src/config/payment.ts
# Shows Apple Pay being removed from available methods by Borok Abdel Tawab El Gen
```

### Step 6: Compare environments
```bash
git diff UAT QC -- src/config/payment.ts
# Shows difference between UAT (has Apple Pay) and QC (has Google Pay)
```

## Key Talking Points

1. **The Pain**: 48+ commits to scroll through manually - this is the real problem developers face
2. **The Solution**: `git log -S` cuts through the noise and finds exactly what matters
3. **The Insight**: Apple Pay was added by Mikha, deployed to UAT, found problematic, then removed by Borok before reaching PROD
4. **The Timeline**: v1.0.0 (PROD) → v1.1.0 (UAT with Apple Pay) → v1.2.0-rc (QC without Apple Pay)
5. **The Villain**: Borok Abdel Tawab El Gen broke things by removing Apple Pay from the deployment pipeline
6. **The Power**: Instead of scrolling through 48 commits, we get 4 relevant results instantly

## Environment States

### PROD (v1.0.0)
- Payment methods: credit_card, paypal
- Default: paypal
- Apple Pay: ❌ Never deployed

### UAT (v1.1.0-uat)
- Payment methods: credit_card, paypal, apple_pay
- Default: apple_pay
- Apple Pay: ✅ Active (but has issues)

### QC (v1.2.0-rc)
- Payment methods: credit_card, paypal, google_pay
- Default: credit_card
- Apple Pay: ❌ Removed by Borok due to issues

### main (Development)
- Payment methods: credit_card, paypal, google_pay
- Default: credit_card
- Apple Pay: ❌ Removed, Google Pay added

## Perfect Demo Commands

```bash
# Start with the dramatic reveal
git checkout PROD
git log --full-history -S 'apple_pay' -- src/config/payment.ts
# "Empty result - Apple Pay never made it to production"

# Move to UAT for contrast
git checkout UAT
git log --full-history -S 'apple_pay' -- src/config/payment.ts
# "Here it is! Apple Pay was added and set as default by Mikha"

# Show the removal in QC
git checkout QC
git log --full-history -S 'apple_pay' -- src/config/payment.ts
# "But in QC, it was removed by Borok due to compatibility issues"

# The smoking gun
git show 0d838d3 -- src/config/payment.ts
# "Here's exactly when and why Borok removed it"

# Show the author
git log --format="%an" 0d838d3^..0d838d3
# "Borok Abdel Tawab El Gen - the one who broke things"
```

## Summary Statement

"Using `git log -S`, we can reconstruct the entire deployment timeline in seconds instead of scrolling through 48+ commits. Apple Pay was developed by Mikha and deployed to UAT, found to have compatibility issues, removed by Borok in a hotfix, and that hotfix was deployed to QC but never made it to production. Borok Abdel Tawab El Gen is the developer who broke things by removing a working feature from the deployment pipeline. This is the power of content-based git searching - it transforms your git history from a painful 48-commit scroll into a precise 4-commit investigation."