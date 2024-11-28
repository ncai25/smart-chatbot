# smart-chatbot

## Description

A full-stack smart chatbot project built with Next.js for the frontend (deployed on Vercel) and Python Flask for the backend (deployed on Heroku). The chatbot integrates with Supabase for authentication and database management.

### Features

- AI-powered chatbot with a Python backend
- Secure user authentication via Supabase (Google OAuth or email sign-in)
- Markdown support for rich-text responses
- Modern UI with ShadCN components
- Fully cloud-deployed on Vercel (frontend) and Heroku (backend)

## Deployment

### Live URLs
- Frontend (Vercel): https://smart-chatbot-dkz564vib-ncai25s-projects.vercel.app
- Backend (Heroku): https://smart-chatbot-ai-9ee85a878b8f.herokuapp.com/


## Installation (For Local Development)

### Prerequisites

To set up this project locally, ensure you have the following:

1. OpenAI API Key: 

You’ll need an OpenAI account and API key to use OpenAI services.

2. Supabase Database and Authentication

Ensure you have a Supabase project set up, along with the necessary keys for accessing the database and authentication services.

3. Make a copy of the .env.example file located in the chatbot directory and name it .env:

```bash
cp chatbot/.env.example chatbot/.env
```

4. Open the .env file and provide the required keys:

Paste your keys for `OPENAI_API_KEY` and `SUPABASE_URI`.


### Backend Setup

1. Navigate to the Server Directory

```bash
cd server
```

2. Install Python Dependencies

Create a virtual environment and install the necessary packages:

```bash
pip install -r requirements.txt
```

3. Run the Python Backend

```bash
python app.py
```

4.	Local Testing

By default, the backend runs on http://localhost:8080.

### Frontend Setup

1. Navigate to the Client  Directory

```bash
cd client
```

2. Install Dependencies

```bash
npm install
npx shadcn@latest add button card input label
npm install @supabase/supabase-js @supabase/ssr
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs react-markdown
```

3. Set Environment Variables

Make a copy of the .env.local.example file in the client/src/ directory and name it .env.local.

Paste your keys for `NEXT_PUBLIC_SUPABASE_URLY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and    `NEXT_PUBLIC_API_URL` (e.g., https://your-heroku-app-url).


4. Run the Frontend Locally

```bash
npm run dev
```

5.	Local Testing

By default, the frontend runs on http://localhost:3000.


## Usage

1.	Access the Live App:
Use the chatbot at https://smart-chatbot-dkz564vib-ncai25s-projects.vercel.app.


2. Interact with the Chatbot:
Send queries to the chatbot and view AI-powered responses.

3. Sign up or Log in: 
Save and access the chatbot history by logging in via Google OAuth or email confirmation.

4. Backend Testing:
For testing backend endpoints (e.g., /api/process_message), use tools like Insomnia or curl.

5.	Development:
For local development, launch both the frontend and backend using the steps above.

## Updates in the future

Future Feature Improvements to Consider:
- Integrating OpenAI Responses with LangChain
- OpenAI Response Caching 
- Streaming for Faster Response Generation
- Improved Markdown Format

Minor issues: 
- The chatbot currently states that it only has access to the current session’s memory, despite having access to previous questions if logged in. This can be clarified in the backend OpenAI settings.
- If a question entails a long answer, there may be some lag in the response, and the question inbox will clear out after a few seconds.
- Repeated sign-ups cannot currently be detected.

## Built With

- Frontend: Next.js, Supabase, ShadCN UI, React Markdown
- Backend: Flask (deployed on Heroku)
- Database: Supabase (PostgreSQL)
- Deployment: Vercel (Frontend), Heroku (Backend)


## Acknowledgements

- ShadCN UI for the beautiful component library.
- Supabase for the backend-as-a-service platform.
- Markdown for making documentation easy.