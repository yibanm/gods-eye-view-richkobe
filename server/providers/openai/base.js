/**
 * OpenAI 兼容端点的 base URL。
 *
 * 默认官方 `https://api.openai.com/v1`；设置环境变量 `OPENAI_BASE_URL` 可指向任意
 * OpenAI 兼容中转（例如国内可达的网关），具体路径后缀（`/chat/completions`、
 * `/responses`、`/realtime/...`）由各调用方拼接。
 *
 * 兼容用户填写时的常见形态：带或不带 `/v1`、带或不带尾部斜杠。
 * 只做 URL 形态归一，不校验可达性（可达性由实际请求暴露）。
 *
 * @param {Record<string,string|undefined>} [environment]
 * @returns {string} 以 `/vN` 结尾、无尾部斜杠的 base URL
 */
export function openAiApiBase(environment = process.env) {
  const raw = String(environment?.OPENAI_BASE_URL || '').trim();
  if (!raw) return 'https://api.openai.com/v1';
  const trimmed = raw.replace(/\/+$/, '');
  return /\/v\d+$/.test(trimmed) ? trimmed : `${trimmed}/v1`;
}
