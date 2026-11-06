-- ========================================================
-- REBUSKE · SUPABASE ZERO-TRUST KYC STORAGE SETUP (CORREGIDO)
-- 100% COMPATIBLE CON SUPABASE PLAN GRATUITO ($0 COP / $0 USD)
-- ========================================================

-- 1. CREAR O ACTUALIZAR BUCKET PRIVADO (10 MB máx, totalmente privado)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'rebuske-kyc-privado',
  'rebuske-kyc-privado',
  false, -- 100% PRIVADO
  10485760, -- 10 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

-- NOTA: storage.objects ya tiene RLS activado por defecto en Supabase por el sistema.
-- NO se debe ejecutar ALTER TABLE storage.objects.

-- 2. POLÍTICAS DE SEGURIDAD EN STORAGE.OBJECTS PARA REBUSKE-KYC-PRIVADO
DROP POLICY IF EXISTS "Solo administradores y service_role leen documentos KYC" ON storage.objects;
DROP POLICY IF EXISTS "Solo backend autorizado inserta documentos KYC" ON storage.objects;
DROP POLICY IF EXISTS "Solo backend autorizado elimina documentos KYC" ON storage.objects;

-- Lectura solo para service_role o correos administradores
CREATE POLICY "Solo administradores y service_role leen documentos KYC"
ON storage.objects FOR SELECT
TO authenticated, service_role
USING (
  bucket_id = 'rebuske-kyc-privado'
  AND (
    auth.role() = 'service_role'
    OR (auth.jwt() ->> 'email' IN ('camiloescobarr63@gmail.com', 'holarebuske@gmail.com'))
  )
);

-- Inserción solo por backend o admin
CREATE POLICY "Solo backend autorizado inserta documentos KYC"
ON storage.objects FOR INSERT
TO authenticated, service_role
WITH CHECK (
  bucket_id = 'rebuske-kyc-privado'
  AND (
    auth.role() = 'service_role'
    OR (auth.jwt() ->> 'email' IN ('camiloescobarr63@gmail.com', 'holarebuske@gmail.com'))
  )
);

-- Eliminación solo por service_role (bajas y solicitudes de olvido)
CREATE POLICY "Solo backend autorizado elimina documentos KYC"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'rebuske-kyc-privado');


-- ========================================================
-- 3. TABLA DE AUDITORÍA DE ACCESOS KYC (HABEAS DATA LEY 1581)
-- ========================================================
CREATE TABLE IF NOT EXISTS public.kyc_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pro_id TEXT NOT NULL,
  document_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  admin_email TEXT NOT NULL,
  admin_ip TEXT,
  user_agent TEXT,
  access_reason TEXT DEFAULT 'Verificación de Identidad Pre-Auditoría KYC',
  signed_url_ttl_seconds INT DEFAULT 300,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS en la tabla propia de auditoría
ALTER TABLE public.kyc_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Solo service_role y admins ven auditoria KYC" ON public.kyc_audit_logs;
CREATE POLICY "Solo service_role y admins ven auditoria KYC"
ON public.kyc_audit_logs FOR ALL
TO service_role, authenticated
USING (
  auth.role() = 'service_role'
  OR (auth.jwt() ->> 'email' IN ('camiloescobarr63@gmail.com', 'holarebuske@gmail.com'))
);

CREATE INDEX IF NOT EXISTS idx_kyc_audit_pro_id ON public.kyc_audit_logs (pro_id);
CREATE INDEX IF NOT EXISTS idx_kyc_audit_created_at ON public.kyc_audit_logs (created_at DESC);
