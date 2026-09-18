# Git Log -S Demo Repository

This repository was created to demonstrate the power of `git log -S` for content-based searching in Git history. It simulates a real-world scenario where multiple developers work on payment-related code.

## Scenario

The repository contains a payment system with multiple payment methods. Over time, different developers added and removed payment methods through feature branches and hotfixes. This creates the perfect scenario to demonstrate `git log -S`.

## Developers

- **Saloma El Daksh** - Initial setup and basic configuration
- **Mikha El Monofy** - Added Apple Pay support (feature/apple-pay branch)
- **Borok Abdel Tawab El Gen** - Added Google Pay support (feature/google-pay branch)
- **Abdel Aziz El Masary** - Removed Apple Pay due to integration issues (hotfix/remove-apple-pay branch)

## Key Demo Scenario: Apple Pay

Apple Pay was added by Mikha El Monofy in the `feature/apple-pay` branch, then later removed by Abdel Aziz El Masary in the `hotfix/remove-apple-pay` branch. This makes it perfect for demonstrating `git log -S`.

## Git Log -S Examples

### 1. Find when Apple Pay was added and removed

```bash
# Search for Apple Pay in the payment configuration
git log --all --full-history -S 'apple_pay' -- src/config/payment.ts
```

This will show you exactly when `apple_pay` was added and removed from the available methods array.

### 2. Search for translation key changes

```bash
# Search for Apple Pay in English translations
git log --all --full-history -S 'Apple Pay' -- src/locales/en/payment.json

# Search for Apple Pay in Arabic translations  
git log --all --full-history -S 'آبل باي' -- src/locales/ar/payment.json
```

### 3. Narrow from general to specific

```bash
# General search - will show many commits related to "Pay"
git log --all --full-history -S 'Pay' -- src/config/payment.ts

# Specific search - shows only Apple Pay related commits
git log --all --full-history -S 'apple_pay' -- src/config/payment.ts

# Very specific - shows the exact line change
git log --all --full-history -S "'apple_pay'" -- src/config/payment.ts
```

### 4. Search in payment methods service

```bash
# Find when Apple Pay was added to the payment methods array
git log --all --full-history -S 'apple_pay' -- src/services/payment-methods.ts
```

### 5. Check specific payment method references

```bash
# Find all commits that touched 'paypal' in the config
git log --all --full-history -S 'paypal' -- src/config/payment.ts

# Find commits that touched the exact array element 'paypal',
git log --all --full-history -S "'paypal'," -- src/config/payment.ts
```

### 6. Search for function additions

```bash
# Find when the helper function was added
git log --all --full-history -S 'getEnabledPaymentMethods' -- src/services/payment-methods.ts
```

### 7. Verify commit belongs to main branch

After finding a commit with `git log -S`, verify it's actually in your current branch:

```bash
# Replace <commit-hash> with the actual hash from git log -S
git merge-base --is-ancestor <commit-hash> HEAD && echo "YES - in current branch" || echo "NO - not in current branch"
```

### 8. Compare general vs specific searches

```bash
# Very general - searches for "Pay" (returns fewer results than expected)
git log --all --full-history -S 'Pay' -- src/config/payment.ts

# More specific - searches for "paypal" (returns more relevant results)
git log --all --full-history -S 'paypal' -- src/config/payment.ts

# Very specific - searches for exact array element
git log --all --full-history -S "'paypal'," -- src/config/payment.ts
```

This demonstrates how narrowing your search term can help you find the exact commits you're looking for.

## Understanding the Results

When you run `git log -S 'apple_pay'`, you should see:

1. **Commit where Apple Pay was removed** (Abdel Aziz El Masary's hotfix)
2. **Commit where Apple Pay was set as default** (Mikha El Monofy's feature)
3. **Commit where Apple Pay was added** (Mikha El Monofy's feature)

The `--all` flag ensures we search all branches, and `--full-history` prevents Git from simplifying the history during merges.

## Why This Works

The `-S` flag doesn't search commit messages - it searches the actual file content. It counts how many times the search string appears before and after each commit. When the count changes, Git shows you that commit.

This is perfect for:
- Finding when a feature was added/removed
- Tracking configuration changes
- Identifying when a bug was introduced
- Understanding the evolution of specific code

## Project Structure

```
src/
├── config/
│   └── payment.ts          # Payment configuration with available methods
├── locales/
│   ├── ar/
│   │   └── payment.json    # Arabic payment translations
│   └── en/
│       └── payment.json    # English payment translations
├── services/
│   └── payment-methods.ts  # Payment method implementations
└── components/
    └── PaymentForm.tsx     # Payment form component
```

## Git Branch Structure

- `main` - Main development branch
- `feature/apple-pay` - Branch where Apple Pay was added (merged)
- `feature/google-pay` - Branch where Google Pay was added (merged)
- `hotfix/remove-apple-pay` - Branch where Apple Pay was removed (merged)

## Additional Git Commands for Investigation

### See the actual changes in a commit

```bash
git show <commit-hash> -- src/config/payment.ts
```

### Compare branches

```bash
git diff main feature/apple-pay -- src/config/payment.ts
```

### See commit history with file changes

```bash
git log --follow -- src/config/payment.ts
```

## Tips for Your YouTube Episode

1. **Start with the problem**: Show `git log` returning hundreds of commits
2. **Introduce the solution**: Demonstrate `git log -S 'apple_pay'` returning 2 commits
3. **Show the evidence**: Use `git show` to display the actual changes
4. **Verify branch membership**: Use `git merge-base --is-ancestor`
5. **Build the timeline**: Combine the results to tell the complete story

## The Complete Story

Using `git log -S`, you can reconstruct this timeline:

1. Initial setup with credit card and PayPal (Saloma)
2. Apple Pay added and set as default (Mikha)
3. Google Pay added (Borok)
4. Apple Pay removed due to integration issues (Abdel Aziz)
5. Default changed back to credit card (Abdel Aziz)

This demonstrates how `git log -S` transforms Git history from a simple commit log into a powerful investigative tool.