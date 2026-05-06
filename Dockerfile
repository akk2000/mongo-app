# ၁။ အခြေခံယူမယ့် ပတ်ဝန်းကျင် (Node.js version 20)
FROM node:20-alpine

# ၂။ Container ထဲမှာ Code တွေထားမယ့် နေရာသတ်မှတ်မယ်
WORKDIR /usr/src/app

# ၃။ package.json နဲ့ package-lock.json ကို အရင်ကူးမယ်
# ဒါမှ code မပြောင်းလဲရင် npm install ကို cache ကနေယူပြီး မြန်မြန်လုပ်ပေးမှာ
COPY package*.json ./

# ၄။ လိုအပ်တဲ့ Library တွေ သွင်းမယ်
RUN npm install

# ၅။ ကျန်တဲ့ Code ဖိုင်တွေအကုန် Container ထဲ ကူးထည့်မယ်
COPY . .

# ၆။ App က သုံးမယ့် Port ကို ဖွင့်ပေးမယ်
EXPOSE 3000

# ၇။ App ကို စတင် Run မယ့် Command
CMD ["node", "app.js"]