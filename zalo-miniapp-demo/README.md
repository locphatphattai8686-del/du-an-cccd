# Zalo Mini App Token Demo

Demo nay gom:
- Frontend nhap/nhan `accessToken`
- Backend Node.js goi API Zalo de lay profile user

## 1) Cai dat

```bash
cd zalo-miniapp-demo
npm install
```

## 2) Cau hinh env

```bash
copy .env.example .env
```

Neu can, sua `ZALO_ME_ENDPOINT` theo endpoint Zalo API hien tai ban duoc cap.

## 3) Chay local

```bash
npm start
```

Mo:
- `http://localhost:3000` (UI test)
- `http://localhost:3000/api/health`

## 4) Luong dung trong Mini App that

1. Frontend Mini App goi SDK:

```javascript
import { getAccessToken } from "zmp-sdk/apis";
const token = await getAccessToken();
```

2. Gui token ve backend:

```javascript
await fetch("/api/zalo/me", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ accessToken: token })
});
```

3. Backend verify token qua API Zalo va tra profile.

## Luu y

- Token SDK phai lay trong moi truong Zalo Mini App hop le.
- Tuy tai lieu API cua Zalo o thoi diem su dung, endpoint/field co the thay doi.
