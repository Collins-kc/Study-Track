# StudyTrack

A React web app that helps students plan and track their study tasks.

**Live site:** https://study-track-nu-five.vercel.app

## Features
- Register, log in and log out with email/password
- Google sign-in
- Protected routes (dashboard only for logged-in users)
- Add, edit, delete and mark study tasks as done
- Data saved in Firebase Firestore, so tasks stay after refresh
- Responsive layout with a blue and orange colour scheme

## User stories
1. As a student, I want to register and log in with email or Google so my tasks are private to me.
2. As a student, I want to add a study task with a subject and due date so I can plan my work.
3. As a student, I want to mark a task as done so I can see my progress.
4. As a student, I want to edit or delete a task so my list stays accurate.
5. As a student, I want to use the app on my phone so I can check tasks anywhere.

## Tech stack
React (Vite), Tailwind CSS, React Router, Context API, Firebase Authentication and Firestore, Vercel.

## Run locally
1. `git clone https://github.com/Collins-kc/Study-Track.git`
2. `cd Study-Track && npm install`
3. Create a `.env` file with your Firebase keys:
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
4. `npm run dev`

## Design
Wireframes are in the `docs/` folder. Figma: PASTE_YOUR_FIGMA_LINK_HERE