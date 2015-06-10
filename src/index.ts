/// <reference path="../typings/node/node.d.ts" />

import WifiScanner from "./wifiscanner";
import DarwinWifiScanner from "./darwinscanner"
import LinuxWifiScanner from "./linuxscanner"

function platform(options): string {
    var platform: string;
    if(options && options.platform) {
        platform = options.platform;
        delete options.platform;
    }
    return platform || process.platform;
}

export = function wifiscanner(options) {
    
    var platformScanner;
    switch(platform(options)) {
        case "linux":
            platformScanner = LinuxWifiScanner;
        break;        
        case "darwin":
            platformScanner = DarwinWifiScanner;
        break;
        case "windows":
        //TODO implement this
        break;
    }
    
    var scanner = new platformScanner(options);
    
    return new WifiScanner(scanner);
}