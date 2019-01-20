# public-react-native-app

[![Greenkeeper badge](https://badges.greenkeeper.io/ncmd/public-react-native-mobile-app.svg)](https://greenkeeper.io/)

# How this project was created
1. Requires nodejs to be installed (Advised to use nodejs 11.6.x)
2. Create app using create-native-app
```
npm install -g react-native-cli
react-native init publicereactnativeapp
```

# How react-native-svg * react-native-svg-charts were installed
```
npm install react-native-svg react-native-svg-charts --save
react-native link react-native-svg
If the above fails, follow manual instructions at: https://github.com/react-native-community/react-native-svg
```

# Fastlane Deployment (Instructions for new app for REFERENCE when making a NEW PROJECT; DO NOT DO THIS for this current app)

## Android
0. You will need a developer license (or invite)
1. Create App - https://play.google.com/apps/publish/
2. Create Service Account - Download JSON key
- Grant permissions to your specific user email addresses
- Grant permissions to Service Account - API Access
- For Service Account, Grant Access as release manager (keep everything default)
```
/usr/libexec/java_home
cd /Library/Java/JavaVirtualMachines/jdk1.8.0_192.jdk/Contents/Home
sudo keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
cp my-release-key.keystore /Users/user/go/src/public/public-react-native-mobile-app/android/app
```
- encrypt keystore and password with travis - https://medium.com/@tjkangs/travisci-circleci-2-0-with-fastlane-for-react-native-both-ios-and-android-3f99b71b8691
```
cd /Users/user/go/src/public/public-react-native-mobile-app/android/app
travis encrypt-file /Users/user/go/src/public/public-react-native-mobile-app/android/app/my-release-key.keystore
```
- copy to travis.yml - before_install: 
```
- openssl aes-256-cbc -K $encrypted_key -iv $encrypted_iv -in ./android/app/my-release-key.keystore.enc -out ./android/app/my-release-key.keystore -d
- openssl aes-256-cbc -K $encrypted_key -iv $encrypted_iv -in ./android/app/my-release-key.keystore.enc -out ./android/my-release-key.keystore -d
```
3. Creating an APK - https://facebook.github.io/react-native/docs/signed-apk-android
- Reference only - Create an apk https://facebook.github.io/react-native/docs/signed-apk-android
```
cd android
./gradlew assembleRelease
```
- Rename files "com.publicreactnativeapp" to "com.ncmd.publicreactnativeapp"
```
/Users/user/go/src/public/public-react-native-mobile-app/android/app/src/main/java/com/publicreactnativeapp/MainActivity.java
/Users/user/go/src/public/public-react-native-mobile-app/android/app/src/main/java/com/publicreactnativeapp/MainApplication.java
/Users/user/go/src/public/public-react-native-mobile-app/android/app/src/main/AndroidManifest.xml
/Users/user/go/src/public/public-react-native-mobile-app/android/app/src/release/AndroidManifest.xml
/Users/user/go/src/public/public-react-native-mobile-app/android/app/build.gradle
```
4. Setup correct permissions -  https://facebook.github.io/react-native/docs/removing-default-permissions#docsNav
- https://developer.android.com/studio/publish/app-signing
5. Create a Production Release - https://play.google.com/apps/publish/
- Google Play Console > Select App > App Release > Production Manage > Finish
6. Upload APK - Google Play Console > Select App > App Release > Production Manage > Finish > Upload APK
7. Test upload with fastlane supply
```
fastlane supply --apk ./app/build/outputs/apk/release/app-release.apk
```
8. need to build app at least once before travis can successfully pass travis
- Run android simulator from android studio
```
npm run android
```
9. Use Fastlane supply to create metadata
```
fastlane supply init
```
10. Test fastlane build and upload to play store
```
bundle exec fastlane android local
```

## iOS
1. Create App
```
react-native init --version 0.57.8 publicreactnativeapp
```
2. Open in XCode 
- Change Bundle Idenfier: com.ncmd.publicreactnativeapp
```
cd publicreactnativeapp/ios/ && fastlane init
```
2. Select option 4 (Manual Setup)
- Configure fastlane/Fastlane file
- See /Users/user/go/src/public/publicreactnativeapp/ios/fastlane/Fastfile
3. Configure fastlane/Appfile
```
app_identifier("com.ncmd.publicreactnativeapp")
apple_id("") # Your Apple email address
itc_team_id("") # App Store Connect Team ID
team_id("") # Developer Portal Team ID
```
4. Create bundle Identifier: https://developer.apple.com/account/ios/profile/
5. 🔥🔥🔥 YOU NEED TO DISABLE 2-Factor Auth in Github when deploying locally with Fastlane. 🔥🔥🔥
- If you do not disabled 2-Factor Auth, you will keep getting this error when using Fastlane Match:
```
Match : unable to push the certificate or profiles into git
```
6. Create Certs with Fastlane's "match" (🔥🔥🔥 do not do this for existing project... 🔥🔥🔥)
- Nuke existing certificates:
```
cd public-fastlane-certificates
fastlane match nuke development
fastlane match nuke distribution
fastlane match nuke enterprise
```
- Create new certificates (🔥🔥🔥 do not do this for existing project... 🔥🔥🔥)
```
fastlane match appstore
```
7. Use XCode and open /Users/<username>/go/src/public/public-react-native-mobile-app/ios/publicreactnativeapp.xcodeproj
8. Click on Project Name "publicreactnativeapp" in the built-in file explorer
- Signing > Team > UNCHECK Automatically manage signing
- Select Signing Release & Debug Team member , cmd+S to save
- If you do not do step 7, you will get this error:
```
Code Signing Error: Signing for "publicreactnativeapp" requires a development team. Select development team in the project editor.
Code Signing Error: Code signing is required for product type 'Application' in SDK 'iOS 12.1'
```
9. Create App in app store: https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/app
- If you didn't do step 8, you get an error:
```
Cannot find <app name> in app store
```
10. Now build and deploy app
```
bundle exec fastlane ios ____fastlane_name____
```
- You will be prompted to type in your keychain password 4x
- You will get redirected to a preview page, press "y"
- you will get an error for an:
```
[Transporter Error Output]: Sign in with the app-specific password you generated. Ifyou forgot the app-specific password or need to create a new one, go to appleid.apple.com (-22938)
[14:46:55]: [Transporter Error Output]: Error while processing package 1449311844.itmsp
[14:46:55]: Transporter transfer failed.
[14:46:55]:
[14:46:55]: Sign in with the app-specific password you generated. If you forgot the app-specificpassword or need to create a new one, go to appleid.apple.com (-22938)
Error while processing package 1449311844.itmsp
[14:46:55]:
[14:46:55]: Your account has 2 step verification enabled
[14:46:55]: Please go to https://appleid.apple.com/account/manage
[14:46:55]: and generate an application specific password for
[14:46:55]: the iTunes Transporter, which is used to upload builds
``` 
11. Go to https://appleid.apple.com/account/manage to generate password
- Security > Generate Password
- THIS PASSWORD FOR TRAVIS ENVIRONMENT VARIABLE "FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD"
- ALSO USE FASTLANE_PASSWORD with apple developer password
- Common Error:
```
"Invalid Provisioning Profile. The provisioning profile included in the bundle com.ncmd.publicreactnativeapp [Payload/publicreactnativeapp.app] is invalid. [Missing code-signing certificate]. A Distribution Provisioning profile should be used when submitting apps to the App Store. For more information, visit the iOS Developer Portal."
Return status of iTunes Transporter was 1: ERROR ITMS-90161: "Invalid Provisioning Profile. The provisioning profile included in the bundle com.ncmd.publicreactnativeapp [Payload/publicreactnativeapp.app] is invalid. [Missing code-signing certificate]. A Distribution Provisioning profile should be used when submitting apps to the App Store. For more information, visit the iOS Developer Portal."
```
12. Create icon https://medium.com/@scottianstewart/react-native-add-app-icons-and-launch-screens-onto-ios-and-android-apps-3bfbc20b7d4c
- When using copy all images to (MAKE SURE TO INCLUDE Contents.json file):
- /Users/user/go/src/public/public-react-native-mobile-app/ios/publicreactnativeapp/Images.xcassets/AppIcon.appiconset/
- 🔥🔥🔥 open the avatar-1024.png in preview > export > UNCHECK Alpha > save in /Users/user/go/src/public/public-react-native-mobile-app/ios/publicreactnativeapp/Images.xcassets/AppIcon.appiconset/avatar-1024.png
```
ERROR ITMS-90022: "Missing required icon file. The bundle does not contain an app icon for iPhone / iPod Touch of exactly '120x120' pixels, in .png format for iOS versions >= 7.0."
Return status of iTunes Transporter was 1: ERROR ITMS-90022: "Missing required icon file. The bundle does not contain an app icon for iPhone / iPod Touch of exactly '120x120' pixels, in .png format for iOS versions >= 7.0."
The call to the iTMSTransporter completed with a non-zero exit status: 1. This indicates a failure.
------------------------------------
Error ITMS-90717: "Invalid App Store Icon. The App Store Icon in the asset catalog in 'com.ncmd.publicreactnativeapp' can't be transparent nor contain an alpha channel."
```
13. (Travis Only) Create deploy key to pull from public-fastlane-certificates repository
```
ssh-keygen -t rsa -b 4096 -C "your_email_address"
cat ~/.ssh/id_rsa.pub
put this in https://github.com/{user}/{repo}/settings/keys
cp ~/.ssh/id_rsa.pub /Users/user/go/src/public/public-react-native-mobile-app/ios
cp ~/.ssh/id_rsa /Users/user/go/src/public/public-react-native-mobile-app/ios
mv /Users/user/go/src/public/public-react-native-mobile-app/ios/id_rsa /Users/user/go/src/public/public-react-native-mobile-app/ios/deploy_key
mv /Users/user/go/src/public/public-react-native-mobile-app/ios/id_rsa.pub /Users/user/go/src/public/public-react-native-mobile-app/ios/deploy_key.pub
travis login --auto
travis encrypt-file /Users/user/go/src/public/public-react-native-mobile-app/ios/deploy_key
```
- Add to .travis.yml file: "openssl aes-256-cbc -K $encrypted_ea_key -iv $encrypted_ea_iv -in deploy_key.enc -out ./deploy_key -d"
- add "deploy_key*" to /Users/user/go/src/public/public-react-native-mobile-app/.gitignore file
14. Adding Metadata & URLS
```
cd /Users/user/go/src/public/public-react-native-mobile-app/ios && fastlane deliver init
```
- Error if you did not do this step:
```
😵  Failed: Incorrect, or missing copyright date-> using a copyright date that is any different from this current year, or missing a date
😵  Failed: No broken urls-> unreachable URLs in app metadata
```
15. Increment Builds
```
cd ios/
agvtool new-marketing-version 1.0
agvtool new-marketing-version 1.12.12
agvtool new-marketing-version 1.0.1
fastlane run increment_version_number
Confirm that you were able to increment the version properly
```
- Edit Fastfile
```
increment_build_number
increment_version_number(
    bump_type: "minor",
    xcodeproj: "./publicreactnativeapp.xcodeproj"
)
```
- Common Error:
```
ERROR ITMS-90189: "Redundant Binary Upload. You've already uploaded a build with build number '1' for version number '1.0'. Make sure you increment the build string before you upload your app to App Store Connect. Learn more in Xcode Help (http://help.apple.com/xcode/mac/current/#/devba7f53ad4)."
```
16. (Travis Only)
- Register Devices: https://developer.apple.com/account/ios/device/
- Add the devices to Fastfile "register_devices" section
17. Creating Screenshots
- https://krausefx.com/blog/run-xcode-7-ui-tests-from-the-command-line
- Select correct team
- bundle identifier = com.ncmd.publicreactnativeapp
- language = swift
```
fastlane snapshot init
```
18. Add application specific password
- In travis create an environment variable:
```
FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD
```

# Fixing common fastlane ios build issues
- After spending about ~1.5 weeks getting travis to work nicely with fastlane deployment, here are my solutions....

## 1. Supports only version React native 57.8
- Make sure react-native version 57.8 is install in package.json file.
- Error if built with react-native 58.rc...:
```
❌  ld: symbol(s) not found for architecture x86_64
❌  clang: error: linker command failed with exit code 1 (use -v to see invocation)
** BUILD FAILED **
```
- Always build with YARN for travis and this project, or else all builds with gym will fail!

## 2. React-native does not,generate main.jsbundle
- Add it with XCODE: https://github.com/facebook/react-native/issues/18313#issuecomment-421551538
- Solution:
```
npm install react-native-cli -g
cd <root of react native project>
react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios'
```
- Common Error:
```
❌  error: File /Users/travis/Library/Developer/Xcode/DerivedData/publicreactnativeapp-cmstzkswapckofaljfpwelwacbjr/Build/Intermediates.noindex/ArchiveIntermediates/publicreactnativeapp/BuildProductsPath/Release-iphoneos/publicreactnativeapp.app/main.jsbundle does not exist. This must be a bug with
```
## 3. add bundle react native code and images
- Open Xcode > Click Project > Build Phases > bundle react native code and images; add the following in the "Shell:/bin/sh" section:
```
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```
- Common Error:
```
** ARCHIVE FAILED **
The following build commands failed:
PhaseScriptExecution Bundle\ React\ Native\ code\ and\ images /Users/travis/Library/Developer/Xcode/DerivedData/publicreactnativeapp-cmstzkswapckofaljfpwelwacbjr/Build/Intermediates.noindex/ArchiveIntermediates/publicreactnativeapp/IntermediateBuildFilesPath/publicreactnativeapp.build/Release-iphoneos/publicreactnativeapp.build/Script-00DD1BFF1BD5951E006B06BC.sh
(1 failure)
[21:59:52]: Exit status: 65
```
## 4. Generating a NEW spaceship FASTLANE_SESSION for every before pushing git commit
```
cd ios/ ; echo \"y\" | bundle exec fastlane spaceauth -u $EMAIL_ADDRESS ; pbpaste > ./session.txt
```
copy the first part. paste it to a file.txt
In your travis.yml file:
```
        # Setting fastlane session to bypass 2-factor for apple account; this session much be changed every build or else it will fail whole build process
        - echo $FASTLANE_SESSION
        - var=$(cat ./session.txt) && export FASTLANE_SESSION=$var
        # Confirm session environment variable is set
        - echo $FASTLANE_SESSION
```

## 5. Next is setting up the Fastfile lanes....
```
# Opt out of Analytics
opt_out_usage

update_fastlane

default_platform(:ios)

platform :ios do
  lane :localdeploy do
    sync_code_signing(
      type: "appstore",
      git_url:"https://github.com/ncmd/public-fastlane-certificates",
      keychain_name:"login.keychain"
      )
    increment_build_number
    increment_version_number(
      bump_type: "minor",
      xcodeproj: "./publicreactnativeapp.xcodeproj"
    )
    build_app(
      scheme: "publicreactnativeapp",
      workspace: "publicreactnativeapp.xcworkspace",
      include_bitcode: false,
      export_method: "app-store",
      export_options: {
        uploadBitcode: false,
        uploadSymbols: true,
        compileBitcode: false,
        provisioningProfiles: { 
          "com.ncmd.publicreactnativeapp" => "match AppStore com.ncmd.publicreactnativeapp"
        }
      }
    )
    upload_to_app_store(skip_metadata: true, skip_screenshots: true)
  end

  lane :travisdeploy do |values|
    setup_travis
    sync_code_signing(
      type: "appstore",
      git_url:"https://github.com/ncmd/public-fastlane-certificates",
      keychain_name:"fastlane_tmp_keychain"
      )
      increment_build_number
      increment_version_number(
        bump_type: "minor"
      )
    build_app(
      scheme: "publicreactnativeapp",
      workspace: "publicreactnativeapp.xcworkspace",
      include_bitcode: false,
      export_method: "app-store",
      export_options: {
        uploadBitcode: false,
        uploadSymbols: true,
        compileBitcode: false,
        provisioningProfiles: { 
          "com.ncmd.publicreactnativeapp" => "match AppStore com.ncmd.publicreactnativeapp"
        }
      }
    )
    
    upload_to_app_store(skip_metadata: true, skip_screenshots: true)
  end
end
```

## 6. Finally the travis.yml file
```
matrix:
  include:
    - language: objective-c
      os: osx
      osx_image: xcode10.1
      xcode_project: ./publicreactnativeapp.xcodeproj
      xcode_scheme: publicreactnativeapp
      node_js: false
      sudo: required
      env:
        # required by fastlane
        - LC_ALL=en_US.UTF-8
        - LANG=en_US.UTF-8
        # increase node space just in case
        - NODE_OPTIONS="--max-old-space-size=4096"
      before_install:
        # Setting up environment similar to local environment
        - nvm install 11.6
        - rvm install 2.6.0
        - travis_retry npm install -g yarn
        - rvm --default use 2.6.0
        - brew update
        - gem update --system
        - gem install bundler
        - gem install fastlane
        - pwd
        # Decrypt key to download certificate from a private certificate repository
        - ls ~/.ssh/
        - cd ./ios && openssl aes-256-cbc -K $encrypted_135108afd44f_key -iv $encrypted_135108afd44f_iv -in deploy_key.enc -out ~/.ssh/deploy_key -d
        - cp deploy_key.pub ~/.ssh/deploy_key.pub
        - ls ~/.ssh/
        - echo -e "Host github.com\n\tHostName github.com\n\tncmd git\n\tIdentityFile ~/.ssh/deploy_key\n" >> ~/.ssh/config
        - ssh-keyscan github.com >> ~/.ssh/known_hosts
        - chmod 600 ~/.ssh/deploy_key
        - cd ..
      install:
        # using yarn instead of npm install because project would not build properly in travis
        - pwd
        - yarn install
        # required to use react-native 
        - npm install -g react-native-cli
        # Adds missing main.jsbundle file when react-native project is created
        - react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios'
      script:
        - pwd
        - cd ./ios/
        # Install all gemfile requirements and allows faster fastlane performance
        - bundle install
        - # Setting fastlane session to bypass 2-factor for apple account
        - # This session much be changed every build or else it will fail whole build process
        - # Add the following line to a package.json script
        - # (NOTE: set an environment variable for your email address, export EMAIL_ADDRESS=email_address@gmail.com)
        # - cd ios/ ; echo \"y\" | bundle exec fastlane spaceauth -u $EMAIL_ADDRESS ; pbpaste > ./session.txt
        - echo $FASTLANE_SESSION
        - var=$(cat ./session.txt) && export FASTLANE_SESSION=$var
        # Confirm session environment variable is set
        - echo $FASTLANE_SESSION
        - bundle update
        - ls /Users/travis/Library/Keychains/
        # Run Gym in the background to prevent verbose build over 10000 lines (Travis auto terminates build)
        - nohup bundle exec fastlane ios travisdeploy &
        - pwd
         # Silence gym in the background or else logs will pass 10000 and travis will force end the build
        - for i in $(seq 1 10); do sleep 60; echo $i; done
        # Check if ipa and app.dSYM.zip builds are created
        # You should see "publicreactnativeapp.app.dSYM.zip and publicreactnativeapp.ipa"
        - ls
        # now upload your build (If this part failed that means you didnt generate a new session token to pass 2factor
        # - bundle exec fastlane ios travisupload
```