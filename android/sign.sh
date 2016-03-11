#!/usr/bin/env expect

set timeout 20
set pass1 Mensmarket01
set pass2 Mensmarket02

spawn jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mensmarket-app.keystore ../app/platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk MensMarketAndroidAppKey
expect keystore:

send "$pass1\r"
expect MensMarketAndroidAppKey:

send "$pass2\r"
expect eof

spawn zipalign -v 4 ../app/platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk GaragemDaMens-armv7.apk
expect eof

spawn jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mensmarket-app.keystore ../app/platforms/android/build/outputs/apk/android-x86-release-unsigned.apk MensMarketAndroidAppKey
expect keystore:

send "$pass1\r"
expect MensMarketAndroidAppKey:

send "$pass2\r"
expect eof

spawn zipalign -v 4 ../app/platforms/android/build/outputs/apk/android-x86-release-unsigned.apk GaragemDaMens-x86.apk
expect eof