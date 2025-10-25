# Sanity Studio Setup Instructions

## Step 1: Create a Sanity Project

You have two options:

### Option A: Create a New Project (Recommended)

1. Go to https://sanity.io/manage
2. Click "Create project"
3. Name it "CryptoWeek Israel"
4. Choose the free plan
5. Copy the **Project ID** (you'll need it)

### Option B: Use an Existing Project

Use one of your existing projects:
- **Blog CMS** (ID: ehc3wabg)
- **Shopr** (ID: sifs4rov)

## Step 2: Create a Dataset

1. In your project dashboard, go to "Datasets"
2. Click "Create dataset"
3. Name it "production"
4. Choose "Public" visibility (you can change this later)

## Step 3: Get an API Token

1. In your project dashboard, go to "API" → "Tokens"
2. Click "Add API token"
3. Name it "CryptoWeek Development"
4. Choose "Editor" permissions
5. Copy the token (you'll need it)

⚠️ **IMPORTANT**: Save this token securely - you can't see it again!

## Step 4: Update Configuration Files

### Update studio/sanity.config.ts

Replace `YOUR_PROJECT_ID` with your actual project ID:

```typescript
projectId: 'abc123xyz', // Your project ID here
```

### Create studio/.env.local

Copy the template and fill in your values:

```bash
cp studio/.env.local.template studio/.env.local
```

Edit `studio/.env.local` and add your project ID:

```
SANITY_STUDIO_PROJECT_ID=abc123xyz
SANITY_STUDIO_DATASET=production
```

### Create root .env.local

Copy the template and fill in your values:

```bash
cp .env.local.template .env.local
```

Edit `.env.local` and add:
- Your project ID
- Your API token
- Generate random strings for preview/revalidate secrets

Example:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-25
SANITY_API_TOKEN=skabcdefghijklmnopqrstuvwxyz123456789
SANITY_PREVIEW_SECRET=my-super-secret-preview-key-change-this
SANITY_REVALIDATE_SECRET=my-super-secret-revalidate-key-change-this
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 5: Install Dependencies

Run from the project root:

```bash
# Install studio dependencies
cd studio
npm install

# Go back to root and install Next.js Sanity dependencies
cd ..
npm install next-sanity @sanity/image-url groq
```

## Step 6: Test the Studio

```bash
cd studio
npm run dev
```

Open http://localhost:3333 - you should see the Sanity Studio!

## Troubleshooting

### "Invalid project ID"
- Make sure you copied the correct project ID
- Check that it's updated in both `sanity.config.ts` and `.env.local`

### "Authentication failed"
- Verify your API token is correct
- Make sure the token has "Editor" or "Viewer" permissions
- Check that the token hasn't expired

### "Dataset not found"
- Make sure you created the "production" dataset
- Verify the dataset name matches in all config files

## Next Steps

Once the studio is running:
1. ✅ Studio setup complete!
2. Continue to **Phase 2: Schema Development**
3. Follow the instructions in `/docs/SANITY_MIGRATION.md`

---

Need help? Check the full migration guide at `/docs/SANITY_MIGRATION.md`
