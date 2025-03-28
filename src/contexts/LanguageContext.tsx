import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { translateText } from '@/services/sarvamAI';

// Define the available languages
export type Language = {
  code: string;
  name: string;
  nativeName: string;
};

// Language data
export const languages: Language[] = [
  { code: 'en-IN', name: 'English (India)', nativeName: 'English' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'od-IN', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు' },
];

// UI text translations
export type UITranslations = {
  [key: string]: {
    [langCode: string]: string;
  };
};

// Common UI text translations
export const uiTranslations: UITranslations = {
  'app.title': {
    'en-IN': 'Personal Loan Assistant',
    'hi-IN': 'व्यक्तिगत ऋण सहायक',
    'bn-IN': 'ব্যক্তিগত ঋণ সহকারী',
    'gu-IN': 'વ્યક્તિગત લોન સહાયક',
    'kn-IN': 'ವೈಯಕ್ತಿಕ ಸಾಲ ಸಹಾಯಕ',
    'ml-IN': 'വ്യക്തിഗത വായ്പാ സഹായി',
    'mr-IN': 'वैयक्तिक कर्ज सहाय्यक',
    'od-IN': 'ବ୍ୟକ୍ତିଗତ ଋଣ ସହାୟକ',
    'pa-IN': 'ਨਿੱਜੀ ਲੋਨ ਸਵਾਲਾਂ ਦੇ ਤੁਰੰਤ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰੋ।',
    'ta-IN': 'உங்கள் விருப்பமான மொழியில் உங்கள் அனைத்து தனிப்பட்ட கடன் கேள்விகளுக்கும் உடனடி பதில்களைப் பெறுங்கள்.',
    'te-IN': 'మీ అన్ని వ్యక్తిగత రుణ ప్రశ్నలకు తక్షణ సమాధానాలు పొందండి.'
  },
  'app.name': {
    'en-IN': 'Loan Advisor',
    'hi-IN': 'लोन एडवाइज़र',
    'bn-IN': 'ঋণ পরামর্শদাতা',
    'gu-IN': 'લોન સલાહકાર',
    'kn-IN': 'ಸಾಲ ಸಲಹೆಗಾರ',
    'ml-IN': 'വായ്പാ ഉപദേശകൻ',
    'mr-IN': 'कर्ज सल्लागार',
    'od-IN': 'ଋଣ ପରାମର୍ଶଦାତା',
    'pa-IN': 'ਲੋਨ ਸਲਾਹਕਾਰ',
    'ta-IN': 'கடன் ஆலோசகர்',
    'te-IN': 'రుణ సలహాదారు'
  },
  'app.subtitle': {
    'en-IN': 'Get instant answers to all your personal loan queries in your preferred language.',
    'hi-IN': 'अपनी पसंदीदा भाषा में अपने सभी व्यक्तिगत ऋण प्रश्नों के तुरंत उत्तर प्राप्त करें।',
    'bn-IN': 'আপনার পছন্দের ভাষায় আপনার সমস্ত ব্যক্তিগত ঋণ প্রশ্নের তাত্ক্ষণিক উত্তর পান।',
    'gu-IN': 'તમારી પસંદગીની ભાષામાં તમારા તમામ વ્યક્તિગત લોન પ્રશ્નોના તાત્કાલિક જવાબો મેળવો.',
    'kn-IN': 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ನಿಮ್ಮ ಎಲ್ಲಾ ವೈಯಕ್ತಿಕ ಸಾಲದ ಪ್ರಶ್ನೆಗಳಿಗೆ ತಕ್ಷಣದ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.',
    'ml-IN': 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷയിൽ നിങ്ങളുടെ എല്ലാ വ്യക്തിഗത വായ്പാ ചോദ്യങ്ങൾക്കും ഉടൻ ഉത്തരങ്ങൾ നേടുക.',
    'mr-IN': 'तुमच्या पसंतीच्या भाषेत तुमच्या सर्व वैयक्तिक कर्ज प्रश्नांची त्वरित उत्तरे मिळवा.',
    'od-IN': 'ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷାରେ ଆପଣଙ୍କର ସମସ୍ତ ବ୍ୟକ୍ତିଗତ ଋଣ ପ୍ରଶ୍ନର ତୁରନ୍ତ ଉତ୍ତର ପାଆନ୍ତୁ |',
    'pa-IN': 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਵਿੱਚ ਆਪਣੇ ਸਾਰੇ ਨਿੱਜੀ ਲੋਨ ਸਵਾਲਾਂ ਦੇ ਤੁਰੰਤ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰੋ।',
    'ta-IN': 'உங்கள் விருப்பமான மொழியில் உங்கள் அனைத்து தனிப்பட்ட கடன் கேள்விகளுக்கும் உடனடி பதில்களைப் பெறுங்கள்.',
    'te-IN': 'మీ అన్ని వ్యక్తిగత రుణ ప్రశ్నలకు తక్షణ సమాధానాలు పొందండి.'
  },
  'app.multilingual': {
    'en-IN': 'Multilingual Support',
    'hi-IN': 'बहुभाषी समर्थन',
    'bn-IN': 'বহুভাষিক সমর্থন',
    'gu-IN': 'બહુભાષી સમર્થન',
    'kn-IN': 'ಬಹುಭಾಷಾ ಬೆಂಬಲ',
    'ml-IN': 'ബഹുഭാഷാ പിന്തുണ',
    'mr-IN': 'बहुभाषिक समर्थन',
    'od-IN': 'ବହୁଭାଷୀ ସମର୍ଥନ',
    'pa-IN': 'ਬਹੁ-ਭਾਸ਼ਾਈ ਸਮਰਥਨ',
    'ta-IN': 'பல மொழி ஆதரவு',
    'te-IN': 'బహుభాషా మద్దతు'
  },
  'input.text': {
    'en-IN': 'Text',
    'hi-IN': 'टेक्स्ट',
    'bn-IN': 'টেক্সট',
    'gu-IN': 'ટેક્સ્ટ',
    'kn-IN': 'ಪಠ್ಯ',
    'ml-IN': 'ടെക്സ്റ്റ്',
    'mr-IN': 'टेक्स्ट',
    'od-IN': 'ଟେକ୍ସଟ',
    'pa-IN': 'ਟੈਕਸਟ',
    'ta-IN': 'உரை',
    'te-IN': 'టెక్స్ట్'
  },
  'input.voice': {
    'en-IN': 'Voice',
    'hi-IN': 'आवाज़',
    'bn-IN': 'ভয়েস',
    'gu-IN': 'વૉઇસ',
    'kn-IN': 'ಧ್ವನಿ',
    'ml-IN': 'വോയ്സ്',
    'mr-IN': 'व्हॉइस',
    'od-IN': 'ଭଏସ୍',
    'pa-IN': 'ਵੌਇਸ',
    'ta-IN': 'குரல்',
    'te-IN': 'వాయిస్'
  },
  'conversation.title': {
    'en-IN': 'Conversation',
    'hi-IN': 'बातचीत',
    'bn-IN': 'কথোপকথন',
    'gu-IN': 'વાતચીત',
    'kn-IN': 'ಸಂಭಾಷಣೆ',
    'ml-IN': 'സംഭാഷണം',
    'mr-IN': 'संभाषण',
    'od-IN': 'କଥୋପକଥନ',
    'pa-IN': 'ਗੱਲਬਾਤ',
    'ta-IN': 'உரையாடல்',
    'te-IN': 'సంభాషణ'
  },
  'conversation.clear': {
    'en-IN': 'Clear conversation',
    'hi-IN': 'बातचीत साफ़ करें',
    'bn-IN': 'কথোপকথন মুছুন',
    'gu-IN': 'વાતચીત સાફ કરો',
    'kn-IN': 'ಸಂಭಾಷಣೆಯನ್ನು ತೆರವುಗೊಳಿಸಿ',
    'ml-IN': 'സംഭാഷണം മായ്‌ക്കുക',
    'mr-IN': 'संभाषण साफ करा',
    'od-IN': 'କଥୋପକଥନ ସଫା କରନ୍ତୁ',
    'pa-IN': 'ਗੱਲਬਾਤ ਸਾਫ਼ ਕਰੋ',
    'ta-IN': 'உரையாடலை அழிக்கவும்',
    'te-IN': 'సంభాషణను క్లియర్ చేయండి'
  },
  'conversation.empty.title': {
    'en-IN': 'Welcome to Loan Advisor',
    'hi-IN': 'लोन एडवाइज़र में आपका स्वागत है',
    'bn-IN': 'ঋণ পরামর্শদাতায় স্বাগতম',
    'gu-IN': 'લોન સલાહકારમાં આપનું સ્વાગત છે',
    'kn-IN': 'ಸಾಲ ಸಲಹೆಗಾರಕ್ಕೆ ಸುಸ್ವಾಗತ',
    'ml-IN': 'വായ്പാ ഉപദേശകനിലേക്ക് സ്വാഗതം',
    'mr-IN': 'कर्ज सल्लागारमध्ये आपले स्वागत आहे',
    'od-IN': 'ଋଣ ପରାମର୍ଶଦାତାରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ',
    'pa-IN': 'ਲੋਨ ਸਲਾਹਕਾਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    'ta-IN': 'கடன் ஆலோசகருக்கு வரவேற்கிறோம்',
    'te-IN': 'రుణ సలహాదారుకి స్వాగతం'
  },
  'conversation.empty.subtitle': {
    'en-IN': 'Ask me anything about personal loans, eligibility, interest rates, or application processes in your preferred language.',
    'hi-IN': 'अपनी पसंदीदा भाषा में व्यक्तिगत ऋण, पात्रता, ब्याज दरों या आवेदन प्रक्रियाओं के बारे में कुछ भी पूछें।',
    'bn-IN': 'আপনার পছন্দের ভাষায় ব্যক্তিগত ঋণ, যোগ্যতা, সুদের হার বা আবেদন প্রক্রিয়া সম্পর্কে আমাকে যা কিছু জিজ্ঞাসা করুন।',
    'gu-IN': 'તમારી પસંદગીની ભાષામાં વ્યક્તિગત લોન, પાત્રતા, વ્યાજ દર અથવા અરજી પ્રક્રિયાઓ વિશે મને કંઈપણ પૂછો.',
    'kn-IN': 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ವೈಯಕ್ತಿಕ ಸಾಲಗಳು, ಅರ್ಹತೆ, ಬಡ್ಡಿ ದರಗಳು ಅಥವಾ ಅಪ್ಲಿಕೇಶನ್ ಪ್ರಕ್ರಿಯೆಗಳ ಬಗ್ಗೆ ನನ್ನನ್ನು ಏನಾದರೂ ಕೇಳಿ.',
    'ml-IN': 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷയിൽ വ്യക്തിഗത വായ്പകൾ, യോഗ്യത, പലിശ നിരക്കുകൾ അല്ലെങ്കിൽ അപേക്ഷാ പ്രക്രിയകൾ എന്നിവയെക്കുറിച്ച് എന്നോട് എന്തും ചോദിക്കൂ.',
    'mr-IN': 'तुमच्या पसंतीच्या भाषेत वैयक्तिक कर्ज, पात्रता, व्याज दर किंवा अर्ज प्रक्रियांबद्दल मला काहीही विचारा.',
    'od-IN': 'ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷାରେ ବ୍ୟକ୍ତିଗତ ଋଣ, ଯୋଗ୍ୟତା, ସୁଧ ହାର କିମ୍ବା ଆବେଦନ ପ୍ରକ୍ରିୟା ବିଷୟରେ ମୋତେ କିଛି ବି ପଚାରନ୍ତୁ।',
    'pa-IN': 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਵਿੱਚ ਨਿੱਜੀ ਕਰਜ਼ੇ, ਯੋਗਤਾ, ਵਿਆਜ ਦਰਾਂ, ਜਾਂ ਅਰਜ਼ੀ ਪ੍ਰਕਿਰਿਆਵਾਂ ਬਾਰੇ ਮੈਨੂੰ ਕੁਝ ਵੀ ਪੁੱਛੋ।',
    'ta-IN': 'உங்கள் விருப்பமான மொழியில் தனிப்பட்ட கடன்கள், தகுதி, வட்டி விகிதங்கள் அல்லது விண்ணப்ப செயல்முறைகள் பற்றி என்னிடம் எதையும் கேளுங்கள்.',
    'te-IN': 'మీ అన్ని వ్యక్తిగత రుణాలు, అర్హత, వడ్డీ రేట్లు లేదా దరఖాస్తు ప్రక്రియల గురించి నన్ను ఏదైనా అడగండి.'
  },
  'audio.play': {
    'en-IN': 'Play audio',
    'hi-IN': 'ऑडियो चलाएं',
    'bn-IN': 'অডিও চালান',
    'gu-IN': 'ઓડિયો ચલાવો',
    'kn-IN': 'ಆಡಿಯೋ ಪ್ಲೇ ಮಾಡಿ',
    'ml-IN': 'ഓഡിയോ പ്ലേ ചെയ്യുക',
    'mr-IN': 'ऑडिओ प्ले करा',
    'od-IN': 'ଅଡିଓ ଚଲାନ୍ତୁ',
    'pa-IN': 'ਆਡੀਓ ਚਲਾਓ',
    'ta-IN': 'ஆடியோவை இயக்கு',
    'te-IN': 'ఆడియో ప్లే చేయండి'
  },
  'audio.stop': {
    'en-IN': 'Stop audio',
    'hi-IN': 'ऑडियो रोकें',
    'bn-IN': 'অডিও বন্ধ করুন',
    'gu-IN': 'ઓડિયો બંધ કરો',
    'kn-IN': 'ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ',
    'ml-IN': 'ഓഡിയോ നിർത്തുക',
    'mr-IN': 'ऑडिओ थांबवा',
    'od-IN': 'ଅଡିଓ ବନ୍ଦ କରନ୍ତୁ',
    'pa-IN': 'ਆਡੀਓ ਬੰਦ ਕਰੋ',
    'ta-IN': 'ஆடியோவை நிறுத்து',
    'te-IN': 'ఆడియో ఆపండి'
  },
  'audio.listen': {
    'en-IN': 'Listen',
    'hi-IN': 'सुनें',
    'bn-IN': 'শুনুন',
    'gu-IN': 'સાંભળો',
    'kn-IN': 'ಕೇಳಿ',
    'ml-IN': 'കേൾക്കുക',
    'mr-IN': 'ऐका',
    'od-IN': 'ଶୁଣନ୍ତୁ',
    'pa-IN': 'ਸੁਣੋ',
    'ta-IN': 'கேளுங்கள்',
    'te-IN': 'వినండి'
  },
  'audio.replay': {
    'en-IN': 'Replay your message',
    'hi-IN': 'अपना संदेश फिर से सुनें',
    'bn-IN': 'আপনার বার্তা পুনরায় চালান',
    'gu-IN': 'તમારો સંદેશ ફરીથી ચલાવો',
    'kn-IN': 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಮರುಪ್ಲೇ ಮಾಡಿ',
    'ml-IN': 'നിങ്ങളുടെ സന്ദേശം വീണ്ടും പ്ലേ ചെയ്യുക',
    'mr-IN': 'तुमचा संदेश पुन्हा प्ले करा',
    'od-IN': 'ଆପଣଙ୍କ ବାର୍ତ୍ତା ପୁନଃଚାଳନା କରନ୍ତୁ',
    'pa-IN': 'ਆਪਣਾ ਸੁਨੇਹਾ ਦੁਬਾਰਾ ਚਲਾਓ',
    'ta-IN': 'உங்கள் செய்தியை மீண்டும் இயக்கவும்',
    'te-IN': 'మీ సందేశాన్ని మళ్లీ ప్లే చేయండి'
  },
  'processing': {
    'en-IN': 'Processing...',
    'hi-IN': 'प्रोसेसिंग...',
    'bn-IN': 'প্রক্রিয়াকরণ হচ্ছে...',
    'gu-IN': 'પ્રક્રિયા કરી રહ્યું છે...',
    'kn-IN': 'ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...',
    'ml-IN': 'പ്രോസസ്സ് ചെയ്യുന്നു...',
    'mr-IN': 'प्रक्रिया करत आहे...',
    'od-IN': 'ପ୍ରକ୍ରିୟାକରଣ ହେଉଛି...',
    'pa-IN': 'ਪ੍ਰੋਸੈਸਿੰਗ...',
    'ta-IN': 'செயலாக்கப்படுகிறது...',
    'te-IN': 'ప్రాసెస్ చేస్తోంది...'
  },
  'no.response': {
    'en-IN': 'No response yet',
    'hi-IN': 'अभी तक कोई जवाब नहीं',
    'bn-IN': 'এখনও কোন প্রতিক্রিয়া নেই',
    'gu-IN': 'હજુ સુધી કોઈ પ્રતિસાદ નથી',
    'kn-IN': 'ಇನ್ನೂ ಯಾವುದೇ ಪ್ರತಿಕ್ರಿಯೆ ಇಲ್ಲ',
    'ml-IN': 'ഇതുവരെ പ്രതികരണമൊന്നുമില്ല',
    'mr-IN': 'अद्याप कोणताही प्रतिसाद नाही',
    'od-IN': 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ପ୍ରତିକ୍ରିୟା ନାହିଁ',
    'pa-IN': 'ਅਜੇ ਤੱਕ ਕੋਈ ਜਵਾਬ ਨਹੀਂ',
    'ta-IN': 'இன்னும் பதில் இல்லை',
    'te-IN': 'ఇంకా ప్రతిస్పందన లేదు'
  },
  'auth.login': {
    'en-IN': 'Login',
    'hi-IN': 'लॉगिन',
    'bn-IN': 'লগইন',
    'gu-IN': 'લોગિન',
    'kn-IN': 'ಲಾಗಿನ್',
    'ml-IN': 'ലോഗിൻ',
    'mr-IN': 'लॉगिन',
    'od-IN': 'ଲଗଇନ୍',
    'pa-IN': 'ਲੌਗਿਨ',
    'ta-IN': 'உள்நுழைய',
    'te-IN': 'లాగిన్'
  },
  'api.customUrl': {
    'en-IN': 'Custom API URL:',
    'hi-IN': 'कस्टम API यूआरएल:',
    'bn-IN': 'কাস্টম API URL:',
    'gu-IN': 'કસ્ટમ API URL:',
    'kn-IN': 'ಕಸ್ಟಮ್ API URL:',
    'ml-IN': 'കസ്റ്റം API URL:',
    'mr-IN': 'कस्टम API URL:',
    'od-IN': 'କଷ୍ଟମ API URL:',
    'pa-IN': 'ਕਸਟਮ API URL:',
    'ta-IN': 'விருப்ப API URL:',
    'te-IN': 'కస్టమ్ API URL:'
  },
  'api.placeholder': {
    'en-IN': 'https://your-api-url.com/api',
    'hi-IN': 'https://your-api-url.com/api',
    'bn-IN': 'https://your-api-url.com/api',
    'gu-IN': 'https://your-api-url.com/api',
    'kn-IN': 'https://your-api-url.com/api',
    'ml-IN': 'https://your-api-url.com/api',
    'mr-IN': 'https://your-api-url.com/api',
    'od-IN': 'https://your-api-url.com/api',
    'pa-IN': 'https://your-api-url.com/api',
    'ta-IN': 'https://your-api-url.com/api',
    'te-IN': 'https://your-api-url.com/api'
  },
  'api.edit': {
    'en-IN': 'Edit API URL',
    'hi-IN': 'API URL संपादित करें',
    'bn-IN': 'API URL সম্পাদনা করুন',
    'gu-IN': 'API URL સંપાદિત કરો',
    'kn-IN': 'API URL ಸಂಪಾದಿಸಿ',
    'ml-IN': 'API URL എഡിറ്റ് ചെയ്യുക',
    'mr-IN': 'API URL संपादित करा',
    'od-IN': 'API URL ସମ୍ପାଦନ କରନ୍ତୁ',
    'pa-IN': 'API URL ਸੋਧੋ',
    'ta-IN': 'API URL ஐத் திருத்து',
    'te-IN': 'API URL సవరించండి'
  },
  'input.placeholder': {
    'en-IN': 'Ask about loans in English...',
    'hi-IN': 'हिंदी में ऋण के बारे में पूछें...',
    'bn-IN': 'বাংলায় ঋণ সম্পর্কে জিজ্ঞাসা করুন...',
    'gu-IN': 'ગુજરાતીમાં લોન વિશે પૂછો...',
    'kn-IN': 'ಕನ್ನಡದಲ್ಲಿ ಸಾಲಗಳ ಬಗ್ಗೆ ಕೇಳಿ...',
    'ml-IN': 'മലയാളത്തിൽ വായ്പകളെക്കുറിച്ച് ചോദിക്കൂ...',
    'mr-IN': 'मराठीत कर्जाबद्दल विचारा...',
    'od-IN': 'ଓଡିଆରେ ଋଣ ବିଷୟରେ ପଚାରନ୍ତୁ...',
    'pa-IN': 'ਪੰਜਾਬੀ ਵਿੱਚ ਲੋਨ ਬਾਰੇ ਪੁੱਛੋ...',
    'ta-IN': 'தமிழில் கடன்கள் பற்றி கேளுங்கள்...',
    'te-IN': 'తెలుగులో రుణాల గురించి అడగండి...'
  },
  'input.send': {
    'en-IN': 'Send message',
    'hi-IN': 'संदेश भेजें',
    'bn-IN': 'বার্তা পাঠান',
    'gu-IN': 'સંદેશ મોકલો',
    'kn-IN': 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    'ml-IN': 'സന്ദേശം അയയ്ക്കുക',
    'mr-IN': 'संदेश पाठवा',
    'od-IN': 'ମେସେଜ୍ ପଠାନ୍ତୁ',
    'pa-IN': 'ਸੁਨੇਹਾ ਭੇਜੋ',
    'ta-IN': 'செய்தி அனுப்பு',
    'te-IN': 'సందేశం పంపండి'
  },
  'voice.recording': {
    'en-IN': 'Recording... {time}',
    'hi-IN': 'रिकॉर्डिंग... {time}',
    'bn-IN': 'রেকর্ডিং... {time}',
    'gu-IN': 'રેકોર્ડિંગ... {time}',
    'kn-IN': 'ರೆಕಾರ್ಡಿಂಗ್... {time}',
    'ml-IN': 'റെക്കോർഡിംഗ്... {time}',
    'mr-IN': 'रेकॉर्डिंग... {time}',
    'od-IN': 'ରେକର୍ଡିଂ... {time}',
    'pa-IN': 'ਰਿਕਾਰਡਿੰਗ... {time}',
    'ta-IN': 'பதிவு செய்கிறது... {time}',
    'te-IN': 'రికార్డింగ్... {time}'
  },
  'voice.prompt': {
    'en-IN': 'Click to record',
    'hi-IN': 'रिकॉर्ड करने के लिए क्लिक करें',
    'bn-IN': 'রেকর্ড করতে ক্লিক করুন',
    'gu-IN': 'રેકોર્ડ કરવા માટે ક્લિક કરો',
    'kn-IN': 'ರೆಕಾರ್ಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
    'ml-IN': 'റെക്കോർഡ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക',
    'mr-IN': 'रेकॉर्ड करण्यासाठी क्लिक करा',
    'od-IN': 'ରେକର୍ଡ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ',
    'pa-IN': 'ਰਿਕਾਰਡ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ',
    'ta-IN': 'பதிவு செய்ய கிளிக் செய்யவும்',
    'te-IN': 'రికార్డ్ చేయడానికి క్లిక్ చేయండి'
  },
  'voice.denied': {
    'en-IN': 'Microphone access denied',
    'hi-IN': 'माइक्रोफोन एक्सेस अस्वीकृत',
    'bn-IN': 'মাইক্রোফোন অ্যাক্সেস অস্বীকৃত',
    'gu-IN': 'માઇક્રોફોન ઍક્સેસ નકારી',
    'kn-IN': 'ಮೈಕ್ರೋಫೋನ್ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗುತ್ತಿದೆ',
    'ml-IN': 'മൈക്രോഫോൺ ആക്സസ് നിഷേധിച്ചു',
    'mr-IN': 'मायक्रोफोन अ‍ॅक्सेस नाकारले',
    'od-IN': 'ମାଇକ୍ରୋଫୋନ୍ ଆକ୍ସେସ୍ ଅସ୍ୱୀକୃତ',
    'pa-IN': 'ਮਾਈਕ੍ਰੋਫੋਨ ਪਹੁੰਚ ਤੋਂ ਇਨਕਾਰ ਕੀਤਾ ਗਿਆ',
    'ta-IN': 'மைக்ரோஃபோன் அணுகல் மறுக்கப்பட்டது',
    'te-IN': 'మైక్రోఫోన్ యాక్సెస్ నిరాకరించబడింది'
  },
  'voice.processing': {
    'en-IN': 'Processing audio...',
    'hi-IN': 'ऑडियो प्रोसेस हो रहा है...',
    'bn-IN': 'অডিও প্রসেস করা হচ্ছে...',
    'gu-IN': 'ઓડિયો પ્રોસેસ થઈ રહ્યો છે...',
    'kn-IN': 'ಆಡಿಯೊ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...',
    'ml-IN': 'ഓഡിയോ പ്രോസസ്സ് ചെയ്യുന്നു...',
    'mr-IN': 'ऑडिओ प्रोसेस होत आहे...',
    'od-IN': 'ଅଡିଓ ପ୍ରକ୍ରିୟାକରଣ ହେଉଛି...',
    'pa-IN': 'ਆਡੀਓ ਪ੍ਰੋਸੈਸ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
    'ta-IN': 'ஆடியோ செயலாக்கப்படுகிறது...',
    'te-IN': 'ఆడియో ప్రాసెస్ చేస్తోంది...'
  },
  'voice.start': {
    'en-IN': 'Start recording',
    'hi-IN': 'रिकॉर्डिंग शुरू करें',
    'bn-IN': 'রেকর্ডিং শুরু করুন',
    'gu-IN': 'રેકોર્ડિંગ શરૂ કરો',
    'kn-IN': 'ರೆಕಾರ್ಡಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
    'ml-IN': 'റെക്കോർഡിംഗ് ആരംഭിക്കുക',
    'mr-IN': 'रेकॉर्डिंग सुरू करा',
    'od-IN': 'ରେକର୍ଡିଂ ଆରମ୍ଭ କରନ୍ତୁ',
    'pa-IN': 'ਰਿਕਾਰਡਿੰਗ ਸ਼ੁਰੂ ਕਰੋ',
    'ta-IN': 'பதிவு செய்யத் தொடங்கு',
    'te-IN': 'రికార్డింగ్ ప్రారంభించండి'
  },
  'voice.stop': {
    'en-IN': 'Stop recording',
    'hi-IN': 'रिकॉर्डिंग बंद करें',
    'bn-IN': 'রেকর্ডিং বন্ধ করুন',
    'gu-IN': 'રેકોર્ડિંગ બંધ કરો',
    'kn-IN': 'ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ',
    'ml-IN': 'റെക്കോർഡിംഗ് നിർത്തുക',
    'mr-IN': 'रेकॉर्डिंग थांबवा',
    'od-IN': 'ରେକର୍ଡିଂ ବନ୍ଦ କରନ୍ତୁ',
    'pa-IN': 'ਰਿਕਾਰਡਿੰਗ ਬੰਦ ਕਰੋ',
    'ta-IN': 'பதிவு செய்வதை நிறுத்து',
    'te-IN': 'రికార్డింగ్ ఆపండి'
  },
  'error.title': {
    'en-IN': 'Error',
    'hi-IN': 'त्रुटि',
    'bn-IN': 'ত্রুটি',
    'gu-IN': 'ભૂલ',
    'kn-IN': 'ದೋಷ',
    'ml-IN': 'പിശക്',
    'mr-IN': 'त्रुटी',
    'od-IN': 'ତ୍ରୁଟି',
    'pa-IN': 'ਗਲਤੀ',
    'ta-IN': 'பிழை',
    'te-IN': 'లోపం'
  },
  'error.audio': {
    'en-IN': 'Could not process your audio. Please try again.',
    'hi-IN': 'आपके ऑडियो को प्रोसेस नहीं किया जा सका। कृपया पुनः प्रयास करें।',
    'bn-IN': 'আপনার অডিও প্রক্রিয়া করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
    'gu-IN': 'તમારા ઓડિયોને પ્રોસેસ કરી શકાયું નથી. કૃપા કરીને ફરી પ્રયાસ કરો.',
    'kn-IN': 'ನಿಮ್ಮ ಆಡಿಯೊವನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    'ml-IN': 'നിങ്ങളുടെ ഓഡിയോ പ്രോസസ്സ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.',
    'mr-IN': 'तुमचा ऑडिओ प्रोसेस करू शकलो नाही. कृपया पुन्हा प्रयत्न करा.',
    'od-IN': 'ଆପଣଙ୍କ ଅଡିଓ ପ୍ରକ୍ରିୟାକରଣ କରିପାରିଲା ନାହିଁ। ଦୟାକରି ପୁନଃଚେଷ୍ଟା କରନ୍ତୁ।',
    'pa-IN': 'ਤੁਹਾਡੀ ਆਡੀਓ ਨੂੰ ਪ੍ਰੋਸੈਸ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕੀ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
    'ta-IN': 'உங்கள் ஆடியோவை செயலாக்க முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
    'te-IN': 'మీ ఆడియోను ప్రాసెస్ చేయలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.'
  },
  'error.microphone': {
    'en-IN': 'Could not access your microphone. Please check permissions.',
    'hi-IN': 'आपके माइक्रोफोन तक पहुंच नहीं हो सकी। कृपया अनुमतियां जांचें।',
    'bn-IN': 'আপনার মাইক্রোফোন অ্যাক্সেস করা যায়নি। অনুগ্রহ করে অনুমতি চেক করুন।',
    'gu-IN': 'તમારા માઇક્રોફોન ઍક્સેસ કરી શકાયું નથી. કૃપા કરીને પરવાનગીઓ તપાસો.',
    'kn-IN': 'ನಿಮ್ಮ ಮೈಕ್ರೋಫೋನ್ ಅನ್ನು ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
    'ml-IN': 'നിങ്ങളുടെ മൈക്രോഫോൺ ആക്സസ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി അനുമതികൾ പരിശോധിക്കുക.',
    'mr-IN': 'तुमचा मायक्रोफोन अ‍ॅक्सेस करू शकलो नाही. कृपया परवानग्या तपासा.',
    'od-IN': 'ଆପଣଙ୍କ ମାଇକ୍ରୋଫୋନ୍ ଆକ୍ସେସ୍ କରିପାରିଲା ନାହିଁ। ଦୟାକରି ଅନୁମତିଗୁଡ଼ିକ ଯାଞ୍ଚ କରନ୍ତୁ।',
    'pa-IN': 'ਤੁਹਾਡੇ ਮਾਈਕ੍ਰੋਫੋਨ ਤੱਕ ਪਹੁੰਚ ਨਹੀਂ ਕੀਤੀ ਜਾ ਸਕੀ। ਕਿਰਪਾ ਕਰਕੇ ਅਨੁਮਤੀਆਂ ਦੀ ਜਾਂਚ ਕਰੋ।',
    'ta-IN': 'உங்கள் மைக்ரோஃபோனை அணுக முடியவில்லை. அனுமதிகளைச் சரிபார்க்கவும்.',
    'te-IN': 'మీ మైక్రోఫోన్‌ను యాక్సెస్ చేయలేకపోయాము. దయచేసి అనుమతులను తనిఖీ చేయండి.'
  },
  'theme.dark': {
    'en-IN': 'Switch to dark mode',
    'hi-IN': 'डार्क मोड पर स्विच करें',
    'bn-IN': 'ডার্ক মোডে স্যুইচ করুন',
    'gu-IN': 'ડાર્ક મોડ પર સ્વિચ કરો',
    'kn-IN': 'ಡಾರ್ಕ್ ಮೋಡ್‌ಗೆ ಬದಲಿಸಿ',
    'ml-IN': 'ഡാർക്ക് മോഡിലേക്ക് മാറുക',
    'mr-IN': 'डार्क मोडवर स्विच करा',
    'od-IN': 'ଡାର୍କ ମୋଡକୁ ସ୍ୱିଚ କରନ୍ତୁ',
    'pa-IN': 'ਡਾਰਕ ਮੋਡ \'ਤੇ ਸਵਿੱਚ ਕਰੋ',
    'ta-IN': 'இருள் பயன்முறைக்கு மாறவும்',
    'te-IN': 'డార్క్ మోడ్‌కి మారండి'
  },
  'theme.light': {
    'en-IN': 'Switch to light mode',
    'hi-IN': 'लाइट मोड पर स्विच करें',
    'bn-IN': 'লাইট মোডে স্যুইচ করুন',
    'gu-IN': 'લાઇટ મોડ પર સ્વિચ કરો',
    'kn-IN': 'ಲೈಟ್ ಮೋಡ್‌ಗೆ ಬದಲಿಸಿ',
    'ml-IN': 'ലൈറ്റ് മോഡിലേക്ക് മാറുക',
    'mr-IN': 'लाइट मोडवर स्विच करा',
    'od-IN': 'ଲାଇଟ୍ ମୋଡକୁ ସ୍ୱିଚ କରନ୍ତୁ',
    'pa-IN': 'ਲਾਈਟ ਮੋਡ \'ਤੇ ਸਵਿੱਚ ਕਰੋ',
    'ta-IN': 'ஒளி பயன்முறைக்கு மாறவும்',
    'te-IN': 'లైట్ మోడ్‌కి మారండి'
  },
  'calculator.title': {
    'en-IN': 'Loan Eligibility Calculator',
    'hi-IN': 'लोन योग्यता कैलकुलेटर',
    'bn-IN': 'ঋণ যোग্যতা ক্যালকুলেটর',
    'gu-IN': 'લોન યોગ્યતા કેલ્ક્યુલેટર',
    'kn-IN': 'ಸಾಲ ಅರ್ಹತೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    'ml-IN': 'വായ്പാ യോഗ്യതാ കാൽക്കുലേറ്റർ',
    'mr-IN': 'कर्ज पात्रता कॅल्क्युलेटर',
    'od-IN': 'ଋଣ ଯୋଗ୍ୟତା କ୍ୟାଲକୁଲେଟର',
    'pa-IN': 'ਲੋਨ ਯੋਗਤਾ ਕੈਲਕੁਲੇਟਰ',
    'ta-IN': 'கடன் தகுதி கால்குலேட்டர்',
    'te-IN': 'రుణ అర్హత కాల్కులేటర్'
  },
  'calculator.subtitle': {
    'en-IN': 'Calculate how much loan you are eligible for based on your income',
    'hi-IN': 'अपनी आय के आधार पर आप कितने ऋण के लिए पात्र हैं, यह गणना करें',
    'bn-IN': 'আপনার আয়ের উপর ভিত্তি করে আপনি কত ঋণের জন্য যোগ্য তা গণनা করুন',
    'gu-IN': 'તમારી આવકના આધારે તમે કેટલી લોન માટે પાત્ર છો તેની ગણતરી કરો',
    'kn-IN': 'ನಿಮ್ಮ ಆದಾಯದ ಆಧಾರದ ಮೇಲೆ ನೀವು ಎಷ್ಟು ಸಾಲಕ್ಕೆ ಅರ್ಹರಾಗಿದ್ದೀರಿ ಎಂಬುದನ್ನು ಲೆಕ್ಕ ಹಾಕಿ',
    'ml-IN': 'നിങ്ങളുടെ വരുമാനത്തിന്റെ അടിസ്ഥാനത്തിൽ നിങ്ങൾക്ക് എത്ര വായ്പയ്ക്ക് യോഗ്യതയുണ്ടെന്ന് കണക്കാക്കുക',
    'mr-IN': 'तुमच्या उत्पन्नावर आधारित तुम्ही किती कर्जासाठी पात्र आहात याची गणना करा',
    'od-IN': 'ଆପଣଙ୍କ ଆୟ ଆଧାରରେ ଆପଣ କେତେ ଋଣ ପାଇଁ ଯୋଗ୍ୟ ତାହା ଗଣନା କରନ୍ତୁ',
    'pa-IN': 'ਤੁਹਾਡੀ ਆਮਦਨ ਦੇ ਆਧਾਰ \'ਤੇ ਤੁਸੀਂ ਕਿੰਨੇ ਲੋਨ ਲਈ ਯੋਗ ਹੋ, ਇਸਦੀ ਗਣਨਾ ਕਰੋ',
    'ta-IN': 'உங்கள் வருமானத்தின் அடிப்படையில் நீங்கள் எவ்வளவு கடனுக்கு தகுதியானவர் என்பதைக் கணக்கிடுங்கள்',
    'te-IN': 'మీ ఆదాయం ఆధారంగా మీరు ఎంత రుణానికి అర్హులో లెక్కించండి'
  },
  'calculator.income': {
    'en-IN': 'Monthly Gross Income',
    'hi-IN': 'मासिक सकल आय',
    'bn-IN': 'মাসিক মোট আয়',
    'gu-IN': 'માસિક કુલ આવક',
    'kn-IN': 'ಮಾಸಿಕ ಒಟ್ಟು ಆದಾಯ',
    'ml-IN': 'മാസ മൊത്ത വരുമാനം',
    'mr-IN': 'मासिक एकूण उत्पन्न',
    'od-IN': 'ମାସିକ ମୋଟ ଆୟ',
    'pa-IN': 'ਮਹੀਨਾਵਾਰ ਕੁੱਲ ਆਮਦਨੀ',
    'ta-IN': 'மாதாந்திர மொத்த வருமானம்',
    'te-IN': 'నెలవారీ స్థూల ఆదాయం'
  },
  'calculator.tenure': {
    'en-IN': 'Loan Tenure (Years)',
    'hi-IN': 'लोन अवधि (वर्ष)',
    'bn-IN': 'ঋণের মেয়াদ (বছর)',
    'gu-IN': 'લોન અવધિ (વર્ષ)',
    'kn-IN': 'ಸಾಲದ ಅವಧಿ (ವರ್ಷಗಳು)',
    'ml-IN': 'വായ്പാ കാലാവധി (വർഷങ്ങൾ)',
    'mr-IN': 'कर्ज कालावधी (वर्षे)',
    'od-IN': 'ଋଣ ଅବଧି (ବର୍ଷ)',
    'pa-IN': 'ਲੋਨ ਮਿਆਦ (ਸਾਲ)',
    'ta-IN': 'கடன் காலம் (ஆண்டுகள்)',
    'te-IN': 'రుణ వ్యవధి (సంవత్సరాలు)'
  },
  'calculator.interest': {
    'en-IN': 'Interest Rate (%)',
    'hi-IN': 'ब्याज दर (%)',
    'bn-IN': 'সুদের হার (%)',
    'gu-IN': 'વ્યાજ દર (%)',
    'kn-IN': 'ಬಡ್ಡಿ ದರ (%)',
    'ml-IN': 'പലിശ നിരക്ക് (%)',
    'mr-IN': 'व्याज दर (%)',
    'od-IN': 'ସୁଧ ହାର (%)',
    'pa-IN': 'ਵਿਆਜ ਦਰ (%)',
    'ta-IN': 'வட்டி விகிதம் (%)',
    'te-IN': 'వడ్డీ రేటు (%)'
  },
  'calculator.emi': {
    'en-IN': 'Other EMIs',
    'hi-IN': 'अन्य ईएमआई',
    'bn-IN': 'অন্যান্য ইএমআই',
    'gu-IN': 'અન્ય ઇએમઆઇ',
    'kn-IN': 'ಇತರ ಇಎಂಐಗಳು',
    'ml-IN': 'മറ്റ് ഇഎംഐകൾ',
    'mr-IN': 'इतर ईएमआय',
    'od-IN': 'ଅନ୍ୟ ଇଏମଆଇ',
    'pa-IN': 'ਹੋਰ ਈਐਮਆਈ',
    'ta-IN': 'மற்ற EMIகள்',
    'te-IN': 'ఇతర EMIలు'
  },
  'calculator.calculate': {
    'en-IN': 'Calculate',
    'hi-IN': 'गणना करें',
    'bn-IN': 'গণনা করুন',
    'gu-IN': 'ગણતરી કરો',
    'kn-IN': 'ಲೆಕ್ಕ ಮಾಡಿ',
    'ml-IN': 'കണക്കാക്കുക',
    'mr-IN': 'गणना करा',
    'od-IN': 'ଗଣନା କରନ୍ତୁ',
    'pa-IN': 'ਗਣਨਾ ਕਰੋ',
    'ta-IN': 'கணக்கிடு',
    'te-IN': 'లెక్కించండి'
  },
  'calculator.result': {
    'en-IN': 'Loan Eligibility Result',
    'hi-IN': 'लोन योग्यता परिणाम',
    'bn-IN': 'ঋণ যোগ্যতা ফলাফল',
    'gu-IN': 'લોન યોગ્યતા પરિણામ',
    'kn-IN': 'ಸಾಲ ಅರ್ಹತೆ ಫಲಿತಾಂಶ',
    'ml-IN': 'വായ്പാ യോഗ്യതാ ഫലം',
    'mr-IN': 'कर्ज पात्रता निकाल',
    'od-IN': 'ଋଣ ଯୋଗ୍ୟତା ଫଳାଫଳ',
    'pa-IN': 'ਲੋਨ ਯੋਗਤਾ ਨਤੀਜਾ',
    'ta-IN': 'கடன் தகுதி முடிவு',
    'te-IN': 'రుణ అర్హత ఫలితం'
  },
  'calculator.eligibility': {
    'en-IN': 'Your Loan Eligibility',
    'hi-IN': 'आपकी लोन योग्यता',
    'bn-IN': 'আপনার ঋণ যোগ্যতা',
    'gu-IN': 'તમારી લોન યોગ્યતા',
    'kn-IN': 'ನಿಮ್ಮ ಸಾಲ ಅರ್ಹತೆ',
    'ml-IN': 'നിങ്ങളുടെ വായ്പാ യോഗ്യത',
    'mr-IN': 'तुमची कर्ज पात्रता',
    'od-IN': 'ଆପଣଙ୍କ ଋଣ ଯୋଗ୍ୟତା',
    'pa-IN': 'ਤੁਹਾਡੀ ਲੋਨ ਯੋਗਤਾ',
    'ta-IN': 'உங்கள் கடன் தகுதி',
    'te-IN': 'మీ రుణ అర్హత'
  },
  'calculator.monthly': {
    'en-IN': 'Monthly',
    'hi-IN': 'मासिक',
    'bn-IN': 'মাসিক',
    'gu-IN': 'માસિક',
    'kn-IN': 'ಮಾಸಿಕ',
    'ml-IN': 'പ്രതിമാസം',
    'mr-IN': 'मासिक',
    'od-IN': 'ମାସିକ',
    'pa-IN': 'ਮਹੀਨਾਵਾਰ',
    'ta-IN': 'மாதாந்திர',
    'te-IN': 'నెలవారీ'
  },
  'calculator.years': {
    'en-IN': 'Years',
    'hi-IN': 'वर्ष',
    'bn-IN': 'বছর',
    'gu-IN': 'વર્ષ',
    'kn-IN': 'ವರ್ಷಗಳು',
    'ml-IN': 'വർഷങ്ങൾ',
    'mr-IN': 'वर्षे',
    'od-IN': 'ବର୍ଷ',
    'pa-IN': 'ਸਾਲ',
    'ta-IN': 'ஆண்டுகள்',
    'te-IN': 'సంవత్సరాలు'
  },
  'calculator.note': {
    'en-IN': 'Note: This is an estimate based on the information provided. Actual loan eligibility may vary based on credit score and other factors.',
    'hi-IN': 'नोट: यह अनुमान दी गई जानकारी के आधार पर है। वास्तविक ऋण पात्रता क्रेडिट स्कोर और अन्य कारकों के आधार पर भिन्न हो सकती है।',
    'bn-IN': 'নোট: এটি প্রদত্ত তথ্যের উপর ভিত্তি করে একটি অনুমান। প্রকৃত ঋণ যোগ্যতা ক্রেডিট স্কোর এবং অন্যান্য কারণের উপর ভিত্তি করে পরিবর্তিত হতে পারে।',
    'gu-IN': 'નોંધ: આ આપેલી માહિતીના આધારે એક અંદાજ છે. વાસ્તવિક લોન પાત્રતા ક્રેડિટ સ્કોર અને અન્ય પરિબળોના આધારે બદલાઈ શકે છે.',
    'kn-IN': 'ಗಮನಿಸಿ: ಇದು ನೀಡಿದ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಒಂದು ಅಂದಾಜು. ನಿಜವಾದ ಸಾಲ ಅರ್ಹತೆ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಮತ್ತು ಇತರ ಅಂಶಗಳ ಆಧಾರದ ಮೇಲೆ ಬದಲಾಗಬಹುದು.',
    'ml-IN': 'കുറിപ്പ്: നൽകിയ വിവരങ്ങളുടെ അടിസ്ഥാനത്തിലുള്ള ഒരു എസ്റ്റിമേറ്റാണിത്. യഥാർത്ഥ വായ്പാ യോഗ്യത ക്രെഡിറ്റ് സ്കോർ, മറ്റ് ഘടകങ്ങൾ എന്നിവയുടെ അടിസ്ഥാനത്തിൽ വ്യത്യാസപ്പെടാം.',
    'mr-IN': 'टीप: हा दिलेल्या माहितीच्या आधारे एक अंदाज आहे. वास्तविक कर्ज पात्रता क्रेडिट स्कोअर आणि इतर घटकांवर आधारित बदलू शकते.',
    'od-IN': 'ଟିପ୍ପଣୀ: ଏହା ପ୍ରଦତ୍ତ ସୂଚନା ଆଧାରରେ ଏକ ଅନୁମାନ। ପ୍ରକୃତ ଋଣ ଯୋଗ୍ୟତା କ୍ରେଡିଟ୍ ସ୍କୋର୍ ଏବଂ ଅନ୍ୟାନ୍ୟ କାରଣ ଆଧାରରେ ପରିବର୍ତ୍ତନ ହୋଇପାରେ।',
    'pa-IN': 'ਨੋਟ: ਇਹ ਦਿੱਤੀ ਗਈ ਜਾਣਕਾਰੀ ਦੇ ਆਧਾਰ \'ਤੇ ਇੱਕ ਅਨੁਮਾਨ ਹੈ। ਅਸਲ ਲੋਨ ਯੋਗਤਾ ਕ੍ਰੈਡਿਟ ਸਕੋਰ ਅਤੇ ਹੋਰ ਕਾਰਕਾਂ ਦੇ ਆਧਾਰ \'ਤੇ ਵੱਖਰੀ ਹੋ ਸਕਦੀ ਹੈ।',
    'ta-IN': 'குறிப்பு: இது வழங்கப்பட்ட தகவலின் அடிப்படையில் ஒரு மதிப்பீடு. உண்மையான கடன் தகுதி கடன் மதிப்பெண் மற்றும் பிற காரணிகளின் அடிப்படையில் மாறுபடலாம்.',
    'te-IN': 'గమనిక: ఇది అందించిన సమాచారం ఆధారంగా ఒక అంచనా. వాస్తవ రుణ అర్హత క్రెడిట్ స్కోర్ మరియు ఇతర కారకాల ఆధారంగా మారవచ్చు.'
  },
  'calculator.button': {
    'en-IN': 'Eligibility Calculator',
    'hi-IN': 'योग्यता कैलकुलेटर',
    'bn-IN': 'যোগ্যতা ক্যালকুলেটর',
    'gu-IN': 'યોગ્યતા કેલ્ક્યુલેટર',
    'kn-IN': 'ಅರ್ಹತೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    'ml-IN': 'യോഗ്യതാ കാൽക്കുലേറ്റർ',
    'mr-IN': 'पात्रता कॅल्क्युलेटर',
    'od-IN': 'ଯୋଗ୍ୟତା କ୍ୟାଲକୁଲେଟର',
    'pa-IN': 'ਯੋਗਤਾ ਕੈਲਕੁਲੇਟਰ',
    'ta-IN': 'தகுதி கால்குலேட்டர்',
    'te-IN': 'అర్హత కాల్కులేటర్'
  },
  'conversation.back': {
    'en-IN': 'Back',
    'hi-IN': 'वापस',
    'bn-IN': 'পিছনে',
    'gu-IN': 'પાછા',
    'kn-IN': 'ಹಿಂದೆ',
    'ml-IN': 'തിരികെ',
    'mr-IN': 'मागे',
    'od-IN': 'ପଛକୁ',
    'pa-IN': 'ਵਾਪਸ',
    'ta-IN': 'பின்செல்',
    'te-IN': 'వెనుకకు'
  },
  'ui.maximize': {
    'en-IN': 'Maximize',
    'hi-IN': 'बड़ा करें',
    'bn-IN': 'বড় করুন',
    'gu-IN': 'મોટું કરો',
    'kn-IN': 'ದೊಡ್ದಾಗಿಸು',
    'ml-IN': 'വലുതാക്കുക',
    'mr-IN': 'मोठे करा',
    'od-IN': 'ବଡ଼ କରନ୍ତୁ',
    'pa-IN': 'ਵੱਡਾ ਕਰੋ',
    'ta-IN': 'பெரிதாக்கு',
    'te-IN': 'పెద్దది చేయండి'
  },
  'ui.minimize': {
    'en-IN': 'Minimize',
    'hi-IN': 'छोटा करें',
    'bn-IN': 'ছোট করুন',
    'gu-IN': 'નાનું કરો',
    'kn-IN': 'ಚಿಕ್ಕದಾಗಿಸಿ',
    'ml-IN': 'ചെറുതാക്കുക',
    'mr-IN': 'लहान करा',
    'od-IN': 'ଛୋଟ କରନ୍ତୁ',
    'pa-IN': 'ਛੋਟਾ ਕਰੋ',
    'ta-IN': 'சிறிதாக்கு',
    'te-IN': 'చిన్నది చేయండి'
  },
  'ui.resize': {
    'en-IN': 'Resize',
    'hi-IN': 'आकार बदलें',
    'bn-IN': 'আকার পরিবর্তন করুন',
    'gu-IN': 'આકાર બદલો',
    'kn-IN': 'ಗಾತ್ರ ಬದಲಾಯಿಸಿ',
    'ml-IN': 'വലിപ്പം മാറ്റുക',
    'mr-IN': 'आकार बदला',
    'od-IN': 'ଆକାର ପରିବର୍ତ୍ତନ କରନ୍ତୁ',
    'pa-IN': 'ਆਕਾਰ ਬਦਲੋ',
    'ta-IN': 'அளவை மாற்று',
    'te-IN': 'పరిమాణాన్ని మార్చండి'
  },
  'ui.typing': {
    'en-IN': 'Typing...',
    'hi-IN': 'टाइप कर रहा है...',
    'bn-IN': 'টাইপ করছে...',
    'gu-IN': 'ટાઇપ કરી રહ્યું છે...',
    'kn-IN': 'ಟೈಪ್ ಮಾಡುತ್ತಿದೆ...',
    'ml-IN': 'ടൈപ്പ് ചെയ്യുന്നു...',
    'mr-IN': 'टाइप करत आहे...',
    'od-IN': 'ଟାଇପ୍ କରୁଛି...',
    'pa-IN': 'ਟਾਈਪ ਕਰ ਰਿਹਾ ਹੈ...',
    'ta-IN': 'தட்டச்சு செய்கிறது...',
    'te-IN': 'టైప్ చేస్తోంది...'
  },
  'ui.close': {
    'en-IN': 'Close',
    'hi-IN': 'बंद करें',
    'bn-IN': 'বন্ধ করুন',
    'gu-IN': 'બંધ કરો',
    'kn-IN': 'ಮುಚ್ಚಿ',
    'ml-IN': 'അടയ്ക്കുക',
    'mr-IN': 'बंद करा',
    'od-IN': 'ବନ୍ଦ କରନ୍ତୁ',
    'pa-IN': 'ਬੰਦ ਕਰੋ',
    'ta-IN': 'மூடு',
    'te-IN': 'మూసివేయండి'
  }
};

// Type for the translation cache
type TranslationCache = {
  [key: string]: string;
};

// Type for the language context
type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
  translateDynamic: (text: string, sourceLanguage?: string) => Promise<string>;
  isTranslating: boolean;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation cache to avoid redundant API calls
const translationCache: TranslationCache = {};

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Try to get the language from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      try {
        const parsed = JSON.parse(savedLanguage);
        const found = languages.find(lang => lang.code === parsed.code);
        if (found) return found;
      } catch (e) {
        console.error('Error parsing saved language:', e);
      }
    }
    
    // Default to English if no saved language or error
    return languages[0];
  });
  
  const [isTranslating, setIsTranslating] = useState(false);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', JSON.stringify(currentLanguage));
  }, [currentLanguage]);

  // Function to set the language
  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  // Function to translate UI text using predefined translations
  const translate = (key: string): string => {
    if (uiTranslations[key] && uiTranslations[key][currentLanguage.code]) {
      return uiTranslations[key][currentLanguage.code];
    }
    
    // Fallback to English if translation not found
    if (uiTranslations[key] && uiTranslations[key]['en-IN']) {
      return uiTranslations[key]['en-IN'];
    }
    
    // Return the key if no translation found
    return key;
  };

  // Function to dynamically translate any text using Sarvam API
  const translateDynamic = useCallback(async (text: string, sourceLanguage: string = 'en-IN'): Promise<string> => {
    // If current language is the same as source language, return the original text
    if (currentLanguage.code === sourceLanguage) {
      return text;
    }
    
    // Generate a cache key based on the text, source language, and target language
    const cacheKey = `${sourceLanguage}:${currentLanguage.code}:${text}`;
    
    // Check if translation is already in cache
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }
    
    try {
      setIsTranslating(true);
      
      // Call the Sarvam API to translate the text
      const translatedText = await translateText({
        text,
        sourceLanguage,
        targetLanguage: currentLanguage.code
      });
      
      // Cache the translation
      translationCache[cacheKey] = translatedText;
      
      return translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
      return text; // Return original text if translation fails
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage.code]);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      translate, 
      translateDynamic,
      isTranslating
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Function to clear the translation cache
export const clearTranslationCache = () => {
  Object.keys(translationCache).forEach(key => {
    delete translationCache[key];
  });
};
