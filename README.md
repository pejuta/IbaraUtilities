# IbaraUtilities
[pejuta(ENo.411, @11powder)](https://twitter.com/11powder)の制作したイバラシティ向けの便利なユーザースクリプト等のツールを置いてます。

## UserScripts
### UserScriptって何？
ユーザーが作成したスクリプト（プログラム）をブラウザで実行する為の仕組みのことです。そのスクリプト自体もユーザースクリプトと呼ばれます。
ブラウザごとに利用可能な**「アドオン」**の親戚のようなものですね。
### で、UserScriptってどうやって使うの？
1. Google Chrome / Firefoxなどのモダンブラウザをインストールします。（なければ）
2. 次のアドオンを使用したいブラウザごとに**一つだけ**インストールします。
- Google Chrome
[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
[Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)
- Firefox
[Tampermonkey](https://addons.mozilla.org/ja/firefox/addon/tampermonkey/)
[Violentmonkey](https://addons.mozilla.org/ja/firefox/addon/violentmonkey/)
(Greasemonkeyには対応していません。)
3. 以下の一覧からインストールしたいスクリプトを選び、見出しをクリックすると「スクリプトをインストールする画面」が表示されますので、インストールボタンをクリックします。
（この画面でインストール前にスクリプトの中身を確認することができます。）

### おすすめのユーザースクリプトは？
全部…と言いたいところですが、とりわけおすすめなのは次の5つです。
スクリプトごとの詳細はこのページの下にある一覧にありますので、そちらを参照してください。
[IbaraTalkUtil.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraTalkUtil.user.js)
[IbaraSerifUtil.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraSerifUtil.user.js)
[IbaraCrossRoseSengenReviewer.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraCrossRoseSengenReviewer.user.js)
[IbaraBasicActionMiniMap.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraBasicActionMiniMap.user.js)
[IbaraSeisanPasta.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraSeisanPasta.user.js)

## UserScript一覧

### [IbaraAddNameToSengens.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraAddNameToSengens.user.js)
- 宣言をざっくり確認する項目の一番上に自分のキャラクターの名称/ENo.を追加し誰の宣言であるかを明確にします。

### [IbaraBBSCharaLinker.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraBBSCharaLinker.user.js)
- 各公式BBSの投稿者の名前に含まれている数字をENo.として、該当キャラクターへのリンクを生成します。

### [IbaraBasicActionMiniMap.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraBasicActionMiniMap.user.js)
- 基本行動：移動宣言にミニマップを追加し入力した通りの移動の軌跡を表示します。（壁ドン池ポチャ判定はないので注意です。）

### [IbaraCrossRoseSengenReviewer.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraCrossRoseSengenReviewer.user.js)
- Cross RoseのHome画面で全ての「ざっくり宣言確認」を確認できるようにします。

### [IbaraFavChars.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraFavChars.user.js)
- キャラクター一覧、キャラクター結果、およびTalkページでキャラクターをお気に入り登録できるようになります。
- キャラクター一覧ページでお気に入り登録したキャラクターの一覧を確認することが出来ます。

### [IbaraMapOverlayer.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraMapOverlayer.user.js)
- ハザマ地図上に公式プレイスを表示します。

### [IbaraMarkYourCurrentLocation.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraMarkYourCurrentLocation.user.js)
- ハザマ地図上にあなたのキャラクターの現在位置を表示します。

### [IbaraResultCollapser.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraResultCollapser.user.js)
- キャラクター結果の各項目を折りたたんで表示します。

### [IbaraSeisanPasta.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraSeisanPasta.user.js)
- 生産仕様や生産宣言の共有・入力を手助けするツールです。

### [IbaraSengenConflictAware.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraSengenConflictAware.user.js)
- 複数ウィンドウで同じ宣言ページを開いている際に発生しがちな宣言の衝突を**回避**できるようになります。

### [IbaraShowProcessNumber.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraShowProcessNumber.user.js)
- 基本行動・取引行動宣言ページの該当項目に処理順を表示します。

### [IbaraTalkUtil.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraTalkUtil.user.js)
- リアルタイム交流ページで発言内容のプレビューを動的に表示したり、タグの入力を簡単に行えるようにします。
- 発言を「ふぁぼる」ことができるようになります。

### [IbaraSerifUtil.user.js](https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraSerifUtil.user.js)
- IbaraTalkUtilのセリフ版です。およそのページでのセリフ/メッセージ入力に対応しています。
- セリフ入力欄で改行入力を可能にします。

## Pages
### [fullmap.html](https://pejuta.github.io/IbaraUtilities/Pages/fullmap.html)
- ハザマの全体地図（グリッド付き）です。簡単なお絵かき機能があるのでちょっとした移動計画に使えます。

## Bookmarklets
様々なブックマークレットを置いてあります。
