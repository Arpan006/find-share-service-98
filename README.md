# FindIt - SolVIT Hackathon Submission by Team Prvah


**FindIt** is a web app designed to enhance hostel life at VIT Bhopal University by addressing three key challenges: lost item recovery, resource sharing, and access to maintenance services. Built for the SolVIT Hackathon 2025, FindIt helps students locate lost items, share unused resources, and book hostel maintenance staff efficiently.

**Tagline**: *FindIt – Locate, Share, and Fix in Your Hostel*

**TEAM MEMBERS**
**Arpan aggarwal 
  Akshat bhavsar
  Ahana chakraborty
  Suhani mandal 
  Anouska mandal 
  Sanyam bhavsar **

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Team](#team)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
FindIt is a community-driven platform for VIT Bhopal hostel students, solving:
- **Lost & Found**: Report and recover lost items in hostel areas (e.g., dining halls) using AI-driven matching.
- **Second-hand Exchange**: Share or donate unused items (e.g., textbooks) within the hostel, earning green points for sustainability.
- **Local Services**: Book verified hostel maintenance staff (e.g., plumbers) for quick repairs, with a review system.

The app operates in the problem domain of improving the hostel living experience through efficient management of lost items, resource sharing, and maintenance services. It was developed as part of the SolVIT Hackathon organized by the Hostel Committee at VIT Bhopal University.

## Features
- **User Authentication**: Role-based login/signup (Students, Hostel Staff, Admin) using Firebase Authentication.
- **Lost & Found**:
  - Report lost items with description, location, date, and photo.
  - View and claim found items uploaded by hostel staff.
  - AI matches lost and found items, with real-time notifications.
- **Second-hand Exchange**:
  - List items for exchange or donation within the hostel.
  - AI matches users based on preferences, with geolocation (5 km radius).
  - In-app chat for coordinating exchanges, with green points as rewards.
- **Local Services**:
  - Search and book verified hostel maintenance staff.
  - Sync bookings with staff availability (Google Calendar API).
  - Leave reviews after service completion.
- **Profile Management**: View user details (name, room number, green points) and activity history.
- **Admin Dashboard**: Verify staff, manage users, and view analytics.

## Tech Stack
- **Frontend**: React.js, shadcn/ui, Tailwind CSS (UI generated by v0 by Vercel)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Authentication & Notifications**: Firebase
- **APIs**:
  - Google Maps API (geolocation)
  - Google Calendar API (scheduling)
  - Socket.io (real-time chat)
- **AI**: Machine learning for matching (NLP for text, image recognition for photos)
- **Deployment**: Vercel

## Setup Instructions
Follow these steps to run FindIt locally:

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Firebase project (for authentication and notifications)
- Google Cloud account (for Maps and Calendar APIs)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/findit.git
   cd findit
