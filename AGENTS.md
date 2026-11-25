# Ajan yönergeleri

Bu depo İslami tarih ve siyer temalı dikey Shorts videoları üretir. Önce `README.md`, sonra `HISTORY_STYLE_GUIDE.md` ve `engine/src/history/policy.js` dosyalarını oku.

## Değişmez kurallar
- Yumurta kafa/chibi/oyuncak karakter estetiğine dönme.
- Peygamber Efendimiz (s.a.v.) görsel olarak temsil edilmez; figür, silüet, gölge, yansıma veya ışık halesi üretme.
- Sahabe ve diğer dinî şahsiyetlerin yüz özelliklerini üretme. Güvenli varsayılan: arkadan kadraj, yüzü örtülü/karanlık silüet veya yüzün kadraj dışında kalması.
- Yüzü gizlemek için kullanılan ışık, yüzün şeklini/özelliklerini ortaya çıkarmamalı.
- Rivayet metinlerini uydurma; kaynak ve lafız notlarını senaryoda tut.
- Şiddeti grafikleştirme.
- Yeni hikâyelerde `toon.js` kullanma.

## Geliştirme
- Three.js sahneleri `story.js` içinden `setup(ctx)` ve `frame(t, ctx)` ile sürülür.
- Render kare bazlı ve deterministik olmalı.
- Önce `--scale=0.5 --stills=...` ile kontrol kareleri üret.
- Her yeni karakter veya sahnede yüz güvenliği ve tarihî tutarlılık kontrolü yap.
