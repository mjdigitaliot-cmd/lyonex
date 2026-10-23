# LYONEX Build Status

## Scope
Production-grade protein and sports nutrition e-commerce platform for India with COD-only checkout, black-and-gold brand theme, customer storefront, and secure admin panel.

## Current phase
Phase 1 started.

## Completed in this commit batch
- Project foundation (Next.js + TypeScript)
- Tailwind and base theme tokens (black + gold)
- Prisma schema baseline with COD-only payment method enum and order status lifecycle
- Initial auth options scaffold (credentials)
- Role-permission utility and characterization test
- Local PostgreSQL compose setup
- Environment variable template

## Pending (next commits)
- Migrations + seed
- Store settings module + first-time setup wizard
- Full RBAC-protected admin routes and APIs
- Product/category/brand/inventory modules
- Storefront pages and search/filter
- Cart + coupon engine + COD checkout
- Order tracking + returns/replacements
- Reports, CMS, notifications, SEO, testing, deployment docs

## Notes
- No payment gateways will be added. COD remains the only checkout method.
- Production secrets must stay in environment variables and never be committed.
