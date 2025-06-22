<h1 align="center">
  <a href="https://heritra-by-akib.web.app/">
    <img src="public/logo.png" alt="Logo"  height="125">
  </a>
</h1>

<div align="center">
  A social platform for sharing and exploring ancient artifacts.
  <br />
  <br />
  
[![Made with ❤️ by Akib](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F--%20by%20Akib-594c21)
](https://github.com/akibur-r)

</div>

<details open="open">
<summary><h3>Table of Contents</h3></summary>

- [About](#about)
  - [Purpose](#purpose)
  - [Built With](#built-with)
- [Features](#features)
  - [Visitor](#visitor)
  - [Registered Users](#registered-user)
- [Behind the Scene](#behind-the-scene)

</details>

---

## <p style="color: #b89c72">About</p>

Heritra is a full-stack web application where people can explore and share information about historical artifacts. Users can view artifact details, add their own entries, like artifacts, and see what they’ve contributed.

#### <span style="color: #d6b336; font-weight: bold">Live URL:</span> [https://heritra-by-akib.web.app/](https://heritra-by-akib.web.app/)

### <p style="color: #b89c72">Purpose</p>

The application is built in response of the need to create a simple and accessible platform for exploring and managing historical artifacts. It allows users to view detailed information about artifacts, contribute their own entries, and keep track of what they’ve added. The goal is to make artifact sharing more organized, interactive, and easy for anyone interested in history.

### <p style="color: #b89c72">Built With</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/motion-F5B800?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/SweetAlert2-FF6C37?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Icons-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/React_Helmet-282C34?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/date--fns-262626?style=for-the-badge&logo=react&logoColor=white" />

</p>

## <p style="color: #b89c72">Features</p>

<details open="open">
<summary>
<span id="visitor" style="color: #b89c72; font-weight: 700">Visitor</span>
</summary>

- View all artifacts in brief
- Search for an artifact
- Create an account
- Sign in with Google
</details>

<details open="open">
<summary>
<span id="registered-user" style="color: #b89c72; font-weight: 700">Registered User</span>
</summary>

- Login
- View details of artifacts
- Add an artifact
- Edit an artifact
- Delete an artifact
- Like/Unlike an artifact
- See all liked artifacts
- See all artifacts that they added
- View personal profile details
- Update personal profile details
</details>

## <p style="color: #b89c72">Behind the Scene</p>

- Users can only see private routes if they are logged in (redirected to login page if not logged in).
- If the users try to access any invalid route, a stylish error page is displayed.
- Users can change their added information on the site only (secured by axios and access tokens).
- Once a user deletes an artifact, all the likes from all users are removed.
- The upload time in artifact details page is displayed relative to current time.

###

- Like button and like count is updated upon interaction.
- Deleting takes two step confirmation.
- Updating is done only when anything is changed.
- <p style="color: #ff7c00">A custom loading animation (.gif) is used in all loading scenerios.</p>
