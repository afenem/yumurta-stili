# Siyer Sahne — Shorts üretim becerisi

Bu depo, İslami tarih ve siyer konularını ciddi, saygılı ve sinematik 3D dikey videolara dönüştürür. Yumurta kafa stilini kullanma.

## Başlamadan önce
1. `README.md` ve `HISTORY_STYLE_GUIDE.md` dosyalarını oku.
2. `engine/src/history/policy.js` kurallarını uygula.
3. Rivayetin kaynağını, sıhhat derecesini ve kullanılan tercümeyi doğrula.
4. Ses metnini 45–60 saniyeye göre düzenle; tarihî bilgi ekleme/çıkarma yapma.

## Değişmez görsel güvenlik
- Peygamber Efendimiz (s.a.v.) hiçbir biçimde görselleştirilmez. Beden, figür, silüet, gölge, yansıma, ışıkla insan şekli veya temsili vekil kullanılmaz.
- Sahabe ve dinî şahsiyetlerin yüz özellikleri gösterilmez. Varsayılan olarak arkadan çekim, yüzsüz baş örtüsü/siluet, uzak plan veya yüzün kadraj dışında kaldığı detay çekimleri kullanılır.
- Su, ayna, parlak metal ve duvar gölgeleri dâhil yansımaları kontrol et.
- Yumurta kafa, chibi, oyuncak oranı, komik yüz ve abartılı karikatür yok.
- Şiddet grafik değildir.

## Stil
- Stilize fakat ciddi 3D; gerçekçi insan oranları.
- Kerpiç/taş mimari, çadır, hurmalık, çöl, tarihî iç mekân.
- Kum, kil, zeytin, keten ve koyu ahşap renk paleti.
- Sıcak doğal ışık, kandil ışığı, yumuşak gölge ve kontrollü alan derinliği.
- 9:16 dikey kadraj; yavaş kamera hareketleri; 3–6 saniyede bir anlamlı görsel değişim.

## Üretim
1. `stories/<slug>/story.js` oluştur; `setup(ctx)` ve `frame(t, ctx)` dışa aktar.
2. Görselleri `engine/src/history/` yapı taşlarıyla kur.
3. Ses metni ve kelime zamanlarını `voice/script.txt` ve `voice/words.json` içinde tut.
4. Düşük çözünürlükte still render al.
5. Tüm kareleri yüz güvenliği, tarihî tutarlılık ve altyazı açısından incele.
6. Ses ve FFmpeg render testini tamamla.

## Komutlar
```bash
cd engine
node render.mjs hayber-sancagi --stills=2,10,20,30,40,50 --scale=0.5
node render.mjs hayber-sancagi
```
