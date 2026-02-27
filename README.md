# DigiReps — Smart Way to Grow Your Team Remotely

> **DigiReps** is a full-stack web platform that connects businesses with elite remote digital professionals — from Sales Development Reps and Customer Support Agents to Backend Developers and UI/UX Designers. Built with modern web technologies, it features dynamic CMS-powered content, JWT-based authentication, Cloudinary media uploads, and a multi-page responsive interface.

---

## 🌐 Live Demo

Visit: [http://localhost:3000](http://localhost:3000) (development) — Production deployment via Vercel.

---

## 🧱 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | ^15.2.4 | Full-stack React framework (App Router) |
| [React](https://react.dev/) | ^19.1.0 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5.x | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.1.3 | Utility-first styling |
| [tw-animate-css](https://github.com/joe-bell/tw-animate) | ^1.2.8 | CSS animation utilities |
| [GSAP](https://greensock.com/gsap/) | ^3.12.7 | Advanced scroll & animation |
| [Swiper](https://swiperjs.com/) | ^11.2.6 | Touch-enabled sliders & carousels |
| [React Fast Marquee](https://www.react-fast-marquee.com/) | ^1.6.5 | Marquee / infinite scroll |
| [Lucide React](https://lucide.dev/) | ^0.503.0 | Icon library |
| [React Icons](https://react-icons.github.io/react-icons/) | ^5.5.0 | Extended icon set |

### Backend & CMS
| Technology | Version | Purpose |
|---|---|---|
| [Contentful](https://www.contentful.com/) | ^11.5.22 | Headless CMS for all dynamic content |
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | built-in | Server-side API handlers |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ^9.0.2 | JWT signing & verification |
| [jwt-decode](https://github.com/auth0/jwt-decode) | ^4.0.0 | Client-side JWT decoding |
| [Cloudinary](https://cloudinary.com/) | via API | Profile image CDN uploads |

### UI Components & Utilities
| Technology | Purpose |
|---|---|
| [Radix UI](https://www.radix-ui.com/) | Accessible headless UI primitives (Dialog, Popover, Slot) |
| [cmdk](https://cmdk.paco.me/) | Command palette component |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Conditional class merging |
| [uuid](https://github.com/uuidjs/uuid) | Unique ID generation |
| [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) | Viewport-based animations |

### Dev Tools
| Tool | Purpose |
|---|---|
| ESLint + `eslint-config-next` | Code quality & linting |
| PostCSS + Autoprefixer | CSS processing |
| Lightning CSS | Fast CSS bundling |

---

## 🗂️ Project Structure

```
digireps-master/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── (solutions)/            # Solution-specific pages (route group)
│   │   │   ├── back-end-developer/
│   │   │   ├── customer-support-rep/
│   │   │   ├── digital-marketing-rep/
│   │   │   ├── executive-assistant/
│   │   │   ├── front-end-developer/
│   │   │   ├── leads-researcher/
│   │   │   ├── sales-development-rep/
│   │   │   └── ui-ux-designer/
│   │   ├── aboutus/                # About Us page
│   │   ├── api/revalidate/         # ISR revalidation endpoint
│   │   ├── auth/callback/          # Auth token callback handler
│   │   ├── contact/                # Contact page
│   │   ├── edit-profile/           # User profile edit page
│   │   ├── forget-password/        # Forgot password page
│   │   ├── portal/                 # Login / Sign Up portal
│   │   ├── privacy-policy/         # Privacy policy page (CMS-driven)
│   │   ├── profile/                # User profile view page
│   │   ├── terms-condition/        # Terms & Conditions page (CMS-driven)
│   │   ├── users/                  # User management routes
│   │   ├── verified/               # Email verification success page
│   │   ├── layout.tsx              # Root layout (Header, Footer, Providers)
│   │   └── page.tsx                # Homepage
│   ├── components/
│   │   ├── Headers/                # Header + navigation
│   │   ├── Footer/                 # Footer with CMS-driven contact & review logos
│   │   ├── Modals/                 # Book Consultation modal
│   │   ├── about/                  # About page sections (Stats, Team, etc.)
│   │   ├── contact/                # Contact page sections
│   │   ├── home/sections/          # Homepage sections
│   │   │   ├── Hero.tsx
│   │   │   ├── CompetitiveEdge.tsx
│   │   │   ├── EmpowerYourBusiness.tsx
│   │   │   ├── DigiRepsDifference.tsx
│   │   │   ├── PartnerLogos.tsx    # Swiper logo carousel
│   │   │   ├── SuccessStories.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── ...more
│   │   ├── metaData/               # Facebook Pixel integration
│   │   ├── policies/               # Privacy & Terms components
│   │   └── solutions/              # Reusable solution page components
│   ├── context/
│   │   ├── AuthContext.tsx         # JWT auth context (login, logout, auto-expiry)
│   │   └── ModalContext.tsx        # Global modal open/close state
│   └── instrumentation.ts          # Server startup hook (localStorage polyfill)
├── lib/
│   ├── contentful.js               # Lazy Contentful client factory
│   └── types/contentful.ts         # Contentful type definitions
├── public/                         # Static assets (images, scripts, fonts)
├── next.config.ts                  # Next.js config (serverExternalPackages, images)
├── tailwind.config.ts              # Tailwind configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x (recommended: use LTS; v25+ requires `--localstorage-file` workaround — handled automatically via `instrumentation.ts`)
- **npm** ≥ 9.x

### 1. Clone the Repository

```bash
git clone <repository-url>
cd digireps-master
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Contentful CMS
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN=your_delivery_access_token
NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN=your_preview_access_token

# Backend API base URL
NEXT_PUBLIC_URI=https://your-backend-api.com

# Cloudinary (for profile image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

> **Note:** Without Contentful credentials the app still runs but CMS-driven sections (footer, testimonials, partner logos, case studies) will render empty — this is handled gracefully via the mock client.

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## 🔐 Authentication

DigiReps uses a **custom JWT-based authentication** flow:

1. Users sign in via the `/portal` page.
2. On success, the backend returns a JWT token stored in `localStorage`.
3. `AuthContext` decodes the token, restores the session on page load, and schedules auto-logout on token expiry.
4. Protected routes (`/profile`, `/edit-profile`) redirect to `/portal` if no valid token is found.

**Auth routes:**
| Route | Description |
|---|---|
| `/portal` | Login / Sign Up page |
| `/auth/callback` | OAuth / magic link callback handler |
| `/forget-password` | Password reset request |
| `/verified` | Email verification confirmation |

---

## 🎨 Content Management (Contentful)

All dynamic content is managed via **Contentful** CMS. The following content types are used:

| Content Type ID | Used In |
|---|---|
| `footerContactDetails` | Footer — contact address, email, phone |
| `footerReviewsPlatform` | Footer — review platform logos (e.g. G2, Capterra) |
| `partnerLogos` | Homepage — partner logo slider |
| `solutionCards` | Homepage — service category cards |
| `digirepsDifferenceVideo` | Homepage — explainer video section |
| `homepageCaseStudies` | Homepage — success stories |
| `testimonial` | Testimonials section |
| `stats` | About / Homepage stats bar |
| `solutionsCaseStudies` | Solution pages — tagged case studies |
| `privacyPolicy` | Privacy Policy page |
| `termsAndConditions` | Terms & Conditions page |

---

## 🗺️ Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/aboutus` | About Us page |
| `/contact` | Contact page |
| `/portal` | Authentication portal |
| `/profile` | Authenticated user profile |
| `/edit-profile` | Edit user profile & portfolio |
| `/privacy-policy` | Privacy Policy |
| `/terms-condition` | Terms & Conditions |
| `/solutions/back-end-developer` | Backend Developer hiring page |
| `/solutions/front-end-developer` | Frontend Developer hiring page |
| `/solutions/ui-ux-designer` | UI/UX Designer hiring page |
| `/solutions/sales-development-rep` | Sales Development Rep hiring page |
| `/solutions/customer-support-rep` | Customer Support Rep hiring page |
| `/solutions/leads-researcher` | Leads Researcher hiring page |
| `/solutions/digital-marketing-rep` | Digital Marketing Rep hiring page |
| `/solutions/executive-assistant` | Executive Assistant hiring page |

---

## ⚙️ Key Configuration Notes

### Node.js v25 Compatibility

Node.js v25 introduces an experimental built-in `localStorage` object that is broken (non-functional) without the `--localstorage-file` flag. This causes third-party libraries like `contentful` to crash during SSR.

**Handled automatically via:**
- `src/instrumentation.ts` — polyfills `localStorage` at server startup before any request handler runs.
- `next.config.ts` — `serverExternalPackages: ['contentful']` prevents the contentful browser bundle from being processed by webpack for server-side code.

### Image Domains

Configured in `next.config.ts` to allow images from:
- `res.cloudinary.com` — user profile images
- `images.ctfassets.net` — Contentful media assets
- `lh3.googleusercontent.com` — Google profile pictures

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at http://localhost:3000 |
| `npm run build` | Build the production bundle |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint checks |

---

## 📄 License

This project is proprietary. All rights reserved © DigiReps.
