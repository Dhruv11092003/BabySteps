# 🏥 Appointment Booking System (MERN Stack)

This is a **PrenatalCare Hub Appointment Booking System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The system allows users to book, update, and manage doctor appointments efficiently.

Live Demo: https://prenatalcarehub.netlify.app/

## 🚀 Features
- **Doctor Management**: Add doctors with working hours and availability.
- **Appointment Booking**: Patients can book appointments with doctors.
- **Update & Delete Appointments**: Modify or remove existing appointments.
- **Dynamic Slot Availability**: Fetch available time slots based on the selected doctor and date.
- **Real-Time Data Updates**: Updates availability dynamically every day.
- **User-Friendly UI**: Responsive layout with intuitive design.
- **Loading Indicators**: Integrated **react-spinners** to indicate loading states.
- **Error Handling**: Displays appropriate messages when no doctors or appointments are found.

---

## 🛠 Installation & Setup

### **Backend Setup**
1. **Navigate to the backend folder**
   ```bash
   cd project-backend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a `.env` file** and add the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```
4. **Start the backend server**
   ```bash
   node index.js
   ```
   The backend will run on `http://localhost:5000`.

---

### **Frontend Setup**
1. **Navigate to the frontend folder**
   ```bash
   cd project-front
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a `.env` file** and add the following variable:
   ```env
   REACT_APP_BASE_URI=http://localhost:5000/api/
   ```
4. **Start the frontend server**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

## 👀 API Endpoints

### **Doctor Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/doctors` | Add a new doctor |
| `GET` | `/api/doctors` | Get all doctors |
| `GET` | `/api/doctors/:id/slots?date=YYYY-MM-DD` | Get available slots for a doctor |

### **Appointment Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/appointments` | Book a new appointment |
| `GET` | `/api/appointments` | Get all appointments |
| `GET` | `/api/appointments/:id` | Get a single appointment |
| `PUT` | `/api/appointments/:id` | Update an appointment |
| `DELETE` | `/api/appointments/:id` | Delete an appointment |

---

## 🎨 Future Enhancements & Features

Here are some features that could be added to enhance the system:

✅ **Better Loading UI**  
- Use `react-spinners` to show a loading indicator when fetching data.  

✅ **Improved Alert System**  
- Implement **toast notifications** (e.g., `react-toastify`) for success/error messages instead of browser alerts.

✅ **Error Handling**
- Display **"No doctors available"** or **"No appointments found"** instead of showing simple message.

✅ **Authentication & Authorization**
- Add **JWT-based authentication** to allow only registered users to book appointments.

✅ **Doctor Dashboard**
- A dashboard for doctors to **view & manage** their appointments.

✅ **User Profile & Booking History**
- Patients can view **past and upcoming appointments**.

✅ **Email & SMS Notifications**
- Notify users via email/SMS about their appointment status.

✅ **Admin Panel**
- A dedicated panel for admins to manage doctors and appointments efficiently.

✅ **Payment Integration**
- Allow users to pay for appointments using **Stripe or Razorpay**.

---

## 💡 Tech Stack Used
- **Frontend**: React.js, CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React useState & useEffect
- **Styling**: CSS Modules, Flexbox
- **UI Enhancements**: React Spinners

---

## 🤝 Contribution
Feel free to fork this repository and submit pull requests to enhance the system! 🚀

---

## 🔗 Contact
If you have any questions or need further assistance, feel free to reach out. Happy coding! 😃

