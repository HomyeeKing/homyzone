---
title: 新机迁移步骤
date: 2025-07-05 14:38:14
hero_image: ""
lang: zh
duration: 10min
---

## 装机应用

> https://formulae.brew.sh/cask/

```bash
brew install --cask visual-studio-code google-chrome iterm2 qqmusic alfred postman kap monitorcontrol
```

others:

- logioptions: for logi mouse control
- sougou input: for pinyin input
- ihost: for host manage
- relax eye 护眼


## font
- [fira code](https://fonts.google.com/specimen/Fira+Code?preview.text=const%20a%20%20%3D%201&query=fira+)


## Commands

```bash
# node npm manager, see
brew install nvm

```

### git

1. [安装 git](../git/cheetsheet.md#)
1. [设置大小写敏感](../git/cheetsheet.md#git-case-sensitive)

### npm install

```bash
npm install -g nrm
npm install -g envinfo
```

## config

### iterm2 config

```json
{
"Profiles": [
{
  "Non-ASCII Anti Aliased" : true,
  "Ansi 15 Color (Dark)" : {
    "Green Component" : 1,
    "Blue Component" : 1,
    "Red Component" : 1
  },
  "Foreground Color (Dark)" : {
    "Green Component" : 0.73333334922790527,
    "Blue Component" : 0.73333334922790527,
    "Red Component" : 0.73333334922790527
  },
  "Cursor Text Color" : {
    "Green Component" : 1,
    "Blue Component" : 1,
    "Red Component" : 1
  },
  "Prompt Before Closing 2" : false,
  "Ansi 3 Color (Dark)" : {
    "Green Component" : 1,
    "Blue Component" : 0.71372550000000001,
    "Red Component" : 1
  },
  "Ansi 12 Color (Dark)" : {
    "Green Component" : 0.86277559999999998,
    "Blue Component" : 0.9982605,
    "Red Component" : 0.71165029999999996
  },
  "Mouse Reporting" : true,
  "Use Underline Color (Light)" : false,
  "Disable Window Resizing" : true,
  "BM Growl" : true,
  "Background Color (Dark)" : {
    "Green Component" : 0,
    "Blue Component" : 0,
    "Red Component" : 0
  },
  "Guid" : "9750300E-622D-4A86-A2B5-1323719403E3",
  "Cursor Color (Dark)" : {
    "Green Component" : 0.64705880000000005,
    "Blue Component" : 0.37647059999999999,
    "Red Component" : 1
  },
  "Selection Color (Dark)" : {
    "Green Component" : 0.22248570000000001,
    "Blue Component" : 0.51530609999999999,
    "Red Component" : 0.20990739999999999
  },
  "Scrollback Lines" : 1000,
  "Badge Color (Dark)" : {
    "Red Component" : 0.92929404973983765,
    "Color Space" : "P3",
    "Blue Component" : 0.13960540294647217,
    "Alpha Component" : 0.5,
    "Green Component" : 0.25479039549827576
  },
  "Ansi 0 Color (Dark)" : {
    "Green Component" : 0.30978869999999997,
    "Blue Component" : 0.30978869999999997,
    "Red Component" : 0.30978869999999997
  },
  "Transparency" : 0,
  "Use Bright Bold" : true,
  "Horizontal Spacing" : 1,
  "Ansi 13 Color (Light)" : {
    "Red Component" : 0.42352941176470588,
    "Color Space" : "sRGB",
    "Blue Component" : 0.7686274509803922,
    "Green Component" : 0.44313725490196076
  },
  "Blur" : false,
  "Ansi 13 Color" : {
    "Green Component" : 0.3333333432674408,
    "Blue Component" : 1,
    "Red Component" : 1
  },
  "Ansi 2 Color (Dark)" : {
    "Green Component" : 1,
    "Blue Component" : 0.37647059999999999,
    "Red Component" : 0.65882350000000001
  },
  "Cursor Color" : {
    "Green Component" : 0.73333334922790527,
    "Blue Component" : 0.73333334922790527,
    "Red Component" : 0.73333334922790527
  },
  "Use Cursor Guide (Light)" : false,
  "Option Key Sends" : 0,
  "Idle Code" : 0,
  "Ansi 13 Color (Dark)" : {
    "Green Component" : 0.61330589999999996,
    "Blue Component" : 0.99652090000000004,
    "Red Component" : 1
  },
  "Send Code When Idle" : false,
  "Selection Color" : {
    "Green Component" : 0.8353000283241272,
    "Blue Component" : 1,
    "Red Component" : 0.70980000495910645
  },
  "Terminal Type" : "xterm-256color",
  "Cursor Boost (Dark)" : 0,
  "Right Option Key Sends" : 0,
  "Background Color" : {
    "Red Component" : 0.047058823529411764,
    "Color Space" : "sRGB",
    "Blue Component" : 0.20784313725490197,
    "Alpha Component" : 1,
    "Green Component" : 0.16862745098039217
  },
  "Ansi 10 Color (Dark)" : {
    "Green Component" : 1,
    "Blue Component" : 0.67277030000000004,
    "Red Component" : 0.80941479999999999
  },
  "Ansi 10 Color" : {
    "Red Component" : 0.33768613589927554,
    "Color Space" : "sRGB",
    "Blue Component" : 0.35801258770788852,
    "Alpha Component" : 1,
    "Green Component" : 0.724334716796875
  },
  "Vertical Spacing" : 1,
  "Use Tab Color (Light)" : false,
  "Columns" : 80,
  "Ansi 2 Color (Light)" : {
    "Red Component" : 0.52156862745098043,
    "Color Space" : "sRGB",
    "Blue Component" : 0,
    "Green Component" : 0.59999999999999998
  },
  "Screen" : -1,
  "Cursor Text Color (Dark)" : {
    "Green Component" : 1,
    "Blue Component" : 1,
    "Red Component" : 1
  },
  "Description" : "Default",
  "Unlimited Scrollback" : false,
  "Use Italic Font" : true,
  "Working Directory" : "\/Users\/wanghongye\/Desktop\/taobao\/uxian\/U-home\n",
  "Selected Text Color (Dark)" : {
    "Green Component" : 0.94760049999999996,
    "Blue Component" : 0.94760049999999996,
    "Red Component" : 0.94760049999999996
  },
  "Use Cursor Guide (Dark)" : false,
  "AWDS Window Option" : "Yes",
  "Visual Bell" : true,
  "Link Color (Light)" : {
    "Red Component" : 0,
    "Color Space" : "sRGB",
    "Blue Component" : 0.73423302173614502,
    "Alpha Component" : 1,
    "Green Component" : 0.35916060209274292
  },
  "Ansi 1 Color (Dark)" : {
    "Green Component" : 0.4235294,
    "Blue Component" : 0.37647059999999999,
    "Red Component" : 1
  },
  "Default Bookmark" : "No",
  "Ansi 14 Color (Light)" : {
    "Red Component" : 0.57647058823529407,
    "Color Space" : "sRGB",
    "Blue Component" : 0.63137254901960782,
    "Green Component" : 0.63137254901960782
  },
  "Ansi 7 Color (Light)" : {
    "Red Component" : 0.93333333333333335,
    "Color Space" : "sRGB",
    "Blue Component" : 0.83529411764705885,
    "Green Component" : 0.90980392156862744
  },
  "Ansi 3 Color (Light)" : {
    "Red Component" : 0.70980392156862748,
    "Color Space" : "sRGB",
    "Blue Component" : 0,
    "Green Component" : 0.53725490196078429
  },
  "Ansi 9 Color (Dark)" : {
    "Green Component" : 0.71372550000000001,
    "Blue Component" : 0.69019609999999998,
    "Red Component" : 1
  },
  "Badge Color (Light)" : {
    "Red Component" : 1,
    "Color Space" : "sRGB",
    "Blue Component" : 0,
    "Alpha Component" : 0.5,
    "Green Component" : 0.1491314172744751
  },
  "Ansi 14 Color (Dark)" : {
    "Green Component" : 0.87631029999999999,
    "Blue Component" : 0.99703969999999997,
    "Red Component" : 0.87591359999999996
  },
  "Tags" : [

  ],
  "Link Color (Dark)" : {
    "Red Component" : 0.14513972401618958,
    "Color Space" : "P3",
    "Blue Component" : 0.7093239426612854,
    "Alpha Component" : 1,
    "Green Component" : 0.35333043336868286
  },
  "Custom Command" : "No",
  "Jobs to Ignore" : [
    "rlogin",
    "ssh",
    "slogin",
    "telnet"
  ],
  "Use Non-ASCII Font" : false,
  "Custom Directory" : "Yes",
  "Use Selected Text Color (Light)" : true,
  "Bold Color (Light)" : {
    "Red Component" : 0.34509803921568627,
    "Color Space" : "sRGB",
    "Blue Component" : 0.45882352941176469,
    "Green Component" : 0.43137254901960786
  },
  "Brighten Bold Text (Dark)" : true,
  "Ansi 8 Color (Light)" : {
    "Red Component" : 0,
    "Color Space" : "sRGB",
    "Blue Component" : 0.21176470588235294,
    "Green Component" : 0.16862745098039217
  },
  "Name" : "Default",
  "Space" : -1,
  "Ansi 11 Color (Dark)" : {
    "Green Component" : 1,
    "Blue Component" : 0.7996491,
    "Red Component" : 1
  },
  "AWDS Pane Directory" : "",
  "Ansi 14 Color" : {
    "Green Component" : 1,
    "Blue Component" : 1,
    "Red Component" : 0.3333333432674408
  },
  "Set Local Environment Vars" : 2,
  "Faint Text Alpha (Dark)" : 0.5,
  "Rows" : 25,
  "Background Color (Light)" : {
    "Red Component" : 0.99215686274509807,
    "Color Space" : "sRGB",
    "Blue Component" : 0.8901960784313725,
    "Green Component" : 0.96470588235294119
  },
  "Cursor Guide Color (Light)" : {
    "Red Component" : 0.70213186740875244,
    "Color Space" : "sRGB",
    "Blue Component" : 1,
    "Alpha Component" : 0.25,
    "Green Component" : 0.9268307089805603
  },
  "Ansi 6 Color (Dark)" : {
    "Green Component" : 0.77254900000000004,
    "Blue Component" : 0.99607840000000003,
    "Red Component" : 0.77647060000000001
  },
  "Use Bright Bold (Light)" : true,
  "Cursor Color (Light)" : {
    "Red Component" : 0.396078431372549,
    "Color Space" : "sRGB",
    "Blue Component" : 0.51372549019607838,
    "Green Component" : 0.4823529411764706
  },
  "Ansi 15 Color (Light)" : {
    "Red Component" : 0.99215686274509807,
    "Color Space" : "sRGB",
    "Blue Component" : 0.8901960784313725,
    "Green Component" : 0.96470588235294119
  },
  "AWDS Tab Directory" : "",
  "Sync Title" : false,
  "AWDS Window Directory" : "\/Users\/wanghongye\/Desktop\/homyee\n\/Users\/wanghongye\/Desktop\/homyee\n\/Users\/wanghongye\/Desktop\/homyee\n\/Users\/wanghongye\/Desktop\/homyee\n",
  "Ansi 11 Color" : {
    "Green Component" : 1,
    "Blue Component" : 0.3333333432674408,
    "Red Component" : 1
  },
  "Ansi 8 Color (Dark)" : {
    "Green Component" : 0.4862745,
    "Blue Component" : 0.4862745,
    "Red Component" : 0.4862745
  },
  "Ansi 10 Color (Light)" : {
    "Red Component" : 0.34509803921568627,
    "Color Space" : "sRGB",
    "Blue Component" : 0.45882352941176469,
    "Green Component" : 0.43137254901960786
  },
  "Normal Font" : "FiraCode-Medium 16",
  "Use Selected Text Color (Dark)" : true,
  "Foreground Color" : {
    "Red Component" : 0.9197998046875,
    "Color Space" : "sRGB",
    "Blue Component" : 0.48571039975174068,
    "Alpha Component" : 1,
    "Green Component" : 0.23150783963501453
  },
  "Match Background Color (Light)" : {
    "Red Component" : 0.99697142839431763,
    "Color Space" : "P3",
    "Blue Component" : 0.32116127014160156,
    "Alpha Component" : 1,
    "Green Component" : 0.98600882291793823
  },
  "Command" : "cd \/Users\/wanghongye\/Desktop\/homyee ",
  "Minimum Contrast (Light)" : 0,
  "Character Encoding" : 4,
  "Minimum Contrast" : 0,
  "Cursor Boost (Light)" : 0,
  "Cursor Text Color (Light)" : {
    "Red Component" : 0.93333333333333335,
    "Color Space" : "sRGB",
    "Blue Component" : 0.83529411764705885,
    "Green Component" : 0.90980392156862744
  },
  "Background Image Location" : "",
  "Icon" : 0,
  "Ansi 5 Color (Dark)" : {
    "Green Component" : 0.4509804,
    "Blue Component" : 0.99215690000000001,
    "Red Component" : 1
  },
  "Window Type" : 0,
  "ASCII Anti Aliased" : true,
  "Use Tab Color (Dark)" : false,
  "Cursor Guide Color (Dark)" : {
    "Red Component" : 0.74862593412399292,
    "Color Space" : "P3",
    "Blue Component" : 0.99125725030899048,
    "Alpha Component" : 0.25,
    "Green Component" : 0.92047786712646484
  },
  "Flashing Bell" : false,
  "Brighten Bold Text (Light)" : true,
  "Non Ascii Font" : "Monaco 12",
  "Ansi 7 Color (Dark)" : {
    "Green Component" : 0.93353169999999996,
    "Blue Component" : 0.93353169999999996,
    "Red Component" : 0.93353169999999996
  },
  "Badge Color" : {
    "Red Component" : 0.961944580078125,
    "Color Space" : "sRGB",
    "Blue Component" : 0.069867800921201678,
    "Alpha Component" : 0.5,
    "Green Component" : 0.20290447292112468
  },
  "Smart Cursor Color (Dark)" : false,
  "Shortcut" : "",
  "Match Background Color (Dark)" : {
    "Red Component" : 1,
    "Color Space" : "P3",
    "Blue Component" : 0,
    "Alpha Component" : 1,
    "Green Component" : 1
  },
  "Custom Locale" : "en_US",
  "Ansi 15 Color" : {
    "Green Component" : 1,
    "Blue Component" : 1,
    "Red Component" : 1
  },
  "Ansi 11 Color (Light)" : {
    "Red Component" : 0.396078431372549,
    "Color Space" : "sRGB",
    "Blue Component" : 0.51372549019607838,
    "Green Component" : 0.4823529411764706
  },
  "Ansi 9 Color" : {
    "Green Component" : 0.3333333432674408,
    "Blue Component" : 0.3333333432674408,
    "Red Component" : 1
  },
  "Use Bold Font" : true,
  "Ansi 4 Color (Light)" : {
    "Red Component" : 0.14901960784313725,
    "Color Space" : "sRGB",
    "Blue Component" : 0.82352941176470584,
    "Green Component" : 0.54509803921568623
  },
  "Ansi 8 Color" : {
    "Green Component" : 0.3333333432674408,
    "Blue Component" : 0.3333333432674408,
    "Red Component" : 0.3333333432674408
  },
  "Ansi 0 Color (Light)" : {
    "Red Component" : 0.027450980392156866,
    "Color Space" : "sRGB",
    "Blue Component" : 0.25882352941176473,
    "Green Component" : 0.21176470588235294
  },
  "Use Bright Bold (Dark)" : true,
  "Bold Color" : {
    "Green Component" : 1,
    "Blue Component" : 1,
    "Red Component" : 1
  },
  "Selected Text Color (Light)" : {
    "Red Component" : 0.34509803921568627,
    "Color Space" : "sRGB",
    "Blue Component" : 0.45882352941176469,
    "Green Component" : 0.43137254901960786
  },
  "Minimum Contrast (Dark)" : 0,
  "Smart Cursor Color (Light)" : false,
  "Ansi 7 Color" : {
    "Red Component" : 0.049328560475260033,
    "Color Space" : "sRGB",
    "Blue Component" : 0.11902047542765018,
    "Alpha Component" : 1,
    "Green Component" : 0.200408935546875
  },
  "Keyboard Map" : {

  },
  "Bold Color (Dark)" : {
    "Green Component" : 1,
    "Blue Component" : 1,
    "Red Component" : 1
  },
  "Link Color" : {
    "Red Component" : 0.065225616563111571,
    "Color Space" : "sRGB",
    "Blue Component" : 0.742767333984375,
    "Alpha Component" : 1,
    "Green Component" : 0.39665485492202218
  },
  "Ansi 6 Color" : {
    "Green Component" : 0.73333334922790527,
    "Blue Component" : 0.73333334922790527,
    "Red Component" : 0
  },
  "Silence Bell" : false,
  "Ansi 4 Color (Dark)" : {
    "Green Component" : 0.79607839999999996,
    "Blue Component" : 0.99607840000000003,
    "Red Component" : 0.58823530000000002
  },
  "Ansi 9 Color (Light)" : {
    "Red Component" : 0.79607843137254897,
    "Color Space" : "sRGB",
    "Blue Component" : 0.086274509803921581,
    "Green Component" : 0.29411764705882354
  },
  "Ansi 12 Color" : {
    "Green Component" : 0.3333333432674408,
    "Blue Component" : 1,
    "Red Component" : 0.3333333432674408
  },
  "AWDS Tab Option" : "Recycle",
  "Ansi 1 Color (Light)" : {
    "Red Component" : 0.86274509803921573,
    "Color Space" : "sRGB",
    "Blue Component" : 0.18431372549019609,
    "Green Component" : 0.19607843137254902
  },
  "Ansi 5 Color (Light)" : {
    "Red Component" : 0.82745098039215681,
    "Color Space" : "sRGB",
    "Blue Component" : 0.50980392156862742,
    "Green Component" : 0.21176470588235294
  },
  "Foreground Color (Light)" : {
    "Red Component" : 0.5933871865272522,
    "Color Space" : "P3",
    "Blue Component" : 0.19854933023452759,
    "Alpha Component" : 1,
    "Green Component" : 0.58381557464599609
  },
  "Ansi 5 Color" : {
    "Green Component" : 0,
    "Blue Component" : 0.73333334922790527,
    "Red Component" : 0.73333334922790527
  },
  "Ansi 4 Color" : {
    "Red Component" : 0.52661502361297607,
    "Color Space" : "sRGB",
    "Blue Component" : 0.9681396484375,
    "Alpha Component" : 1,
    "Green Component" : 0.60442996230370183
  },
  "Use Separate Colors for Light and Dark Mode" : true,
  "Ansi 3 Color" : {
    "Green Component" : 0.73333334922790527,
    "Blue Component" : 0,
    "Red Component" : 0.73333334922790527
  },
  "Blinking Cursor" : false,
  "Ansi 6 Color (Light)" : {
    "Red Component" : 0.16470588235294117,
    "Color Space" : "sRGB",
    "Blue Component" : 0.59607843137254901,
    "Green Component" : 0.63137254901960782
  },
  "Ansi 2 Color" : {
    "Red Component" : 0.1271940884180367,
    "Color Space" : "sRGB",
    "Blue Component" : 0.1271940884180367,
    "Alpha Component" : 1,
    "Green Component" : 0.770050048828125
  },
  "Cursor Guide Color" : {
    "Red Component" : 0.70213186740875244,
    "Color Space" : "sRGB",
    "Blue Component" : 1,
    "Alpha Component" : 0.25,
    "Green Component" : 0.9268307089805603
  },
  "Use Underline Color (Dark)" : false,
  "Selection Color (Light)" : {
    "Red Component" : 0.93333333333333335,
    "Color Space" : "sRGB",
    "Blue Component" : 0.83529411764705885,
    "Green Component" : 0.90980392156862744
  },
  "ASCII Ligatures" : false,
  "AWDS Pane Option" : "Recycle",
  "Ansi 1 Color" : {
    "Green Component" : 0,
    "Blue Component" : 0,
    "Red Component" : 0.73333334922790527
  },
  "Faint Text Alpha (Light)" : 0.5,
  "Ambiguous Double Width" : false,
  "Selected Text Color" : {
    "Red Component" : 0.11737060546875,
    "Color Space" : "sRGB",
    "Blue Component" : 0.10823147278279066,
    "Alpha Component" : 1,
    "Green Component" : 0.10823147278279066
  },
  "Ansi 12 Color (Light)" : {
    "Red Component" : 0.51372549019607838,
    "Color Space" : "sRGB",
    "Blue Component" : 0.58823529411764708,
    "Green Component" : 0.58039215686274515
  },
  "Close Sessions On End" : true,
  "Ansi 0 Color" : {
    "Green Component" : 0,
    "Blue Component" : 0,
    "Red Component" : 0
  }
},
{
  "Working Directory" : "\/Users\/wanghongye\/Desktop\/homyee\n\/Users\/wanghongye\/Desktop\/homyee\n\/Users\/wanghongye\/Desktop\/homyee\n\/Users\/wanghongye\/Desktop\/homyee\n",
  "Prompt Before Closing 2" : false,
  "Selected Text Color" : {
    "Red Component" : 0.11737060546875,
    "Color Space" : "sRGB",
    "Blue Component" : 0.10823147278279066,
    "Alpha Component" : 1,
    "Green Component" : 0.10823147278279066
  },
  "Rows" : 25,
  "Ansi 11 Color" : {
    "Green Component" : 1,
    "Blue Component" : 0.3333333432674408,
    "Red Component" : 1
  },
  "Use Italic Font" : true,
  "HotKey Characters" : "\u001a",
  "Foreground Color" : {
    "Red Component" : 0.9197998046875,
    "Color Space" : "sRGB",
    "Blue Component" : 0.48571039975174068,
    "Alpha Component" : 1,
    "Green Component" : 0.23150783963501453
  },
  "HotKey Window Floats" : true,
  "Right Option Key Sends" : 0,
  "Character Encoding" : 4,
  "Selection Color" : {
    "Green Component" : 0.8353000283241272,
    "Blue Component" : 1,
    "Red Component" : 0.70980000495910645
  },
  "Blend" : 0.5,
  "Mouse Reporting" : true,
  "Ansi 4 Color" : {
    "Red Component" : 0.52661502361297607,
    "Color Space" : "sRGB",
    "Blue Component" : 0.9681396484375,
    "Alpha Component" : 1,
    "Green Component" : 0.60442996230370183
  },
  "Non-ASCII Anti Aliased" : true,
  "Sync Title" : false,
  "Disable Window Resizing" : true,
  "Description" : "Default",
  "Custom Locale" : "en_AU.UTF-8",
  "Close Sessions On End" : true,
  "Jobs to Ignore" : [
    "rlogin",
    "ssh",
    "slogin",
    "telnet"
  ],
  "Scrollback Lines" : 1000,
  "HotKey Window Reopens On Activation" : false,
  "Prevent Opening in a Tab" : false,
  "Flashing Bell" : false,
  "Cursor Guide Color" : {
    "Red Component" : 0.70213186740875244,
    "Color Space" : "sRGB",
    "Blue Component" : 1,
    "Alpha Component" : 0.25,
    "Green Component" : 0.9268307089805603
  },
  "BM Growl" : true,
  "Ansi 3 Color" : {
    "Green Component" : 0.73333334922790527,
    "Blue Component" : 0,
    "Red Component" : 0.73333334922790527
  },
  "Icon" : 0,
  "Use Non-ASCII Font" : false,
  "Link Color" : {
    "Red Component" : 0.065225616563111571,
    "Color Space" : "sRGB",
    "Blue Component" : 0.742767333984375,
    "Alpha Component" : 1,
    "Green Component" : 0.39665485492202218
  },
  "Shortcut" : "",
  "Background Image Location" : "",
  "Bold Color" : {
    "Green Component" : 1,
    "Blue Component" : 1,
    "Red Component" : 1
  },
  "Unlimited Scrollback" : false,
  "Custom Command" : "No",
  "HotKey Key Code" : 6,
  "Keyboard Map" : {
    "0x74-0x100000-0x0" : {
      "Version" : 1,
      "Action" : 27,
      "Text" : "13C28F37-C291-4329-A2C1-EB26B9D42F76",
      "Label" : ""
    }
  },
  "Ansi 14 Color" : {
    "Green Component" : 1,
    "Blue Component" : 1,
    "Red Component" : 0.3333333432674408
  },
  "Ansi 2 Color" : {
    "Red Component" : 0.1271940884180367,
    "Color Space" : "sRGB",
    "Blue Component" : 0.1271940884180367,
    "Alpha Component" : 1,
    "Green Component" : 0.770050048828125
  },
  "Send Code When Idle" : false,
  "ASCII Anti Aliased" : true,
  "Tags" : [

  ],
  "Ansi 9 Color" : {
    "Green Component" : 0.3333333432674408,
    "Blue Component" : 0.3333333432674408,
    "Red Component" : 1
  },
  "Use Bold Font" : true,
  "Silence Bell" : false,
  "Ansi 12 Color" : {
    "Green Component" : 0.3333333432674408,
    "Blue Component" : 1,
    "Red Component" : 0.3333333432674408
  },
  "Window Type" : 7,
  "Use Bright Bold" : true,
  "Has Hotkey" : true,
  "HotKey Modifier Activation" : 3,
  "Cursor Text Color" : {
    "Green Component" : 1,
    "Blue Component" : 1,
    "Red Component" : 1
  },
  "HotKey Window Dock Click Action" : 0,
  "Default Bookmark" : "No",
  "Cursor Color" : {
    "Green Component" : 0.73333334922790527,
    "Blue Component" : 0.73333334922790527,
    "Red Component" : 0.73333334922790527
  },
  "Ansi 1 Color" : {
    "Green Component" : 0,
    "Blue Component" : 0,
    "Red Component" : 0.73333334922790527
  },
  "Name" : "Hotkey Window",
  "Blinking Cursor" : false,
  "Guid" : "13C28F37-C291-4329-A2C1-EB26B9D42F76",
  "Idle Code" : 0,
  "Ansi 10 Color" : {
    "Red Component" : 0.33768613589927554,
    "Color Space" : "sRGB",
    "Blue Component" : 0.35801258770788852,
    "Alpha Component" : 1,
    "Green Component" : 0.724334716796875
  },
  "Ansi 8 Color" : {
    "Green Component" : 0.3333333432674408,
    "Blue Component" : 0.3333333432674408,
    "Red Component" : 0.3333333432674408
  },
  "Badge Color" : {
    "Red Component" : 0.961944580078125,
    "Color Space" : "sRGB",
    "Blue Component" : 0.069867800921201678,
    "Alpha Component" : 0.5,
    "Green Component" : 0.20290447292112468
  },
  "Ambiguous Double Width" : false,
  "Blur Radius" : 2,
  "Ansi 0 Color" : {
    "Green Component" : 0,
    "Blue Component" : 0,
    "Red Component" : 0
  },
  "Blur" : true,
  "Normal Font" : "FiraCode-Medium 16",
  "Vertical Spacing" : 1,
  "Ansi 7 Color" : {
    "Red Component" : 0.049328560475260033,
    "Color Space" : "sRGB",
    "Blue Component" : 0.11902047542765018,
    "Alpha Component" : 1,
    "Green Component" : 0.200408935546875
  },
  "Space" : -1,
  "HotKey Window AutoHides" : true,
  "Command" : "",
  "Terminal Type" : "xterm-256color",
  "Horizontal Spacing" : 1,
  "Option Key Sends" : 0,
  "Minimum Contrast" : 0,
  "HotKey Window Animates" : true,
  "HotKey Modifier Flags" : 262144,
  "Ansi 15 Color" : {
    "Green Component" : 1,
    "Blue Component" : 1,
    "Red Component" : 1
  },
  "Ansi 6 Color" : {
    "Green Component" : 0.73333334922790527,
    "Blue Component" : 0.73333334922790527,
    "Red Component" : 0
  },
  "Transparency" : 0.29999999999999999,
  "HotKey Activated By Modifier" : false,
  "Background Color" : {
    "Red Component" : 0.047058823529411764,
    "Color Space" : "sRGB",
    "Blue Component" : 0.20784313725490197,
    "Alpha Component" : 1,
    "Green Component" : 0.16862745098039217
  },
  "Screen" : -2,
  "Initial Use Transparency" : true,
  "HotKey Characters Ignoring Modifiers" : "z",
  "Non Ascii Font" : "Monaco 12",
  "Ansi 13 Color" : {
    "Green Component" : 0.3333333432674408,
    "Blue Component" : 1,
    "Red Component" : 1
  },
  "Columns" : 80,
  "HotKey Alternate Shortcuts" : [

  ],
  "Visual Bell" : true,
  "Custom Directory" : "Yes",
  "Ansi 5 Color" : {
    "Green Component" : 0,
    "Blue Component" : 0.73333334922790527,
    "Red Component" : 0.73333334922790527
  },
  "Set Local Environment Vars" : 2
}
]
}

```

### gitconfig
```
[alias]
cmm = commit -m
st = status
pl = pull
ps = push
sw = switch
swc = switch -c
br = branch
l = log --stat
lp = log --all --decorate --oneline --graph

[init]
templatedir = /Users/wanghongye/.git-templates
[core]
ignorecase = false
symlinks = false
[push]
default = current
autoSetupRemote = true
[pull]
rebase = true
[user]
name = HomyeeKing
email = HomyeeKing@gmail.com
[diff]
tool = vscode
[difftool "vscode"]
cmd = code --wait --diff $LOCAL $REMOTE
[merge]
tool = vscode
[mergetool "vscode"]
cmd = code --wait $MERGED
```

### ssh config

```
# CodeSandbox SSH Integration
Include "csb/config"
# End of CodeSandbox SSH Integration
# github
Host github.com
HostName github.com
User homyeeking@qq.com（GitHub邮箱）
IdentityFile ~/.ssh/id_rsa_github
# default
Host gitlab.xxxx-inc.com（这里注意填写自己公司对于的gitlab host）
HostName gitlab.xxxx-inc.com
User （Gitlab邮箱）
IdentityFile ~/.ssh/id_rsa_gitlab

Host 121.36.32.150
HostName 121.36.32.150
ForwardAgent yes
User root
PubKeyAuthentication yes
```

### vscode config

```jsonc
{
  "editor.fontSize": 20,
  "workbench.tree.indent": 16,
  "editor.detectIndentation": false,
  "editor.tabSize": 2, //制表符符号eslint
  "workbench.iconTheme": "vscode-icons",
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 3000,
  "typescript.updateImportsOnFileMove.enabled": "always",
  // remote settings
  "remote.SSH.defaultExtensions": [
    "eamodio.gitlens",
    "mutantdino.resourcemonitor"
  ],
  "remote.restoreForwardedPorts": true,
  "editor.linkedEditing": true,
  // eslint
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "never"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "editor.formatOnSave": false,
  "editor.fontLigatures": true,
  "diffEditor.ignoreTrimWhitespace": false,
  "editor.inlineSuggest.enabled": true,
  "workbench.colorTheme": "Default Dark+",
  "window.commandCenter": false,
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  // ===== 字体配置: 按需切换 =====
  // Mac 下使用 JetBrains Mono
  "editor.fontFamily": "Fira Code",
  "editor.fontWeight": "500",
  // Windows 下使用 Cascadia Code PL
  // "editor.fontFamily": "Cascadia Code PL",
  "appworks.materialSources": [],
  "codestream.serverUrl": "https://codestream-api-v2-us1.service.newrelic.com",
}
```