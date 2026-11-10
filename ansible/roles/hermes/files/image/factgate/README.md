# factgate persistence-v2（romira-arcadia-ops 向け・土台は上流原版）

目的: 作業キュー用ゲートと事実質問ゲートを、派生イメージのビルド時に入れる（コンテナ書き込み層はイメージ更新で消えるため）。

土台:
- 上流 NousResearch/hermes-agent タグ v0.23.0 の agent/turn_stop_gates.py。
- sha256 ec0e46a1bb51c9529ab44447f4506a25a7724a4f9f036cda6bbd1bc907da619b（10418 バイト）。Muse が GitHub の該当ファイルで照合済み。

適用順:
1. 上流原版（ベースイメージ内の agent/turn_stop_gates.py）を sha256 で検査（turn_stop_gates.base.sha256）。
2. combined.diff を一括適用（作業キュー用ゲートと factgate の両方を含む）。
3. 結果の sha256 を検査（turn_stop_gates.result.sha256 = 852c853b…）。

ファイル:
- factgate/factgate.py … 新規モジュール。/opt/hermes/agent/factgate.py になる。
- factgate/turn_stop_gates.combined.diff … 上流原版 → 現行実ファイル（作業キュー＋factgate）の unified diff。ラベルは両方 turn_stop_gates.py。
- factgate/turn_stop_gates.base.sha256 … 検査対象は上流原版。
- factgate/turn_stop_gates.result.sha256 … 適用後の期待値。
- Dockerfile.addition.txt … ansible/roles/hermes/files/image/Dockerfile に追加する行（COPY は Dockerfile のあるディレクトリ基準）。

運用:
- 上流が agent/turn_stop_gates.py を変更したら、基底検査で止まる。その時点で、新しい上流版に対して diff を作り直す（上流の変更を取り込んだ上で、作業キュー用とfactgateの差分を再生成する）。黙って古い版を上書きしない。
- diff の適用結果が期待値と一致しなければ、結果検査で止まる。

検証（作成時点）:
- combined.diff: 80 行、2 hunk。
- 上流原版の sha256 検査は一致（original/turn_stop_gates.py）。
- 模擬適用の結果は、このファイルの末尾の検証記録を参照。

前提（未確認）:
- ベースイメージの turn_stop_gates.py が上流 v0.23.0 の原版であること（ビルド時に基底検査が確かめる）。
- ベースイメージに patch コマンドがない場合、Dockerfile の apt-get で入れる（Debian 系を仮定）。ベースが別のディストリビューションなら、この行は直す必要がある。

## 検証記録（作成時点 2026-11-10）
- 模擬適用（上流原版 ec0e46a1… → combined.diff → 結果）: 基底検査 OK → 差分適用 OK（2 hunk）→ 結果検査 OK（852c853b…）。適用後のバイト列は現行実ファイルと一致。
- 対照（適用前の現行バックアップ 9096ef68…）: 基底検査は FAILED（rc=1）。
- 注意: 模擬適用は patch(1) ではなく、同等の厳密一致の Python 版で行った（コンテナに patch が無いため）。Dockerfile の本番適用は patch(1) を使う。

## 追記（Muse 側の検証 2026-11-10）
- Muse が手元で本物の patch(1) を使い、上流 v0.23.0 原版へ combined.diff を適用した。結果の sha256 は 852c853b… で期待値と一致した。
- PR に含めるファイルは全て sha256 で Hermes 側の原本と一致を確認済み（factgate.py bcea2d10…、combined.diff 0d426113…、base/result の各 sha256 ファイルも一致）。
