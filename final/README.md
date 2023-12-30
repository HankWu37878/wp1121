# 網路服務程式設計 期末專案: IMazon

## 功能說明：

IMazon 是一個模仿 Amazon 的全方位購物平台。在IMazon中，使用者可以簡單的在買家和賣家之間切換身份。當你有商品想要出售時，可以在賣家的頁面發布您的產品。而當你想要買平台上的其他產品時，也可以切回買家模式進行購買，享受一站式購物體驗。

進入網站進行註冊登入後，便可進入主頁。左上方會有買家和賣家模式可以選擇，若選擇賣家，則可以新增商品、還可以個人化設計該商品的款式，並進入商品的詳細內容頁面中瀏覽、編輯或刪除。若選擇買家，則可以檢視平台上已經有的商品進行選購，且可以進入購物車中進行結帳。此外，買家還可以在該商品底下評分和留言。

## 每位組員之負責項目：

吳承翰：設計大部分後端架構（包含其中的hooks）、登入登出介面、寫產品評論、買家賣家模式切換、串接前後端（action.ts）等等。

古昭璿：設計產品詳細內容的頁面、設計買家購物車的功能及UI、設計部分後端架構、串接前後端（action.ts）等等。

楊東韋：設計新增產品頁面、和編輯、刪除產品及產品款式的前端程式、串接前後端（action.ts）、產品搜尋功能等等。

## 如何在 localhost 安裝與測試：

1. Clone the repo

2. Install dependencies

```bash
yarn install
```

3. Create a `.env.local` file in the root of the project and add a valid Postgres URL. To get a Postgres URL, follow the instructions [here](https://ric2k1.notion.site/Free-postgresql-tutorial-f99605d5c5104acc99b9edf9ab649199?pvs=4). Besides, get google cloud's id and secret from google clout website. Below is the example:

```bash
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/final2
AUTH_SECRET="Any string you like"
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:3000

```

- Google Cloud Service的設定：詳情請見(https://ric2k1.notion.site/09-Third-party-API-Services-and-Packages-e6abb698bc4d42f9815f47d6766c58df)中Google Calendar -> 實作步驟 -> Setup Google Cloud Service，將獲得的google cloud id 和 secret加入.env.local中

5.  Run the migrations

```bash
yarn migrate
```

5. Start the app

```bash
yarn dev
```
