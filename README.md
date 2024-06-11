# Fahem

Fahem is an interactive platform that makes it easy for anyone to provide world-class educational content. It offers a variety of content types: Presentation Pages, Dynamic Pages, Videos, Documents, and more.

## Progress

🚧 Fahem is still in early development (Omega). As we reach stability, we will release a stable version and add more features.

## Overview

- 📄✨ Dynamic notion-like Blocks-based Courses & editor
- 🏎️ Easy to use
- 👥 Multi-Organization
- 📹 Supports Uploadable Videos and external videos like YouTube
- 📄 Supports documents like PDF
- 👨‍🎓 Users & Groups Management
- 🙋 Quizzes
- 🍱 Course Collections
- 👟 Course Progress
- 🛜 Course Updates
- 💬 Discussions
- ✨ Fahem AI: The Teachers and Students copilot
- 👪 Multiplayer Course edition
- More to come

## Documentation

Detailed documentation for Fahem can be found [here](https://docs.fahem.app/).

## Get Started

### Get a Local Ready Copy of Fahem

To quickly start a local instance of Fahem, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/Fahem-ORG/Fahem.git
    cd fahem
    ```

2. Run Docker Compose to set up the environment:
    ```sh
    docker-compose up -d
    ```

In less than 2 minutes, you should have a local copy of Fahem ready to go.

## Tech

Fahem uses a number of open-source projects to work properly:

- **Next.js** (14 with the App Directory) - The React Framework
- **TailwindCSS** - Styling
- **Radix UI** - Accessible UI Components
- **Tiptap** - An editor framework and headless wrapper around ProseMirror
- **FastAPI** - A high performance, async API framework for Python
- **YJS** - Shared data types for building collaborative software
- **PostgreSQL** - SQL Database
- **Redis** - In-Memory Database
- **LangChain** - A framework for developing applications powered by language models
- **React** - duh


## A Word

Fahem is made with 💜. From the UI to the features, it is carefully designed to make students' and teachers' lives easier and make education software more enjoyable.

Thank you and have fun using Fahem!

---

## Dev Environment

### Setting Up a Dev Environment

This guide will help you set up a development environment for Fahem, guiding you through the installation of the backend and the frontend.

### Prerequisites

- **Docker**
- **Node.js** (14.x or higher)
- **pnpm**
- **Python** (3.8 or higher)
- **Poetry**
- **macOS**, **Linux**, or **Windows**

### Backend Configuration

#### Get the Repository

```sh
git clone https://github.com/Fahem-ORG/Fahem.git
cd fahem
Build & Install Fahem
This will build and run the backend and the database Docker images.



docker-compose up -d
This setup includes:

A Postgres database
A Redis server
A built Fahem App (Frontend & Backend)
Note: The built Fahem App is not needed for the development environment; it is useful for installing Fahem contents (Roles, Organization, Users in the database).

Run the Backend in Dev Mode
Navigate to the backend folder:


cd backend
Install Python dependencies:


poetry install
Run the backend in development mode:



poetry run uvicorn app.main:app --reload
To learn more about configuration options, please refer to the Configuration documentation.

Check the API
Go to http://localhost:8000/docs/ to view the API documentation.

Frontend Configuration
Initialize the Frontend
Navigate to the frontend folder:



cd frontend
This will install all the dependencies needed for the frontend. You will need pnpm for this step.


pnpm install
Add an .env file in the frontend folder with the following content:

env

NEXT_PUBLIC_FAHEM_MULTI_ORG=false
NEXT_PUBLIC_FAHEM_DEFAULT_ORG=test
NEXT_PUBLIC_FAHEM_API_URL=http://localhost:8000/api/v1/
NEXT_PUBLIC_FAHEM_BACKEND_URL=http://localhost:8000/
NEXT_PUBLIC_FAHEM_DOMAIN=localhost:3000
Note: Setting NEXT_PUBLIC_FAHEM_MULTI_ORG to true won't work locally for now; please set it to false. For more information about Organizations Hosting modes, refer to the Organization Hosting Modes documentation.

Run the Dev Environment

pnpm run dev
Configure Your Organization as the Default One
Copy this content to the .env file in the frontend folder:

env

NEXT_PUBLIC_FAHEM_MULTI_ORG=false
NEXT_PUBLIC_FAHEM_DEFAULT_ORG=default
NEXT_PUBLIC_FAHEM_API_URL=http://localhost:8000/api/v1/
NEXT_PUBLIC_FAHEM_BACKEND_URL=http://localhost:8000/
NEXT_PUBLIC_FAHEM_DOMAIN=localhost:3000
NEXT_PUBLIC_FAHEM_COLLABORATION_WS_URL=wss://localhost:1998
Make sure to change the NEXT_PUBLIC_FAHEM_DEFAULT_ORG to the organization you want to set as the default one. You'll find the organization slug in the database in the organizations table. Here, it is set to default, which is the default organization created by the backend when you ran it in the previous steps.

Congratulations, you're done! 🎉
Visit the app at http://localhost:3000/.