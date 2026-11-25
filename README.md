# Siyer Sahne — İslami Tarih Shorts Motoru

**Tarihî olayları, saygılı ve sinematik 3D sahnelerle anlatmak için kare-kare video üretim sistemi.**

Bu depo artık yumurta kafa karakter animasyonu üretmeyi hedeflemez. Yeni görsel hedef; paylaşılan referanslardaki gibi sıcak ışıklı, tarihî mimarili, stilize fakat ciddi 3D tarih sahneleridir.

## Tasarım ilkeleri

- 9:16 dikey Shorts (varsayılan 1080×1920, 30 FPS).
- İnsan anatomisine yakın, ölçülü ve ciddi karakter tasarımları.
- Yumurta kafa, chibi, oyuncak/komik oranlar ve karikatür yüzler yok.
- Peygamber Efendimiz (s.a.v.) hiçbir koşulda karakter, silüet, gölge, ışık halesi veya kamera arkası figürü olarak temsil edilmez.
- Sahabe ve diğer dinî şahsiyetlerde yüz anatomisi/özelliği çizilmez. Varsayılan çekim arkadan, uzak silüet veya yüzün kadraj dışında kaldığı açıdır. Ayna, su, metal ve gölge yansımaları da kontrol edilmelidir.
- Şiddet ve savaş sahneleri grafik değildir; olayın ağırlığı mekân, ses, ışık ve kurgu ile aktarılır.
- Tarihî ayrıntılar senaryo kaynak notlarıyla doğrulanır; belirsiz ayrıntılar kesin bilgi gibi sunulmaz.

## Mimari

| Yol | Sorumluluk |
|---|---|
| `engine/src/main.js` | Three.js sahne yükleme, kare bazlı render, altyazı ve overlay |
| `engine/src/history/characters.js` | Yüzsüz, arkadan/yan silüet karakter yapı taşları |
| `engine/src/history/environment.js` | Tarihî çöl, kale, kamp ve mimari yapı taşları |
| `engine/src/history/policy.js` | Dinî şahsiyetlerin görselleştirilmesine ilişkin zorunlu kurallar |
| `engine/src/post.js` | Renk düzenleme, alan derinliği, bloom ve kompozit |
| `engine/src/camera.js` | Kamera hareketleri |
| `stories/hayber-sancagi/` | İlk örnek hikâye: Hayber ve sancağın Hz. Ali'ye (r.a.) verilmesi |
| `tools/` | Ses kelime zamanlaması, sessizlik düzenleme ve ses zarfı araçları |

Eski yumurta kafa çizim kodu `engine/src/toon.js` geçmiş projeye ait kaynak olarak tutulur; yeni tarih hikâyeleri tarafından kullanılmaz.

## Kurulum

Gerekenler: Node.js 18+, Python 3.10+, FFmpeg ve Google Chrome/Chromium.

```bash
cd engine
npm ci
pip install -r ../requirements.txt
```

Chrome yolu otomatik bulunamazsa `CHROME_PATH` ortam değişkenini ayarlayın.

## İlk örneği çalıştırma

```bash
cd engine
node render.mjs hayber-sancagi --stills=2,10,20,30,40,50 --scale=0.5
node render.mjs hayber-sancagi --scale=0.5
node render.mjs hayber-sancagi
```

Hikâye dosyaları `stories/<hikâye-adı>/` altında tutulur. Her hikâyede `story.js`, `voice/words.json` ve isteğe bağlı ses dosyaları bulunur. Seslendirme eklemek için `stories/<hikâye-adı>/voice/voice.wav` dosyasını yerleştirin. Render motoru önce `audio/mix.wav`, yoksa `voice/voice.wav` dosyasını otomatik olarak videoya ekler. Kelime zamanlarını üretmek için:

```bash
python ../tools/kelime_saat.py ../stories/<hikâye-adı>/voice/voice.wav ../stories/<hikâye-adı>/voice/script.txt ../stories/<hikâye-adı>/voice/words.json
```

Render çıktıları `stories/<hikâye-adı>/out/` klasörüne yazılır. `--stills` seçeneği sahne kontrol görselleri üretir; `--scale=0.5` taslak render içindir. FFmpeg hata kodu sıfır değilse işlem başarısız sayılır.

## Yeni hikâye üretim akışı

1. Kaynakları doğrula; rivayetin sıhhat derecesini ve farklı lafızları not et.
2. 45–60 saniyelik anlatı metnini hazırla.
3. Metni 5–8 görsel sahneye böl.
4. Her sahne için mekân, karakter, kamera, ışık, ses ve altyazı tanımla.
5. Dinî şahsiyet politikası kontrolünü uygula.
6. Önce düşük çözünürlüklü still render al; kadrajları incele.
7. Ses ve altyazı senkronunu kontrol et, sonra tam render al.

## Lisans ve kaynak

Kod MIT lisansını korur. Tarihî kıyafet, mimari ve olay tasvirlerinde doğrulanmamış ayrıntıları belgelemeyin veya tarihî gerçek gibi sunmayın. Üçüncü taraf referans görsellerinin hakları ilgili sahiplerinde kalır.
