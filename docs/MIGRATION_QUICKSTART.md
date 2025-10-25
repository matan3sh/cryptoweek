# Sanity Migration Quick Start Guide

**Note:** This project is already set up with Sanity. This guide is for reference or setting up additional environments.

---

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ Sanity account (sign up at sanity.io)
- ✅ Project repository cloned

---

## Step 1: Get Sanity API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Navigate to **API** → **Tokens**
4. Click **Add New Token**
5. Name: "Production Token"
6. Permissions: **Editor**
7. Copy the generated token (you'll need it in Step 2)

**⚠️ Important:** Keep your API token secure! Never commit it to git.

---

## Step 2: Configure Environment Variables

Create `.env.local` in the project root:

```env
# Feature Flag
NEXT_PUBLIC_USE_SANITY=true

# Sanity Project Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-25

# Sanity API Token (from Step 1)
SANITY_API_TOKEN=your-token-here

# Preview Mode Secrets (generate random strings)
SANITY_PREVIEW_SECRET=generate-random-string
SANITY_REVALIDATE_SECRET=generate-random-string

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create `studio/.env.local`:

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
