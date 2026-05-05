-- =====================================================================
-- Hotel Transilvânia — Schema inicial
-- Rode este arquivo no SQL Editor do Supabase (uma vez).
-- =====================================================================

-- ---------- ROOMS ----------------------------------------------------
create table if not exists public.rooms (
    id uuid primary key default gen_random_uuid(),
    number varchar not null unique,
    type varchar not null check (type in ('single', 'double', 'suite', 'deluxe')),
    floor int,
    capacity int default 2,
    price_per_night decimal(10, 2) not null,
    status varchar default 'available' check (status in ('available', 'reserved', 'occupied', 'maintenance', 'unavailable')),
    amenities jsonb default '[]'::jsonb,
    description text,
    created_at timestamptz default now()
);

create index if not exists idx_rooms_status on public.rooms (status);
create index if not exists idx_rooms_type on public.rooms (type);

-- ---------- GUESTS ---------------------------------------------------
create table if not exists public.guests (
    id uuid primary key default gen_random_uuid(),
    full_name varchar not null,
    email varchar unique,
    phone varchar,
    document_type varchar check (document_type in ('cpf', 'passport', 'rg')),
    document_number varchar,
    nationality varchar default 'BR',
    created_at timestamptz default now()
);

create index if not exists idx_guests_email on public.guests (email);
create index if not exists idx_guests_document on public.guests (document_number);

-- ---------- RESERVATIONS ---------------------------------------------
create table if not exists public.reservations (
    id uuid primary key default gen_random_uuid(),
    room_id uuid not null references public.rooms (id) on delete restrict,
    guest_id uuid not null references public.guests (id) on delete restrict,
    check_in date not null,
    check_out date not null,
    status varchar default 'confirmed' check (status in ('confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show')),
    adults int default 1,
    children int default 0,
    total_price decimal(10, 2),
    notes text,
    cancelled_at timestamptz,
    cancellation_reason text,
    created_by uuid references auth.users (id),
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint valid_dates check (check_out > check_in)
);

create index if not exists idx_reservations_room on public.reservations (room_id);
create index if not exists idx_reservations_guest on public.reservations (guest_id);
create index if not exists idx_reservations_status on public.reservations (status);
create index if not exists idx_reservations_dates on public.reservations (check_in, check_out);

-- ---------- ROOM STATUS LOG (Observer pattern) -----------------------
create table if not exists public.room_status_log (
    id uuid primary key default gen_random_uuid(),
    room_id uuid not null references public.rooms (id) on delete cascade,
    previous_status varchar,
    new_status varchar not null,
    changed_by uuid references auth.users (id),
    reason text,
    changed_at timestamptz default now()
);

create index if not exists idx_room_status_log_room on public.room_status_log (room_id);

-- ---------- TRIGGER: updated_at em reservations ----------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists trg_reservations_updated_at on public.reservations;
create trigger trg_reservations_updated_at
    before update on public.reservations
    for each row execute function public.set_updated_at();

-- =====================================================================
-- ROW LEVEL SECURITY
-- Política: usuários autenticados podem ler/escrever em tudo.
-- (Refinar quando houver papéis: admin, recepcionista, etc.)
-- =====================================================================
alter table public.rooms enable row level security;
alter table public.guests enable row level security;
alter table public.reservations enable row level security;
alter table public.room_status_log enable row level security;

-- ROOMS
drop policy if exists "rooms_authenticated_all" on public.rooms;
create policy "rooms_authenticated_all" on public.rooms
    for all to authenticated
    using (true) with check (true);

-- GUESTS
drop policy if exists "guests_authenticated_all" on public.guests;
create policy "guests_authenticated_all" on public.guests
    for all to authenticated
    using (true) with check (true);

-- RESERVATIONS
drop policy if exists "reservations_authenticated_all" on public.reservations;
create policy "reservations_authenticated_all" on public.reservations
    for all to authenticated
    using (true) with check (true);

-- ROOM STATUS LOG (read-only do front; escrita só pelo backend service-role)
drop policy if exists "room_status_log_authenticated_read" on public.room_status_log;
create policy "room_status_log_authenticated_read" on public.room_status_log
    for select to authenticated
    using (true);
