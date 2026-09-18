# Git Log -S Demo Repository

This repository demonstrates `git log -S` for content-based searching in Git history. It contains **49 commits** that make manual git log navigation painful, perfect for showing the power of `git log -S`.

## The 5 Essential Commands for Your YouTube Episode

### 1. git log --full-history (The Pain)

```bash
# See all 49 commits - painful to scroll through manually
git log --oneline
```

### 2. git log search in QC only

```bash
# Search specifically in QC branch
git checkout QC
git log --full-history -S 'apple_pay' -- src/config/payment.ts
```

### 3. git show diff (The Evidence)

```bash
# See exactly what changed in a specific commit
git show 0d838d3 -- src/config/payment.ts
```

### 4. Check if commit is part of QC branch

```bash
# Verify the commit belongs to QC
git checkout QC
git merge-base --is-ancestor 0d838d3 HEAD && echo "YES - in QC" || echo "NO - not in QC"
```

### 5. Build timeline

```bash
# See the complete deployment timeline
git log --oneline --graph --all --decorate
```

## Quick Demo Flow

```bash
# 1. Show the pain
git log --oneline  # 49 commits to scroll through

# 2. The magic solution
git log --all --full-history -S 'apple_pay' -- src/config/payment.ts
# Returns exactly 4 relevant commits instead of 49

# 3. Check who removed it
git show 0d838d3 -- src/config/payment.ts
# Shows Borok Abdel Tawab El Gen removed Apple Pay

# 4. Verify it's in QC
git checkout QC
git merge-base --is-ancestor 0d838d3 HEAD && echo "YES" || echo "NO"
# Result: YES - deployed to QC

# 5. Build the timeline
git log --oneline --graph --all --decorate
# See the complete story
```

## The Story

- **Mikha El Monofy**: Added Apple Pay and set it as default
- **Borok Abdel Tawab El Gen**: Removed Apple Pay due to integration issues (the breaker)
- **Result**: Apple Pay was in UAT but removed before reaching PROD

## Key Commit Hash

- **Apple Pay removal**: `0d838d3` (by Borok Abdel Tawab El Gen)