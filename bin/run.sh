# Add iOS platform
cordova platform add ios

# Add android platform
# cordova platform add android

# Add device plugin
cordova plugin add org.apache.cordova.device

# Add statusbar plugin
cordova plugin add org.apache.cordova.statusbar

# Add inAppBrowser plugin
cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git

# Build project and run in emulator
cordova build ios
cordova emulate ios
