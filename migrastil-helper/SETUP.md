# Numbered Link List - Setup Instructions

## About
This Next.js app allows you to create a numbered list where you can paste links. Each time you press Enter, a new consecutive numbered item is created.

## Features
- Auto-numbered list (1., 2., 3., etc.)
- Press Enter to create a new item
- Copy All button - copies the entire list with numbers
- Clear All button - resets the list
- Delete individual items with the ✕ button
- Beautiful, responsive UI with dark mode support

## Installation

Due to OneDrive storage limitations, you may need to move this project to a local folder first.

### Option 1: Move to Local Drive (Recommended)
```bash
# Move the project to C:\Projects or another local location
move "c:\Users\sebas\OneDrive\Escritorio\migrastil-helper\migrastil-helper" "C:\Projects\migrastil-helper"

# Navigate to the new location
cd C:\Projects\migrastil-helper

# Install dependencies
npm install

# Run the development server
npm run dev
```

### Option 2: Use Current Location
If you have enough space:
```bash
cd "c:\Users\sebas\OneDrive\Escritorio\migrastil-helper\migrastil-helper"
npm install
npm run dev
```

## Usage

1. Open your browser to [http://localhost:3000](http://localhost:3000)
2. Paste a link in the first input field
3. Press Enter to create the next numbered item
4. Continue pasting links and pressing Enter
5. Click "Copy All" to copy all items with their numbers
6. The copied format will be:
   ```
   1. https://example.com/link1
   2. https://example.com/link2
   3. https://example.com/link3
   ```

## Technology Stack
- Next.js 16.1.1
- React 19.2.3
- TypeScript
- Tailwind CSS 4
- App Router

## Files Modified
- `app/page.tsx` - Main component with numbered list functionality

## Troubleshooting

If you encounter "ENOSPC: no space left on device" error:
1. Move the project to a local drive (not OneDrive)
2. Clear OneDrive cache
3. Or use a different package manager like `yarn` or `pnpm`
