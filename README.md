Przed wypushowaniem zmian należy użyć plugin spotless apply

JobOffer is a web-based platform designed to manage job offers efficiently. It includes features for managing job listings, handling candidate applications, and an admin dashboard for seamless oversight. The project uses a combination of Java, TypeScript, and Docker for scalability and performance.

Features
Job Listings: Create, update, and manage job postings.
Candidate Management: Track and manage job applications.
Admin Dashboard: Centralized control panel for admins.
API: REST API for interaction with the system.
Technologies Used
Backend: Java (Spring Boot)
Frontend: TypeScript (Angular)
Styles: SCSS, HTML
Containerization: Docker
Getting Started
Prerequisites
Node.js
Docker
Setup
Clone the repository:

git clone https://github.com/jacob4812/jobOffer.git
cd jobOffer
Build Backend:

mvn clean install
Run Frontend: Navigate to the frontend directory and run the following commands:

npm install
npm start
Docker Deployment: Use the following command to run the application inside a Docker container:

docker-compose up --build
API Endpoints
The API provides various endpoints to interact with the job listings and candidates. Some of the key endpoints include:

/jobs - List, create, and delete job postings.

