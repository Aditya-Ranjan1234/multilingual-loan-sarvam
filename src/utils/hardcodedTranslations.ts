// Hardcoded translations for common UI elements to reduce API calls
// This file contains translations for frequently used text across the application

type TranslationMap = {
  [key: string]: {
    [langCode: string]: string;
  };
};

export const hardcodedTranslations: TranslationMap = {
  // Common UI elements
  "Contact Us": {
    "en-IN": "Contact Us",
    "hi-IN": "संपर्क करें",
    "bn-IN": "যোগাযোগ করুন",
    "ta-IN": "எங்களை தொடர்பு கொள்ளுங்கள்",
    "te-IN": "మమ్మల్ని సంప్రదించండి",
    "kn-IN": "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    "ml-IN": "ഞങ്ങളെ ബന്ധപ്പെടുക",
    "gu-IN": "અમારો સંપર્ક કરો",
    "mr-IN": "आमच्याशी संपर्क साधा",
    "pa-IN": "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    "od-IN": "ଆମ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ",
  },
  "About Us": {
    "en-IN": "About Us",
    "hi-IN": "हमारे बारे में",
    "bn-IN": "আমাদের সম্পর্কে",
    "ta-IN": "எங்களைப் பற்றி",
    "te-IN": "మా గురించి",
    "kn-IN": "ನಮ್ಮ ಬಗ್ಗೆ",
    "ml-IN": "ഞങ്ങളെ കുറിച്ച്",
    "gu-IN": "અમારા વિશે",
    "mr-IN": "आमच्याबद्दल",
    "pa-IN": "ਸਾਡੇ ਬਾਰੇ",
    "od-IN": "ଆମ ବିଷୟରେ",
  },
  "Home": {
    "en-IN": "Home",
    "hi-IN": "होम",
    "bn-IN": "হোম",
    "ta-IN": "முகப்பு",
    "te-IN": "హోమ్",
    "kn-IN": "ಮುಖಪುಟ",
    "ml-IN": "ഹോം",
    "gu-IN": "હોમ",
    "mr-IN": "होम",
    "pa-IN": "ਹੋਮ",
    "od-IN": "ହୋମ୍",
  },
  "Loans": {
    "en-IN": "Loans",
    "hi-IN": "लोन",
    "bn-IN": "ঋণ",
    "ta-IN": "கடன்கள்",
    "te-IN": "రుణాలు",
    "kn-IN": "ಸಾಲಗಳು",
    "ml-IN": "വായ്പകൾ",
    "gu-IN": "લોન",
    "mr-IN": "कर्ज",
    "pa-IN": "ਕਰਜ਼ੇ",
    "od-IN": "ଋଣ",
  },
  "Calculator": {
    "en-IN": "Calculator",
    "hi-IN": "कैलकुलेटर",
    "bn-IN": "ক্যালকুলেটর",
    "ta-IN": "கால்குலேட்டர்",
    "te-IN": "క్యాల్క్యులేటర్",
    "kn-IN": "ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    "ml-IN": "കാൽക്കുലേറ്റർ",
    "gu-IN": "કેલ્ક્યુલેટર",
    "mr-IN": "कॅल्क्युलेटर",
    "pa-IN": "ਕੈਲਕੁਲੇਟਰ",
    "od-IN": "କ୍ୟାଲକୁଲେଟର୍",
  },
  "Email": {
    "en-IN": "Email",
    "hi-IN": "ईमेल",
    "bn-IN": "ইমেল",
    "ta-IN": "மின்னஞ்சல்",
    "te-IN": "ఇమెయిల్",
    "kn-IN": "ಇಮೇಲ್",
    "ml-IN": "ഇമെയിൽ",
    "gu-IN": "ઇમેઇલ",
    "mr-IN": "ईमेल",
    "pa-IN": "ਈਮੇਲ",
    "od-IN": "ଇମେଲ୍",
  },
  "Phone": {
    "en-IN": "Phone",
    "hi-IN": "फोन",
    "bn-IN": "ফোন",
    "ta-IN": "தொலைபேசி",
    "te-IN": "ఫోన్",
    "kn-IN": "ಫೋನ್",
    "ml-IN": "ഫോൺ",
    "gu-IN": "ફોન",
    "mr-IN": "फोन",
    "pa-IN": "ਫੋਨ",
    "od-IN": "ଫୋନ୍",
  },
  "Address": {
    "en-IN": "Address",
    "hi-IN": "पता",
    "bn-IN": "ঠিকানা",
    "ta-IN": "முகவரி",
    "te-IN": "చిరునామా",
    "kn-IN": "ವಿಳಾಸ",
    "ml-IN": "വിലാസം",
    "gu-IN": "સરનામું",
    "mr-IN": "पत्ता",
    "pa-IN": "ਪਤਾ",
    "od-IN": "ଠିକଣା",
  },
  "Name": {
    "en-IN": "Name",
    "hi-IN": "नाम",
    "bn-IN": "নাম",
    "ta-IN": "பெயர்",
    "te-IN": "పేరు",
    "kn-IN": "ಹೆಸರು",
    "ml-IN": "പേര്",
    "gu-IN": "નામ",
    "mr-IN": "नाव",
    "pa-IN": "ਨਾਮ",
    "od-IN": "ନାମ",
  },
  "Submit": {
    "en-IN": "Submit",
    "hi-IN": "सबमिट करें",
    "bn-IN": "জমা দিন",
    "ta-IN": "சமர்ப்பிக்கவும்",
    "te-IN": "సమర్పించండి",
    "kn-IN": "ಸಲ್ಲಿಸಿ",
    "ml-IN": "സമർപ്പിക്കുക",
    "gu-IN": "સબમિટ કરો",
    "mr-IN": "सबमिट करा",
    "pa-IN": "ਜਮ੍ਹਾਂ ਕਰੋ",
    "od-IN": "ଦାଖଲ କରନ୍ତୁ",
  },
  "Message": {
    "en-IN": "Message",
    "hi-IN": "संदेश",
    "bn-IN": "বার্তা",
    "ta-IN": "செய்தி",
    "te-IN": "సందేశం",
    "kn-IN": "ಸಂದೇಶ",
    "ml-IN": "സന്ദേശം",
    "gu-IN": "સંદેશ",
    "mr-IN": "संदेश",
    "pa-IN": "ਸੁਨੇਹਾ",
    "od-IN": "ବାର୍ତ୍ତା",
  },
  "Subject": {
    "en-IN": "Subject",
    "hi-IN": "विषय",
    "bn-IN": "বিষয়",
    "ta-IN": "பொருள்",
    "te-IN": "విషయం",
    "kn-IN": "ವಿಷಯ",
    "ml-IN": "വിഷയം",
    "gu-IN": "વિષય",
    "mr-IN": "विषय",
    "pa-IN": "ਵਿਸ਼ਾ",
    "od-IN": "ବିଷୟ",
  },
  "404 - Page Not Found": {
    "en-IN": "404 - Page Not Found",
    "hi-IN": "404 - पेज नहीं मिला",
    "bn-IN": "404 - পৃষ্ঠা পাওয়া যায়নি",
    "ta-IN": "404 - பக்கம் கிடைக்கவில்லை",
    "te-IN": "404 - పేజీ కనుగొనబడలేదు",
    "kn-IN": "404 - ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ",
    "ml-IN": "404 - പേജ് കണ്ടെത്തിയില്ല",
    "gu-IN": "404 - પૃષ્ઠ મળ્યું નથી",
    "mr-IN": "404 - पृष्ठ सापडले नाही",
    "pa-IN": "404 - ਪੰਨਾ ਨਹੀਂ ਮਿਲਿਆ",
    "od-IN": "404 - ପୃଷ୍ଠା ମିଳିଲା ନାହିଁ",
  },
  "Go to Homepage": {
    "en-IN": "Go to Homepage",
    "hi-IN": "होमपेज पर जाएं",
    "bn-IN": "হোমপেজে যান",
    "ta-IN": "முகப்புப் பக்கத்திற்குச் செல்லவும்",
    "te-IN": "హోమ్‌పేజీకి వెళ్లండి",
    "kn-IN": "ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ",
    "ml-IN": "ഹോംപേജിലേക്ക് പോകുക",
    "gu-IN": "હોમપેજ પર જાઓ",
    "mr-IN": "मुख्यपृष्ठावर जा",
    "pa-IN": "ਹੋਮਪੇਜ 'ਤੇ ਜਾਓ",
    "od-IN": "ହୋମପେଜକୁ ଯାଆନ୍ତୁ",
  },
  "Go Back": {
    "en-IN": "Go Back",
    "hi-IN": "वापस जाएं",
    "bn-IN": "ফিরে যান",
    "ta-IN": "திரும்பிச் செல்லவும்",
    "te-IN": "వెనక్కి వెళ్ళండి",
    "kn-IN": "ಹಿಂದೆ ಹೋಗಿ",
    "ml-IN": "തിരികെ പോകുക",
    "gu-IN": "પાછા જાઓ",
    "mr-IN": "मागे जा",
    "pa-IN": "ਵਾਪਸ ਜਾਓ",
    "od-IN": "ପଛକୁ ଯାଆନ୍ତୁ",
  },
  // Loan calculator related
  "Loan Amount": {
    "en-IN": "Loan Amount",
    "hi-IN": "लोन राशि",
    "bn-IN": "ঋণের পরিমাণ",
    "ta-IN": "கடன் தொகை",
    "te-IN": "రుణ మొత్తం",
    "kn-IN": "ಸಾಲದ ಮೊತ್ತ",
    "ml-IN": "വായ്പാ തുക",
    "gu-IN": "લોન રકમ",
    "mr-IN": "कर्ज रक्कम",
    "pa-IN": "ਕਰਜ਼ੇ ਦੀ ਰਕਮ",
    "od-IN": "ଋଣ ରାଶି",
  },
  "Interest Rate": {
    "en-IN": "Interest Rate",
    "hi-IN": "ब्याज दर",
    "bn-IN": "সুদের হার",
    "ta-IN": "வட்டி விகிதம்",
    "te-IN": "వడ్డీ రేటు",
    "kn-IN": "ಬಡ್ಡಿ ದರ",
    "ml-IN": "പലിശ നിരക്ക്",
    "gu-IN": "વ્યાજ દર",
    "mr-IN": "व्याज दर",
    "pa-IN": "ਵਿਆਜ ਦਰ",
    "od-IN": "ସୁଧ ହାର",
  },
  "Loan Term": {
    "en-IN": "Loan Term",
    "hi-IN": "लोन अवधि",
    "bn-IN": "ঋণের মেয়াদ",
    "ta-IN": "கடன் காலம்",
    "te-IN": "రుణ వ్యవధి",
    "kn-IN": "ಸಾಲದ ಅವಧಿ",
    "ml-IN": "വായ്പാ കാലാവധി",
    "gu-IN": "લોન મુદત",
    "mr-IN": "कर्ज कालावधी",
    "pa-IN": "ਕਰਜ਼ੇ ਦੀ ਮਿਆਦ",
    "od-IN": "ଋଣ ଅବଧି",
  },
  "Monthly Payment (EMI)": {
    "en-IN": "Monthly Payment (EMI)",
    "hi-IN": "मासिक भुगतान (ईएमआई)",
    "bn-IN": "মাসিক পেমেন্ট (ইএমআই)",
    "ta-IN": "மாதாந்திர கட்டணம் (EMI)",
    "te-IN": "నెలవారీ చెల్లింపు (EMI)",
    "kn-IN": "ಮಾಸಿಕ ಪಾವತಿ (EMI)",
    "ml-IN": "പ്രതിമാസ പേയ്‌മെന്റ് (EMI)",
    "gu-IN": "માસિક ચુકવણી (EMI)",
    "mr-IN": "मासिक हप्ता (EMI)",
    "pa-IN": "ਮਹੀਨਾਵਾਰ ਭੁਗਤਾਨ (EMI)",
    "od-IN": "ମାସିକ ଦେୟ (EMI)",
  },
  // Common buttons
  "Reset": {
    "en-IN": "Reset",
    "hi-IN": "रीसेट करें",
    "bn-IN": "রিসেট করুন",
    "ta-IN": "மீட்டமைக்கவும்",
    "te-IN": "రీసెట్ చేయండి",
    "kn-IN": "ರೀಸೆಟ್ ಮಾಡಿ",
    "ml-IN": "റീസെറ്റ് ചെയ്യുക",
    "gu-IN": "રીસેટ કરો",
    "mr-IN": "रीसेट करा",
    "pa-IN": "ਰੀਸੈੱਟ ਕਰੋ",
    "od-IN": "ରିସେଟ୍ କରନ୍ତୁ",
  },
  "Calculate": {
    "en-IN": "Calculate",
    "hi-IN": "गणना करें",
    "bn-IN": "গণনা করুন",
    "ta-IN": "கணக்கிடுங்கள்",
    "te-IN": "లెక్కించండి",
    "kn-IN": "ಲೆಕ್ಕ ಹಾಕಿ",
    "ml-IN": "കണക്കാക്കുക",
    "gu-IN": "ગણતરી કરો",
    "mr-IN": "गणना करा",
    "pa-IN": "ਗਣਨਾ ਕਰੋ",
    "od-IN": "ଗଣନା କରନ୍ତୁ",
  },
  // Navigation items
  "Explore Loans": {
    "en-IN": "Explore Loans",
    "hi-IN": "लोन देखें",
    "bn-IN": "ঋণ অন্বেষণ করুন",
    "ta-IN": "கடன்களை ஆராயுங்கள்",
    "te-IN": "రుణాలను అన్వేషించండి",
    "kn-IN": "ಸಾಲಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    "ml-IN": "വായ്പകൾ പര്യവേക്ഷണം ചെയ്യുക",
    "gu-IN": "લોન એક્સપ્લોર કરો",
    "mr-IN": "कर्ज एक्सप्लोर करा",
    "pa-IN": "ਕਰਜ਼ੇ ਦੀ ਪੜਚੋਲ ਕਰੋ",
    "od-IN": "ଋଣ ଅନ୍ୱେଷଣ କରନ୍ତୁ",
  },
  "Loan Calculator": {
    "en-IN": "Loan Calculator",
    "hi-IN": "लोन कैलकुलेटर",
    "bn-IN": "ঋণ ক্যালকুলেটর",
    "ta-IN": "கடன் கால்குலேட்டர்",
    "te-IN": "రుణ క్యాల్క్యులేటర్",
    "kn-IN": "ಸಾಲ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    "ml-IN": "വായ്പാ കാൽക്കുലേറ്റർ",
    "gu-IN": "લોન કેલ્ક્યુલેટર",
    "mr-IN": "कर्ज कॅल्क्युलेटर",
    "pa-IN": "ਕਰਜ਼ਾ ਕੈਲਕੁਲੇਟਰ",
    "od-IN": "ଋଣ କ୍ୟାଲକୁଲେଟର୍",
  },
};

/**
 * Get a translation from the hardcoded translations
 * @param key The key to look up
 * @param language The language code to translate to
 * @returns The translated text or the original key if no translation is found
 */
export const getHardcodedTranslation = (key: string, language: string): string => {
  if (hardcodedTranslations[key] && hardcodedTranslations[key][language]) {
    return hardcodedTranslations[key][language];
  }
  return key; // Return the original key if no translation is found
}; 