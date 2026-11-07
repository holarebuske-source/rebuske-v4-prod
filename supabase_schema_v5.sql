-- ============================================================================
-- REBUSKE v5 · ESQUEMA DE PRODUCCIÓN SUPABASE (PERSISTENCIA Y BLINDAJE FISCAL)
-- ============================================================================
-- Migración Idempotente y Resiliente (Soporta tablas preexistentes sin colisión)
-- Medellín - Valle de Aburrá
-- ============================================================================

-- 1. TABLA OFICIAL: REGISTRO DE TÉCNICOS PRIMORDIALES Y ESTÁNDAR
CREATE TABLE IF NOT EXISTS public.primordiales_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Asegurar todas las columnas necesarias (idempotente)
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS cupo_numero INT;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS nombre TEXT;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS tel TEXT;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS oficio TEXT;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS zona TEXT;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS cedula TEXT;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS banco TEXT;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS nacimiento TEXT;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS exp TEXT DEFAULT '3';
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS tipo TEXT DEFAULT 'PRIMORDIAL';
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS plan_nombre TEXT DEFAULT 'ORO_VIP';
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS comision_pct NUMERIC(5,2) DEFAULT 11.00;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS neto_pct NUMERIC(5,2) DEFAULT 89.00;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS mes1_comision_pct NUMERIC(5,2) DEFAULT 1.00;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS mes1_neto_pct NUMERIC(5,2) DEFAULT 99.00;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS insignia TEXT DEFAULT 'Oro VIP Primordial';
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS foto_kyc_path TEXT;

-- Blindaje Legal y Fiscal (Mandato Comercial Art. 1262 C.Co / DUR 1625/2016)
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS mandato_aceptado BOOLEAN DEFAULT TRUE;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS mandato_hash TEXT;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS mandato_timestamp TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS mandato_ip TEXT;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS mandato_version TEXT DEFAULT 'v5-Art1262CCo';

-- Autorizaciones Legales y Habeas Data (Ley 1581 de 2012)
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS autorizo_terminos BOOLEAN DEFAULT TRUE;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS autorizo_datos_sensibles BOOLEAN DEFAULT TRUE;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS autorizo_antecedentes BOOLEAN DEFAULT TRUE;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS antecedentes_estado TEXT DEFAULT 'APTO_SIN_REPORTES_PENDIENTE_COTEJO';
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS antecedentes_fecha_consulta TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE public.primordiales_registrations ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Índices estratégicos
CREATE INDEX IF NOT EXISTS idx_primordiales_cedula ON public.primordiales_registrations (cedula);
CREATE INDEX IF NOT EXISTS idx_primordiales_tel ON public.primordiales_registrations (tel);
CREATE INDEX IF NOT EXISTS idx_primordiales_cupo ON public.primordiales_registrations (cupo_numero);
CREATE INDEX IF NOT EXISTS idx_primordiales_oficio ON public.primordiales_registrations (oficio);


-- 2. TABLA OFICIAL: LIBRO MAYOR FINTECH (WALLET LEDGER / WOMPI)
CREATE TABLE IF NOT EXISTS public.wallet_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Asegurar todas las columnas de la pasarela Wompi y DIAN
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS reference TEXT;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS job_id TEXT;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS wompi_tx_id TEXT;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'PENDING';
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS total_cop NUMERIC(14,2) DEFAULT 0;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS split_pro NUMERIC(14,2) DEFAULT 0;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS split_rebuske NUMERIC(14,2) DEFAULT 0;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS protection_fee_cop NUMERIC(14,2) DEFAULT 4900.00;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS pro_plan TEXT DEFAULT 'ORO';
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS pro_cedula TEXT;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS customer_phone TEXT;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS mandato_receipt_id TEXT;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS raw_dian JSONB;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS raw_wompi_event JSONB;
ALTER TABLE public.wallet_ledger ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_wallet_ledger_reference ON public.wallet_ledger (reference);
CREATE INDEX IF NOT EXISTS idx_wallet_ledger_status ON public.wallet_ledger (status);
CREATE INDEX IF NOT EXISTS idx_wallet_ledger_created_at ON public.wallet_ledger (created_at DESC);


-- 3. TABLA OFICIAL: ALERTAS DE DESPACHO INMEDIATO (RADAR MEDELLÍN)
CREATE TABLE IF NOT EXISTS public.dispatch_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.dispatch_alerts ADD COLUMN IF NOT EXISTS servicio TEXT;
ALTER TABLE public.dispatch_alerts ADD COLUMN IF NOT EXISTS comuna TEXT;
ALTER TABLE public.dispatch_alerts ADD COLUMN IF NOT EXISTS direccion TEXT;
ALTER TABLE public.dispatch_alerts ADD COLUMN IF NOT EXISTS cliente_telefono TEXT;
ALTER TABLE public.dispatch_alerts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'BUSCANDO';
ALTER TABLE public.dispatch_alerts ADD COLUMN IF NOT EXISTS sla_min INT DEFAULT 45;
ALTER TABLE public.dispatch_alerts ADD COLUMN IF NOT EXISTS tecnico_asignado_cedula TEXT;
ALTER TABLE public.dispatch_alerts ADD COLUMN IF NOT EXISTS ip_origen TEXT;

CREATE INDEX IF NOT EXISTS idx_dispatch_comuna ON public.dispatch_alerts (comuna);
CREATE INDEX IF NOT EXISTS idx_dispatch_status ON public.dispatch_alerts (status);


-- 4. FUNCIÓN ATÓMICA RPC ANTI-CONDICIONES DE CARRERA (RACE CONDITIONS)
CREATE OR REPLACE FUNCTION public.registrar_pro_primordial_atomico(
  p_nombre TEXT,
  p_tel TEXT,
  p_oficio TEXT,
  p_zona TEXT,
  p_cedula TEXT,
  p_banco TEXT,
  p_nacimiento TEXT,
  p_exp TEXT,
  p_mandato_hash TEXT,
  p_mandato_ip TEXT,
  p_user_agent TEXT,
  p_foto_kyc_path TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_next_cupo INT;
  v_is_primordial BOOLEAN;
  v_tipo TEXT;
  v_insignia TEXT;
  v_comision NUMERIC(5,2);
  v_neto NUMERIC(5,2);
  v_mes1_comision NUMERIC(5,2);
  v_mes1_neto NUMERIC(5,2);
  v_new_id UUID;
  v_existing_pro RECORD;
BEGIN
  -- Verificar si la cédula ya existe para prevenir duplicidad
  SELECT * INTO v_existing_pro FROM public.primordiales_registrations WHERE cedula = p_cedula LIMIT 1;
  IF FOUND THEN
    RETURN jsonb_build_object(
      'ok', true,
      'ya_registrado', true,
      'id', v_existing_pro.id,
      'cupoNumero', v_existing_pro.cupo_numero,
      'tipo', v_existing_pro.tipo,
      'insignia', v_existing_pro.insignia,
      'comision', v_existing_pro.comision_pct || '%',
      'neto', v_existing_pro.neto_pct || '%',
      'mes1Comision', v_existing_pro.mes1_comision_pct || '%'
    );
  END IF;

  -- Bloqueo a nivel de tabla para evitar colisiones en concurrencia
  LOCK TABLE public.primordiales_registrations IN EXCLUSIVE MODE;

  -- Calcular el siguiente cupo secuencial
  SELECT COALESCE(MAX(cupo_numero), 84) + 1 INTO v_next_cupo FROM public.primordiales_registrations;

  IF v_next_cupo <= 100 THEN
    v_is_primordial := TRUE;
    v_tipo := 'PRIMORDIAL';
    v_insignia := 'Oro VIP Primordial';
    v_comision := 11.00;
    v_neto := 89.00;
    v_mes1_comision := 1.00;
    v_mes1_neto := 99.00;
  ELSE
    v_is_primordial := FALSE;
    v_tipo := 'ESTANDAR';
    v_insignia := 'Estándar Bronce';
    v_comision := 18.00;
    v_neto := 82.00;
    v_mes1_comision := 18.00;
    v_mes1_neto := 82.00;
  END IF;

  INSERT INTO public.primordiales_registrations (
    cupo_numero,
    nombre,
    tel,
    oficio,
    zona,
    cedula,
    banco,
    nacimiento,
    exp,
    tipo,
    plan_nombre,
    comision_pct,
    neto_pct,
    mes1_comision_pct,
    mes1_neto_pct,
    insignia,
    foto_kyc_path,
    mandato_aceptado,
    mandato_hash,
    mandato_ip,
    user_agent
  ) VALUES (
    v_next_cupo,
    p_nombre,
    p_tel,
    p_oficio,
    p_zona,
    p_cedula,
    p_banco,
    p_nacimiento,
    p_exp,
    v_tipo,
    CASE WHEN v_is_primordial THEN 'ORO_VIP' ELSE 'BRONCE' END,
    v_comision,
    v_neto,
    v_mes1_comision,
    v_mes1_neto,
    v_insignia,
    p_foto_kyc_path,
    TRUE,
    p_mandato_hash,
    p_mandato_ip,
    p_user_agent
  ) RETURNING id INTO v_new_id;

  RETURN jsonb_build_object(
    'ok', true,
    'ya_registrado', false,
    'id', v_new_id,
    'cupoNumero', v_next_cupo,
    'tipo', v_tipo,
    'insignia', v_insignia,
    'comision', v_comision || '%',
    'neto', v_neto || '%',
    'mes1Comision', v_mes1_comision || '%',
    'remaining', GREATEST(0, 100 - v_next_cupo)
  );
END;
$$;

-- 5. FUNCIÓN RPC PARA CONSULTA DE ESTADO EN TIEMPO REAL
CREATE OR REPLACE FUNCTION public.obtener_estado_cupos_primordiales()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current INT;
  v_remaining INT;
  v_is_open BOOLEAN;
BEGIN
  SELECT COALESCE(MAX(cupo_numero), 84) INTO v_current FROM public.primordiales_registrations;
  v_remaining := GREATEST(0, 100 - v_current);
  v_is_open := v_current < 100;

  RETURN jsonb_build_object(
    'totalPrimordiales', 100,
    'currentCount', v_current,
    'remaining', v_remaining,
    'isOpen', v_is_open,
    'phase', CASE WHEN v_is_open THEN 'FASE 1 - CONVOCATORIA PRIMORDIALES' ELSE 'FASE 2 - REGISTRO REGULAR ESTÁNDAR' END
  );
END;
$$;

-- 6. POLÍTICAS DE SEGURIDAD RLS (ROW LEVEL SECURITY)
ALTER TABLE public.primordiales_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role tiene acceso total a primordiales" ON public.primordiales_registrations;
CREATE POLICY "Service role tiene acceso total a primordiales"
ON public.primordiales_registrations FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Service role tiene acceso total a wallet_ledger" ON public.wallet_ledger;
CREATE POLICY "Service role tiene acceso total a wallet_ledger"
ON public.wallet_ledger FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Service role tiene acceso total a dispatch_alerts" ON public.dispatch_alerts;
CREATE POLICY "Service role tiene acceso total a dispatch_alerts"
ON public.dispatch_alerts FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

GRANT EXECUTE ON FUNCTION public.registrar_pro_primordial_atomico TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.obtener_estado_cupos_primordiales TO anon, authenticated, service_role;
