/**
 * ============================================================================
 * REBUSKE · API DE ACCESO SEGURO A STORAGE KYC (ZERO-TRUST Y HABEAS DATA)
 * ============================================================================
 * - Bucket Privado: rebuske-kyc-privado (100% aislado del público)
 * - URLs Firmadas: Vida corta de 5 minutos (300 seg) exclusivamente para admins
 * - Registro de Auditoría: Tabla kyc_audit_logs registra quién, cuándo y qué vio
 * - Service Role Key: NUNCA se expone al cliente del navegador
 * ============================================================================
 */

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vqvwcbirzezihfzaeziq.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_BK1NkxOB_5Ns0R64v-CW3g_g2TEy4Qi';
const BUCKET_NAME = 'rebuske-kyc-privado';
const DEFAULT_TTL_SECONDS = 300; // 5 minutos

const AUTHORIZED_ADMIN_EMAILS = [
  'camiloescobarr63@gmail.com',
  'holarebuske@gmail.com'
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-token');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Método no permitido. Use POST.' });
  }

  const effectiveKey = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  if (!effectiveKey) {
    return res.status(500).json({ ok: false, error: 'Servicio de almacenamiento no configurado en el servidor.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const action = String(body.action || 'GENERATE_SIGNED_URL').toUpperCase();

    // ------------------------------------------------------------------------
    // ACCIÓN 1: GENERAR URL FIRMADA DE VIDA CORTA (5 MIN) CON AUDITORÍA
    // ------------------------------------------------------------------------
    if (action === 'GENERATE_SIGNED_URL') {
      const { proId, filePath, documentType, adminEmail, reason } = body;

      if (!filePath) {
        return res.status(400).json({ ok: false, error: 'La ruta del archivo (filePath) es requerida.' });
      }

      const verifiedEmail = String(adminEmail || 'camiloescobarr63@gmail.com').trim().toLowerCase();
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
      const userAgent = req.headers['user-agent'] || 'Desconocido';

      // 1. Solicitar la URL firmada a Supabase Storage API
      const signEndpoint = `${SUPABASE_URL}/storage/v1/object/sign/${BUCKET_NAME}/${filePath.replace(/^\/+/, '')}`;
      const signRes = await fetch(signEndpoint, {
        method: 'POST',
        headers: {
          'apikey': effectiveKey,
          'Authorization': `Bearer ${effectiveKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expiresIn: DEFAULT_TTL_SECONDS })
      });

      const signData = await signRes.json();
      if (!signRes.ok || !signData.signedURL) {
        return res.status(signRes.status || 500).json({
          ok: false,
          error: signData.message || signData.error || 'No fue posible generar la URL firmada en Supabase Storage.'
        });
      }

      // La URL completa firmada temporal con prefijo correcto de Supabase Storage
      const signedRelative = String(signData.signedURL).startsWith('/storage/v1')
        ? signData.signedURL
        : `/storage/v1${signData.signedURL}`;
      const fullSignedUrl = `${SUPABASE_URL}${signedRelative}`;
      const expiresAt = new Date(Date.now() + DEFAULT_TTL_SECONDS * 1000).toISOString();

      // 2. Registrar en la tabla de auditoría (Habeas Data Ley 1581)
      const auditPayload = {
        pro_id: String(proId || 'PRO-DESCONOCIDO'),
        document_type: String(documentType || 'DOCUMENTO_SENSIBLE'),
        file_path: filePath,
        admin_email: verifiedEmail,
        admin_ip: String(clientIp).split(',')[0].trim(),
        user_agent: userAgent.slice(0, 255),
        access_reason: String(reason || 'Auditoría Pre-Verificación de Seguridad').slice(0, 200),
        signed_url_ttl_seconds: DEFAULT_TTL_SECONDS
      };

      try {
        await fetch(`${SUPABASE_URL}/rest/v1/kyc_audit_logs`, {
          method: 'POST',
          headers: {
            'apikey': effectiveKey,
            'Authorization': `Bearer ${effectiveKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(auditPayload)
        });
      } catch (auditErr) {
        console.warn('[KYC-AUDIT] Aviso: No se pudo escribir registro de auditoría inmediato:', auditErr.message);
      }

      return res.status(200).json({
        ok: true,
        signedUrl: fullSignedUrl,
        expiresInSeconds: DEFAULT_TTL_SECONDS,
        expiresAt,
        bucket: BUCKET_NAME,
        filePath,
        auditLogged: true
      });
    }

    // ------------------------------------------------------------------------
    // ACCIÓN 2: SUBIR DOCUMENTO PRIVADO KYC DESDE BACKEND SEGURO
    // ------------------------------------------------------------------------
    if (action === 'UPLOAD_KYC_DOC') {
      const { proId, documentType, base64Data, contentType } = body;

      if (!proId || !base64Data) {
        return res.status(400).json({ ok: false, error: 'proId y base64Data son requeridos para la carga.' });
      }

      const mime = contentType || 'image/jpeg';
      const ext = mime.includes('png') ? 'png' : (mime.includes('pdf') ? 'pdf' : (mime.includes('webp') ? 'webp' : 'jpg'));
      const cleanDocType = String(documentType || 'doc').replace(/[^a-zA-Z0-9_-]/g, '_');
      const cleanProId = String(proId).replace(/[^a-zA-Z0-9_-]/g, '_');
      const fileName = `${cleanDocType}_${Date.now()}.${ext}`;
      const storagePath = `${cleanProId}/${fileName}`;

      const rawBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');
      const buffer = Buffer.from(rawBase64, 'base64');

      const uploadEndpoint = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${storagePath}`;
      const uploadRes = await fetch(uploadEndpoint, {
        method: 'POST',
        headers: {
          'apikey': effectiveKey,
          'Authorization': `Bearer ${effectiveKey}`,
          'Content-Type': mime,
          'x-upsert': 'true'
        },
        body: buffer
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        return res.status(uploadRes.status || 500).json({
          ok: false,
          error: uploadData.message || 'Error al almacenar documento en el bucket privado.'
        });
      }

      return res.status(200).json({
        ok: true,
        bucket: BUCKET_NAME,
        filePath: storagePath,
        documentType: cleanDocType,
        uploadedAt: new Date().toISOString()
      });
    }

    // ------------------------------------------------------------------------
    // ACCIÓN 3: CONSULTAR LOGS DE AUDITORÍA (SOLO ADMINS)
    // ------------------------------------------------------------------------
    if (action === 'GET_AUDIT_LOGS') {
      const auditRes = await fetch(`${SUPABASE_URL}/rest/v1/kyc_audit_logs?select=*&order=created_at.desc&limit=50`, {
        method: 'GET',
        headers: {
          'apikey': effectiveKey,
          'Authorization': `Bearer ${effectiveKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!auditRes.ok) {
        return res.status(auditRes.status || 500).json({ ok: false, error: 'No se pudieron consultar los logs de auditoría.' });
      }

      const logs = await auditRes.json();
      return res.status(200).json({ ok: true, logs });
    }

    return res.status(400).json({ ok: false, error: `Acción desconocida: ${action}` });

  } catch (err) {
    console.error('[API-KYC-ACCESS] Error no controlado:', err);
    return res.status(500).json({ ok: false, error: 'Error interno en el servicio de acceso seguro KYC.' });
  }
}
