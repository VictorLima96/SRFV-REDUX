-- =============================================
-- SRFV REDUX - Esquema de Banco de Dados
-- Execute este SQL no SQL Editor do Supabase
-- =============================================

-- 1. Tabela de usuários (login/senha)
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL DEFAULT NOW()
);

-- Índice para buscas por email (login)
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

-- 2. Tabela de tokens de redefinição de senha
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    email VARCHAR(255) PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NOW()
);

-- 3. Tabela de jobs com falha (requisito do Laravel)
CREATE TABLE IF NOT EXISTS failed_jobs (
    id BIGSERIAL PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL UNIQUE,
    connection TEXT NOT NULL,
    queue TEXT NOT NULL,
    payload TEXT NOT NULL,
    exception TEXT NOT NULL,
    failed_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 4. Tabela de tokens de acesso pessoal (Laravel Sanctum)
CREATE TABLE IF NOT EXISTS personal_access_tokens (
    id BIGSERIAL PRIMARY KEY,
    tokenable_type VARCHAR(255) NOT NULL,
    tokenable_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    abilities TEXT NULL,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_personal_access_tokens_tokenable
    ON personal_access_tokens (tokenable_type, tokenable_id);

-- 5. Tabela de migrações (controle do Laravel)
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    migration VARCHAR(255) NOT NULL,
    batch INTEGER NOT NULL
);

-- Registrar as migrações como já executadas
INSERT INTO migrations (migration, batch) VALUES
    ('2014_10_12_000000_create_users_table', 1),
    ('2014_10_12_100000_create_password_reset_tokens_table', 1),
    ('2019_08_19_000000_create_failed_jobs_table', 1),
    ('2019_12_14_000001_create_personal_access_tokens_table', 1);
