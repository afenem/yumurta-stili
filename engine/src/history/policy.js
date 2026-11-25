/**
 * Tarihî/dinî şahsiyet görselleştirme politikası.
 * Bu modül tasarım ve kod seviyesinde güvenli varsayılanları merkezileştirir.
 *
 * Önemli: Üretken görsel araçları için yazılan promptlarda da bu kurallar açıkça
 * belirtilmelidir. Kod tek başına her yansıma/kompozisyon hatasını tespit edemez.
 */
export const SACRED_VISUAL_POLICY = Object.freeze({
  prophetDepiction: 'forbidden',
  companionFaceDetails: 'forbidden',
  companionDefaultView: 'rear-or-silhouette',
  reflectionChecks: true,
  noSubstituteRepresentation: true,
  noEggHeadOrChibi: true,
});

export function assertHistoryCharacterSpec(spec) {
  if (!spec || typeof spec !== 'object') throw new TypeError('Karakter tanımı bir nesne olmalıdır.');
  if (spec.role === 'prophet' || spec.isProphet === true) {
    throw new Error('Peygamber Efendimiz (s.a.v.) görsel olarak temsil edilemez.');
  }
  if (spec.isSacredFigure && spec.faceVisible === true) {
    throw new Error('Dinî şahsiyetlerin yüzü gösterilemez.');
  }
  if (spec.style && /egg.?head|chibi|toy|cartoon.?face/i.test(spec.style)) {
    throw new Error('Yumurta kafa, chibi, oyuncak veya karikatür yüz stili kullanılamaz.');
  }
  return true;
}

export function historyPromptRules() {
  return [
    'Cinematic stylized 3D historical scene, vertical 9:16.',
    'Natural human proportions, dignified adult character design, detailed period-appropriate fabric.',
    'No egg-head, no chibi, no toy-like proportions, no comic facial expressions.',
    'No visible facial features for companions or sacred historical figures; use rear view or distant silhouette.',
    'Never depict Prophet Muhammad in any form: no body, silhouette, shadow, reflection, glowing human outline, or stand-in.',
    'Check mirrors, water, polished metal, and cast shadows for accidental face visibility.',
    'Warm natural light, tactile mud-brick architecture, restrained cinematic depth of field.',
  ].join(' ');
}
