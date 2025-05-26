# 🌟 SplitEase - Simplify Expense Splitting! 🌟

SplitEase is a comprehensive expense splitting application designed to make group finance management hassle-free. Whether you're planning a trip, sharing a meal, or managing group expenses, SplitEase simplifies the process with an efficient algorithm and modern interface.

## 🚀 Live Demo & Resources

- **🌐 Live Application**: [Try SplitEase Now](https://lnkd.in/gYXDCTfT)
- **💻 GitHub Repository**: [View Source Code](https://lnkd.in/gMsKT_kR)
- **📝 Technical Blog**: [Read the Technical Deep Dive](https://lnkd.in/gt2UJYXV)

## ✨ Key Features

### 🔒 **Secure Authentication & Authorization**
- JWT-based authentication system
- Password encryption using Bcrypt
- Protected routes and secure data handling

### ⚡ **Efficient Algorithm Implementation**
- Custom-developed **Max Flow Algorithm** for optimal transaction calculation
- Minimizes the number of transactions required to settle expenses
- Handles complex multi-person expense scenarios
- **Algorithm Reference**: [Technical Implementation Details](https://lnkd.in/gqiuZhCH)

### 🗄️ **Reliable Data Management**
- MongoDB Atlas integration for cloud-based storage
- Seamless and secure database operations
- Scalable data architecture

### 🎨 **Modern UI/UX**
- Built with React and Styled Components
- Responsive design for all devices
- Intuitive and user-friendly interface

### 🛠️ **Robust Backend Architecture**
- Node.js and Express.js server
- RESTful API design
- Fast and reliable performance

## 🏗️ Project Structure

```
SplitEase/
├── backend/
│   ├── helper/
│   │   ├── bfs.js                    # Breadth-First Search implementation
│   │   ├── calculateNetBalances.js   # Balance calculation logic
│   │   ├── createFlowGraphMatrix.js  # Flow graph matrix creation
│   │   └── maxFlowAlgo.js           # Max Flow Algorithm implementation
│   ├── middleware/
│   │   └── verifyToken.js           # JWT token verification
│   ├── models/
│   │   └── userModel.js             # User data model
│   ├── index.js                     # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Logout.jsx           # Logout component
│   │   ├── pages/
│   │   │   ├── Home/                # Home page
│   │   │   ├── Login/               # Authentication
│   │   │   ├── Register/            # User registration
│   │   │   ├── Names/               # Participant management
│   │   │   ├── Transactions/        # Transaction input
│   │   │   └── Result/              # Settlement results
│   │   ├── store/                   # State management
│   │   │   ├── store.js
│   │   │   ├── sliceMethods.js
│   │   │   └── sessionMethods.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React** - Modern JavaScript library for building user interfaces
- **Styled Components** - CSS-in-JS styling solution
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database service
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing library

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/splitease.git
   cd splitease
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with your MongoDB connection string and JWT secret
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## 🎯 How It Works

1. **User Registration/Login**: Secure authentication system
2. **Add Participants**: Input names of people involved in expense sharing
3. **Record Transactions**: Add expenses with details of who paid and who owes
4. **Algorithm Processing**: Max Flow Algorithm calculates optimal settlements
5. **View Results**: See the minimum transactions needed to settle all debts

## 🔮 What's Next?

### 🔧 **Performance Optimization**
- Addressing re-rendering issues
- Improving algorithm efficiency
- Enhanced caching mechanisms

### 🎨 **Feature Enhancements**
- Advanced transaction recording
- Expense categories and tags
- Historical transaction tracking
- Multi-currency support
- Export functionality (PDF/CSV)

### 📱 **Mobile Experience**
- Progressive Web App (PWA) features
- Mobile-responsive improvements
- Offline functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 👥 Acknowledgments

Special thanks to:
- **Sai Raj Singh** - For helping develop the core functionality
- **Raj Vikramaditya** - For the original project idea

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact & Feedback

I'd love to hear your feedback and suggestions! Let's connect and discuss how SplitEase can evolve further.

---

### 🏷️ Tags
`#React` `#NodeJS` `#MongoDB` `#JWT` `#StyledComponents` `#ExpenseSplitter` `#SoftwareDevelopment` `#OpenSource` `#MaxFlowAlgorithm` `#WebDevelopment`

---

**Made with ❤️ for simplifying group expenses**
