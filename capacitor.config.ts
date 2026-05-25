import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vina.skindiary', // Pastikan ID ini benar
  appName: 'Skin Diary',
  webDir: 'www',
"plugins": {
  "SplashScreen": {
    "launchShowDuration": 2000,
    "backgroundColor": "#FCD0D8",
    "androidScaleType": "CENTER_CROP"
  }
}
};

export default config;