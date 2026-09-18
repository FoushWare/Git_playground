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
# See the complete deployment timeline with graph and dates
git log --oneline --graph --all --decorate --date=short
```

## Advanced: View History Between Specific Commits

To view the history specifically between two commits, you can use range syntax with your graph command:

### 1. Standard Range (From Commit A to Commit B)

```bash
# See everything after Commit A up to and including Commit B
git log --graph --date=short --pretty=format:"%C(auto)%h %ad %s %d" 26790b1..0d838d3
```

### 2. Include Starting Commit (Symmetric Difference)

```bash
# See entire history between two commits including both endpoints
git log --graph --left-right --date=short --pretty=format:"%C(auto)%h %ad %s %d" 26790b1...0d838d3
```

### 3. Between Commit and Current Position

```bash
# See history from a specific commit to current HEAD
git log --graph --date=short --pretty=format:"%C(auto)%h %ad %s %d" 26790b1..HEAD
```

### 4. Between Branches

```bash
# See history from one branch to another
git log --graph --date=short --pretty=format:"%C(auto)%h %ad %s %d" UAT..QC
```

## Timeline-Ready Output for YouTube

### Visual Graph with Search Results

```bash
# Build timeline with graph showing only Apple Pay commits
git log --all --graph --decorate --date=short \
  -S"apple_pay" \
  --pretty=format:"%h %ad %d %s"
```

### Clean Timeline Format

```bash
# Create timeline-ready output for your video
git log --all --date=short -S"apple_pay" \
  --pretty=format:"%h|%ad|%s" |
while IFS='|' read hash date message; do
  echo "$date  →  $message  [$hash]"
done
```

This produces output like:
```
2026-09-18  →  Add Apple Pay support  [26790b1]
2026-09-18  →  Set Apple Pay as default payment method  [324a26e]
2026-09-18  →  Remove Apple Pay due to integration issues  [0d838d3]
```

### Search Options

- **-S "exact_string"** - Search for exact string changes (pickaxe)
- **-G "regex_pattern"** - Search with regular expressions

## Quick Demo Flow

```bash
# 1. Show the pain
git log --oneline  # 49 commits to scroll through

# 2. The magic solution
git checkout QC
git log --full-history -S 'apple_pay' -- src/config/payment.ts
# Returns exactly 3 relevant commits instead of 49

# 3. Check who removed it
git show 0d838d3 -- src/config/payment.ts
# Shows Borok Abdel Tawab El Gen removed Apple Pay

# 4. Verify it's in QC
git merge-base --is-ancestor 0d838d3 HEAD && echo "YES" || echo "NO"
# Result: YES - deployed to QC

# 5. Build the timeline
git log --oneline --graph --all --decorate --date=short
# Shows the complete branching structure with dates
```

## The Story

- **Mikha El Monofy**: Added Apple Pay and set it as default
- **Borok Abdel Tawab El Gen**: Removed Apple Pay due to integration issues (the breaker)
- **Result**: Apple Pay was in UAT but removed before reaching PROD

## Key Commit Hash

- **Apple Pay removal**: `0d838d3` (by Borok Abdel Tawab El Gen)
- **Apple Pay addition**: `26790b1` (by Mikha El Monofy)