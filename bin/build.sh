cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore bin/zhipeng.keystore platforms/android/bin/JToDo-release-unsigned.apk alias_name
zipalign -v 4 platforms/android/bin/JToDo-release-unsigned.apk JToDo.apk
mv JToDo.apk bin/