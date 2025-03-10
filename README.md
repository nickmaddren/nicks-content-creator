# Nick's Content Creator 🎨

## Overview

Hello, thanks for checking out my **Content Creator** web app, built using **TypeScript and React**.

## Tech Stack

- **Frontend:** TypeScript, React, TanStack Query React, React Router, Shadcn UI
- **API:** [Lorem Picsum](https://picsum.photos/)
- **Styling:** Tailwind
- **Tooling:** [Vite](https://vite.dev/)
- **Testing:** [Playwright](https://playwright.dev/)

## Installation & Setup

1. **Clone the repository**

```bash
 git clone https://github.com/nickmaddren/nicks-content-creator.git
```

2. **Navigate to the project folder**

```bash
cd nicks-content-creator
```

3. **Install dependencies**

```bash
npm install
```

4. **Start the development server**

```bash
npm run dev
```

The app should now be running on `http://localhost:5173/` (default Vite port and spells "site" 🤓).

## Testing

To run the Playwright E2E tests you can use the following command:

```bash
npx playwright test
```

Want to learn more about Playwright? You can do that [here](https://playwright.dev/).

## TO-DOs

- **Test edge cases:** The E2E test covers the critical flow, however, it would be beneficial to create some component tests that cover edge cases.
- **Additional error handling**
- **Responsiveness:** The experience for tablet and mobile could be improved.
- **Dimensions warning:** When the user types a dimension outside the clamp limit we should warn them.
