# beadon

iBeaconとmastodonを結びつけるアプリ

## ビルドまで（ios)
phonegapや、ios-simは`npm i -g phonegap ios-sim`でインストールしておく

```bash
$ git clone https://github.com/devcamp2017ndd/beadon.git
$ cd beadon
$ phonegap platform add ios
# ios-simが古くてエラーが出てしまうので、削除する
$ rm -fr platforms/ios/cordova/node_modules/ios-sim
$ phonegap emulate ios
# ただし、ibeaconはエミュレーターで動作しない
```

XCodeで、プロジェクトファイル（beadon.xcodeproj）を開き、`Build Settings`のメニューから、`Singning > Development Team`を設定する（任意の値でいい）
また、`General`のメニューから、`Deployment Info > Deployment target`を10.3など最新のiOSにしておくといい

## デバイスでの検証
XCodeを起動した状態で、MacにiPhoneなどを接続する。
ウィンドウ左上のメニューで、接続したデバイスの名称が選択できるようになるので、この状態で実行ボタンを押すとデバイスでの検証が可能となる。
ただし、デバイス側でApple DeveloperのIDを認証させておく必要がある。

1. `設定`から`一般`を選択
1. `プロファイルとデバイス管理`を選択
1. `デベロッパAPP`にApple DeveloperのIDが表示されているので、それを選択して認証する

