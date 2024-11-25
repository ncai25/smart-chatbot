# smart-chatbot

## Description

A full-stack smart chatbot project built with Next.js for the frontend and Python Flask for the backend. The chatbot integrates with Supabase for authentication and database management. 

### Features

- AI-powered chatbot with a Python backend
- Secure user authentication via Supabase, via Google OAuth or email sign in
- Markdown support for rich-text response
- Modern UI with ShadCN components
- Full-stack integration with Next.js and Python

## Installation

### Prerequisites

To set up this project, ensure you have the following:

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
python server.py
```

### Frontend Setup

1. Create a Next.js App

```bash
npx create-next-app@latest
```

2. Add ShadCN Components

```bash
npx shadcn@latest add button card input label
```

3. Install Supabase and React Markdown

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs react-markdown
npm install @supabase/supabase-js @supabase/ssr
```

4. Start the Development Server

```bash
npm run dev
```


## Usage

1. Launch the Frontend: 

Navigate to the root directory and run: 
```bash
npm run dev
```

2. Start the Backend:

In the server/ directory, activate your virtual environment and run:
```bash
python server.py
```

3. Interact with the Chatbot:

Open http://localhost:3000 in your browser to use the chatbot.



## Updates in the future

Future Feature Improvements to Consider:
- Integrating OpenAI Responses with LangChain
- Cloud Deployment
- OpenAI Response Caching 
- Streaming for Faster Response Generation
- Improved Markdown Format

Minor issues: 
- The chatbot currently states that it only has access to the current session’s memory, despite having access to previous questions if logged in. This can be clarified in the OpenAI setting in the backend. 

## Built With

- Frontend: Next.js, Supabase, ShadCN UI, React Markdown
- Backend: Flask 
- Database: Supabase (PostgreSQL)


## Acknowledgements

- ShadCN UI for the beautiful component library.
- Supabase for the backend-as-a-service platform.
- Markdown for making documentation easy.