# Sanity Migration Quick Start Guide

**Ready to migrate?** Follow these steps to get started immediately.

---

## Prerequisites

- ✅ User token: `skk7qnygiFfw1cHyyJe4KteGwLYAIxFE7mM8tJjfidBa9RJPAHOFBQTbUwHfdlYkb0kOrAMp3gvYe8VaJKVL1j5IWNyRyWb0faIupL71l9wEupIrsHuLKOGklKvYyiCg0nUN9mA54q9tAajs9fcoM5SrYPbfsfonN7S6G6W2c3AnAd7Urftx`
- ✅ Node.js 18+ installed
- ✅ Project at `/Users/matanshaviro/Documents/nextjs/cryptoweek`

---

## Step 1: Initialize Sanity (15 minutes)

```bash
cd /Users/matanshaviro/Documents/nextjs/cryptoweek

# Initialize Sanity Studio
npx sanity@latest init \
  --project-plan free \
  --dataset production \
  --output-path ./studio

# When prompted:
# - Create new project? Yes
# - Project name: cryptoweek
# - Dataset: production
# - Template: Clean project with no predefined schemas
```

**Save the Project ID that's generated!**

---

## Step 2: Configure Environment Variables

Create `/Users/matanshaviro/Documents/nextjs/cryptoweek/.env.local`:

```env
# Replace YOUR_PROJECT_ID with actual ID from Step 1
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skk7qnygiFfw1cHyyJe4KteGwLYAIxFE7mM8tJjfidBa9RJPAHOFBQTbUwHfdlYkb0kOrAMp3gvYe8VaJKVL1j5IWNyRyWb0faIupL71l9wEupIrsHuLKOGklKvYyiCg0nUN9mA54q9tAajs9fcoM5SrYPbfsfonN7S6G6W2c3AnAd7Urftx
SANITY_PREVIEW_SECRET=your-random-secret-string-here
```

Create `/Users/matanshaviro/Documents/nextjs/cryptoweek/studio/.env.local`:

```env
# Same project ID as above
SANITY_STUDIO_PROJECT_ID=YOUR_PROJECT_ID
SANITY_STUDIO_DATASET=production
```

---

## Step 3: Install Dependencies

```bash
# In project root
npm install next-sanity @sanity/image-url @portabletext/react groq
npm install -D @sanity/types tsx

# In studio directory
cd studio
npm install
cd ..
```

---

## Step 4: Verify Setup

```bash
cd studio
npm run dev
```

Open http://localhost:3333

**You should see:**
- ✅ Sanity Studio loads
- ✅ Empty schema (no errors)
- ✅ Vision plugin available

**If it works, press Ctrl+C and continue to Phase 2.**

---

## Next Steps

Now follow the detailed migration plan in `/docs/SANITY_MIGRATION.md`:

1. **Phase 2: Schema Development** (2-3 hours)
   - Copy all schema files from the migration guide
   - Test in Studio

2. **Phase 3: Data Migration** (1-2 hours)
   - Run migration script
   - Verify all data imported

3. **Phase 4: Integration Layer** (2-3 hours)
   - Update content layer to use Sanity
   - Test with existing pages

4. **Phase 5: Preview & ISR** (1-2 hours)
   - Set up preview mode
   - Configure webhooks

5. **Phase 6: Cleanup & Testing** (1-2 hours)
   - Final testing
   - Deploy to production

**Total Time: 8-12 hours**

---

## Quick Reference

**Full Documentation:** `/docs/SANITY_MIGRATION.md`

**File Structure After Migration:**
```
/Users/matanshaviro/Documents/nextjs/cryptoweek/
├── studio/                     # Sanity Studio
│   ├── schemas/               # Content schemas
│   │   ├── objects/          # Reusable objects
│   │   └── documents/        # Document types
│   ├── structure/            # Studio structure
│   └── sanity.config.ts      # Studio config
├── lib/
│   ├── sanity/
│   │   ├── client.ts         # Sanity client
│   │   ├── queries.ts        # GROQ queries
│   │   └── types.ts          # Generated types
│   └── content/
│       ├── interfaces.ts     # TypeScript interfaces
│       └── sanity.ts         # Content access API
├── pages/
│   ├── api/
│   │   ├── preview.ts        # Preview mode
│   │   ├── exit-preview.ts   # Exit preview
│   │   └── revalidate.ts     # ISR webhook
│   └── index.tsx             # Updated to use Sanity
└── scripts/
    └── migrate-to-sanity.ts  # Migration script
```

---

## Need Help?

1. Check `/docs/SANITY_MIGRATION.md` for detailed instructions
2. Review Common Issues section in migration guide
3. Check Sanity docs: https://www.sanity.io/docs
4. Join Sanity Discord: https://slack.sanity.io

---

**Ready?** Start with Step 1 above! 🚀
