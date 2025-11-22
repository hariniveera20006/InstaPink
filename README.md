# InstaPink
Instapink is an Instagram-like social media platform with a built-in Fake Advertisement Detection System. Users can post, like, comment, and report suspicious ads. A threshold algorithm automatically hides posts when 5 unique users report them. The system improves safety, transparency, and trust using React, Node.js, Express, and PostgreSQL.


🌸 Project Description (Final Version)

This project is an Instagram-like social media platform enhanced with an intelligent Fake Advertisement Detection System. Users can create posts, like, comment, and report suspicious ads or fake accounts. To ensure safety, the system uses a threshold-based algorithm that automatically analyzes the number of reports an account receives.

When five or more unique users report the same account, the system automatically flags it as fake and immediately hides all ads/posts from that account. All reports are stored in PostgreSQL for transparency, and an admin dashboard allows further review.
This approach improves user trust, reduces the spread of fake advertisements, and provides quick automated action without waiting for manual verification.

The platform is built using React (Vite) for the frontend, Node.js + Express for backend APIs, and PostgreSQL for secure data storage.

🌺 Objectives

Build an interactive social platform similar to Instagram.

Detect and prevent the spread of fake advertisements.

Allow users to report suspicious ads or posts easily.

Use an automated threshold algorithm to flag accounts.

Maintain data integrity and safety using PostgreSQL and backend APIs.

🌼 Existing System Limitations

Popular platforms (Instagram, Facebook) depend mainly on manual review.

No immediate automated detection after reports.

Fake ads remain active until an admin checks them.

Users do not know what happens after they report.

🌸 Proposed System

Adds an advanced threshold-based detection mechanism.

Every report is saved in the database.

The backend continuously monitors reported accounts.

If 5+ unique reports are filed for the same account:

The system flags it as fake.

All posts/reels are automatically hidden from user feed.

Admin is notified for review via dashboard.

🔍 Threshold Detection Algorithm

Each user report is stored in the reports table.

Count the number of unique reporters per account.

If the count ≥ 5, then:

Mark the account/post as flagged.

Hide all posts/reels from the platform.

Notify admin for verification.

This ensures fast, fair, and automated detection of fake ads.

🛠 Tech Stack

Frontend: React + Vite + CSS

Backend: Node.js + Express

Database: PostgreSQL

Hosting: Localhost





cmd:
   cd backend
   npm install
   npm run dev


  cd frontend
  npm install
  npm run dev



   
