# Next.js Blog

A modern and fully functional **technology blog** built with **Next.js**, **Prismic**, and a set of powerful tools to provide great performance, customization, and user experience.

👉 Live demo: [everton-blog.vercel.app](https://everton-blog.vercel.app/)

---

## ✨ Features

- **Dark Mode** using [`next-themes`](https://github.com/pacocoursey/next-themes)
- **Table of Contents (ToC)** with active section highlighting via the [`IntersectionObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- **Comments system** powered by:
  - **Supabase Database** for storage
  - **Block Kit** (Slack’s UI framework) for UI rendering inside Slack
- **Search functionality** with:
  - [Algolia InstantSearch](https://www.algolia.com/products/instantsearch/)
  - [`react-instantsearch`](https://www.algolia.com/doc/api-reference/widgets/react/)
- **Contact page** with email sending through [Resend](https://resend.com)
- **Static pages**: Home, Posts, About, Contact
- **Deployed with [Vercel](https://vercel.com/)** for seamless CI/CD

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React + TypeScript)
- **CMS:** [Prismic](https://prismic.io/) with Slices
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State & Themes:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Search:** [Algolia](https://www.algolia.com/) + react-instantsearch
- **Email Service:** [Resend](https://resend.com/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📂 Project Structure

- `src/` — Application code (pages, components, lib, slices)
- `customtypes/` — Prismic Custom Types definitions
- `public/` — Static assets
- `pages/` — Next.js routes (home, posts, about, contact, API routes)
- `slicemachine.config.json` — Slice Machine configuration

---

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/evertonpontes/nextjs-blog.git
   cd nextjs-blog
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file at the project root with the following variables:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_CLIENT_KEY=

   SUPABASE_SERVICE_KEY=

   SLACK_INCOMING_WEBHOOK_URL=
   SLACK_VERIFICATION_TOKEN=

   NEXT_PUBLIC_ALGOLIA_APPLICATION_ID=
   NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY=
   ALGOLIA_ADMIN_KEY=

   RESEND_API_KEY=

   NEXT_PUBLIC_RECIPIENT_EMAIL_ADDRESS=
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Visit the app at `http://localhost:3000`

---

## 📬 Contact Form

The Contact page uses [Resend](https://resend.com) to send emails:

- Sends the visitor's message directly to the blog owner.

- Can also send an automatic confirmation email to the sender.

---

## 🔒 Comments Workflow

- Readers can add comments.

- Comments are stored in Supabase.

- Admins can approve or reject comments before they appear.

- Slack integration via Block Kit provides real-time notifications.

---

## 🔎 Search

**Algolia InstantSearch** with `react-instantsearch` provides:

- Real-time suggestions while typing

- Fast and accurate blog post search

---

## 📜 License

This project is licensed under the MIT License.
Feel free to fork, modify, and use it for your own projects.
