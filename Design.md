## Data Model
- organizations: id, name, slug (unique), owner_user_id, timestamps
- users: Breeze defaults
- organization_user: organization_id, user_id, role (Admin|Member), timestamps
- contacts: id, organization_id, first_name, last_name, email (nullable, unique per org, case-insensitive), phone, avatar_path (nullable), created_by, updated_by, timestamps
- contact_notes: id, contact_id, user_id, body (text), timestamps
- contact_meta: id, contact_id, key, value, timestamps (max 5 items per contact)

## Scoping Strategy (BelongsToOrganization)
- Trait adds a global scope to filter by `organization_id = CurrentOrganization::id()`.
- `creating` model event auto-sets `organization_id` to the current org.

## Current Organization
- Service: `CurrentOrganization` reads from session; fallback to the user’s first org; persists selection on switch.
- Middleware: `SetCurrentOrganization` hydrates service early; a second middleware can sync permission team/context if needed.

## Roles (spatie/laravel-permission)
- Roles: `Admin`, `Member`.
- Admin: manage organizations and contacts.
- Member: read contacts, add/edit/delete their own notes only.
- Policies/Gates enforce these capabilities in controllers.

## Routes (high level)
- `GET /healthz` → `{ ok: true }`
- Auth: Breeze routes
- Orgs:
  - `GET /orgs` (list), `POST /orgs` (create)
  - `POST /orgs/switch` (body: `organization_id`)
- Contacts (scoped to current org):
  - `GET /contacts` (searchable)
  - `GET /contacts/create`, `POST /contacts`
  - `GET /contacts/{contact}`, `GET /contacts/{contact}/edit`, `PUT/PATCH /contacts/{contact}`, `DELETE /contacts/{contact}`
  - `POST /contacts/{contact}/duplicate` (server-first flow; returns redirect)
- Notes (per contact):
  - `GET /contacts/{contact}/notes`
  - `POST /contacts/{contact}/notes`
  - `PUT/PATCH /contacts/{contact}/notes/{note}`
  - `DELETE /contacts/{contact}/notes/{note}`
